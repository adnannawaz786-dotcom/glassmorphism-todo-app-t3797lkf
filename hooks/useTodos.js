/* EXPORTS: useTodos (default) */

import { useState, useEffect, useCallback } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('glassmorphism-todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isLoading]);

  // Add new todo
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    );
  }, []);

  // Edit todo text
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: newText.trim(),
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    );
  }, []);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  // Toggle all todos
  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
        updatedAt: new Date().toISOString()
      }))
    );
  }, [todos]);

  // Get filtered todos based on current filter
  const getFilteredTodos = useCallback(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Get todo statistics
  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [todos]);

  // Reorder todos (for drag and drop functionality)
  const reorderTodos = useCallback((startIndex, endIndex) => {
    setTodos(prevTodos => {
      const result = Array.from(prevTodos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  // Search todos
  const searchTodos = useCallback((searchTerm) => {
    if (!searchTerm.trim()) return getFilteredTodos();
    
    const filtered = getFilteredTodos();
    return filtered.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [getFilteredTodos]);

  return {
    // State
    todos,
    filter,
    isLoading,
    
    // Actions
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
    reorderTodos,
    
    // Computed values
    filteredTodos: getFilteredTodos(),
    stats: getStats(),
    
    // Utilities
    searchTodos
  };
};

export default useTodos;