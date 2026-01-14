import { useEffect, useRef } from 'react';
import useTodoActions from './hooks/useTodoActions';
import TodoForm from './components/TodoForm';
import TodoSearch from './components/TodoSearch';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';

function App() {
  const { activeCount } = useTodoActions();
  const searchInputRef = useRef(null);
  const todoInputRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+/ or Cmd+/ to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl+N or Cmd+N to focus new todo input
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const todoInput = document.getElementById('todo-input');
        if (todoInput) {
          todoInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 py-8 px-4">
      {/* Skip link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-emerald-600 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-4xl mx-auto">
        {/* Main container card */}
        <div id="main-content" className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-6">
          {/* Header */}
          <header className="text-center border-b-2 border-gray-200 pb-6">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Chris' To-Do List
            </h1>
            <p className="text-lg text-gray-600">
              {activeCount === 0 ? (
                'No active tasks'
              ) : (
                <>
                  {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
                </>
              )}
            </p>
            <div className="mt-2 text-sm text-gray-500">
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">
                Ctrl+N
              </kbd>{' '}
              to add todo,{' '}
              <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">
                Ctrl+/
              </kbd>{' '}
              to search
            </div>
          </header>

          {/* Todo form */}
          <section aria-label="Add new todo">
            <TodoForm />
          </section>

          {/* Search and filters */}
          <section
            className="flex flex-col sm:flex-row gap-4"
            aria-label="Search and filter todos"
          >
            <TodoSearch />
            <TodoFilters />
          </section>

          {/* Todo list */}
          <section aria-label="Todos">
            <TodoList />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-white text-sm">
          <p>Built with React, Tailwind CSS, Zustand, and Framer Motion</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
