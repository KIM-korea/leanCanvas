import React from 'react';
import CanvasItem from './CanvasItem';

const CanvasList = ({ filteredItems, isGridView, onDeleteItem }) => {
  if (filteredItems.length === 0)
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">목록이 없습니다</p>
      </div>
    );

  if (filteredItems.length === 0)
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">검색 결과가 없습니다</p>
      </div>
    );

  return (
    <div
      className={`grid gap-6 ${!isGridView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
    >
      {filteredItems.map(item => (
        <CanvasItem
          key={item.id}
          id={item.id}
          title={item.title}
          lastModified={item.lastModified}
          category={item.category}
          onDelete={e => {
            e.preventDefault();
            onDeleteItem(item.id);
          }}
        />
      ))}
    </div>
  );
};

export default CanvasList;
