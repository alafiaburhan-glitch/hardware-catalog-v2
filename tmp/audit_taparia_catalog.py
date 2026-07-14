import json, re
from pathlib import Path

d = json.loads(Path('tmp/hand-tools-source-extract.json').read_text(encoding='utf-8'))
text = '\n'.join(p['text'] for p in d['pdf_pages'])
headings = []
for line in text.splitlines():
    clean = ' '.join(line.split())
    if re.match(r'^\d+\.\s*(?:\([A-Z]\)\s*)?[A-Z][A-Z0-9 &/,.()\-]+$', clean) and len(clean) < 110:
        headings.append(re.sub(r'^\d+\.\s*(?:\([A-Z]\)\s*)?', '', clean).strip())
seen=[]
for h in headings:
    if h not in seen: seen.append(h)
catalog = Path('data/handTools.ts').read_text(encoding='utf-8').lower()
for h in seen:
    words=[w.lower() for w in re.findall(r'[A-Z]{3,}',h) if w not in {'WITH','TYPE','SETS','GROUP','SERIES','GENERAL','PURPOSE','STANDARD','TOOLS'}]
    matched = any(w in catalog for w in words)
    print(('OK   ' if matched else 'MISS ') + h)
print(f'\nHEADINGS={len(seen)}')
