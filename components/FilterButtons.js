/* EXPORTS: FilterButtons */

import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { useTodos } from '../hooks/useTodos';

const FilterButtons = () => {
  const { filter, setFilter } = useTodos();

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ];

  const buttonVariants = {
    active: {
      scale: 1.05,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      {filters.map((filterOption) => (
        <motion.div
          key={filterOption.value}
          initial="inactive"
          animate={filter === filterOption.value ? 'active' : 'inactive'}
          variants={buttonVariants}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter(filterOption.value)}
            className={`
              backdrop-blur-sm
              border border-white/10
              hover:bg-white/10
              transition-colors
              ${filter === filterOption.value ? 'text-white' : 'text-white/70'}
            `}
          >
            {filterOption.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default FilterButtons;