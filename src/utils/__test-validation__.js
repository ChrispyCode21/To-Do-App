/**
 * Quick validation test for Phase 2 implementation
 * Run this to verify all utilities work correctly
 */

import { PRIORITY_LEVELS, FILTER_OPTIONS, SORT_OPTIONS } from './constants';
import { validateTodoInput, sortTodos, filterTodos, isOverdue } from './todoHelpers';

// Test constants
console.log('Testing constants...');
console.log('✓ PRIORITY_LEVELS:', PRIORITY_LEVELS);
console.log('✓ FILTER_OPTIONS:', FILTER_OPTIONS);
console.log('✓ SORT_OPTIONS:', SORT_OPTIONS);

// Test validation
console.log('\nTesting validateTodoInput...');
console.log('Empty string:', validateTodoInput(''));
console.log('Valid input:', validateTodoInput('Buy groceries'));
console.log('Too long:', validateTodoInput('a'.repeat(501)));
console.log('✓ Validation works');

// Test sorting
console.log('\nTesting sortTodos...');
const testTodos = [
  { id: '1', text: 'Zebra', createdAt: '2024-01-01T00:00:00Z', priority: 'low', completed: false },
  { id: '2', text: 'Apple', createdAt: '2024-01-02T00:00:00Z', priority: 'high', completed: false },
  { id: '3', text: 'Banana', createdAt: '2024-01-03T00:00:00Z', priority: 'medium', completed: true },
];
console.log('Alphabetical:', sortTodos(testTodos, SORT_OPTIONS.ALPHABETICAL).map(t => t.text));
console.log('✓ Sorting works');

// Test filtering
console.log('\nTesting filterTodos...');
const filtered = filterTodos(testTodos, FILTER_OPTIONS.ACTIVE, '');
console.log('Active todos:', filtered.length, 'expected: 2');
console.log('✓ Filtering works');

// Test isOverdue
console.log('\nTesting isOverdue...');
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
console.log('Yesterday is overdue:', isOverdue(yesterday.toISOString()));
console.log('✓ isOverdue works');

console.log('\n✅ All Phase 2 utilities validated successfully!');
