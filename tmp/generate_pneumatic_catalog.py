from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).parents[1]
EXTRACT = ROOT / "tmp" / "pneumatic-source-extract.json"
OUTPUT = ROOT / "data" / "pneumaticBrassFittings.generated.json"
CATEGORY = "pneumatic-brass-fittings"

SOURCE_LABELS = {
    r"BRASS FITTINGS\BRAS PBI -25+.pdf": "PBI Brass Fittings Catalog",
    r"BRASS FITTINGS\KKI BRASS FITTINGS -47+.pdf": "KKI Brass Fittings Catalog",
    r"JANATICS\JANATICS NEW RATE.xlsx 15.04.2026 -20+.xlsx": "Janatics Product Catalog",
    "Techno New Price List -52+ QRC -50+ TOOLS -47+.pdf": "Techno Pneumatic Products Catalog",
    "Inteco Price List APR-26 -47+.pdf": "Inteco Industrial Products Catalog",
    "CPP PRICE LIST TECHNO -50.pdf": "Compair Pneumatic Products Catalog",
    "FRL TECHNO.jpg": "Techno FRL Product Sheet",
    "QRCless45.jpg": "Techno QRC Product Sheet",
    "BRASS FITTINGS/SRP BALL VALVE -30+.jpeg": "SRP Ball Valve Product Sheet",
    "SS FITTINGS/14 +15-40+18 38+10-40+18.jpg": "Stainless Steel Fittings Product Sheet",
    "SS FITTINGS/ATAM BALL VALVE -50+.jpg": "ATAM Ball Valve Product Sheet",
    "One touch Akari.pdf": "Akari One Touch Fittings Catalog",
    "SS FITTINGS/LINTAS -35+18.pdf": "Lintas Stainless Steel Fittings Catalog",
}


def clean(value: object) -> str:
    text = str(value or "").replace("Ã—", " x ").replace("Â", " ")
    return re.sub(r"\s+", " ", text).strip(" .,-")


def slugify(value: str) -> str:
    value = value.lower().replace("&", " and ")
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", value))


class Catalog:
    def __init__(self) -> None:
        self.products: list[dict] = []
        self.keys: set[tuple[str, str]] = set()
        self.slugs: set[str] = set()

    def add(self, name: str, code: str, brand: str, source: str, specifications: dict | None = None, image: str = "") -> None:
        name, code = clean(name), clean(code)
        if not name or len(name) < 3 or not re.search(r"[A-Za-z]", name):
            return
        key = (source.lower(), (code or name).lower())
        if key in self.keys:
            return
        self.keys.add(key)
        specs = {"Brand": brand, "Source Catalog": SOURCE_LABELS.get(source, source)}
        specs.update({clean(k): clean(v) for k, v in (specifications or {}).items() if clean(v)})
        unique = slugify(f"{brand}-{code or name}")[:100]
        base_slug = f"pbf-{unique}"
        slug = base_slug
        suffix = 2
        while slug in self.slugs:
            slug = f"{base_slug}-{suffix}"
            suffix += 1
        self.slugs.add(slug)
        self.products.append({
            "id": f"pbf-{len(self.products) + 1:05d}",
            "name": name.title() if name.isupper() else name,
            "slug": slug,
            "code": code or f"PBF-{len(self.products) + 1:04d}",
            "category": CATEGORY,
            "description": f"{name} from {brand}, available through Noor Agencies for pneumatic and industrial applications.",
            "image": image,
            "specifications": specs,
        })


def parse_model_tables(catalog: Catalog, record: dict, brand: str) -> None:
    source = record["file"]
    for page in record.get("pages", []):
        for raw in page["text"].splitlines():
            line = clean(raw)
            # Common price-list layout: model, description, 8-digit HSN, then rate.
            hsn_match = re.search(r"\b(\d{8})\b", raw)
            if not hsn_match:
                continue
            left = raw[:hsn_match.start()].strip()
            if re.search(r"\b(?:MOQ|MRP|PRICE|QUANTITY)\b", left, re.I):
                continue
            parts = left.split(maxsplit=1)
            if len(parts) != 2:
                continue
            code, name = map(clean, parts)
            if code == "NAMUR" and name:
                model_parts = name.split(maxsplit=1)
                if len(model_parts) == 2:
                    code, name = f"NAMUR-{model_parts[0]}", model_parts[1]
            if len(code) > 35 or len(name) < 3:
                continue
            catalog.add(name, code, brand, source, {"HSN Code": hsn_match.group(1), "Catalog Page": page["page"]})


