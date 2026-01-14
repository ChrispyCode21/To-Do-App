import React from 'react';
import useTodoStore from '../store/useTodoStore';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../utils/constants';

function TodoFilters() {
  const filter = useTodoStore((state) => state.filter);
  const sortBy = useTodoStore((state) => state.sortBy);
  const setFilter = useTodoStore((state) => state.setFilter);
  const setSortBy = useTodoStore((state) => state.setSortBy);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const todos = useTodoStore((state) => state.todos);

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="flex gap-4 flex-wrap items-center">
      <div>
        <label htmlFor="filter" className="sr-only">Filter todos</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white"
          aria-label="Filter todos by status"
        >
          <option value={FILTER_OPTIONS.ALL}>All</option>
          <option value={FILTER_OPTIONS.ACTIVE}>Active</option>
          <option value={FILTER_OPTIONS.COMPLETED}>Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="sr-only">Sort todos</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white"
          aria-label="Sort todos"
        >
          <option value={SORT_OPTIONS.DATE_DESC}>Newest First</option>
          <option value={SORT_OPTIONS.DATE_ASC}>Oldest First</option>
          <option value={SORT_OPTIONS.PRIORITY_HIGH}>High Priority</option>
          <option value={SORT_OPTIONS.ALPHABETICAL}>A-Z</option>
        </select>
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          aria-label="Clear completed todos"
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
