export const DYE_PENETRANT_KIT_SLUG = "aerol-dye-penetrant";
export const WD_40_SLUG = "wd-40";

const DYE_PENETRANT_COMPONENT_SLUGS = new Set([
  DYE_PENETRANT_KIT_SLUG,
  "aerol-dye-penetrant-cleaner",
  "aerol-dye-penetrant-developer",
]);

const WD_40_PRODUCT_SLUGS = new Set([
  WD_40_SLUG,
  "wd-40-specialist-contact-cleaner",
]);

export function canonicalProductSlug(slug: string): string {
  if (DYE_PENETRANT_COMPONENT_SLUGS.has(slug)) return DYE_PENETRANT_KIT_SLUG;
  if (WD_40_PRODUCT_SLUGS.has(slug)) return WD_40_SLUG;
  return slug;
}

export function consolidateProductFamilies<
  T extends {
    slug?: string | null;
    name?: string | null;
    code?: string | null;
    description?: string | null;
    specifications?: Record<string, string> | null;
  },
>(products: T[]): T[] {
  return products.flatMap((product) => {
    if (product.slug && WD_40_PRODUCT_SLUGS.has(product.slug)) {
      if (product.slug !== WD_40_SLUG) return [];

      return [{
        ...product,
        name: "WD-40",
        description:
          "WD-40 maintenance products for lubricating, protecting, loosening, displacing moisture and cleaning compatible electrical contacts. Available in multiple pack sizes, including WD-40 Specialist Contact Cleaner.",
        specifications: {
          ...(product.specifications ?? {}),
          "Product Options": "Multi-Use Product and Specialist Contact Cleaner",
        },
      } as T];
    }

    if (product.slug === "wesaf-silicone-release-spray") {
      return [{
        ...product,
        name: "Silicon Release Spray",
      } as T];
    }

    if (!product.slug || !DYE_PENETRANT_COMPONENT_SLUGS.has(product.slug)) {
      return [product];
    }

    if (product.slug !== DYE_PENETRANT_KIT_SLUG) return [];

    return [{
      ...product,
      name: "Aerol Dye Penetrant Test Kit",
      code: "AER-DPT-KIT",
      description:
        "A complete three-part visible dye penetrant inspection system containing cleaner, red penetrant and developer sprays for detecting surface-breaking defects in non-porous components. Available size: 280 ml per can.",
      specifications: {
        ...(product.specifications ?? {}),
        "Kit Contents": "Cleaner, red penetrant and developer sprays",
        "Available Size": "3 x 280 ml",
      },
    } as T];
  });
}
