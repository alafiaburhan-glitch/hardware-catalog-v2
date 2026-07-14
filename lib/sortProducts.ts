type NamedProduct = {
  name: string;
};

const productNameCollator = new Intl.Collator("en", {
  sensitivity: "base",
  numeric: true,
});

export function sortProductsAlphabetically<T extends NamedProduct>(products: T[]): T[] {
  return [...products].sort((first, second) =>
    productNameCollator.compare(first.name, second.name),
  );
}
