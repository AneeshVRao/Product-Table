import { useRef, useEffect, useState, useMemo } from 'react';
import type { Product } from '../types/product';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export function ProductTable({
  products,
  loading,
  error,
  hasMore,
  loadMore,
}: ProductTableProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' } | null>(null);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  const requestSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Scroll to Top Listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div className="table-container">
      {error && (
        <div className="error-banner" role="alert" aria-live="assertive">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="table-scroll">
        <table className="product-table" aria-label="Products list">
          <TableHeader sortConfig={sortConfig} requestSort={requestSort} />
          <tbody>
            {sortedProducts.map((product, index) => (
              <TableRow key={product.id} product={product} index={index} />
            ))}
            {loading && products.length === 0 && (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  <td colSpan={7} style={{ padding: '0.875rem 1rem' }}>
                    <div className="skeleton-pulse" />
                  </td>
                </tr>
              ))
            )}
            {!loading && products.length === 0 && !error && (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No Products Found</h3>
                    <p>It seems the inventory is currently empty.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div ref={sentinelRef} className="sentinel" aria-hidden="true" />

      {loading && products.length > 0 && (
        <div className="loading-container" role="status" aria-busy="true" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <span className="loading-text">Loading more…</span>
        </div>
      )}

      {!hasMore && !loading && products.length > 0 && (
        <div className="end-message" role="status" aria-live="polite">
          <span className="end-icon" aria-hidden="true">✓</span>
          All {products.length} products loaded
        </div>
      )}

      {showScrollTop && (
        <button 
          className="fab-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑ TOP
        </button>
      )}
    </div>
  );
}
