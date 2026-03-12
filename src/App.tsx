import './App.css';
import { useProducts } from './hooks/useProducts';
import { ProductTable } from './components/ProductTable';

function App() {
  const { products, loading, error, hasMore, loadMore } = useProducts();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon">⚡</div>
            <div>
              <h1 className="header-title">Product Table</h1>
              <p className="header-subtitle">Browse and edit live product data</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="meta-chip">dummyjson.com API</span>
            <span className="meta-chip accent">
              {products.length} loaded
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="hint-bar">
          <span className="hint-icon">💡</span>
          <span><strong>Tip:</strong> Click the ✏️ icon on any title to edit it inline. Scroll down to load more products automatically.</span>
        </div>

        <ProductTable
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </main>
    </div>
  );
}

export default App;