def parse_pbi_index(catalog: Catalog, record: dict) -> None:
    seen: set[str] = set()
    for page in record["pages"][:5]:
        for raw in page["text"].splitlines():
            match = re.match(r"^\s*(\d{1,3})\.?\s+(.+?)\s+(?:\.\s*){2,}Page\s+\d+", raw, re.I)
            if not match:
                continue
            code, name = match.groups()
            name = clean(name)
            if name.lower() in seen:
                continue
            seen.add(name.lower())
            catalog.add(name, f"PBI-{int(code):03d}", "PBI", record["file"], {"Material": "Brass"})


KKI_EXCLUDE = re.compile(r"PRICE|PROFILE|QUALITY|MISSION|VISION|INDEX|PAGE|COMPANY|CONTACT|PRODUCTIVITY|EXCELLENCE|SOLUTION PROVIDER|TERMS|CONDITION|RATE|GST|HSN|QUANTITY|MOQ", re.I)


def parse_kki_headings(catalog: Catalog, record: dict) -> None:
    candidates: set[str] = set()
    for page in record["pages"]:
        for raw in page["text"].splitlines():
            name = clean(raw)
            if not 4 <= len(name) <= 80 or KKI_EXCLUDE.search(name):
                continue
            if not re.fullmatch(r"[A-Z0-9 /&()+.,'\"xX-]+", name):
                continue
            if sum(character.isalpha() for character in name) < 4 or re.fullmatch(r"[\d /.,-]+", name):
                continue
            if re.search(r"\b(?:MM|INCH|BSP|BSPT|NPT)\s*\d*$", name) and len(name.split()) < 4:
                continue
            candidates.add(name)
    for index, name in enumerate(sorted(candidates), 1):
        catalog.add(name, f"KKI-{index:03d}", "KKI", record["file"], {"Material": "Brass"})


def parse_janatics(catalog: Catalog, record: dict) -> None:
    for sheet in record["sheets"]:
        for row_number, row in enumerate(sheet["rows"], 1):
            if len(row) < 3:
                continue
            part_number, description = row[1], row[2]
            if part_number in (None, "") or description in (None, ""):
                continue
            part = clean(part_number)
            name = clean(description)
            if part.upper() in {"PART NO", "PART NUMBER", "CODE"} or not re.search(r"[A-Za-z]", name):
                continue
            catalog.add(name, part, "Janatics", record["file"], {"Worksheet": sheet["name"], "Source Row": row_number})


