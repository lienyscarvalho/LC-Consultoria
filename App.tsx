import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import Dashboard from './components/pages/Dashboard';
import Workouts from './components/pages/Workouts';
import Schedule from './components/pages/Schedule';
import Nutrition from './components/pages/Nutrition';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Manage HTML class for Tailwind Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.LOGIN);
  };

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN:
        return <Login onLogin={handleLogin} />;
      case View.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} user={user} />;
      case View.WORKOUTS:
        return <Workouts onViewChange={setCurrentView} />;
      case View.SCHEDULE:
        return <Schedule />;
      case View.NUTRITION:
        return <Nutrition />;
      case View.PROFILE:
        return <Profile user={user} onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />;
      default:
        return <Dashboard onViewChange={setCurrentView} user={user} />;
    }
  };

  // The outer div simulates the desktop background environment
  // The inner div simulates the mobile device frame
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 dark:bg-zinc-950 transition-colors duration-500 font-sans">
      
      <div className="w-full max-w-4xl min-h-screen md:min-h-[90vh] md:my-8 bg-gray-50 dark:bg-lf-black text-gray-900 dark:text-white flex flex-col relative md:rounded-3xl md:shadow-2xl overflow-hidden transition-colors duration-300 border-x border-gray-200 dark:border-white/5">
        
        {/* Render content directly if Login to allow full screen take-over style inside the frame */}
        {currentView === View.LOGIN ? (
          renderView()
        ) : (
          <>
            {/* Fixed Header */}
            <Header 
              currentView={currentView} 
              onViewChange={setCurrentView} 
              user={user} 
              toggleTheme={toggleTheme} 
              isDark={isDark} 
            />

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto pt-4 pb-24 no-scrollbar scroll-smooth">
              {renderView()}
            </main>

            {/* Floating WhatsApp Button (Sticky) */}
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-24 right-4 z-50 bg-lf-navy text-white p-4 rounded-full shadow-lg shadow-lf-neon/20 hover:scale-110 transition-transform border border-white/10"
              aria-label="Falar com Lucas França"
            >
              <MessageCircle className="w-6 h-6" />
            </a>

            {/* Fixed Bottom Navigation */}
            <BottomNav currentView={currentView} onViewChange={setCurrentView} />
          </>
        )}
      </div>
    </div>
  );
}