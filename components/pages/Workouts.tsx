import React, { useState } from 'react';
import { Play, Dumbbell, MapPin, Timer, Users, Lock, X, Info, Clock, Flame } from 'lucide-react';
import { View, WorkoutPlan } from '../../types';

interface WorkoutsProps {
  onViewChange?: (view: View) => void;
}

const Workouts: React.FC<WorkoutsProps> = ({ onViewChange }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);

  const categories: WorkoutPlan[] = [
    {
      id: 'iron',
      title: 'LF IRON',
      subtitle: 'Academia - Foco em Hipertrofia',
      duration: '60 min',
      kcal: 450,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
      tags: ['Hipertrofia', 'Força'],
      description: 'Treino focado em ganho de massa muscular com cargas progressivas. Ideal para quem busca estética e força bruta.',
      exercises: [
        { name: 'Supino Reto com Barra', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Crucifixo Inclinado Halter', sets: 3, reps: '12', rest: '60s' },
        { name: 'Desenvolvimento Militar', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Elevação Lateral', sets: 3, reps: '15', rest: '45s' },
        { name: 'Tríceps Testa', sets: 3, reps: '12', rest: '60s' },
      ]
    },
    {
      id: 'nomad',
      title: 'LF NOMAD',
      subtitle: 'Outdoor/Casa - Peso do corpo',
      duration: '45 min',
      kcal: 380,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop',
      tags: ['Funcional', 'Calistenia'],
      description: 'Liberdade para treinar onde quiser. Usando apenas o peso do corpo para construir resistência e mobilidade.',
      exercises: [
        { name: 'Flexão de Braço (Push-up)', sets: 4, reps: 'max', rest: '60s' },
        { name: 'Agachamento Livre', sets: 4, reps: '20', rest: '60s' },
        { name: 'Burpees', sets: 3, reps: '15', rest: '90s' },
        { name: 'Abdominal Remador', sets: 3, reps: '20', rest: '45s' },
        { name: 'Prancha Isométrica', sets: 3, reps: '45s', rest: '60s' },
      ]
    },
    {
      id: 'express',
      title: 'LF EXPRESS',
      subtitle: '20-30 min - Intensidade Total',
      duration: '25 min',
      kcal: 300,
      image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1325&auto=format&fit=crop',
      tags: ['HIIT', 'Cardio'],
      description: 'Para dias corridos. Alta intensidade, pouco descanso e queima calórica prolongada (EPOC).',
      exercises: [
        { name: 'Jumping Jacks', sets: 3, reps: '45s', rest: '15s' },
        { name: 'Mountain Climbers', sets: 3, reps: '45s', rest: '15s' },
        { name: 'Agachamento com Salto', sets: 3, reps: '45s', rest: '15s' },
        { name: 'Corrida Estacionária', sets: 3, reps: '45s', rest: '15s' },
      ]
    }
  ];

  const handleNavigateToSchedule = () => {
    if (onViewChange) {
      onViewChange(View.SCHEDULE);
    }
  };

  return (
    <div className="px-6 space-y-8 pb-10 animate-in fade-in zoom-in-95 duration-300 relative">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-display font-bold leading-none text-gray-900 dark:text-white tracking-tighter">
          Hub de <br />
          <span className="text-lf-navy dark:text-lf-neon italic">Treinos</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
          Escolha seu objetivo para hoje
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className="group relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-lf-dark border border-gray-200 dark:border-white/5 h-64 shadow-lg transition-transform active:scale-[0.98]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 dark:opacity-50"
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black text-[10px] font-bold rounded uppercase tracking-wider">
                     {cat.tags[0]}
                  </span>
                  <div>
                    <h3 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase">{cat.title}</h3>
                    <p className="text-gray-200 dark:text-gray-300 text-sm font-medium">{cat.subtitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedWorkout(cat)}
                  className="w-12 h-12 bg-white dark:bg-lf-neon rounded-full flex items-center justify-center text-lf-navy dark:text-lf-black shadow-lg shadow-black/20 dark:shadow-lf-neon/20 hover:scale-110 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Group Classes Teaser */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white">Turmas em Grupo</h3>
          <button 
            onClick={handleNavigateToSchedule}
            className="text-xs text-lf-navy dark:text-lf-neon font-bold uppercase tracking-wider hover:underline"
          >
            Ver Agenda
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-white dark:bg-lf-dark/50 border border-gray-200 dark:border-white/5 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-lf-navy flex flex-col items-center justify-center text-white dark:text-lf-neon">
                <span className="text-sm font-bold">07:00</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">HIIT Funcional</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>12/15 vagas</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleNavigateToSchedule}
              className="px-4 py-2 bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black text-xs font-bold rounded-lg uppercase transition-transform active:scale-95"
            >
              Reservar
            </button>
          </div>
        </div>
      </section>

      {/* WORKOUT DETAIL MODAL */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedWorkout(null)}
          ></div>
          
          <div className="bg-white dark:bg-lf-dark w-full max-w-md h-[85vh] sm:h-auto sm:rounded-2xl rounded-t-2xl relative flex flex-col border dark:border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header Image */}
            <div className="h-48 relative shrink-0">
               <img src={selectedWorkout.image} className="w-full h-full object-cover sm:rounded-t-2xl rounded-t-2xl opacity-80 dark:opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-lf-dark to-transparent"></div>
               <button 
                  onClick={() => setSelectedWorkout(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-white/20"
               >
                 <X className="w-5 h-5" />
               </button>
               <div className="absolute bottom-4 left-6">
                 <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white italic uppercase tracking-tighter">{selectedWorkout.title}</h2>
                 <div className="flex gap-4 text-xs font-mono text-gray-700 dark:text-gray-300 mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-lf-navy dark:text-lf-neon"/> {selectedWorkout.duration}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-lf-navy dark:text-lf-neon"/> {selectedWorkout.kcal} kcal</span>
                 </div>
               </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                {selectedWorkout.description}
              </p>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-lf-navy dark:text-lf-neon" /> Sequência
              </h3>
              
              <div className="space-y-3">
                {selectedWorkout.exercises.map((ex, idx) => (
                  <div key={idx} className="bg-gray-100 dark:bg-lf-navy/20 border border-gray-200 dark:border-white/5 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Ex {idx + 1}</span>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{ex.name}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400 font-mono">
                      <div className="text-lf-navy dark:text-lf-neon font-bold">{ex.sets} x {ex.reps}</div>
                      <div>Descanso: {ex.rest}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-lf-dark shrink-0">
               <button className="w-full bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black font-bold py-4 rounded-xl uppercase tracking-widest hover:opacity-90 transition-colors shadow-lg">
                 Iniciar Treino
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Workouts;