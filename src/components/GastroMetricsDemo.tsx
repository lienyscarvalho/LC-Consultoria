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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8 mt-8 text-white">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-auto text-sm font-mono opacity-70">Simulador Interativo • GastroMetrics v1.0</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-[#C8973A] mb-4">Insira os dados do seu negócio</h3>
          
          <div className="space-y-2">
            <label className="text-sm uppercase tracking-wider opacity-80">Faturamento Mensal Estimado</label>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono">R$</span>
              <input 
                type="number" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white focus:border-[#C8973A] outline-none transition-colors"
              />
            </div>
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="1000" 
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full accent-[#C8973A]" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm uppercase tracking-wider opacity-80">CMV (Custo Mercadoria)</label>
              <span className="font-mono text-[#C8973A]">{cmv}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              value={cmv} 
              onChange={(e) => setCmv(Number(e.target.value))}
              className="w-full accent-[#C8973A]" 
            />
            <p className="text-xs opacity-50">Ideal: 25% - 32%</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm uppercase tracking-wider opacity-80">Custos Fixos (Aluguel, Folha, etc)</label>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono">R$</span>
              <input 
                type="number" 
                value={fixedCosts} 
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white focus:border-[#C8973A] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between">
              <label className="text-sm uppercase tracking-wider opacity-80">Custos Variáveis (Impostos/Taxas)</label>
              <span className="font-mono text-[#C8973A]">{variableCosts}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={variableCosts} 
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              className="w-full accent-[#C8973A]" 
            />
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-black/20 rounded-lg p-6 border border-white/5">
          <h3 className="text-lg font-serif font-bold text-white mb-6 text-center">Resultado da Simulação</h3>
          
          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1A237E', borderColor: '#C8973A', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded border border-white/10">
              <div className="text-xs uppercase opacity-60 mb-1">Lucro Líquido</div>
              <div className={`text-xl font-bold font-mono ${results.profit > 0 ? 'text-[#2E7D32]' : 'text-red-400'}`}>
                {formatCurrency(results.profit)}
              </div>
              <div className={`text-xs ${results.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                Margem: {results.profitMargin.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white/5 p-3 rounded border border-white/10">
              <div className="text-xs uppercase opacity-60 mb-1">Ponto de Equilíbrio</div>
              <div className="text-xl font-bold font-mono text-[#C8973A]">
                {formatCurrency(results.breakEven)}
              </div>
              <div className="text-xs opacity-60">
                Meta mínima
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm opacity-70 mb-3">Quer otimizar esses números?</p>
            <a href="#contato" className="inline-block bg-[#C8973A] text-[#1A237E] font-bold py-2 px-6 rounded hover:bg-[#e0aa3e] transition-colors text-sm">
              Solicitar Análise Completa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
