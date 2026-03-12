import { useState, useEffect, useCallback } from 'react';
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

  const hasMore = skip < total;

  const fetchProducts = useCallback(async (skipValue: number, signal: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}?limit=${LIMIT}&skip=${skipValue}`, { signal });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data: ProductsResponse = await res.json();

      // Don't update state if this request was aborted between fetch and json parse
      if (signal.aborted) return;

      setProducts(prev => [...prev, ...data.products]);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
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
