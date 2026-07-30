import { ImageResponse } from "next/og";

export const alt = "Noor Agencies industrial hardware supplier in Coimbatore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "76px", color: "white", background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 55%, #0f172a 100%)" }}>
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#fecaca", fontWeight: 700 }}>Noor Agencies · Coimbatore</div>
      <div style={{ display: "flex", marginTop: 28, maxWidth: 980, fontSize: 70, lineHeight: 1.08, fontWeight: 900 }}>Industrial Hardware, Tools &amp; Supplies</div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#e2e8f0" }}>Product guidance · Bulk enquiries · Quotations</div>
    </div>,
    size,
  );
}
