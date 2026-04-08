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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-16 mt-16 text-white shadow-2xl">
      <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-8">
        <div className="flex gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
        </div>
        <span className="ml-auto text-xs font-bold font-mono opacity-60 tracking-[0.2em] uppercase">Simulador Interativo • GastroMetrics v1.0</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-16">
        {/* Controls */}
        <div className="space-y-10">
          <h3 className="text-3xl font-serif font-bold text-[#C8973A] mb-6">Parâmetros do Negócio</h3>
          
          <div className="space-y-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Faturamento Mensal Estimado</label>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-mono text-[#C8973A]">R$</span>
              <input 
                type="number" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-2xl font-mono text-white focus:border-[#C8973A] outline-none transition-all focus:bg-white/10 shadow-inner"
              />
            </div>
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="1000" 
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">CMV (Custo Mercadoria)</label>
              <span className="font-mono text-[#C8973A] font-bold text-2xl">{cmv}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              value={cmv} 
              onChange={(e) => setCmv(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
              <span className="opacity-40">Mín: 15%</span>
              <span className="text-emerald-400">Ideal: 25% - 32%</span>
              <span className="opacity-40">Máx: 60%</span>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Custos Fixos (Aluguel, Folha, etc)</label>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-mono text-[#C8973A]">R$</span>
              <input 
                type="number" 
                value={fixedCosts} 
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-2xl font-mono text-white focus:border-[#C8973A] outline-none transition-all focus:bg-white/10 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Custos Variáveis (Impostos/Taxas)</label>
              <span className="font-mono text-[#C8973A] font-bold text-2xl">{variableCosts}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={variableCosts} 
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C8973A]" 
            />
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-black/40 rounded-[2rem] p-12 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white mb-10 text-center uppercase tracking-[0.3em]">Análise de Viabilidade</h3>
          
          <div className="h-80 w-full mb-12">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1A237E', borderRadius: '16px', border: '1px solid #C8973A', color: '#fff', padding: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all transform hover:scale-[1.02] shadow-lg">
              <div className="text-[10px] uppercase font-bold opacity-50 tracking-[0.2em] mb-3">Lucro Líquido</div>
              <div className={`text-3xl font-black font-mono whitespace-nowrap ${results.profit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(results.profit)}
              </div>
              <div className={`text-sm font-bold mt-2 ${results.profit > 0 ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                Margem: {results.profitMargin.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all transform hover:scale-[1.02] shadow-lg">
              <div className="text-[10px] uppercase font-bold opacity-50 tracking-[0.2em] mb-3">Ponto de Equilíbrio</div>
              <div className="text-3xl font-black font-mono text-[#C8973A] whitespace-nowrap">
                {formatCurrency(results.breakEven)}
              </div>
              <div className="text-xs opacity-40 font-bold mt-2 uppercase tracking-widest">
                Meta mínima de vendas
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-base opacity-60 mb-8 font-medium italic leading-relaxed">"Dados precisos geram decisões lucrativas."</p>
            <a href="#contato" className="inline-flex items-center gap-3 bg-[#C8973A] text-[#1A237E] font-black py-5 px-12 rounded-2xl hover:bg-[#e0aa3e] transition-all transform hover:scale-105 shadow-2xl uppercase text-sm tracking-[0.2em]">
              Solicitar Análise Completa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
