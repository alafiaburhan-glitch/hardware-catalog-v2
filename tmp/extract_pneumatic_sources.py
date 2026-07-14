from __future__ import annotations

import json
from pathlib import Path

import openpyxl
from pypdf import PdfReader


SOURCE = Path(r"C:\Users\NOOR AGENCIES\OneDrive\Desktop\data\pneumaticbrassfittings")
OUTPUT = Path(__file__).parent / "pneumatic-source-extract.json"


def extract_pdf(path: Path) -> dict:
    reader = PdfReader(path)
    return {
        "file": str(path.relative_to(SOURCE)),
        "type": "pdf",
        "page_count": len(reader.pages),
        "pages": [
            {"page": index + 1, "text": page.extract_text() or ""}
            for index, page in enumerate(reader.pages)
        ],
    }


def extract_workbook(path: Path) -> dict:
    workbook = openpyxl.load_workbook(path, data_only=True, read_only=True)
    sheets = []
    for sheet in workbook.worksheets:
        rows = []
        for row in sheet.iter_rows(values_only=True):
            values = [value for value in row]
            if any(value not in (None, "") for value in values):
                rows.append(values)
        sheets.append({"name": sheet.title, "rows": rows})
    return {
        "file": str(path.relative_to(SOURCE)),
        "type": "xlsx",
        "sheets": sheets,
    }


def main() -> None:
    records = []
    for path in sorted(SOURCE.rglob("*")):
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        if suffix == ".pdf":
            records.append(extract_pdf(path))
        elif suffix == ".xlsx":
            records.append(extract_workbook(path))
        else:
            records.append({"file": str(path.relative_to(SOURCE)), "type": suffix.lstrip(".")})
    OUTPUT.write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "output": str(OUTPUT),
        "files": len(records),
        "pdf_pages": sum(record.get("page_count", 0) for record in records),
        "characters": sum(
            len(page["text"])
            for record in records
            for page in record.get("pages", [])
        ),
    }, indent=2))


if __name__ == "__main__":
    main()
