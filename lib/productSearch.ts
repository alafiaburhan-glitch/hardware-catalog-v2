export type SearchableProduct = {
  name: string;
  code?: string | null;
  category?: string | null;
  brand?: string | null;
  description?: string | null;
  specifications?: Record<string, string> | null;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function editDistance(first: string, second: string) {
  const previous = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    let diagonal = previous[0];
    previous[0] = firstIndex;

    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const above = previous[secondIndex];
      previous[secondIndex] = Math.min(
        previous[secondIndex] + 1,
        previous[secondIndex - 1] + 1,
        diagonal + (first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }

  return previous[second.length];
}

function allowedTypos(length: number) {
  if (length < 4) return 0;
  if (length < 6) return 1;
  if (length < 9) return 2;
  return 3;
}

function scoreProduct(product: SearchableProduct, rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return 0;

  const name = normalize(product.name);
  const code = normalize(product.code ?? "");
  const category = normalize(product.category ?? "");
  const brand = normalize(product.brand ?? "");
  const description = normalize(product.description ?? "");
  const specifications = normalize(Object.values(product.specifications ?? {}).join(" "));
  const searchable = `${name} ${code} ${category} ${brand} ${description} ${specifications}`.trim();

  if (name === query || code === query) return 0;
  if (name.startsWith(query) || code.startsWith(query)) return 10;
  if (searchable.includes(query)) return 20;

  const words = searchable.split(" ").filter(Boolean);
  const queryWords = query.split(" ").filter(Boolean);
  let score = 30;

  for (const queryWord of queryWords) {
    let best = Number.POSITIVE_INFINITY;

    for (const word of words) {
      if (word.startsWith(queryWord)) {
        best = Math.min(best, 0);
        continue;
      }

      const distance = editDistance(queryWord, word);
      if (distance <= allowedTypos(queryWord.length)) {
        best = Math.min(best, distance * 10 + Math.abs(queryWord.length - word.length));
      }
    }

    if (!Number.isFinite(best)) return null;
    score += best;
  }

  return score;
}

export function searchProducts<T extends SearchableProduct>(products: T[], query: string): T[] {
  if (!normalize(query)) return products;

  return products
    .map((product, index) => ({ product, index, score: scoreProduct(product, query) }))
    .filter((result): result is typeof result & { score: number } => result.score !== null)
    .sort((first, second) => first.score - second.score || first.index - second.index)
    .map(({ product }) => product);
}