def add_image_catalogs(catalog: Catalog) -> None:
    frl = ["AF2000", "AFC2000", "AFR2000J", "AFR2000", "AL2000", "AR2000", "BF4000", "BFC4000", "BFR4000", "BR4000", "NAR200", "NR2000-02", "AC2010-02", "AC3010-03", "AC4010-04", "AC4010-06", "AC5010-10", "AF2000-02D", "AF3000-03", "AF4000-04D", "AF4000-04", "AF4000-06", "AF5000-10", "AL3000-03", "AL4000-04", "AL4000-06", "AL5000-10", "AR2000-02", "AR3000-03", "AR4000-04", "AR4000-06", "AR5000-10", "AW2000-02P", "AW3000-03", "AW4000-04", "AW4000-06", "AW5000-10", "KAC2010-02", "KAF2000-02", "KAL2000-02", "KAW2000-02", "TC2010-02", "TW2000-02"]
    for code in frl:
        catalog.add(f"Pneumatic FRL {code}", code, "Techno", "FRL TECHNO.jpg", {"Product Type": "Filter, regulator and lubricator"}, "/products/pneumatic-brass-fittings/frl-techno.jpg")
    for model in ["SM", "SF", "SH", "SP", "PM", "PF", "PH", "PP"]:
        catalog.add(f"Industrial Quick Release Coupling {model}", model, "Techno", "QRCless45.jpg", {"Material": "Steel", "Available Sizes": '1/4 inch, 3/8 inch, 1/2 inch'}, "/products/pneumatic-brass-fittings/qrc-techno.jpg")
    srp = [("W0014", '1/4 inch female x female'), ("W0038", '3/8 inch female x female'), ("W0012", '1/2 inch female x female'), ("WH0012", '1/2 inch heavy female x female'), ("WG0012", '1/2 inch extra heavy female x female'), ("W0034", '3/4 inch female x female'), ("W0001", '1 inch female x female'), ("WH0001", '1 inch heavy female x female'), ("W0114", '1-1/4 inch heavy female x female')]
    for code, size in srp:
        catalog.add(f"Brass Ball Valve {size}", f"SRP-{code}", "SRP", "BRASS FITTINGS/SRP BALL VALVE -30+.jpeg", {"Material": "Brass", "Connection": size}, "/products/pneumatic-brass-fittings/srp-ball-valves.jpeg")
    ss_names = ["Elbow Light", "Elbow Heavy", "Tee Light", "Tee Heavy", "Socket Light", "Socket Heavy", "Union", "Hex Nipple", "Hose Nipple", "Round Cap", "Hex Cap", "Square Plug", "Hex Plug", "Hex Nut", "Reducer Elbow", "Reducer Tee", "Reducer Hex Nipple", "Reducer Hex Bush", "Reducer Socket", "Street Elbow", "Cross", "Elbow Heavy 45 Degree"]
    for index, name in enumerate(ss_names, 1):
        catalog.add(f"Stainless Steel {name}", f"SS-{index:02d}", "Generic", "SS FITTINGS/14 +15-40+18 38+10-40+18.jpg", {"Material": "Stainless steel", "Available Sizes": '1/4 inch to 4 inch'}, "/products/pneumatic-brass-fittings/ss-fittings.jpg")
    catalog.add("Investment Casting Stainless Steel Ball Valve", "ATAM-AV-505", "ATAM", "SS FITTINGS/ATAM BALL VALVE -50+.jpg", {"Material": "CF8 stainless steel", "Design": "Two piece, lever operated, blow-out-proof stem", "Available Sizes": '1/4 inch to 4 inch', "Pressure Rating": "PN-40"}, "/products/pneumatic-brass-fittings/atam-ball-valve.jpg")


def add_scanned_catalog_families(catalog: Catalog) -> None:
    akari = [
        ("PC", "Straight Union Connector"), ("PC-G", "Male Straight Connector"), ("PC-F", "Female Straight Connector"),
        ("PL", "Union Elbow"), ("PL-G", "Male Elbow Connector"), ("PL-F", "Female Elbow Connector"),
        ("PT", "Union Tee"), ("PT-G", "Male Branch Tee"), ("PT-F", "Female Branch Tee"),
        ("PY", "Union Y Connector"), ("PK", "Union Bulkhead Connector"), ("PG", "Reducer Connector"),
        ("PW", "Union Double Y Connector"), ("PM", "Bulkhead Union"), ("PE", "Plug"),
        ("HVFF", "Hand Valve Female to Female"), ("HVFS", "Hand Valve Female to Tube"),
        ("SC", "Speed Controller"), ("SL", "Speed Controller Elbow"), ("SPC", "Stop Fitting"),
    ]
    for code, name in akari:
        catalog.add(f"One Touch {name}", f"AKARI-{code}", "Akari", "One touch Akari.pdf", {"Product Type": "One-touch pneumatic fitting"})
    lintas = ["Elbow", "Tee", "Socket", "Union", "Hex Nipple", "Hose Nipple", "Cap", "Square Plug", "Hex Plug", "Hex Nut", "Reducer Elbow", "Reducer Tee", "Reducer Hex Nipple", "Reducer Hex Bush", "Reducer Socket", "Street Elbow", "Cross", "45 Degree Elbow", "Male Connector", "Female Connector", "Bulkhead Union", "Needle Valve", "Ball Valve"]
    for index, name in enumerate(lintas, 1):
        catalog.add(f"Stainless Steel {name}", f"LINTAS-{index:02d}", "Lintas", "SS FITTINGS/LINTAS -35+18.pdf", {"Material": "Stainless steel"})


