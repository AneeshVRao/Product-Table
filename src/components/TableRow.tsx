import type { Product } from '../types/product';
import { EditableCell } from './EditableCell';

interface TableRowProps {
  product: Product;
  index: number;
}

function getRatingColor(rating: number): string {
  if (rating >= 4.5) return '#36d399';
  if (rating >= 3.5) return '#fbbd23';
  return '#ff6b6b';
}

export function TableRow({ product, index }: TableRowProps) {
  return (
    <tr className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
      <td className="cell-id">{index + 1}</td>
      <td className="cell-thumb">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumb"
          loading="lazy"
        />
      </td>
      <td className="cell-title">
        <EditableCell initialValue={product.title} />
      </td>
      <td className="cell-brand">{product.brand || '—'}</td>
      <td className="cell-category">
        <span className="badge">{product.category}</span>
      </td>
      <td className="cell-price">${product.price.toFixed(2)}</td>
      <td className="cell-rating">
        <span
          className="rating-pill"
          style={{ color: getRatingColor(product.rating) }}
        >
          ★ {product.rating.toFixed(1)}
        </span>
      </td>
    </tr>
  );
}
