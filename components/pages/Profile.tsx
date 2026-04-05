import React from 'react';
import { CheckCircle2, ShieldCheck, Edit3, Trophy, Flame, Zap, Dumbbell, Calendar, ChevronDown, MessageCircle, LogOut, Sun, Moon } from 'lucide-react';
import { User, UserStats, HistoryItem } from '../../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user?: User | null;
  onLogout?: () => void;
  toggleTheme?: () => void;
  isDark?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, toggleTheme, isDark }) => {
  // Dados de Exemplo (Mock Data)
  const stats: UserStats = {
    weight: 82.5,
    weightDelta: -0.5,
    bodyFat: 12.4,
    bodyFatDelta: 0.2,
    muscleMass: 40.2,
    muscleMassDelta: -0.1
  };

  const graphData = [
    { month: 'JAN', weight: 78 },
    { month: 'FEV', weight: 77 },
    { month: 'MAR', weight: 79 },
    { month: 'ABR', weight: 81 },
    { month: 'MAI', weight: 81.5 },
    { month: 'JUN', weight: 82.5 },
  ];

  const badges = [
    { id: 1, icon: <Flame className="w-6 h-6" />, label: 'Fogo 7 Dias', color: 'bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black' },
    { id: 2, icon: <Dumbbell className="w-6 h-6" />, label: 'Agacho 100kg', color: 'bg-gray-100 dark:bg-lf-dark border border-lf-navy/30 dark:border-lf-neon/30 text-lf-navy dark:text-lf-neon' },
    { id: 3, icon: <Zap className="w-6 h-6" />, label: 'Madrugador', color: 'bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black' },
    { id: 4, icon: <Trophy className="w-6 h-6" />, label: 'Campeão', color: 'bg-gray-100 dark:bg-lf-dark border border-gray-300 dark:border-white/10 text-gray-400' },
  ];

  const history: HistoryItem[] = [
    { id: '1', title: 'Foco: Peito e Tríceps', date: 'Ontem', duration: '1h 12m', kcal: 542, status: 'COMPLETED' },
    { id: '2', title: 'Sessão Cardio HIIT', date: 'Seg, 23 Out', duration: '45m', kcal: 610, status: 'COMPLETED' },
    { id: '3', title: 'Recuperação Ativa', date: 'Dom, 22 Out', duration: '30m', kcal: 120, status: 'COMPLETED' },
  ];

  // IMPORTANTE: Isso aponta para o arquivo na pasta 'public' do seu projeto GitHub
  const lucasPhoto = "/lucas-foto.jpg"; 

  return (
    <div className="px-6 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
      
      {/* USER HEADER */}
      <section className="flex flex-col items-center text-center pt-4 relative">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full p-1 border-2 border-lf-navy dark:border-lf-neon bg-gray-100 dark:bg-lf-black shadow-xl dark:shadow-[0_0_30px_rgba(230,255,0,0.15)]">
            <img 
              src={user?.photo || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black p-1.5 rounded-full border-2 border-white dark:border-lf-black z-10">
             <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-1">{user?.name || 'Visitante'}</h2>
        
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
           <span className="bg-lf-navy/10 dark:bg-lf-neon/20 text-lf-navy dark:text-lf-neon border border-lf-navy/20 dark:border-lf-neon/30 px-3 py-0.5 rounded-full uppercase tracking-wider font-bold">
            {user?.level || 'Atleta'}
           </span>
           <span>•</span>
           <span>Membro desde {user?.since || '2023'}</span>
        </div>

        <button className="mt-6 w-full bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide hover:opacity-90 transition-colors shadow-lg">
           <Edit3 className="w-4 h-4" /> Atualizar Medidas
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* STATS CARDS */}
          <section className="grid grid-cols-2 gap-3">
            {/* Weight - Large */}
            <div className="col-span-1 bg-white dark:bg-lf-navy/30 border border-gray-200 dark:border-white/5 p-4 rounded-2xl shadow-sm">
               <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Peso Atual</span>
               <div className="flex items-baseline gap-1 mt-1">
                 <span className="text-3xl font-display font-bold text-gray-900 dark:text-white">{stats.weight}</span>
                 <span className="text-sm text-gray-500 dark:text-gray-400">kg</span>
               </div>
               <span className={`text-xs font-bold mt-2 block ${stats.weightDelta < 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                 {stats.weightDelta}kg
               </span>
            </div>

            {/* Body Fat & Muscle - Stacked */}
            <div className="col-span-1 space-y-3">
               <div className="bg-white dark:bg-lf-navy/30 border border-gray-200 dark:border-white/5 p-3 rounded-2xl shadow-sm">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Gordura Corporal</span>
                  <div className="flex justify-between items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-display font-bold text-gray-900 dark:text-white">{stats.bodyFat}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">%</span>
                    </div>
                    <span className="text-[10px] font-bold text-green-500 dark:text-green-400">+{stats.bodyFatDelta}%</span>
                  </div>
               </div>
               <div className="bg-white dark:bg-lf-navy/30 border border-gray-200 dark:border-white/5 p-3 rounded-2xl shadow-sm">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Massa Muscular</span>
                  <div className="flex justify-between items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-display font-bold text-gray-900 dark:text-white">{stats.muscleMass}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">kg</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 dark:text-red-400">{stats.muscleMassDelta}kg</span>
                  </div>
               </div>
            </div>
          </section>

          {/* EVOLUTION CHART */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">Evolução</h3>
               <div className="bg-gray-100 dark:bg-lf-navy/50 px-3 py-1 rounded-lg flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5 cursor-pointer shadow-sm">
                 Peso - Últimos 6 Meses <ChevronDown className="w-3 h-3" />
               </div>
            </div>

            <div className="bg-white dark:bg-lf-navy/20 border border-gray-200 dark:border-white/5 rounded-2xl p-4 h-64 relative overflow-hidden shadow-sm">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={graphData}>
                   <defs>
                     <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#E6FF00" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#E6FF00" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#E6FF00', fontWeight: 'bold' }}
                      labelStyle={{ display: 'none' }}
                   />
                   <Area 
                     type="monotone" 
                     dataKey="weight" 
                     stroke="#E6FF00" 
                     strokeWidth={3} 
                     fillOpacity={1} 
                     fill="url(#colorWeight)" 
                   />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 10}} dy={10} />
                 </AreaChart>
               </ResponsiveContainer>
               
               {/* Floating Point Tag Mockup */}
               <div className="absolute top-[30%] right-[20%] bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black text-[10px] font-bold px-2 py-1 rounded">
                 82.5 kg
               </div>
               <div className="absolute top-[40%] right-[19%] w-3 h-3 bg-white dark:bg-lf-black border-2 border-lf-navy dark:border-lf-neon rounded-full z-10"></div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* BADGES */}
          <section>
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">Conquistas (Badges)</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
               {badges.map((badge) => (
                 <div key={badge.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.color} shadow-lg`}>
                       {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase text-center w-full truncate">{badge.label}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* HISTORY */}
          <section>
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">Histórico de Treinos</h3>
               <span className="text-xs font-bold text-lf-navy dark:text-lf-neon uppercase tracking-wider cursor-pointer">Ver Todos</span>
             </div>
             
             <div className="space-y-3">
                {history.map((item) => (
                   <div key={item.id} className="bg-white dark:bg-lf-navy/20 border border-gray-200 dark:border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-lf-navy/30 dark:hover:border-lf-neon/30 transition-colors shadow-sm">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-lf-navy dark:text-lf-neon group-hover:bg-lf-navy group-hover:text-white dark:group-hover:bg-lf-neon dark:group-hover:text-black transition-colors">
                            <Dumbbell className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.date} • {item.duration}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="block font-bold text-gray-900 dark:text-white text-sm">{item.kcal} kcal</span>
                         <span className="text-[10px] font-bold text-lf-navy dark:text-lf-neon uppercase tracking-wider">
                           {item.status === 'COMPLETED' ? 'CONCLUÍDO' : item.status}
                         </span>
                      </div>
                   </div>
                ))}
             </div>
          </section>
        </div>
      </div>

      {/* TRAINER CARD */}
      <section className="bg-lf-black border border-gray-200 dark:border-lf-neon/30 rounded-2xl p-6 relative overflow-hidden mt-8 shadow-2xl">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-lf-neon p-0.5 overflow-hidden">
            <img src={lucasPhoto} className="w-full h-full rounded-full object-cover" alt="Lucas França" />
          </div>
          <div>
            <h2 className="font-display font-bold text-white text-lg">Lucas França</h2>
            <p className="text-xs text-lf-neon uppercase tracking-wider font-bold">Seu Personal Trainer</p>
            <p className="text-xs text-gray-400 mt-1">CREF: 123456-G/SP</p>
          </div>
          <button className="ml-auto w-10 h-10 rounded-full bg-lf-neon/10 flex items-center justify-center text-lf-neon border border-lf-neon/20 hover:bg-lf-neon hover:text-black transition-colors">
             <MessageCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-lf-neon/5 rounded-full blur-2xl"></div>
      </section>

      {/* SETTINGS & LOGOUT */}
      <section className="space-y-4 pt-4">
        <div className="bg-white dark:bg-lf-navy/20 border border-gray-200 dark:border-white/5 rounded-2xl p-2 shadow-sm">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Modo {isDark ? 'Claro' : 'Escuro'}</span>
            </div>
            <div className="w-12 h-6 bg-gray-200 dark:bg-lf-neon/20 rounded-full relative p-1 transition-colors">
              <div className={`w-4 h-4 rounded-full bg-white dark:bg-lf-neon transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-red-500"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold">Sair do Aplicativo</span>
          </button>
        </div>
      </section>

    </div>
  );
};

export default Profile;