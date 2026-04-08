import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  LayoutDashboard,
  FileText,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', faturamento: 45000, cmv: 15750, lucro: 12000 },
  { name: 'Fev', faturamento: 52000, cmv: 17160, lucro: 15600 },
  { name: 'Mar', faturamento: 48000, cmv: 16800, lucro: 13440 },
  { name: 'Abr', faturamento: 61000, cmv: 20130, lucro: 18300 },
  { name: 'Mai', faturamento: 55000, cmv: 18150, lucro: 16500 },
  { name: 'Jun', faturamento: 67000, cmv: 21440, lucro: 21440 },
];

const categoryData = [
  { name: 'Cozinha', value: 45, color: '#1A237E' },
  { name: 'Bebidas', value: 30, color: '#C8973A' },
  { name: 'Sobremesas', value: 15, color: '#2E7D32' },
  { name: 'Outros', value: 10, color: '#EF6C00' },
];

export default function GastroMetricsPage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[2000] bg-[#FAF8F4] overflow-y-auto"
    >
      {/* Header */}
      <header className="sticky top-0 bg-[#1A237E] text-white p-4 md:px-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C8973A] rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-[#1A237E]" size={24} />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold">GastroMetrics <span className="text-[#C8973A] text-sm font-sans font-normal ml-2">v4.0 Premium</span></h1>
            <p className="text-xs text-white/60">Business Intelligence para Gastronomia</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
        >
          Voltar para o Site
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard 
            title="Faturamento Mensal" 
            value="R$ 67.000" 
            trend="+12.5%" 
            icon={<DollarSign size={20} />} 
            color="blue"
          />
          <KPICard 
            title="CMV Real" 
            value="32.4%" 
            trend="-2.1%" 
            icon={<PieChartIcon size={20} />} 
            color="emerald"
            isGood={true}
          />
          <KPICard 
            title="Ticket Médio" 
            value="R$ 84,50" 
            trend="+R$ 5,20" 
            icon={<Users size={20} />} 
            color="gold"
          />
          <KPICard 
            title="Break-Even Point" 
            value="R$ 42.300" 
            trend="Alcançado" 
            icon={<TrendingUp size={20} />} 
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <BarChart3 size={18} className="text-[#1A237E]" />
                Desempenho Semestral
              </h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#1A237E] rounded-full"></div>
                  <span>Faturamento</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#C8973A] rounded-full"></div>
                  <span>Lucro Líquido</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A237E" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1A237E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="faturamento" stroke="#1A237E" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
                  <Area type="monotone" dataKey="lucro" stroke="#C8973A" strokeWidth={3} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Mix */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <PieChartIcon size={18} className="text-[#1A237E]" />
              Mix de Vendas (ABC)
            </h3>
            <div className="space-y-6">
              {categoryData.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">{cat.name}</span>
                    <span className="font-bold text-[#1A237E]">{cat.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-[#FAF8F4] rounded-xl border border-[#C8973A]/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-[#C8973A] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Insight:</strong> Sua categoria de <span className="text-[#1A237E] font-bold">Bebidas</span> está com margem 12% acima da média. Considere ações de cross-selling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A237E]">Funcionalidades Exclusivas</h2>
            <p className="text-gray-600">O GastroMetrics não é apenas um dashboard, é o cérebro da sua operação.</p>
            
            <div className="grid grid-cols-1 gap-3">
              <FeatureItem 
                title="Ficha Técnica Dinâmica" 
                desc="Atualização automática de custos baseada nas últimas notas fiscais de entrada."
              />
              <FeatureItem 
                title="Gestão de Inventário Cego" 
                desc="Evite fraudes e erros com contagens cegas integradas ao sistema de compras."
              />
              <FeatureItem 
                title="Engenharia de Cardápio Digital" 
                desc="Simulador de impacto financeiro para novos pratos ou reajustes de preços."
              />
              <FeatureItem 
                title="DRE Gerencial em 1 Clique" 
                desc="Relatórios financeiros completos sem precisar de planilhas complexas."
              />
            </div>
          </div>

          <div className="bg-[#1A237E] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Pronto para profissionalizar sua gestão?</h3>
              <p className="text-white/70 mb-6">O Plano Premium Free dá acesso total a todos esses recursos. Comece a usar hoje mesmo e transforme seus dados em lucro.</p>
              <button className="w-full py-4 bg-[#C8973A] text-[#1A237E] font-bold rounded-xl hover:bg-[#e0aa3e] transition-colors flex items-center justify-center gap-2">
                Ativar Minha Conta Grátis <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

function KPICard({ title, value, trend, icon, color, isGood = true }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    gold: 'bg-amber-50 text-amber-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      </div>
      <h4 className="text-gray-500 text-xs font-medium uppercase tracking-wider">{title}</h4>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C8973A]/30 transition-colors">
      <CheckCircle2 className="text-[#2E7D32] shrink-0" size={20} />
      <div>
        <h4 className="font-bold text-sm text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}
