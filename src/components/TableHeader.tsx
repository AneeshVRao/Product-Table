import type { Product } from '../types/product';

interface TableHeaderProps {
  sortConfig: { key: keyof Product; direction: 'asc' | 'desc' } | null;
  requestSort: (key: keyof Product) => void;
}

export function TableHeader({ sortConfig, requestSort }: TableHeaderProps) {
  const renderSortIcon = (columnKey: keyof Product) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Thumb</th>
        <th>Title</th>
        <th>Brand</th>
        <th>Category</th>
        <th 
          className="sortable-header" 
          onClick={() => requestSort('price')}
          tabIndex={0}
          role="button"
        >
          Price {renderSortIcon('price')}
        </th>
        <th 
          className="sortable-header" 
          onClick={() => requestSort('rating')}
          tabIndex={0}
          role="button"
        >
          Rating {renderSortIcon('rating')}
        </th>
      </tr>
    </thead>
  );
}
