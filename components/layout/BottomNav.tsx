import React from 'react';
import { Home, Dumbbell, Calendar, Apple, User } from 'lucide-react';
import { View } from '../../types';

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: View.DASHBOARD, icon: Home, label: 'Início' },
    { id: View.WORKOUTS, icon: Dumbbell, label: 'Treinos' },
    { id: View.SCHEDULE, icon: Calendar, label: 'Agenda' },
    { id: View.NUTRITION, icon: Apple, label: 'Nutrição' },
    { id: View.PROFILE, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-lf-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="flex justify-between items-center px-6 py-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 group transition-all duration-300 ${
                isActive 
                  ? 'text-lf-navy dark:text-lf-neon -translate-y-1' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <item.icon 
                className={`w-6 h-6 transition-transform ${isActive ? 'scale-110 stroke-[2.5px]' : ''}`} 
              />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-2 w-1 h-1 bg-lf-navy dark:bg-lf-neon rounded-full shadow-[0_0_8px_rgba(0,31,63,0.5)] dark:shadow-[0_0_8px_#E6FF00]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;