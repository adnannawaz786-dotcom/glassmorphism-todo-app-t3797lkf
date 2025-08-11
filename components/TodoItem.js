/* EXPORTS: TodoItem (default) */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit3, Trash2, X, Save } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl" />
        
        <div className="relative flex items-center gap-3">
          {/* Complete Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-white/40 hover:border-emerald-400 hover:bg-emerald-400/20'
            }`}
          >
            <AnimatePresence>
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Todo Text / Edit Input */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.input
                  key="edit-input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 backdrop-blur-sm"
                  placeholder="Enter todo text..."
                  autoFocus
                />
              ) : (
                <motion.p
                  key="todo-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-white/90 transition-all duration-300 ${
                    todo.completed
                      ? 'line-through opacity-60'
                      : 'hover:text-white'
                  }`}
                >
                  {todo.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit-actions"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex gap-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className="p-2 text-emerald-400 hover:bg-emerald-400/20 rounded-lg transition-colors duration-200"
                  >
                    <Save size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors duration-200"
                  >
                    <X size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="default-actions"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex gap-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleEdit}
                    className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Completion indicator */}
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-white/10"
            >
              <p className="text-xs text-emerald-400/80">
                ✓ Completed
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TodoItem;