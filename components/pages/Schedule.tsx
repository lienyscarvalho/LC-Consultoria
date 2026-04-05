import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { ClassSession } from '../../types';

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [filter, setFilter] = useState<'individual' | 'group'>('group');
  
  // Initialize with state to allow interaction
  const [classes, setClasses] = useState<ClassSession[]>([
    {
      id: '1',
      time: '07:00',
      period: 'Manhã',
      title: 'Cross-Training Elite',
      instructor: 'Lucas Ferreira',
      spots: 4,
      totalSpots: 12,
      booked: false
    },
    {
      id: '2',
      time: '09:00',
      period: 'Manhã',
      title: 'HIIT Burn Intenso',
      instructor: 'Amanda Silva',
      spots: 1,
      totalSpots: 15,
      booked: false
    },
    {
      id: '3',
      time: '18:30',
      period: 'Noite',
      title: 'Funcional Ativo',
      instructor: 'Lucas Ferreira',
      spots: 0,
      totalSpots: 12,
      booked: true
    }
  ]);

  const days = [
    { day: 'SEG', date: 2 },
    { day: 'TER', date: 3 },
    { day: 'QUA', date: 4 },
    { day: 'QUI', date: 5 },
    { day: 'SEX', date: 6 },
    { day: 'SÁB', date: 7 },
  ];

  const toggleBooking = (id: string) => {
    setClasses(prevClasses => prevClasses.map(cls => {
      if (cls.id === id) {
        const isBooking = !cls.booked;
        // Logic: if booking, reduce spots. If canceling, increase spots.
        const newSpots = isBooking ? cls.spots - 1 : cls.spots + 1;
        
        return {
          ...cls,
          booked: isBooking,
          spots: newSpots
        };
      }
      return cls;
    }));
  };

  return (
    <div className="px-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Calendar Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Outubro 2023</h2>
          <div className="flex gap-2 text-gray-400">
            <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
            <ChevronRight className="w-5 h-5 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
          </div>
        </div>
        
        <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((d) => {
            const isSelected = selectedDate === d.date;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center min-w-[50px] p-2 rounded-xl border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-lf-navy dark:bg-lf-neon border-lf-navy dark:border-lf-neon text-white dark:text-lf-black shadow-lg dark:shadow-[0_0_15px_rgba(230,255,0,0.4)]' 
                    : 'bg-white dark:bg-lf-navy/30 border-gray-200 dark:border-white/5 text-gray-400 hover:bg-gray-50 dark:hover:bg-lf-navy/50'
                }`}
              >
                <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                <span className="text-xl font-display font-bold">{String(d.date).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Toggles */}
      <div className="bg-gray-100 dark:bg-lf-navy/30 p-1 rounded-xl flex border border-gray-200 dark:border-white/5">
        <button
          onClick={() => setFilter('individual')}
          className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${
            filter === 'individual' 
              ? 'bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => setFilter('group')}
          className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${
            filter === 'group' 
              ? 'bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Aulas Coletivas
        </button>
      </div>

      {/* Class List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white">Aulas Disponíveis</h3>
          <span className="text-[10px] bg-lf-navy/10 dark:bg-lf-neon/10 text-lf-navy dark:text-lf-neon border border-lf-navy/20 dark:border-lf-neon/20 px-2 py-1 rounded uppercase font-bold">Hoje</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls) => {
            const isFull = cls.spots <= 0;
            const isLastSpots = cls.spots > 0 && cls.spots <= 3;
            const canBook = !isFull || cls.booked;

            return (
              <div 
                key={cls.id}
                className={`relative overflow-hidden rounded-xl border p-5 transition-all shadow-sm ${
                  cls.booked 
                    ? 'bg-lf-navy/5 dark:bg-lf-navy/20 border-lf-navy/30 dark:border-lf-neon/30' 
                    : isFull 
                      ? 'bg-gray-100 dark:bg-lf-dark/50 border-gray-200 dark:border-white/5 opacity-60' 
                      : 'bg-white dark:bg-lf-navy/40 border-gray-200 dark:border-white/10 hover:border-lf-navy/30 dark:hover:border-lf-neon/50'
                }`}
              >
                {isLastSpots && !cls.booked && (
                  <div className="absolute top-0 right-0 p-2">
                    <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                      Últimas Vagas
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-lf-navy dark:text-lf-neon">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{cls.time}</span>
                    </div>
                    <h4 className="text-lg font-display font-bold uppercase tracking-wide text-gray-900 dark:text-white">{cls.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Prof. {cls.instructor}</p>
                  </div>
                  
                  {!cls.booked && (
                    <div className={`text-right text-[10px] font-bold uppercase border px-2 py-1 rounded ${
                      isFull 
                        ? 'text-gray-400 border-gray-300 dark:border-gray-700' 
                        : 'text-lf-navy dark:text-lf-neon border-lf-navy/30 dark:border-lf-neon/30'
                    }`}>
                       Vagas: {cls.spots}/{cls.totalSpots}
                    </div>
                  )}
                </div>

                <button
                  disabled={!canBook}
                  onClick={() => toggleBooking(cls.id)}
                  className={`w-full py-3 rounded-lg font-bold text-sm uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    cls.booked
                      ? 'bg-transparent text-lf-navy dark:text-lf-neon border border-lf-navy dark:border-lf-neon'
                      : !canBook
                        ? 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-lf-navy dark:bg-lf-neon text-white dark:text-lf-black hover:opacity-90'
                  }`}
                >
                  {cls.booked ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Confirmado
                    </>
                  ) : !canBook ? (
                    'Lotado'
                  ) : (
                    'Fazer Check-in'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;