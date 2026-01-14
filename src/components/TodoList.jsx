import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import useTodoActions from '../hooks/useTodoActions';
import useTodoStore from '../store/useTodoStore';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

function TodoList() {
  const { todos } = useTodoActions();
  const filter = useTodoStore((state) => state.filter);
  const reorderTodos = useTodoStore((state) => state.reorderTodos);
  const allTodos = useTodoStore((state) => state.todos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = allTodos.findIndex((todo) => todo.id === active.id);
      const newIndex = allTodos.findIndex((todo) => todo.id === over.id);

      const newOrder = [...allTodos];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);

      reorderTodos(newOrder);
    }
  };

  if (todos.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3" role="list" aria-label="Todo list">
          <AnimatePresence>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
