import React, { useState } from 'react';
import { Play, TrendingUp, Zap, CalendarClock, ChevronRight, Check } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { View, User, Challenge } from '../../types';

interface DashboardProps {
  onViewChange: (view: View) => void;
  user: User | null;
}

const data = [
  { name: 'S', sessions: 1 },
  { name: 'T', sessions: 2 },
  { name: 'Q', sessions: 0 },
  { name: 'Q', sessions: 1 },
  { name: 'S', sessions: 2 },
  { name: 'S', sessions: 0 },
  { name: 'D', sessions: 0 },
];

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, user }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: 'Desafio LF 21 Dias', daysLeft: 12, totalDays: 21, currentDay: 9, progress: 45 },
    { id: '2', title: 'Abdômen de Aço', daysLeft: 25, totalDays: 30, currentDay: 5, progress: 16 },
    { id: '3', title: 'Flexibilidade 100%', daysLeft: 5, totalDays: 14, currentDay: 9, progress: 64 },
  ]);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);

  const handleChallengeCheckIn = () => {
    const updated = [...challenges];
    const current = updated[activeChallengeIdx];
    if (current.currentDay < current.totalDays) {
      current.currentDay += 1;
      current.progress = (current.currentDay / current.totalDays) * 100;
      setChallenges(updated);
    }
  };

  const nextChallenge = () => {
    setActiveChallengeIdx((prev) => (prev + 1) % challenges.length);
  };

  const currentChallenge = challenges[activeChallengeIdx];

  return (
    <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Greeting Section */}
      <section>
        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-gray-900 dark:text-white transition-colors">
          Bom dia, {user ? user.name.split(' ')[0] : 'Atleta'},<br />
          Pronto para <span className="text-lf-navy dark:text-lf-neon italic">superar</span> sua melhor versão?
        </h2>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured Workout Card */}
        <section>
          <div className="h-full relative overflow-hidden rounded-2xl bg-white dark:bg-lf-dark border border-gray-200 dark:border-white/5 p-6 shadow-xl dark:shadow-2xl group transition-colors">
            <div className="absolute top-0 right-0 p-4 z-10">
              <span className="bg-lf-navy/10 dark:bg-lf-neon/10 text-lf-navy dark:text-lf-neon text-[10px] font-bold px-2 py-1 rounded border border-lf-navy/10 dark:border-lf-neon/20 uppercase tracking-wider">
                Em Destaque
              </span>
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-lf-navy dark:text-lf-neon" /> Próximo Treino
                </p>
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">LF IRON - Hipertrofia</h3>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 text-xs font-mono">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                  <span>45 MIN</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                  <span>380 KCAL</span>
                </div>
              </div>

              <button 
                onClick={() => onViewChange(View.WORKOUTS)}
                className="w-full bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg dark:shadow-[0_0_20px_rgba(230,255,0,0.2)] hover:opacity-90"
              >
                <Play className="w-5 h-5 fill-current" />
                INICIAR AGORA
              </button>
            </div>

            {/* Abstract Glow Background */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-lf-navy/5 dark:bg-lf-neon/5 rounded-full blur-3xl group-hover:bg-lf-navy/10 dark:group-hover:bg-lf-neon/10 transition-colors duration-500"></div>
          </div>
        </section>

        <div className="space-y-8">
          {/* Stats Grid */}
          <section className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-lf-dark p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
              <span className="text-lf-navy dark:text-lf-neon text-xl md:text-2xl font-bold font-display">12</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Treinos</span>
            </div>
            <div className="bg-white dark:bg-lf-dark p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
              <span className="text-lf-navy dark:text-lf-neon text-xl md:text-2xl font-bold font-display">8.4k</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Kcal</span>
            </div>
            <div className="bg-white dark:bg-lf-dark p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col items-center text-center shadow-sm">
              <span className="text-lf-navy dark:text-lf-neon text-xl md:text-2xl font-bold font-display">185</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Minutos</span>
            </div>
          </section>

          {/* Weekly Frequency */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white">Frequência Semanal</h3>
              <span className="text-lf-navy dark:text-lf-neon text-xs font-medium flex items-center gap-1">
                 <TrendingUp className="w-3 h-3" /> Excelente
              </span>
            </div>
            <div className="bg-white dark:bg-lf-dark rounded-xl p-6 border border-gray-200 dark:border-white/5 h-48 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 10 }} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar 
                    dataKey="sessions" 
                    className="fill-lf-navy dark:fill-lf-neon"
                    radius={[4, 4, 0, 0]} 
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>

      {/* Interactive Challenge Banner */}
      <section className="pb-4">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white">Desafios Ativos</h3>
           <button onClick={nextChallenge} className="text-xs text-lf-navy dark:text-lf-neon hover:underline">Próximo</button>
        </div>
        <div className="bg-gradient-to-r from-lf-navyLight to-lf-navy dark:from-lf-navy dark:to-lf-navyLight rounded-xl p-5 border border-lf-neon/20 relative overflow-hidden transition-all duration-300 shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-lf-neon" />
                <h3 className="font-display font-bold text-white">{currentChallenge.title}</h3>
              </div>
              <button 
                onClick={handleChallengeCheckIn}
                className="w-8 h-8 rounded-full bg-white/10 dark:bg-lf-neon/20 text-white dark:text-lf-neon flex items-center justify-center hover:bg-lf-neon hover:text-black transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-gray-200 dark:text-gray-300 mb-4 max-w-[80%]">
              Faltam {currentChallenge.daysLeft} dias para completar. Mantenha o foco!
            </p>
            
            <div className="w-full bg-black/30 rounded-full h-1.5 mb-2">
              <div 
                className="bg-lf-neon h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${currentChallenge.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-300 dark:text-gray-400 font-mono">
              <span>Dia {currentChallenge.currentDay}</span>
              <span>Dia {currentChallenge.totalDays}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-1 mt-2">
           {challenges.map((_, idx) => (
             <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === activeChallengeIdx ? 'bg-lf-navy dark:bg-lf-neon' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
           ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;