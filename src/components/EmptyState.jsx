import React from 'react';
import { motion } from 'framer-motion';

function EmptyState({ filter }) {
  const messages = {
    all: "No todos yet. Add one to get started!",
    active: "No active todos. Great job!",
    completed: "No completed todos yet."
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <svg
        className="w-24 h-24 mx-auto text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="text-gray-500 text-lg">{messages[filter] || messages.all}</p>
    </motion.div>
  );
}

export default EmptyState;
