import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useTodoStore from '../store/useTodoStore';
import { validateTodoInput } from '../utils/todoHelpers';
import { PRIORITY_LEVELS } from '../utils/constants';

function TodoForm() {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);
  const [error, setError] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateTodoInput(text);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    addTodo(text, dueDate || null, priority);
    setText('');
    setDueDate('');
    setPriority(PRIORITY_LEVELS.MEDIUM);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          role="alert"
        >
          {error}
        </motion.div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError('');
          }}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors text-lg"
          aria-label="New todo input"
          maxLength={500}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text.trim()}
          aria-label="Add todo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors bg-white"
          >
            <option value={PRIORITY_LEVELS.LOW}>Low</option>
            <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
            <option value={PRIORITY_LEVELS.HIGH}>High</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
