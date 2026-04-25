import React from 'react';
import { Category } from '../types/mood';

interface FilterBarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  showOnlyReported: boolean;
  onToggleReported: () => void;
}

const categories: Category[] = ['全部', '开心', '焦虑', '迷茫', '吐槽'];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  showOnlyReported,
  onToggleReported,
}) => {
  return (
    <div className="filter-bar">
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button
        className={`reported-filter ${showOnlyReported ? 'active' : ''}`}
        onClick={onToggleReported}
        title="只看已举报"
      >
        🚨
      </button>
    </div>
  );
};