def add_cpp_catalog(catalog: Catalog) -> None:
    groups = {
        "Impact Wrench": ["AT-239", "AT-239 KIT", "AT-5040B KIT", "AT-242", "AT-241", "AT-5040B", "AT-246", "AT-243", "AT-245", "AT-263", "AT-244", "AT-5059", "AT-9961", "AT-9991", "AT-266", "AT-5030", "AT-5031SG", "AT-261", "AT-265", "AT-9981K", "AT-9980"],
        "Air Die Grinder and Driller": ["AT-7032B", "AT-282SG", "AT-7033B", "AT-3170", "AT-3170K", "AT-7033BK", "PAT-403KL", "PAT-401KL", "AT-4038C", "AT-7042", "AT-7035"],
        "Air Sander and Nailer": ["AT-980-5V", "AT-975-5V", "AT-4151", "PAT-302", "F-50", "CN-55", "AT-8016", "AT-871LA", "F-30", "AT-1013", "ATT-50"],
        "Foam Gun, Rivet Gun and Air Hose Reel": ["AHR01", "AHR03", "AT-906", "AT-3198", "AT-6015SG", "FG-02", "FG-03", "FG-01"],
        "Air Screwdriver, Paint Gun, Hammer and Labour Saving Wrench": ["AT-W3", "AT-W5", "AT-W7", "AIR BRUSH", "H-2000P", "H-827P", "AT-2013KSG", "ISLSW-088", "ISLSW-058", "AT-2011KSG", "AT-2012KSG"],
        "Pneumatic Special Tool": ["AT-9039", "AT-7039", "AT-480SG", "AT-6036N", "EWS SERIES", "EW SERIES", "AT-413", "AT-6026", "IMPACT SOCKET SET", "SANDING PAD"],
        "Pneumatic Fitting, Tube and Air Chuck": ["TG-08", "AC-8", "TWAC", "ALN H", "ALN", "NITROGEN", "HTC", "TTC", "DG-10", "PAWEL", "ALUMINIUM AIR GUN", "CAR WASHING GUN", "ALUMINIUM CAR WASHING GUN", "NYLON BRAIDED HOSE", "YELLOW SPRAY HOSE", "PU TUBE", "PU SPIRAL", "SP", "SH", "SF", "PP", "PM", "PF", "PH", "SM"],
    }
    for family, codes in groups.items():
        for code in codes:
            catalog.add(f"{family} {code}", code, "Techno", "CPP PRICE LIST TECHNO -50.pdf", {"Product Family": family})


def add_inteco_families(catalog: Catalog) -> None:
    families = [
        "Low Profile Jack", "High Profile Jack", "Double Pump Jack", "Shop Press", "Pallet Jack", "Engine Crane", "Bike Rear Paddock Stand", "Motorcycle Lift", "Impact Wrench", "Tool Trolley", "Cargo Trolley", "Pressure Washer", "Agriculture Power Sprayer Pump", "Air Hammer", "Balloon Jack", "Crimping Tool", "Labour Saving Wrench", "PU Tube", "Air Nailer", "Paint Tank", "Mini Electric Rope Hoist", "Jack Stand", "Engine Leveller", "Air Source Treatment Filter", "Air Source Treatment Regulator", "Air Source Treatment Lubricator", "Fine Filter", "Filter Element", "PTFE Tape", "Pneumatic Quick Release Coupling", "Pneumatic Manifold", "Pneumatic Fitting", "Garage Accessory",
    ]
    for index, name in enumerate(families, 1):
        catalog.add(name, f"INTECO-{index:03d}", "Inteco", "Inteco Price List APR-26 -47+.pdf", {"Product Family": name})


