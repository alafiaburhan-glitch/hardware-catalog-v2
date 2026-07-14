import json, re
from pathlib import Path

src = json.loads(Path('tmp/hand-tools-source-extract.json').read_text(encoding='utf-8'))['workbook']

def clean(v): return ' '.join(str(v).replace('\n',' ').split()).strip()
def slugify(v): return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',v.lower())).strip('-')

def classify(name):
    n=name.lower()
    rules=[
      ('SPANNER', r'spanner|wrench'), ('HAMMER', r'hammer|mallet'),
      ('PLIER', r'plier|nipper|stripper|crimp|cutter|snip|scissor'),
      ('SOCKET', r'socket|allen|hex key|torx key'), ('SCREW', r'screw.?driver|tester'),
      ('CLAMP', r'clamp|vice'), ('CUT', r'hacksaw|saw|chisel|punch|blade|drill|file|tile|knife|cutting'),
      ('RIVET', r'rivet|puller'), ('MEASURE', r'vernier|caliper|measur|scale|square|level|rodometer'),
      ('SPRAY', r'gun|spray|pump|oil can|grease'), ('LIFT', r'jack|stand'),
      ('MASON', r'trowel|putty|scraper|mason|plaster'), ('GARDEN', r'garden|hedge|prun|rake|hoe|fork|sickle|bill hook|aruval'),
      ('STORAGE', r'tool.?box|tool.?kit|tool bag|trolley|dispenser|stapler|magnet|plane|carpenter'),
    ]
    for tag,pat in rules:
        if re.search(pat,n): return tag
    return 'OTHER'

products=[]
used={}
for sheet, rows in src.items():
    if not rows: continue
    header=[clean(x).upper() if x is not None else '' for x in rows[0]]
    current=None
    sections=[]
    for ri,row in enumerate(rows[1:], start=2):
        name=clean(row[0]) if row and row[0] is not None else ''
        if not name or name.upper() in {'ITEM DESCRIPTION','ITEM DECRIPTION','SIZES(INCHES)'}: continue
        other=[x for x in row[1:] if x not in (None,'')]
        has_numeric=any(isinstance(x,(int,float)) for x in other)
        is_heading=(not has_numeric and name.upper()==name and not re.search(r'\d',name) and len(name)<65)
        if is_heading:
            current={'name':name.title(), 'items':[], 'brands':set(), 'models':set(), 'sizes':set()}
            sections.append(current)
            continue
        if current is None:
            current={'name':re.sub(r'\s+\d.*$','',name).title(), 'items':[], 'brands':set(), 'models':set(), 'sizes':set()}
            sections.append(current)
        current['items'].append(name)
        for ci,val in enumerate(row[1:], start=1):
            if val in (None,'') or ci>=len(header): continue
            label=header[ci]
            value=clean(val)
            if 'BRAND' in label and not value.startswith('='): current['brands'].add(value)
            elif 'MODEL' in label and not value.startswith('='): current['models'].add(value)
            elif label=='SIZE' or label.startswith('SIZE '): current['sizes'].add(value)
    for sec in sections:
        if not sec['items']: continue
        base=slugify(f"{sheet}-{sec['name']}") or 'workbook-product'
        used[base]=used.get(base,0)+1
        slug=f"excel-{base}" + (f"-{used[base]}" if used[base]>1 else '')
        brands=sorted(sec['brands']) or [clean(sheet).title()]
        tag=classify(sec['name']+' '+' '.join(sec['items']))
        specs={
          'Brand': ', '.join(brands), 'Product Type': sec['name'], 'Category': 'Hand Tools',
          'Application': 'Professional workshop, maintenance and industrial use',
          'Suitable For': 'Professional, industrial, workshop and maintenance use',
          'Available Options': ', '.join(dict.fromkeys(sec['items'])), 'Workbook Sheet': clean(sheet),
        }
        if sec['models']: specs['Available Models']=', '.join(sorted(sec['models']))
        if sec['sizes']: specs['Available Sizes']=', '.join(sorted(sec['sizes']))
        products.append({
          'id':f'excel-hand-tool-{len(products)+1}', 'name':sec['name'], 'slug':slug,
          'code':f'XL-{tag}-{len(products)+1:03d}', 'category':'hand-tools',
          'description':f"{sec['name']} from the supplied Hand Tools workbook. Select an available brand, model or option and contact Noor Agencies for current availability.",
          'image':'', 'brand':brands[0], 'specifications':specs,
        })

Path('data/excelHandTools.generated.json').write_text(json.dumps(products,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'products':len(products),'sheets':len(src),'groups':{t:sum(p['code'].startswith('XL-'+t) for p in products) for t in ['SPANNER','HAMMER','PLIER','SOCKET','SCREW','CLAMP','CUT','RIVET','MEASURE','SPRAY','LIFT','MASON','GARDEN','STORAGE','OTHER']}}))
