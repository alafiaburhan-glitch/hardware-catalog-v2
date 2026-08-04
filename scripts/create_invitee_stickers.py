from pathlib import Path

import openpyxl
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


SOURCE = Path(r"C:\Users\NOOR AGENCIES\Downloads\Chennai.xlsx")
OUTPUT = Path("output/pdf/chennai_invitee_stickers.pdf")

MM = 72 / 25.4
PAGE_W, PAGE_H = A4
COLS = 2
ROWS = 10
GAP_X = 5 * MM
GAP_Y = 3 * MM
# Exact finished sticker dimensions requested by the client.
LABEL_W = 3 * 72
LABEL_H = 1 * 72
MARGIN_X = (PAGE_W - COLS * LABEL_W - (COLS - 1) * GAP_X) / 2
MARGIN_Y = (PAGE_H - ROWS * LABEL_H - (ROWS - 1) * GAP_Y) / 2
GOLD = HexColor("#B08D24")
ROSE_RED = HexColor("#A61B2B")


def read_names():
    workbook = openpyxl.load_workbook(SOURCE, data_only=True, read_only=True)
    names = []
    for sheet in workbook.worksheets:
        for row in sheet.iter_rows(values_only=True):
            for value in row:
                if value is not None and str(value).strip():
                    names.append(" ".join(str(value).split()))
    return names


def fit_font_size(text, font_name, max_width, preferred=14, minimum=8.5):
    size = preferred
    while size > minimum and stringWidth(text, font_name, size) > max_width:
        size -= 0.25
    return size


def draw_rose(pdf, cx, cy):
    """A restrained line-art rose medallion placed directly on the border."""
    pdf.saveState()
    pdf.setStrokeColor(ROSE_RED)
    pdf.setFillColor("#FFFFFF")
    pdf.circle(cx, cy, 3.8 * MM, stroke=0, fill=1)
    pdf.setLineWidth(0.42)

    # Five overlapping petals and a compact curled centre.
    petal_distance = 1.25 * MM
    for angle in (90, 18, -54, -126, 162):
        pdf.saveState()
        pdf.translate(cx, cy)
        pdf.rotate(angle)
        pdf.ellipse(
            petal_distance - 1.35 * MM,
            -1.05 * MM,
            petal_distance + 1.75 * MM,
            1.05 * MM,
            stroke=1,
            fill=0,
        )
        pdf.restoreState()
    pdf.circle(cx, cy, 0.75 * MM, stroke=1, fill=0)
    pdf.arc(cx - 1.45 * MM, cy - 1.35 * MM, cx + 1.45 * MM, cy + 1.35 * MM, 18, 235)
    pdf.restoreState()


def draw_label(pdf, x, y, name):
    # Fine rounded outline: decorative on plain paper and a cutting guide on sticker stock.
    inset = 1.5 * MM
    pdf.setStrokeColor(GOLD)
    pdf.setLineWidth(0.45)
    pdf.roundRect(
        x + inset,
        y + inset,
        LABEL_W - 2 * inset,
        LABEL_H - 2 * inset,
        2 * MM,
        stroke=1,
        fill=0,
    )

    # A single rose motif interrupts the top border like a small gold medallion.
    draw_rose(pdf, x + LABEL_W / 2, y + LABEL_H - inset)

    font_name = "Times-Bold"
    max_text_width = LABEL_W - 15 * MM
    font_size = fit_font_size(name, font_name, max_text_width, preferred=13.5)
    pdf.setFillColor(GOLD)
    pdf.setFont(font_name, font_size)
    baseline = y + LABEL_H / 2 - font_size * 0.34
    pdf.drawCentredString(x + LABEL_W / 2, baseline, name)


def build_pdf(names):
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("Chennai Invitee Name Stickers")
    pdf.setAuthor("NOOR AGENCIES")

    per_page = COLS * ROWS
    for index, name in enumerate(names):
        position = index % per_page
        if position == 0 and index:
            pdf.showPage()
        row, col = divmod(position, COLS)
        x = MARGIN_X + col * (LABEL_W + GAP_X)
        y = PAGE_H - MARGIN_Y - (row + 1) * LABEL_H - row * GAP_Y
        draw_label(pdf, x, y, name)

    pdf.save()


if __name__ == "__main__":
    invitees = read_names()
    if not invitees:
        raise RuntimeError("No invitee names were found in the workbook.")
    build_pdf(invitees)
    print(f"Created {OUTPUT} with {len(invitees)} stickers.")
    print(f"Sticker size: {LABEL_W / MM:.2f} mm x {LABEL_H / MM:.2f} mm")
