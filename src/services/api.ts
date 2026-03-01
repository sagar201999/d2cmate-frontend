const API_BASE_URL = "https://d2cmate-backend.onrender.com/api";

export interface SearchResult {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  brand?: string;
  hsn?: string;
  desc?: string;
  igst?: number;
  cat?: string;
  [key: string]: unknown;
}

export async function searchProducts(
  query?: string
): Promise<SearchResult[]> {
  const url = query
    ? `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/search`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
