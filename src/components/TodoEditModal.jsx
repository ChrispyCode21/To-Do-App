import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTodoStore from '../store/useTodoStore';
import { validateTodoInput } from '../utils/todoHelpers';
import { PRIORITY_LEVELS } from '../utils/constants';

function TodoEditModal({ todo, onClose }) {
  const [text, setText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate || '');
  const [priority, setPriority] = useState(todo.priority);
  const [error, setError] = useState('');
  const updateTodo = useTodoStore((state) => state.updateTodo);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateTodoInput(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    updateTodo(todo.id, {
      text: text.trim(),
      dueDate: dueDate || null,
      priority,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-800">
            Edit Todo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="edit-text" className="block text-sm font-medium text-gray-700 mb-1">
                Todo Text
              </label>
              <textarea
                id="edit-text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                rows={3}
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">
                {text.length}/500 characters
              </p>
            </div>

            <div>
              <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                id="edit-dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white"
              >
                <option value={PRIORITY_LEVELS.LOW}>Low</option>
                <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                <option value={PRIORITY_LEVELS.HIGH}>High</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TodoEditModal;
