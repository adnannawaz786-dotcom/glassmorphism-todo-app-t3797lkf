/* EXPORTS: TodoList (default) */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X, MoreVertical } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (!todos || todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <p className="text-white/60 text-lg">No todos yet. Add one above to get started!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="glass-card rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggle(todo.id)}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${todo.completed 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400' 
                    : 'border-white/30 hover:border-white/50'
                  }
                `}
              >
                <AnimatePresence>
                  {todo.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check size={14} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Todo Text */}
              <div className="flex-1 min-w-0">
                {editingId === todo.id ? (
                  <motion.input
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, todo.id)}
                    onBlur={() => handleEditSave(todo.id)}
                    className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-lg"
                    autoFocus
                  />
                ) : (
                  <motion.p
                    className={`
                      text-lg transition-all duration-300 cursor-pointer
                      ${todo.completed 
                        ? 'text-white/50 line-through' 
                        : 'text-white hover:text-white/80'
                      }
                    `}
                    onClick={() => handleEditStart(todo)}
                  >
                    {todo.text}
                  </motion.p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {editingId === todo.id ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditSave(todo.id)}
                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleEditCancel}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditStart(todo)}
                        className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(todo.id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Progress indicator for completed todos */}
            {todo.completed && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="mt-3 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left"
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Summary Stats */}
      {todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl border border-white/10 p-4 mt-6"
        >
          <div className="flex justify-between items-center text-sm text-white/60">
            <span>Total: {todos.length}</span>
            <span>Completed: {todos.filter(todo => todo.completed).length}</span>
            <span>Remaining: {todos.filter(todo => !todo.completed).length}</span>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-white/10 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0}%` 
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;