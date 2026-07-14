from __future__ import annotations

import io, json, re, shutil, unicodedata, zipfile
from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
INSPECTION = ROOT / "tmp/power-tools-workbook-inspection.json"
if not INSPECTION.exists():
    INSPECTION = ROOT / "tmp/sheet-runtime/tmp/power-tools-workbook-inspection.json"

BOOKS = {
    "POWER TOOLS LESS 5%.xlsx": "power-tools",
    "POWERTOOLS ACCESSORIES LESS 25%.xlsx": "power-tools-accessories",
    "SPARE PARTS OF POWERTOOLS -25.xlsx": "power-tools-spare-parts",
}
MIN_IMAGE_SIDE = 500

HEADERS = {"item description", "items description", "item", "brand", "image", "cost", "gst", "margin", "price", "discount", "freight", "frieght", "qty", "qty/pk", "qty/box", "qty/case", "qty/pack", "watts", "model no", "model no.", "part number", "item code", "spec", "power", "phase", "torque", "bar", "pressure", "color", "suitable machines"}
CATEGORY_WORDS = re.compile(r"\b(grinders?|drills?|drilling|screwdrivers?|wrenches?|hammers?|hammering|breakers?|cutters?|cutting|saws?|blowers?|washers?|cleaners?|sprayers?|foggers?|sealing|sealers?|solder(?:ing)?|weld(?:ing)?|glue guns?|engraving|meters?|measures?|levels?|sanders?|polish(?:ing)?|routers?|planers?|trimmers?|vibrators?|chainsaws?|shears?|nibblers?|mixers?|heat guns?|hot air guns?|torches?|pruners?|compressors?|wheels?|discs?|blades?|chisels?|bits?|pads?|hoses?|nozzles?|lances?|accessories|spares?|batter(?:y|ies)|bearings?|gears?|switches?|armatures?|field coils?|carbon brushes?|guards?|flanges?|spindles?|housings?|chains?)\b", re.I)
SERIES_WORDS = re.compile(r"\b(series|models?|machines?|tools?|abrasives?)\b", re.I)

# Rows that contain real products but no price/specification cells. All other
# single-cell rows are catalogue headings or series labels.
SINGLE_CELL_PRODUCTS = {
    ("power-tools-accessories", "CHISELS", row) for row in (5, 7, 8, 14, 15, 17, 18, 19, 20)
} | {
    ("power-tools-accessories", "STRONG ALI", row) for row in (3, 4, 6)
} | {
    ("power-tools-accessories", "YURI", 4),
}

def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", value)) or "item"

def family_key(value: str) -> str:
    key = slugify(value)
    singulars = {
        "grinders": "grinder", "drills": "drill", "machines": "machine",
        "hammers": "hammer", "cutters": "cutter", "saws": "saw",
        "blowers": "blower", "washers": "washer", "cleaners": "cleaner",
        "sprayers": "sprayer", "foggers": "fogger", "wheels": "wheel",
        "discs": "disc", "blades": "blade", "chisels": "chisel",
        "bits": "bit", "pads": "pad", "hoses": "hose", "spares": "spare",
        "guns": "gun", "batteries": "battery", "wrenches": "wrench",
        "compressors": "compressor", "accessories": "accessory",
    }
    return "-".join(singulars.get(part, part) for part in key.split("-"))

def text(v) -> str:
    if v is None: return ""
    if isinstance(v, float) and v.is_integer(): return str(int(v))
    return str(v).strip()