def family_for(product: dict) -> str:
    name = product["name"].lower()
    source = product["specifications"]["Source Catalog"]

    if source == "Techno FRL Product Sheet":
        return "Pneumatic FRL Units"
    if source == "Techno QRC Product Sheet":
        return "Industrial Quick Release Couplings"
    if source == "SRP Ball Valve Product Sheet":
        return "SRP Brass Ball Valves"
    if source == "ATAM Ball Valve Product Sheet":
        return "ATAM Stainless Steel Ball Valves"
    if source == "Compair Pneumatic Products Catalog":
        return product["specifications"].get("Product Family", "Pneumatic Tools")
    if source == "Inteco Industrial Products Catalog":
        if re.search(r"filter element|fine filter|air source treatment filter", name):
            return "Pneumatic Filters & Elements"
        if "regulator" in name:
            return "Pneumatic Regulators"
        if "lubricator" in name:
            return "Pneumatic Lubricators"
        if "manifold" in name:
            return "Pneumatic Manifolds"
        if "quick release" in name or "coupling" in name:
            return "Industrial Quick Release Couplings"
        if "fitting" in name:
            return "Pneumatic Connectors & Fittings"
        if "pu tube" in name:
            return "Pneumatic Tubes"
        return product["specifications"].get("Product Family", product["name"])

    if source in {"PBI Brass Fittings Catalog", "KKI Brass Fittings Catalog"}:
        rules = [
            (r"ball valve|mini ball|air cock|gas cock|needle valve|niddle valve|non.?return|f.?valve", "Brass Valves & Cocks"),
            (r"compressor|delivery valve|air chuck|tyre", "Brass Compressor & Tyre Parts"),
            (r"oxygen|argon|co2|carbon dioxide|lpg|welding|torch|cutter|gas part|regulator", "Brass Gas & Welding Parts"),
            (r"grease nipple|grease cup", "Brass Grease Fittings"),
            (r"bolt|nut|screw|fastener|washer", "Brass Fasteners"),
            (r"qrc|quick|pu connector|p\. u\.|tube fitting", "Brass Pneumatic Fittings"),
            (r"olive|compression|bulk.?head|tube od", "Brass Compression Fittings"),
            (r"flare", "Brass Flare Fittings"),
            (r"hose|tailpiece", "Brass Hose Fittings"),
            (r"elbow|tee|socket|union|nipple|bush|plug|cap|cross|adaptor|adapter|insert|reducer", "Brass Pipe Fittings"),
        ]
        for pattern, family in rules:
            if re.search(pattern, name):
                return family
        return "Other Brass Fittings"

    if source == "Janatics Product Catalog":
        rules = [
            (r"cyl|piston|barrel|front end cover|rear.*cover|seal kit", "Pneumatic Cylinders & Spares"),
            (r"solenoid|coil|armature", "Solenoid Valves & Coils"),
            (r"manifold", "Pneumatic Manifolds"),
            (r"filter element|filter", "Pneumatic Filters & Elements"),
            (r"regulator", "Pneumatic Regulators"),
            (r"lubricator", "Pneumatic Lubricators"),
            (r"frl|frc", "Pneumatic FRL Units"),
            (r"flow control|speed control|throttle", "Flow & Speed Control Valves"),
            (r"non.?return|shuttle|quick exhaust|logic", "Pneumatic Logic & Check Valves"),
            (r"foot|pedal", "Foot Operated Valves"),
            (r"hand lever|manual|push button|roller lever|mechanical", "Manual & Mechanical Valves"),
            (r"pressure gauge|gauge", "Pressure Gauges"),
            (r"silencer|muffler", "Pneumatic Silencers"),
            (r"tube|tubing", "Pneumatic Tubes"),
            (r"connector|elbow|tee|nipple|fitting|union|adaptor|adapter", "Pneumatic Connectors & Fittings"),
            (r"reed switch|sensor|switch", "Cylinder Sensors & Switches"),
            (r"valve", "Industrial Pneumatic Valves"),
            (r"spacer|mount|bracket|panel|plate|screw|spring|o.?ring|diaphragm|deflector", "Pneumatic Accessories & Spares"),
        ]
        for pattern, family in rules:
            if re.search(pattern, name):
                return family
        return "Other Janatics Pneumatic Components"

    if source == "Techno Pneumatic Products Catalog":
        if "solenoid" in name or "series 3/2" in name or "series 5/2" in name or "series 5/3" in name:
            return "Techno Solenoid Valves"
        if "valve" in name:
            return "Techno Pneumatic Valves"
        return "Techno Pneumatic Components"

    if source == "Akari One Touch Fittings Catalog":
        return "Akari One Touch Fittings"

    if source in {"Stainless Steel Fittings Product Sheet", "Lintas Stainless Steel Fittings Catalog"}:
        return "Stainless Steel Pipe Fittings"

    return product["name"]


