import { compareAsc, compareDesc, isPast, startOfDay } from 'date-fns';
import { SORT_OPTIONS, FILTER_OPTIONS, PRIORITY_LEVELS } from './constants';

/**
 * Parses a date string (YYYY-MM-DD) as a local date, not UTC
 * This fixes timezone issues where dates appear one day off
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date|null} Date object in local timezone, or null if invalid
 */
export const parseLocalDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return null;

  try {
    const [year, month, day] = dateString.split('-').map(Number);

    // Validate the parsed values
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }

    const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

/**
 * Validates todo input text
 * @param {string} text - The todo text to validate
 * @returns {{valid: boolean, error?: string}} Validation result
 */
export const validateTodoInput = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      valid: false,
      error: 'Todo text is required',
    };
  }

  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    return {
      valid: false,
      error: 'Todo text cannot be empty or whitespace only',
    };
  }

  if (trimmedText.length > 500) {
    return {
      valid: false,
      error: 'Todo text cannot exceed 500 characters',
    };
  }

  return { valid: true };
};

/**
 * Priority level order for sorting (high to low)
 */
const PRIORITY_ORDER = {
  [PRIORITY_LEVELS.HIGH]: 3,
  [PRIORITY_LEVELS.MEDIUM]: 2,
  [PRIORITY_LEVELS.LOW]: 1,
};

/**
 * Sorts todos based on the specified sort option
 * @param {Array} todos - Array of todo objects
 * @param {string} sortBy - Sort option from SORT_OPTIONS
 * @returns {Array} Sorted array of todos
 */
export const sortTodos = (todos, sortBy) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    return todos;
  }

  const sortedTodos = [...todos];

  switch (sortBy) {
    case SORT_OPTIONS.DATE_DESC:
      return sortedTodos.sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );

    case SORT_OPTIONS.DATE_ASC:
      return sortedTodos.sort((a, b) =>
        compareAsc(new Date(a.createdAt), new Date(b.createdAt))
      );

    case SORT_OPTIONS.PRIORITY_HIGH:
      return sortedTodos.sort((a, b) => {
        const priorityDiff =
          (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        // Secondary sort by creation date (newest first)
        return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
      });

    case SORT_OPTIONS.PRIORITY_LOW:
      return sortedTodos.sort((a, b) => {
        const priorityDiff =
          (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        // Secondary sort by creation date (newest first)
        return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
      });

    case SORT_OPTIONS.ALPHABETICAL:
      return sortedTodos.sort((a, b) =>
        a.text.toLowerCase().localeCompare(b.text.toLowerCase())
      );

    default:
      // Default to newest first
      return sortedTodos.sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );
  }
};

/**
 * Filters todos based on completion status and search query
 * @param {Array} todos - Array of todo objects
 * @param {string} filter - Filter option from FILTER_OPTIONS
 * @param {string} searchQuery - Search query string (case-insensitive)
 * @returns {Array} Filtered array of todos
 */
export const filterTodos = (todos, filter, searchQuery = '') => {
  if (!Array.isArray(todos)) {
    return [];
  }

  let filteredTodos = [...todos];

  // Filter by completion status
  switch (filter) {
    case FILTER_OPTIONS.ACTIVE:
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
      break;

    case FILTER_OPTIONS.COMPLETED:
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
      break;

    case FILTER_OPTIONS.ALL:
    default:
      // No status filtering
      break;
  }

  // Filter by search query
  if (searchQuery && typeof searchQuery === 'string') {
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.text.toLowerCase().includes(query)
      );
    }
  }

  return filteredTodos;
};

/**
 * Checks if a due date is overdue (past today)
 * @param {string|Date|null} dueDate - The due date to check
 * @returns {boolean} True if the date is in the past
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) {
    return false;
  }

  try {
    const date = typeof dueDate === 'string' ? parseLocalDate(dueDate) : new Date(dueDate);
    const today = startOfDay(new Date());
    const dueDateStart = startOfDay(date);

    return isPast(dueDateStart) && dueDateStart < today;
  } catch (error) {
    console.error('Error checking overdue status:', error);
    return false;
  }
};
