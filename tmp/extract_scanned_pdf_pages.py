from pathlib import Path

from pypdf import PdfReader


SOURCE = Path(r"C:\Users\NOOR AGENCIES\OneDrive\Desktop\data\pneumaticbrassfittings")
OUTPUT = Path(__file__).parent / "pneumatic-scans"


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for relative in (Path("One touch Akari.pdf"), Path("SS FITTINGS/LINTAS -35+18.pdf")):
        reader = PdfReader(SOURCE / relative)
        stem = relative.stem.lower().replace(" ", "-")
        for page_number, page in enumerate(reader.pages, 1):
            images = list(page.images)
            for image_number, embedded in enumerate(images, 1):
                suffix = Path(embedded.name).suffix or ".png"
                target = OUTPUT / f"{stem}-{page_number:02d}-{image_number:02d}{suffix}"
                target.write_bytes(embedded.data)
                print(target)


if __name__ == "__main__":
    main()
