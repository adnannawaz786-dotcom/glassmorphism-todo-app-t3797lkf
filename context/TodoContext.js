/* EXPORTS: TodoProvider, useTodoContext */

'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null }
            : todo
        ),
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
  loading: true,
  error: null,
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('glassmorphism-todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        dispatch({ type: 'SET_TODOS', payload: parsedTodos });
      } else {
        dispatch({ type: 'SET_TODOS', payload: [] });
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load todos' });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!state.loading) {
      try {
        localStorage.setItem('glassmorphism-todos', JSON.stringify(state.todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save todos' });
      }
    }
  }, [state.todos, state.loading]);

  const addTodo = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id, updates) => {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = {
        ...todo,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
    }
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const clearCompleted = () => {
    const activeTodos = state.todos.filter(todo => !todo.completed);
    dispatch({ type: 'SET_TODOS', payload: activeTodos });
  };

  const getFilteredTodos = () => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  };

  const getTodoStats = () => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const value = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    getFilteredTodos,
    getTodoStats,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export { TodoProvider as default, useTodoContext };