import products from "@/data/products";

export function getProducts() {

  return products;
}

export function getStoredProducts() {

  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(
    localStorage.getItem("products") || "[]"
  );
}