def image_anchors(xlsx: Path):
    result = {}
    ns = {"m":"http://schemas.openxmlformats.org/spreadsheetml/2006/main", "r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships", "xdr":"http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "a":"http://schemas.openxmlformats.org/drawingml/2006/main"}
    relns = {"p":"http://schemas.openxmlformats.org/package/2006/relationships"}
    with zipfile.ZipFile(xlsx) as z:
        wb = ET.fromstring(z.read("xl/workbook.xml"))
        wb_rels = {e.attrib["Id"]: e.attrib["Target"] for e in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
        for sh in wb.findall("m:sheets/m:sheet", ns):
            name = sh.attrib["name"]; target = wb_rels[sh.attrib[f"{{{ns['r']}}}id"]].lstrip("/")
            sheet_path = target if target.startswith("xl/") else "xl/" + target
            rel_path = str(Path(sheet_path).parent / "_rels" / (Path(sheet_path).name + ".rels")).replace("\\", "/")
            if rel_path not in z.namelist(): continue
            sroot = ET.fromstring(z.read(sheet_path)); drawing = sroot.find("m:drawing", ns)
            if drawing is None: continue
            srels = {e.attrib["Id"]: e.attrib["Target"] for e in ET.fromstring(z.read(rel_path))}
            draw_target = srels[drawing.attrib[f"{{{ns['r']}}}id"]]
            draw_path = str((Path(sheet_path).parent / draw_target).resolve()).replace("\\", "/")
            draw_path = draw_path.split("/xl/")[-1]; draw_path = "xl/" + draw_path
            drel_path = str(Path(draw_path).parent / "_rels" / (Path(draw_path).name + ".rels")).replace("\\", "/")
            drels = {e.attrib["Id"]: e.attrib["Target"] for e in ET.fromstring(z.read(drel_path))}
            root = ET.fromstring(z.read(draw_path))
            for anchor in list(root):
                fr = anchor.find("xdr:from", ns); blip = anchor.find(".//a:blip", ns)
                if fr is None or blip is None: continue
                row = int(fr.find("xdr:row", ns).text) + 1
                rid = blip.attrib[f"{{{ns['r']}}}embed"]
                media = str((Path(draw_path).parent / drels[rid]).resolve()).replace("\\", "/").split("/xl/")[-1]
                media = "xl/" + media
                result.setdefault(name, []).append((row, media, z.read(media)))
    return result

def is_category(label: str, rest: list) -> bool:
    if any(text(v) for v in rest): return False
    if not CATEGORY_WORDS.search(label): return False
    return True

inspection = json.loads(INSPECTION.read_text(encoding="utf-8"))
out = []
image_dir = ROOT / "public/products/power-tools"
image_dir.mkdir(parents=True, exist_ok=True)

for book in inspection:
    filename = Path(book["inputPath"]).name
    section = BOOKS[filename]
    anchors = image_anchors(ROOT / "tmp" / filename)
    families = {}
    for sheet in book["sheets"]:
        rows = sheet["values"]
        if not rows: continue
        header = [text(v).lower().strip() for v in (rows[0] if isinstance(rows[0], list) else [rows[0]])]
        current = "General " + section.replace("-", " ").title()
        lineage = []
        sheet_images = anchors.get(sheet["name"], [])
        for idx, raw in enumerate(rows[1:], start=2):
            row = raw if isinstance(raw, list) else [raw]
            vals = [text(v) for v in row]
            label = vals[0] if vals else ""
            if not label: continue
            forced_product = (section, sheet["name"], idx) in SINGLE_CELL_PRODUCTS
            if not forced_product and is_category(label, row[1:]):
                current = re.sub(r"\s+", " ", label).strip().title()
                lineage = []
                continue
            if not forced_product and not any(vals[1:]):
                lineage = [label.title()]
                continue
            famkey = family_key(current)
            fam = families.setdefault(famkey, {"name": current, "section": section, "models": [], "images": []})
            specs = {}
            for col, value in enumerate(vals[1:], start=1):
                if not value: continue
                key = header[col].title() if col < len(header) and header[col] not in HEADERS - {header[col]} else (header[col].title() if col < len(header) else f"Detail {col}")
                if key.lower() in {"cost", "gst", "margin", "price", "discount", "freight", "frieght"}: continue
                if key.lower() == "image": continue
                specs[key] = value
            model = {"brand": sheet["name"].strip().title(), "name": label, "specifications": specs}
            if lineage: model["series"] = " / ".join(lineage)
            nearby = sorted(sheet_images, key=lambda x: abs(x[0]-idx))
            if nearby and abs(nearby[0][0]-idx) <= 3:
                rowno, media, blob = nearby[0]
                with Image.open(io.BytesIO(blob)) as source_image:
                    image_is_clear = min(source_image.size) >= MIN_IMAGE_SIDE
                if image_is_clear:
                    ext = Path(media).suffix.lower() or ".png"
                    fname = f"{section}-{slugify(sheet['name'])}-{rowno}{ext}"
                    (image_dir / fname).write_bytes(blob)
                    model["image"] = f"/products/power-tools/{fname}"
                    if model["image"] not in fam["images"]: fam["images"].append(model["image"])
            duplicate_key = (model["brand"].casefold(), model["name"].casefold(), json.dumps(model["specifications"], sort_keys=True))
            existing_keys = {
                (item["brand"].casefold(), item["name"].casefold(), json.dumps(item["specifications"], sort_keys=True))
                for item in fam["models"]
            }
            if duplicate_key not in existing_keys:
                fam["models"].append(model)
        # retain any orphan image assets for auditing
    for key, fam in families.items():
        if not fam["models"]: continue
        brands = []
        for m in fam["models"]:
            if m["brand"] not in brands: brands.append(m["brand"])
        slug = key if section == "power-tools" else f"{section}-{key}"
        out.append({
            "id": f"{section}-{key}", "name": fam["name"], "slug": slug,
            "code": ("PT" if section == "power-tools" else "PTA" if section.endswith("accessories") else "PTS") + "-" + slugify(fam["name"])[:18].upper(),
            "category": "power-tools", "section": section,
            "description": f"{fam['name']} from the listed catalogue brands and models. Contact Noor Agencies for current availability and a quotation.",
            "image": fam["images"][0] if fam["images"] else "",
            "brand": brands[0] if brands else "Generic",
            "specifications": {"Brand": ", ".join(brands), "Product Type": fam["name"], "Category": "Power Tools", "Catalogue Section": section.replace("-", " ").title(), "Available Models": "; ".join(f"{m['brand']}: {m['name']}" for m in fam["models"])},
            "models": fam["models"],
        })

(ROOT / "data/powerTools.generated.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps({"products": len(out), "models": sum(len(p["models"]) for p in out), "sections": {s: sum(1 for p in out if p["section"] == s) for s in BOOKS.values()}, "images": len(list(image_dir.glob("*")))}))
