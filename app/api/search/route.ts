import type { NextRequest } from "next/server";
import { getSearchCatalog } from "@/lib/searchCatalog";
import { searchProducts } from "@/lib/productSearch";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (query.length < 2) return Response.json([]);

  const products = await getSearchCatalog();
  return Response.json(searchProducts(products, query).slice(0, 6));
}
