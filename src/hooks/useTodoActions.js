import { useMemo } from 'react';
import useTodoStore from '../store/useTodoStore';
import { filterTodos, sortTodos } from '../utils/todoHelpers';

/**
 * Custom hook that provides filtered and sorted todos with computed counts
 *
 * @returns {{
 *   todos: Array,
 *   allTodos: Array,
 *   activeCount: number,
 *   completedCount: number
 * }} Object containing processed todos and statistics
 *
 * @example
 * const { todos, activeCount, completedCount } = useTodoActions();
 * // todos are filtered by current filter and search query, then sorted
 */
const useTodoActions = () => {
  // Get state from the todo store
  const allTodos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const sortBy = useTodoStore((state) => state.sortBy);
  const searchQuery = useTodoStore((state) => state.searchQuery);

  // Compute filtered and sorted todos
  const filteredAndSortedTodos = useMemo(() => {
    // First, filter the todos based on status and search query
    const filtered = filterTodos(allTodos, filter, searchQuery);

    // Then, sort the filtered results
    const sorted = sortTodos(filtered, sortBy);

    return sorted;
  }, [allTodos, filter, sortBy, searchQuery]);

  // Compute active count (uncompleted todos)
  const activeCount = useMemo(() => {
    return allTodos.filter((todo) => !todo.completed).length;
  }, [allTodos]);

  // Compute completed count
  const completedCount = useMemo(() => {
    return allTodos.filter((todo) => todo.completed).length;
  }, [allTodos]);

  return {
    todos: filteredAndSortedTodos,
    allTodos,
    activeCount,
    completedCount,
  };
};

export default useTodoActions;
