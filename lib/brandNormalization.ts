const BRAND_ALIASES = new Map<string, string>([
  ["kisaan kraft", "Kisan Kraft"],
  ["kisan kraft", "Kisan Kraft"],
  ["maf", "MAF Pro"],
  ["maf pro", "MAF Pro"],
  ["dewalt", "DeWalt"],
  ["godrej", "Godrej"],
  ["status", "Status"],
  ["tatnad", "TAT"],
]);

const NON_BRAND_LABELS = new Set([
  "angle grinders",
  "chisels",
  "garden tools",
  "masonary",
  "masonry",
  "painter",
  "water guns and fittings",
]);

export function normalizeBrandName(value: string): string | null {
  const cleaned = value.trim().replace(/\s+/g, " ");
  if (!cleaned || cleaned.toLowerCase() === "generic") return null;

  const key = cleaned.toLowerCase();
  if (NON_BRAND_LABELS.has(key)) return null;
  return BRAND_ALIASES.get(key) ?? cleaned;
}

export function productBrandNames(value?: string | null): string[] {
  return Array.from(
    new Set(
      (value ?? "")
        .split(",")
        .map(normalizeBrandName)
        .filter((brand): brand is string => Boolean(brand)),
    ),
  );
}
