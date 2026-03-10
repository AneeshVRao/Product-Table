import { useState, useEffect, useCallback, useRef } from 'react';
import type { Product, ProductsResponse } from '../types/product';

const LIMIT = 10;
const BASE_URL = 'https://dummyjson.com/products';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(10);
  const [total, setTotal] = useState(Infinity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tracks which skip values have already been fetched to prevent double-fetches
  // (React StrictMode double-invokes effects in development)
  const fetchedSkips = useRef<Set<number>>(new Set());

  const hasMore = skip < total;

  const fetchProducts = useCallback(async (skipValue: number, signal: AbortSignal) => {
    // Guard: skip this fetch if we already have data for this offset
    if (fetchedSkips.current.has(skipValue)) return;
    fetchedSkips.current.add(skipValue);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}?limit=${LIMIT}&skip=${skipValue}`, { signal });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data: ProductsResponse = await res.json();

      setProducts(prev => [...prev, ...data.products]);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Cleanup: allow retry if the effect was aborted by StrictMode
        fetchedSkips.current.delete(skipValue);
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(skip, controller.signal);

    return () => {
      controller.abort();
    };
  }, [skip, fetchProducts]);

  const loadMore = useCallback(() => {
    setSkip(prev => {
      const next = prev + LIMIT;
      return next;
    });
  }, []);

  return { products, loading, error, hasMore, loadMore };
}
