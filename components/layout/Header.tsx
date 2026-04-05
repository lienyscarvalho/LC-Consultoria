import React from 'react';
import { Bell, Sun, Moon, ChevronLeft } from 'lucide-react';
import { View, User } from '../../types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  user: User | null;
  toggleTheme: () => void;
  isDark: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, toggleTheme, isDark }) => {
  const getTitle = () => {
    switch (currentView) {
      case View.DASHBOARD: return 'LF Personal';
      case View.WORKOUTS: return 'Hub de Treinos';
      case View.SCHEDULE: return 'Agenda';
      case View.NUTRITION: return 'Nutrição VIP';
      case View.PROFILE: return 'Meu Perfil';
      default: return 'LF Personal';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-lf-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* Logic: Show Logo on Dashboard, Show Back Button on other pages */}
        {currentView === View.DASHBOARD ? (
          <div className="w-10 h-10 bg-lf-navy dark:bg-lf-neon rounded-lg flex items-center justify-center shadow-lg shadow-lf-navy/20 dark:shadow-lf-neon/20 transition-colors">
            <span className="font-display font-bold text-white dark:text-lf-black text-xl tracking-tighter">LF</span>
          </div>
        ) : (
          <button 
            onClick={() => onViewChange(View.DASHBOARD)}
            className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center hover:bg-lf-navy hover:text-white dark:hover:bg-lf-neon dark:hover:text-black transition-colors"
            aria-label="Voltar para o Início"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="flex flex-col">
          {currentView === View.DASHBOARD && (
            <span className="text-[10px] text-lf-navy dark:text-lf-neon font-bold tracking-[0.2em] uppercase transition-colors">Metodologia</span>
          )}
          <h1 className="text-xl font-display font-bold tracking-tight text-gray-900 dark:text-white transition-colors leading-tight">
            {getTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:text-lf-navy dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Alternar Tema"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="relative text-gray-500 hover:text-lf-navy dark:text-gray-400 dark:hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-lf-navy dark:bg-lf-neon rounded-full border border-white dark:border-lf-black"></span>
        </button>
        
        {user && (
          <div 
            onClick={() => onViewChange(View.PROFILE)}
            className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-lf-neon/30 p-0.5 overflow-hidden cursor-pointer"
          >
            <img 
              src={user.photo} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;