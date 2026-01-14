/**
 * Priority level constants for todo items
 */
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

/**
 * Filter options for displaying todos
 */
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

/**
 * Sort options for organizing todos
 */
export const SORT_OPTIONS = {
  DATE_DESC: 'dateDesc',
  DATE_ASC: 'dateAsc',
  PRIORITY_HIGH: 'priorityHigh',
  PRIORITY_LOW: 'priorityLow',
  ALPHABETICAL: 'alphabetical',
};

/**
 * Tailwind CSS classes for priority level badges
 */
export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'text-blue-600 bg-blue-50',
  [PRIORITY_LEVELS.MEDIUM]: 'text-yellow-600 bg-yellow-50',
  [PRIORITY_LEVELS.HIGH]: 'text-red-600 bg-red-50',
};
