import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format, isToday, isTomorrow } from 'date-fns';
import useTodoStore from '../store/useTodoStore';
import { PRIORITY_COLORS } from '../utils/constants';
import { isOverdue, parseLocalDate } from '../utils/todoHelpers';
import TodoEditModal from './TodoEditModal';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = parseLocalDate(dueDate);
    if (!date) return null;
    try {
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const dueDateClass = todo.dueDate && isOverdue(todo.dueDate) && !todo.completed
    ? 'text-red-600 font-semibold'
    : 'text-gray-600';

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className={`group bg-white border-2 rounded-xl p-4 hover:shadow-lg transition-all ${
          todo.completed ? 'border-gray-200 opacity-75' : 'border-gray-300'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Drag to reorder"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
            </svg>
          </button>

          {/* Checkbox */}
          <button
            onClick={() => toggleTodo(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-1 transition-all ${
              todo.completed
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300 hover:border-emerald-400'
            }`}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-pressed={todo.completed}
          >
            {todo.completed && (
              <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {/* Priority Badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[todo.priority]}`}>
                {todo.priority.toUpperCase()}
              </span>

              {/* Due Date */}
              {todo.dueDate && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${dueDateClass} bg-gray-100`}>
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDueDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit todo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete todo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditing && (
        <TodoEditModal todo={todo} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}

export default React.memo(TodoItem);