def consolidate_families(products: list[dict]) -> list[dict]:
    blocked = re.compile(r"^(?:TTC|TTC[- ]?[LH]|HTC|HSN|MOUNTING|MAL/MA|MOQ)$", re.I)
    families: dict[str, dict] = {}
    family_models: dict[str, list[str]] = {}
    family_brands: dict[str, list[str]] = {}
    family_sources: dict[str, list[str]] = {}

    for product in products:
        if blocked.fullmatch(clean(product["code"])) or clean(product["name"]).lower() in {"code", "hsn code"}:
            continue
        source = product["specifications"].get("Source Catalog", "")
        name = clean(product["name"])
        if name.lower().endswith("hsn"):
            continue
        if source == "Inteco Industrial Products Catalog" and not re.search(
            r"air|pneumatic|filter|regulator|lubricator|manifold|coupling|fitting|pu tube|impact wrench|paint tank",
            name,
            re.I,
        ):
            continue
        family = family_for(product)
        if family in {"Other Brass Fittings", "Other Janatics Pneumatic Components", "Pneumatic Accessories & Spares"}:
            continue
        key = slugify(family)
        model = clean(product["code"])
        brand = clean(product["specifications"].get("Brand"))
        source = clean(product["specifications"].get("Source Catalog"))
        if key not in families:
            families[key] = {
                "id": f"pbf-family-{len(families) + 1:03d}",
                "name": family,
                "slug": f"pbf-{key}",
                "code": f"PBF-{len(families) + 1:03d}",
                "category": CATEGORY,
                "description": f"{family} grouped from the supplied manufacturer catalogs. Contact Noor Agencies for available models, sizes and technical options.",
                "image": "",
                "specifications": {},
            }
            family_models[key] = []
            family_brands[key] = []
            family_sources[key] = []
        if model and model not in family_models[key]:
            family_models[key].append(model)
        if brand and brand not in family_brands[key]:
            family_brands[key].append(brand)
        if source and source not in family_sources[key]:
            family_sources[key].append(source)

    result = list(families.values())
    for product in result:
        key = product["slug"].removeprefix("pbf-")
        product["specifications"] = {
            "Brand": ", ".join(family_brands[key]),
            "Available Models": ", ".join(family_models[key]),
            "Source Catalogs": ", ".join(family_sources[key]),
        }
    return result


def main() -> None:
    records = json.loads(EXTRACT.read_text(encoding="utf-8"))
    by_file = {record["file"]: record for record in records}
    catalog = Catalog()
    parse_pbi_index(catalog, by_file[r"BRASS FITTINGS\BRAS PBI -25+.pdf"])
    parse_kki_headings(catalog, by_file[r"BRASS FITTINGS\KKI BRASS FITTINGS -47+.pdf"])
    parse_janatics(catalog, by_file[r"JANATICS\JANATICS NEW RATE.xlsx 15.04.2026 -20+.xlsx"])
    parse_model_tables(catalog, by_file["Techno New Price List -52+ QRC -50+ TOOLS -47+.pdf"], "Techno")
    parse_model_tables(catalog, by_file["Inteco Price List APR-26 -47+.pdf"], "Inteco")
    parse_model_tables(catalog, by_file["CPP PRICE LIST TECHNO -50.pdf"], "Techno")
    add_image_catalogs(catalog)
    add_scanned_catalog_families(catalog)
    add_cpp_catalog(catalog)
    add_inteco_families(catalog)
    consolidated = consolidate_families(catalog.products)
    OUTPUT.write_text(json.dumps(consolidated, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"raw_products": len(catalog.products), "family_products": len(consolidated)}, indent=2))


if __name__ == "__main__":
    main()
