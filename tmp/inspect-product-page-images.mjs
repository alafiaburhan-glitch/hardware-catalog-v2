const pages = [
  ["corrogard-wax", "https://www.moglix.com/aerol-corrogard-350g-grade-310-anti-corrosion-wax-spray-for-moulds-dies-metal-protection-fm-310-pack-of-24/mp/msng9vn836pdkp"],
  ["corrogard", "https://www.aerol.in/maintenance-products-corrosion-preventives.html"],
  ["moly", "https://www.aerol.in/maintenance-products-lubricants.html"],
  ["zinc", "https://www.aerol.in/maintenance-products-coatings.html"],
  ["wesaf", "https://www.wesaf.co.in/cleaning-chemicals.html"],
];
for (const [key, url] of pages) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  const html = await response.text();
  const urls = [...html.matchAll(/https?:\\?\/\\?\/[^"'<> ]+?(?:\.jpe?g|\.png|\.webp)(?:\?[^"'<> ]*)?/gi)]
    .map((match) => match[0].replaceAll("\\/", "/"))
    .filter((value, index, array) => array.indexOf(value) === index);
  console.log(`\n${key}`);
  const terms = key.startsWith("corrogard") ? ["corrogard", "wax", "moglix"] : key === "moly" ? ["moly"] : key === "zinc" ? ["zinc"] : ["silicone", "release", "wesaf"];
  console.log(urls.filter((url) => terms.some((term) => url.toLowerCase().includes(term))).slice(0, 30).join("\n"));
}
