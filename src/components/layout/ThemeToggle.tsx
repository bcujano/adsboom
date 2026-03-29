'use client'

import { Sun, Moon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from '@/components/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass-pill w-10 h-10 flex items-center justify-center"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {theme === 'light' ? (
          <Sun size={18} className="text-warning" />
        ) : (
          <Moon size={18} className="text-accent-secondary" />
        )}
      </motion.div>
    </button>
  )
}
