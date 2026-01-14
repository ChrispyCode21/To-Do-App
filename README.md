# Chris' To-Do App v2.0

A modern, accessible React to-do application with priorities, due dates, search, and drag-and-drop reordering.

🔗 **Live Demo**: [to-do-app-pearl.vercel.app](https://to-do-app-pearl.vercel.app/)

## Quick Start

```bash
npm install
npm start
```

App runs at **http://localhost:3000**

## Features

✨ **Task Management**
- Add todos with text, priority (Low/Medium/High), and due dates
- Edit existing todos via modal
- Mark complete with animated checkbox
- Delete individual tasks
- Clear all completed tasks at once

🔍 **Organization**
- **Search**: Debounced search (300ms) filters tasks instantly
- **Filter**: View All, Active, or Completed tasks
- **Sort**: By Newest, Oldest, Priority, or Alphabetically
- **Drag-and-Drop**: Reorder tasks with mouse or keyboard (Space + arrows)

📅 **Smart Due Dates**
- Shows "Today", "Tomorrow", or formatted dates
- Overdue tasks highlighted in red
- Automatic date validation

🎨 **Modern UI**
- Clean emerald-cyan-blue gradient design
- Color-coded priority badges (blue/yellow/red)
- Smooth Framer Motion animations
- Glass-morphism effects on cards
- Fully responsive (mobile, tablet, desktop)

⚡ **Performance**
- ~200KB gzipped bundle
- 60fps animations
- Debounced search for efficiency
- Auto-saves to localStorage

♿ **Accessibility**
- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Screen reader support
- Keyboard shortcuts: `Ctrl+N` (new todo), `Ctrl+/` (search)

## Technology Stack

- **React 18.3.1** - Modern hooks, createRoot API
- **Zustand 4.5.0** - Lightweight state management (1.2KB)
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Framer Motion 11.0.3** - Smooth animations
- **@dnd-kit 6.1.0/8.0.0** - Accessible drag-and-drop
- **date-fns 3.0.6** - Date formatting and validation
- **nanoid 5.0.4** - Secure ID generation

## Architecture Overview

### Project Structure

```
src/
├── components/          # UI components (7 files)
│   ├── TodoForm.jsx    # Add todos with validation
│   ├── TodoSearch.jsx  # Debounced search input
│   ├── TodoFilters.jsx # Filter/sort controls
│   ├── TodoList.jsx    # List with drag-and-drop
│   ├── TodoItem.jsx    # Individual todo card
│   ├── TodoEditModal.jsx # Edit modal
│   ├── EmptyState.jsx  # Contextual empty messages
│   └── ErrorBoundary.jsx # Error recovery
├── store/
│   └── useTodoStore.js # Zustand store + localStorage
├── hooks/
│   ├── useTodoActions.js # Filtered/sorted todos
│   └── useDebounce.js    # Debounce utility
├── utils/
│   ├── todoHelpers.js    # Validation, sorting, filtering
│   └── constants.js      # Priority levels, filter options
└── styles/
    └── index.css         # Tailwind + custom styles
```

### State Management

**Zustand Store** (`useTodoStore`) manages global state with automatic localStorage persistence:

```javascript
// State
{
  todos: [],          // Array of todo objects
  filter: 'all',      // 'all' | 'active' | 'completed'
  sortBy: 'dateDesc', // Sort option
  searchQuery: ''     // Search text
}

// Todo Object
{
  id: nanoid(),           // Unique secure ID
  text: string,           // 1-500 characters
  completed: boolean,
  createdAt: ISO string,
  dueDate: ISO string | null,
  priority: 'low' | 'medium' | 'high'
}
```

**Actions**: `addTodo`, `updateTodo`, `deleteTodo`, `toggleTodo`, `reorderTodos`, `setFilter`, `setSortBy`, `setSearchQuery`, `clearCompleted`

**No prop drilling** - All components access store directly via hooks.

### Key Patterns

**1. Using the Store**
```javascript
import useTodoStore from './store/useTodoStore';

// Subscribe to specific state
const todos = useTodoStore(state => state.todos);
const addTodo = useTodoStore(state => state.addTodo);

// Add a todo
addTodo('Buy groceries', '2026-01-15', 'high');
```

**2. Filtered/Sorted Todos**
```javascript
import useTodoActions from './hooks/useTodoActions';

const { todos, activeCount, completedCount } = useTodoActions();
// Returns pre-filtered, pre-sorted todos with stats
```

**3. Debounced Search**
```javascript
import useDebounce from './hooks/useDebounce';

const [input, setInput] = useState('');
const debouncedValue = useDebounce(input, 300);
// Only updates after 300ms of no typing
```

**4. Validation**
```javascript
import { validateTodoInput } from './utils/todoHelpers';

const result = validateTodoInput(text);
if (!result.valid) {
  console.error(result.error); // "Todo text cannot be empty"
}
```

## Development Commands

```bash
npm start    # Start dev server (localhost:3000)
npm test     # Run tests
npm build    # Create production build
npm eject    # Eject from Create React App (one-way!)
```

## Design System

### Colors
- **Primary**: Emerald (emerald-500: #10b981)
- **Gradient**: Emerald → Cyan → Blue
- **Priority Low**: Blue (blue-600 text, blue-50 bg)
- **Priority Medium**: Yellow (yellow-600 text, yellow-50 bg)
- **Priority High**: Red (red-600 text, red-50 bg)

### Typography
- **Page Title**: text-5xl (48px), font-bold
- **Todo Text**: text-lg (18px)
- **Badges**: text-xs (12px), font-medium

### Spacing
- **Component Gap**: space-y-6 (24px vertical)
- **Flex Gap**: gap-4 (16px)
- **Card Padding**: p-6 (24px)

### Animations
- **Duration**: 200-300ms
- **Easing**: ease-out
- **Types**: Fade + slide, scale, list stagger

## Accessibility Features

- ✅ All interactive elements have focus states
- ✅ Icon-only buttons have `aria-label`
- ✅ Form inputs have proper labels
- ✅ Checkbox buttons use `aria-pressed`
- ✅ Error messages have `role="alert"`
- ✅ Semantic HTML throughout
- ✅ Keyboard navigation for drag-and-drop
- ✅ Screen reader announcements

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Common Tasks

### Add Error Handling
All localStorage operations include try-catch blocks. The ErrorBoundary component catches React errors and provides graceful recovery.

### Migrate Old Data
The store automatically migrates old localStorage data:
- Converts `Math.random()` IDs to `nanoid()`
- Adds missing fields (priority, createdAt, dueDate)
- Handles corrupted data by clearing storage

### Performance Optimization
- Subscribe to specific state slices, not entire store
- Use `useTodoActions` for computed values (already memoized)
- Debounce rapid updates (search, auto-save)
- Wrap expensive components in `React.memo`

## Troubleshooting

**App won't load**: Check browser console for errors. Clear localStorage: `localStorage.clear()`

**Styles not working**: Restart dev server. Check Tailwind config `content` paths.

**State not persisting**: Check localStorage quota. The store logs errors to console.

**Dates showing wrong day**: Fixed in v2.0 - dates now parse as local timezone.

## Roadmap

### Completed ✅
- localStorage persistence
- Priorities and due dates
- Search and filtering
- Drag-and-drop reordering
- Edit functionality
- Modern UI with animations
- Full accessibility

### Planned 🚀
- Dark mode toggle
- Cloud storage sync
- User authentication
- Categories/tags
- Export/import (JSON, CSV)
- Recurring tasks
- Collaboration features
- Mobile app (React Native)

## Contributing

This is a personal learning project, but suggestions are welcome! The codebase follows modern React patterns and is well-documented.

## License

Personal project - feel free to fork and adapt for your own use.

---

Built with ❤️ by Chris | React 18 + Zustand + Tailwind CSS
