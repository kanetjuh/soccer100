import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  // For this demo, we'll just toggle a class - in a real app, you'd implement 
  // actual theme switching functionality
  useEffect(() => {
    // Default to dark theme for a sports streaming site
    document.documentElement.classList.add('dark-theme');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-zinc-800 text-gray-300 hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;