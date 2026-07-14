from pathlib import Path
import json
import openpyxl
from pypdf import PdfReader

xlsx = Path(r"C:\Users\NOOR AGENCIES\OneDrive\Desktop\data\HAND TOOLS LESS 25.xlsx")
pdf = Path(r"C:\Users\NOOR AGENCIES\OneDrive\Desktop\data\TAPARIA\Taparia Price List April 2026.pdf")

wb = openpyxl.load_workbook(xlsx, data_only=False, read_only=True)
book = {}
for ws in wb.worksheets:
    rows = []
    for row in ws.iter_rows():
        vals = [cell.value for cell in row]
        if any(v not in (None, "") for v in vals):
            rows.append(vals)
    book[ws.title] = rows

reader = PdfReader(pdf)
pdf_pages = [{"page": i + 1, "text": page.extract_text() or ""} for i, page in enumerate(reader.pages)]

out = Path("tmp/hand-tools-source-extract.json")
out.write_text(json.dumps({"workbook": book, "pdf_pages": pdf_pages}, indent=2, default=str), encoding="utf-8")
print(json.dumps({"sheets": {k: len(v) for k, v in book.items()}, "pdf_pages": len(pdf_pages), "output": str(out)}))
