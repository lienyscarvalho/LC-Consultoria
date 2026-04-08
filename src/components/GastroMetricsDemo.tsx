import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';

export default function GastroMetricsDemo() {
  const [revenue, setRevenue] = useState(80000);
  const [cmv, setCmv] = useState(32); // Percentage
  const [fixedCosts, setFixedCosts] = useState(35000);
  const [variableCosts, setVariableCosts] = useState(10); // Percentage (taxes, card fees)

  const [results, setResults] = useState({
    cmvValue: 0,
    variableValue: 0,
    totalCosts: 0,
    profit: 0,
    profitMargin: 0,
    breakEven: 0
  });

  useEffect(() => {
    const cmvValue = revenue * (cmv / 100);
    const variableValue = revenue * (variableCosts / 100);
    const totalCosts = fixedCosts + cmvValue + variableValue;
    const profit = revenue - totalCosts;
    const profitMargin = (profit / revenue) * 100;
    
    // Break even calculation: Fixed Costs / (1 - (Variable Costs % + CMV %))
    const contributionMarginRatio = 1 - ((variableCosts + cmv) / 100);
    const breakEven = contributionMarginRatio > 0 ? fixedCosts / contributionMarginRatio : 0;

    setResults({
      cmvValue,
      variableValue,
      totalCosts,
      profit,
      profitMargin,
      breakEven
    });
  }, [revenue, cmv, fixedCosts, variableCosts]);

  const data = [
    { name: 'CMV (Insumos)', value: results.cmvValue, color: '#EF6C00' },
    { name: 'Custos Fixos', value: fixedCosts, color: '#1A237E' },
    { name: 'Custos Variáveis', value: results.variableValue, color: '#5C6BC0' },
    { name: 'Lucro Líquido', value: Math.max(0, results.profit), color: '#2E7D32' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-10 mt-12 text-white shadow-2xl overflow-hidden">
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </div>
        <span className="ml-auto text-[10px] font-bold font-mono opacity-50 tracking-[0.2em] uppercase">Simulador Interativo • GastroMetrics v1.0</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-start">
        {/* Controls */}
        <div className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-xl font-serif font-bold text-[#C8973A] mb-2">Parâmetros do Negócio</h3>
          <p className="text-xs text-white/50 mb-6">Ajuste os valores para simular seu cenário.</p>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Faturamento Mensal</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-[#C8973A]">R$</span>
              <input 
                type="number" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-lg font-mono text-white focus:border-[#C8973A] outline-none transition-all"
              />
            </div>
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="1000" 
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">CMV (Insumos)</label>
              <span className="font-mono text-[#C8973A] font-bold text-base">{cmv}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              value={cmv} 
              onChange={(e) => setCmv(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
            <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest">
              <span className="opacity-30">Mín: 15%</span>
              <span className="text-emerald-400 opacity-80">Ideal: 25-32%</span>
              <span className="opacity-30">Máx: 60%</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Custos Fixos</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-[#C8973A]">R$</span>
              <input 
                type="number" 
                value={fixedCosts} 
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-lg font-mono text-white focus:border-[#C8973A] outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Custos Variáveis</label>
              <span className="font-mono text-[#C8973A] font-bold text-base">{variableCosts}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={variableCosts} 
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
          </div>
        </div>

        {/* Analysis Display */}
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10 flex flex-col h-full">
          <h3 className="text-lg font-serif font-bold text-white mb-8 text-center uppercase tracking-[0.2em]">Análise de Viabilidade</h3>
          
          <div className="flex-1 min-h-[280px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1A237E', borderRadius: '12px', border: '1px solid #C8973A', color: '#fff', padding: '10px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="text-[9px] uppercase font-bold opacity-40 tracking-widest mb-1">Lucro Líquido</div>
              <div className={`text-xl font-black font-mono ${results.profit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(results.profit)}
              </div>
              <div className="text-[10px] font-bold opacity-60 mt-1">
                Margem: {results.profitMargin.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="text-[9px] uppercase font-bold opacity-40 tracking-widest mb-1">Ponto de Equilíbrio</div>
              <div className="text-xl font-black font-mono text-[#C8973A]">
                {formatCurrency(results.breakEven)}
              </div>
              <div className="text-[10px] opacity-40 mt-1 uppercase">
                Venda mínima necessária
              </div>
            </div>
          </div>
          
          <div className="text-center mt-auto">
            <button className="w-full bg-[#C8973A] text-[#1A237E] font-black py-4 rounded-xl hover:bg-[#e0aa3e] transition-all shadow-xl uppercase text-xs tracking-widest">
              Solicitar Análise Completa
            </button>
            <p className="text-[10px] opacity-40 mt-4 italic">"Dados precisos geram decisões lucrativas."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
