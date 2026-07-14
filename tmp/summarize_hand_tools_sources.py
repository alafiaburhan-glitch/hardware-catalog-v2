import json
from pathlib import Path

d = json.loads(Path('tmp/hand-tools-source-extract.json').read_text(encoding='utf-8'))
for sheet, rows in d['workbook'].items():
    print(f'\n## {sheet} ({len(rows)})')
    for row in rows[:8]: print(row)
print('\n## PDF TEXT')
for page in d['pdf_pages']:
    print(f"\n--- PAGE {page['page']} ---\n{page['text'][:1800]}")
