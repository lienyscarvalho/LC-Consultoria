import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Calculator, 
  BarChart3, 
  ChefHat, 
  Box, 
  FileSpreadsheet, 
  Users, 
  Calendar, 
  MessageSquare,
  X,
  Menu,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  HelpCircle,
  Settings,
  LogOut,
  Sparkles,
  FileDown,
  BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

// --- Mock Data ---
const revenueData = [
  { name: 'Seg', valor: 4200 },
  { name: 'Ter', valor: 3800 },
  { name: 'Qua', valor: 5100 },
  { name: 'Qui', valor: 4900 },
  { name: 'Sex', valor: 8200 },
  { name: 'Sáb', valor: 12500 },
  { name: 'Dom', valor: 10800 },
];

const abcData = [
  { name: 'Filé Mignon', value: 45, category: 'A' },
  { name: 'Salmão', value: 25, category: 'A' },
  { name: 'Cerveja Artesanal', value: 15, category: 'B' },
  { name: 'Refrigerante', value: 10, category: 'C' },
  { name: 'Sobremesas', value: 5, category: 'C' },
];

const COLORS = ['#1A237E', '#C8973A', '#2E7D32', '#EF6C00', '#666'];

// --- Sub-components for Tools ---

const DiagnosticoView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Diagnóstico Financeiro 360°</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm">Gerar Novo Relatório</button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: "Score Geral", value: "8.4", sub: "/10", color: "text-emerald-600" },
        { label: "Potencial de Economia", value: "R$ 4.2k", sub: "/mês", color: "text-[#C8973A]" },
        { label: "Ponto de Equilíbrio", value: "Dia 18", sub: "Projeção", color: "text-[#1A237E]" },
        { label: "Margem de Segurança", value: "22%", sub: "Atual", color: "text-blue-600" },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</h4>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-[10px] text-gray-400 font-bold">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Análise de Pilares (0-10)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Gestão de Compras', value: 8 },
                  { name: 'Controle de Estoque', value: 6 },
                  { name: 'Engenharia de Cardápio', value: 9 },
                  { name: 'Gestão de Pessoas', value: 7 },
                  { name: 'Marketing & Vendas', value: 8 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {[8, 6, 9, 7, 8].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-4">Plano de Ação Recomendado</h3>
        <div className="space-y-3">
          {[
            { task: "Revisar fichas técnicas dos 5 pratos mais vendidos", priority: "Alta", impact: "Alto", status: "Pendente" },
            { task: "Negociar preço do fornecedor de proteínas", priority: "Média", impact: "Médio", status: "Em andamento" },
            { task: "Implementar controle de desperdício na cozinha", priority: "Alta", impact: "Alto", status: "Pendente" },
            { task: "Treinamento de Upsell para equipe de salão", priority: "Baixa", impact: "Médio", status: "Pendente" },
            { task: "Auditoria de estoque quinzenal", priority: "Média", impact: "Alto", status: "Concluído" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${item.priority === 'Alta' ? 'bg-red-500' : item.priority === 'Média' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <div>
                  <div className="text-xs font-bold text-gray-800">{item.task}</div>
                  <div className="text-[9px] text-gray-400 uppercase font-bold">Impacto: {item.impact}</div>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded border ${
                item.status === 'Concluído' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white border-gray-200 text-gray-400'
              }`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FichasView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Fichas Técnicas (FTP)</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Nova Ficha</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total de Fichas</div>
        <div className="text-2xl font-black text-[#1A237E]">42</div>
        <div className="text-[9px] text-emerald-600 font-bold">+3 este mês</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Margem Média</div>
        <div className="text-2xl font-black text-emerald-600">68.5%</div>
        <div className="text-[9px] text-gray-400 font-bold">Meta: 70%</div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Itens Críticos (CMV &gt; 35%)</div>
        <div className="text-2xl font-black text-red-500">5</div>
        <div className="text-[9px] text-red-400 font-bold">Ação necessária</div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Buscar prato ou insumo..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C8973A] bg-white" />
        </div>
        <div className="flex gap-2">
          <select className="text-xs font-bold border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none">
            <option>Todas as Categorias</option>
            <option>Pratos Principais</option>
            <option>Entradas</option>
            <option>Sobremesas</option>
            <option>Bebidas</option>
          </select>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-500"><Filter size={18}/></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Prato / Item</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Custo Unit.</th>
              <th className="px-6 py-4">Preço Venda</th>
              <th className="px-6 py-4">Margem</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: "Burger Artesanal", cat: "Pratos Principais", cost: "R$ 12,40", price: "R$ 38,00", margin: "67%", status: "Saudável" },
              { name: "Risoto de Cogumelos", cat: "Pratos Principais", cost: "R$ 15,80", price: "R$ 52,00", margin: "69%", status: "Saudável" },
              { name: "Petit Gateau", cat: "Sobremesas", cost: "R$ 6,20", price: "R$ 24,00", margin: "74%", status: "Excelente" },
              { name: "Soda Italiana", cat: "Bebidas", cost: "R$ 2,10", price: "R$ 14,00", margin: "85%", status: "Excelente" },
              { name: "Filé ao Poivre", cat: "Pratos Principais", cost: "R$ 28,50", price: "R$ 68,00", margin: "58%", status: "Atenção" },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800">{item.name}</div>
                  <div className="text-[10px] text-gray-400">Última atualização: 2 dias atrás</div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs font-medium">{item.cat}</td>
                <td className="px-6 py-4 font-mono text-xs">{item.cost}</td>
                <td className="px-6 py-4 font-mono text-xs">{item.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      item.margin >= '70%' ? 'text-emerald-600' : 
                      item.margin >= '60%' ? 'text-blue-600' : 'text-amber-600'
                    }`}>{item.margin}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                    item.status === 'Excelente' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'Saudável' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{item.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500"><FileText size={14}/></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded text-[#1A237E]"><Plus size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MarkupView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Cálculo de Markup e CMV Real</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-6 flex items-center gap-2"><Calculator size={18} className="text-[#C8973A]"/> Simulador de Preço Sugerido</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Custo da Matéria Prima (R$)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
              <input type="number" defaultValue="15.50" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A] font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Impostos (%)</label>
              <input type="number" defaultValue="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Taxas Cartão (%)</label>
              <input type="number" defaultValue="3.5" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Comissões (%)</label>
              <input type="number" defaultValue="10" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Margem Desejada (%)</label>
              <input type="number" defaultValue="20" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A]" />
            </div>
          </div>
          <div className="pt-4">
            <div className="p-6 bg-gradient-to-br from-[#1A237E] to-[#283593] text-white rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 -rotate-12">
                <Calculator size={80} />
              </div>
              <div className="text-xs opacity-70 uppercase font-bold mb-1">Preço de Venda Sugerido</div>
              <div className="text-4xl font-black mb-2">R$ 51,24</div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <div className="text-[10px] text-[#C8973A] font-bold uppercase">Markup: 3.31x</div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">CMV Alvo: 30.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-[#C8973A]"/> Análise de CMV Real</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">CMV Atual (Mês Corrente)</div>
                <div className="text-5xl font-black text-[#1A237E]">32.4%</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-emerald-600 font-bold">Meta: 28.0%</div>
                <div className="text-xs text-red-500 font-bold flex items-center justify-end gap-1">
                  <ArrowUpRight size={14}/> +4.4% Desvio
                </div>
              </div>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: '28%' }}></div>
              <div className="h-full bg-red-500" style={{ width: '4.4%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Compras Insumos</div>
                <div className="text-sm font-bold text-gray-800">R$ 21.708</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Vendas Brutas</div>
                <div className="text-sm font-bold text-gray-800">R$ 67.000</div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  <strong>Diagnóstico:</strong> Seu CMV está 15% acima da meta. 
                  <br />• Insumo crítico: Proteínas (Filé Mignon subiu 12%)
                  <br />• Sugestão: Reajuste o prato "Filé ao Poivre" para R$ 72,00.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Dashboard GastroMetrics</h2>
      <div className="flex gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-400">
          <Clock size={12} /> ÚLTIMA ATUALIZAÇÃO: HOJE, 14:30
        </div>
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm">Atualizar Dados</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Faturamento Mensal", value: "R$ 67.420", trend: "+12.5%", positive: true, icon: <DollarSign size={20}/> },
        { label: "Ticket Médio", value: "R$ 84,50", trend: "+3.2%", positive: true, icon: <Users size={20}/> },
        { label: "CMV Real", value: "32.4%", trend: "-1.5%", positive: true, icon: <Calculator size={20}/> },
        { label: "NPS", value: "75", trend: "+5", positive: true, icon: <MessageSquare size={20}/> },
      ].map((kpi, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-gray-100 group-hover:text-[#C8973A]/10 transition-colors">
            {kpi.icon}
          </div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{kpi.label}</h4>
          <div className="text-2xl font-black text-[#1A237E] mb-1">{kpi.value}</div>
          <div className={`text-[10px] font-bold flex items-center gap-1 ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
            {kpi.positive ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
            {kpi.trend} <span className="text-gray-400 font-normal ml-1">vs mês ant.</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm">Desempenho de Vendas (Semanal)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#1A237E]"></div> REALIZADO
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#C8973A]"></div> META
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A237E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1A237E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#999'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="valor" stroke="#1A237E" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-sm mb-4">Top 5 Produtos (Margem)</h3>
            <div className="space-y-4">
              {[
                { name: "Vinho Reserva", margin: "82%", value: 4500 },
                { name: "Soda Italiana", margin: "78%", value: 1200 },
                { name: "Petit Gateau", margin: "74%", value: 2100 },
                { name: "Burger Especial", margin: "68%", value: 15400 },
                { name: "Risoto Funghi", margin: "65%", value: 8900 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-emerald-600">{item.margin}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.margin }}
                      className="h-full bg-emerald-500"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-sm mb-4">Distribuição de Custos</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'CMV', value: 32 },
                      { name: 'Folha', value: 21 },
                      { name: 'Fixos', value: 18 },
                      { name: 'Impostos', value: 10 },
                      { name: 'Lucro', value: 19 },
                    ]}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {['CMV', 'Folha', 'Fixos', 'Lucro'].map((label, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-gray-500">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  {label.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-6">Alertas & Notificações</h3>
          <div className="space-y-4">
            <div className="flex gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <AlertTriangle className="text-red-500 shrink-0" size={18} />
              <div>
                <h5 className="text-xs font-bold text-red-800">Estoque Crítico</h5>
                <p className="text-[10px] text-red-600">Filé Mignon abaixo do mínimo (2kg)</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <Clock className="text-amber-500 shrink-0" size={18} />
              <div>
                <h5 className="text-xs font-bold text-amber-800">Escala de Domingo</h5>
                <p className="text-[10px] text-amber-600">Ainda não publicada (Vence em 4h)</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <TrendingUp className="text-blue-500 shrink-0" size={18} />
              <div>
                <h5 className="text-xs font-bold text-blue-800">Meta de Faturamento</h5>
                <p className="text-[10px] text-blue-600">Você está 15% acima da meta semanal!</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
              <div>
                <h5 className="text-xs font-bold text-emerald-800">DRE Março Gerado</h5>
                <p className="text-[10px] text-emerald-600">Relatório pronto para download</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-[#1A237E] border border-[#1A237E]/20 rounded-lg hover:bg-gray-50 transition-colors">
            Ver Todas as Notificações
          </button>
        </div>

        <div className="bg-[#1A237E] p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
            <LayoutDashboard size={120} />
          </div>
          <h3 className="font-bold text-sm mb-2 relative z-10">Resumo Executivo</h3>
          <p className="text-[10px] text-white/70 leading-relaxed mb-4 relative z-10">
            Seu negócio apresenta uma tendência de crescimento saudável. O CMV está sob controle, mas há oportunidade de otimização na escala de equipe para reduzir horas extras.
          </p>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-[10px]">
              <span className="opacity-70">Eficiência Operacional</span>
              <span className="font-bold">88%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C8973A]" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EngenhariaView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Engenharia de Cardápio Digital</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Matriz de Miller (Popularidade x Rentabilidade)</h3>
        <div className="relative h-[400px] border-l-2 border-b-2 border-gray-200 ml-8 mb-8">
          <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Popularidade</div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rentabilidade</div>
          
          {/* Quadrants */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-gray-100 bg-blue-50/30 flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-300 uppercase">Burros de Carga</span>
            </div>
            <div className="border-b border-gray-100 bg-emerald-50/30 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-300 uppercase">Estrelas</span>
            </div>
            <div className="border-r border-gray-100 bg-gray-50/30 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-300 uppercase">Cães</span>
            </div>
            <div className="bg-amber-50/30 flex items-center justify-center">
              <span className="text-[10px] font-bold text-amber-300 uppercase">Quebra-Cabeças</span>
            </div>
          </div>

          {/* Points */}
          <div className="absolute top-[20%] right-[20%] w-4 h-4 bg-emerald-500 rounded-full shadow-lg cursor-pointer group">
            <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] p-2 rounded whitespace-nowrap z-10">
              Burger Especial (Estrela)
            </div>
          </div>
          <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-blue-500 rounded-full shadow-lg cursor-pointer group">
            <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] p-2 rounded whitespace-nowrap z-10">
              Batata Frita (Burro de Carga)
            </div>
          </div>
          <div className="absolute bottom-[20%] right-[30%] w-4 h-4 bg-amber-500 rounded-full shadow-lg cursor-pointer group">
            <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] p-2 rounded whitespace-nowrap z-10">
              Vinho Reserva (Quebra-Cabeça)
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-4">Recomendações Estratégicas</h3>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg">
              <h5 className="text-xs font-bold text-emerald-800">Manter e Promover (Estrelas)</h5>
              <p className="text-[10px] text-emerald-700 mt-1">O item "Burger Especial" tem alta margem e alta saída. Mantenha a qualidade e use em fotos de marketing.</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h5 className="text-xs font-bold text-blue-800">Reajustar Preço (Burros de Carga)</h5>
              <p className="text-[10px] text-blue-700 mt-1">"Batata Frita" vende muito mas tem margem baixa. Tente um pequeno reajuste de R$ 1,00 ou reduza a porção sutilmente.</p>
            </div>
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
              <h5 className="text-xs font-bold text-amber-800">Aumentar Vendas (Quebra-Cabeças)</h5>
              <p className="text-[10px] text-amber-700 mt-1">"Vinho Reserva" tem margem excelente mas sai pouco. Treine os garçons para oferecerem este item ativamente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EstoqueView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Gestão de Estoque & Curva ABC</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Registrar Entrada</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Valor em Estoque", value: "R$ 20.350", sub: "Total", color: "text-[#1A237E]" },
        { label: "Giro de Estoque", value: "4.2x", sub: "/mês", color: "text-emerald-600" },
        { label: "Itens Abaixo do Mínimo", value: "8", sub: "Ação Urgente", color: "text-red-500" },
        { label: "Perda Estimada", value: "1.2%", sub: "Este mês", color: "text-amber-600" },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</h4>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-[10px] text-gray-400 font-bold">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar insumo..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C8973A] bg-white" />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-500"><Filter size={18}/></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Insumo</th>
                <th className="px-6 py-4">Estoque Atual</th>
                <th className="px-6 py-4">Unidade</th>
                <th className="px-6 py-4">Custo Médio</th>
                <th className="px-6 py-4">Curva ABC</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Filé Mignon", stock: "12.5", unit: "kg", cost: "R$ 65,00", curve: "A", status: "Crítico" },
                { name: "Arroz Arbóreo", stock: "5.0", unit: "kg", cost: "R$ 18,20", curve: "B", status: "Baixo" },
                { name: "Óleo de Soja", stock: "48", unit: "L", cost: "R$ 7,50", curve: "C", status: "Normal" },
                { name: "Sal Refinado", stock: "10", unit: "kg", cost: "R$ 2,10", curve: "C", status: "Normal" },
                { name: "Camarão GG", stock: "8.2", unit: "kg", cost: "R$ 89,00", curve: "A", status: "Normal" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 font-mono">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-500">{item.unit}</td>
                  <td className="px-6 py-4 font-mono text-xs">{item.cost}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.curve === 'A' ? 'bg-red-100 text-red-700' : 
                      item.curve === 'B' ? 'bg-amber-100 text-amber-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>Classe {item.curve}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-[10px] font-bold ${
                      item.status === 'Crítico' ? 'text-red-600' : 
                      item.status === 'Baixo' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        item.status === 'Crítico' ? 'bg-red-600' : 
                        item.status === 'Baixo' ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}></div>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-6">Distribuição ABC (Valor)</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={abcData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {abcData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Classe A', desc: '70% do valor investido', value: 'R$ 14.200', color: '#1A237E' },
              { label: 'Classe B', desc: '20% do valor investido', value: 'R$ 4.100', color: '#C8973A' },
              { label: 'Classe C', desc: '10% do valor investido', value: 'R$ 2.050', color: '#2E7D32' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-800">{item.label}</div>
                    <div className="text-[8px] text-gray-400">{item.desc}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
          <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle size={14}/> Sugestão de Compra
          </h4>
          <p className="text-[10px] text-amber-700 leading-relaxed">
            Baseado no seu giro médio, você precisará repor <strong>15kg de Filé Mignon</strong> e <strong>10kg de Arroz</strong> nos próximos 3 dias para evitar ruptura.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DREView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">DRE Gerencial Mensal</h2>
      <div className="flex gap-2">
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8973A] font-bold text-gray-600">
          <option>Março 2024</option>
          <option>Fevereiro 2024</option>
          <option>Janeiro 2024</option>
        </select>
        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Download size={16}/> Exportar PDF</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1A237E] text-white uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Descrição da Conta</th>
              <th className="px-6 py-4 text-right">Valor (R$)</th>
              <th className="px-6 py-4 text-right">% Faturamento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-blue-50/50 font-black text-[#1A237E]">
              <td className="px-6 py-4">RECEITA BRUTA OPERACIONAL</td>
              <td className="px-6 py-4 text-right">67.000,00</td>
              <td className="px-6 py-4 text-right">100%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 pl-10 text-gray-500">(-) Impostos e Taxas</td>
              <td className="px-6 py-4 text-right text-red-500">(6.365,00)</td>
              <td className="px-6 py-4 text-right">9.5%</td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td className="px-6 py-4">RECEITA LÍQUIDA</td>
              <td className="px-6 py-4 text-right">60.635,00</td>
              <td className="px-6 py-4 text-right">90.5%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 pl-10 text-gray-500">(-) CMV (Custo Mercadoria Vendida)</td>
              <td className="px-6 py-4 text-right text-red-500">(21.708,00)</td>
              <td className="px-6 py-4 text-right">32.4%</td>
            </tr>
            <tr className="bg-emerald-50/30 font-bold text-emerald-700">
              <td className="px-6 py-4">MARGEM DE CONTRIBUIÇÃO</td>
              <td className="px-6 py-4 text-right">38.927,00</td>
              <td className="px-6 py-4 text-right">58.1%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 pl-10 text-gray-500">(-) Custos Fixos (Aluguel, Energia, etc)</td>
              <td className="px-6 py-4 text-right text-red-500">(12.500,00)</td>
              <td className="px-6 py-4 text-right">18.6%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 pl-10 text-gray-500">(-) Folha de Pagamento</td>
              <td className="px-6 py-4 text-right text-red-500">(14.000,00)</td>
              <td className="px-6 py-4 text-right">20.9%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 pl-10 text-gray-500">(-) Outras Despesas Operacionais</td>
              <td className="px-6 py-4 text-right text-red-500">(3.200,00)</td>
              <td className="px-6 py-4 text-right">4.8%</td>
            </tr>
            <tr className="bg-[#1A237E] font-black text-white text-lg">
              <td className="px-6 py-6">LUCRO LÍQUIDO (EBITDA)</td>
              <td className="px-6 py-6 text-right">R$ 9.227,00</td>
              <td className="px-6 py-6 text-right">13.8%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-6">Análise de Lucratividade</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Jan', lucro: 12 },
                { name: 'Fev', lucro: 15 },
                { name: 'Mar', lucro: 13.8 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} unit="%" />
                <Tooltip />
                <Bar dataKey="lucro" fill="#C8973A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-xs font-bold text-blue-800 mb-1">Dica do Consultor</h4>
            <p className="text-[10px] text-blue-700 leading-relaxed">
              Sua lucratividade de 13.8% está dentro da média do setor (10-15%). Para chegar aos 18%, foque em reduzir o CMV em 2 pontos percentuais.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const KPIView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Dashboards Avançados de KPI e NPS</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Satisfação do Cliente (NPS)</h3>
        <div className="flex items-center justify-center py-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#C8973A" strokeWidth="10" strokeDasharray="212 282" strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#1A237E]">75</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase">Zona de Excelência</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mt-4">
          <div className="p-2 bg-emerald-50 rounded">
            <div className="text-xs font-bold text-emerald-600">82%</div>
            <div className="text-[8px] uppercase text-gray-400">Promotores</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-xs font-bold text-gray-600">11%</div>
            <div className="text-[8px] uppercase text-gray-400">Neutros</div>
          </div>
          <div className="p-2 bg-red-50 rounded">
            <div className="text-xs font-bold text-red-600">7%</div>
            <div className="text-[8px] uppercase text-gray-400">Detratores</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Eficiência Operacional</h3>
        <div className="space-y-6">
          {[
            { label: "Tempo Médio de Preparo", value: "14 min", percent: 60, color: "bg-[#1A237E]" },
            { label: "Giro de Mesa", value: "3.2x / noite", percent: 80, color: "bg-[#C8973A]" },
            { label: "Ticket Médio por Garçom", value: "R$ 92,00", percent: 75, color: "bg-[#2E7D32]" },
            { label: "Taxa de Ocupação", value: "68%", percent: 68, color: "bg-blue-500" },
          ].map((kpi, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">{kpi.label}</span>
                <span className="font-bold text-[#1A237E]">{kpi.value}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${kpi.percent}%` }}
                  className={`h-full ${kpi.color}`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Frequência de Clientes</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: 'Seg', v: 45 }, { name: 'Ter', v: 52 }, { name: 'Qua', v: 48 },
              { name: 'Qui', v: 70 }, { name: 'Sex', v: 95 }, { name: 'Sáb', v: 110 },
              { name: 'Dom', v: 85 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#C8973A" fill="#C8973A" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="text-[10px] font-bold text-emerald-800">Insight de Vendas</div>
          <p className="text-[9px] text-emerald-700 leading-tight mt-1">
            Sexta e Sábado concentram 45% do seu faturamento semanal. Considere reforçar a equipe nesses dias.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const EscalaView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Escala de Equipe Automatizada</h2>
      <div className="flex gap-2">
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Nova Escala</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-sm font-bold text-[#1A237E]">Semana Atual</button>
            <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Próxima Semana</button>
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">08 Abr - 14 Abr, 2026</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase font-bold">
              <tr>
                <th className="px-4 py-3 border-r">Colaborador</th>
                <th className="px-4 py-3">Seg</th>
                <th className="px-4 py-3">Ter</th>
                <th className="px-4 py-3">Qua</th>
                <th className="px-4 py-3">Qui</th>
                <th className="px-4 py-3">Sex</th>
                <th className="px-4 py-3">Sáb</th>
                <th className="px-4 py-3">Dom</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Carlos Silva", role: "Cozinha", shifts: ["08-16", "08-16", "FOLGA", "08-16", "16-00", "16-00", "16-00"] },
                { name: "Ana Paula", role: "Salão", shifts: ["11-19", "11-19", "11-19", "FOLGA", "18-02", "18-02", "18-02"] },
                { name: "Marcos Lima", role: "Bar", shifts: ["FOLGA", "18-02", "18-02", "18-02", "18-02", "18-02", "18-02"] },
                { name: "Julia Santos", role: "Caixa", shifts: ["09-17", "09-17", "09-17", "09-17", "09-17", "FOLGA", "09-17"] },
                { name: "Ricardo Oliveira", role: "Cozinha", shifts: ["16-00", "FOLGA", "16-00", "16-00", "08-16", "08-16", "08-16"] },
              ].map((staff, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 border-r min-w-[140px]">
                    <div className="font-bold text-gray-800">{staff.name}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">{staff.role}</div>
                  </td>
                  {staff.shifts.map((shift, idx) => (
                    <td key={idx} className="px-1 py-4">
                      <div className={`p-2 rounded text-[10px] text-center font-bold transition-all cursor-pointer hover:scale-105 ${
                        shift === 'FOLGA' 
                          ? 'bg-gray-100 text-gray-400' 
                          : 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm'
                      }`}>
                        {shift}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-4">Resumo da Semana</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total de Horas</div>
              <div className="text-xl font-black text-[#1A237E]">168h</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Custo Estimado</div>
              <div className="text-xl font-black text-emerald-600">R$ 3.420</div>
            </div>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangle size={14}/>
                <span className="text-[10px] font-bold uppercase">Conflitos</span>
              </div>
              <p className="text-[10px] text-red-700">2 colaboradores com mais de 44h semanais detectados.</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-[#1A237E] text-white font-bold rounded-lg text-xs shadow-lg">
            Otimizar Escala com IA
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ComunidadeView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Suporte da Comunidade & Recursos</h2>
      <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Novo Tópico</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm">Discussões em Alta</h3>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-500">Recentes</button>
              <button className="text-[10px] font-bold px-3 py-1 bg-[#1A237E] rounded-full text-white">Populares</button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: "Como vocês estão lidando com a alta do preço do azeite?", author: "João - Trattoria Bella", replies: 12, time: "2h atrás", tags: ["Custos", "Fornecedores"] },
              { title: "Dica: Planilha de escala 12x36 atualizada", author: "LC Consultoria", replies: 45, time: "5h atrás", tags: ["Gestão", "RH"] },
              { title: "Dúvida sobre tributação no Simples Nacional", author: "Maria - Café Central", replies: 8, time: "1d atrás", tags: ["Financeiro"] },
              { title: "Estratégias para aumentar o Ticket Médio no jantar", author: "Pedro - Bistrô 22", replies: 24, time: "2d atrás", tags: ["Vendas"] },
            ].map((post, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all border border-gray-100 hover:border-[#C8973A]/30 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#C8973A]/10 group-hover:text-[#C8973A] transition-colors">
                    <MessageSquare size={20}/>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 group-hover:text-[#1A237E] transition-colors">{post.title}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400">Postado por {post.author} • {post.time}</span>
                      <div className="flex gap-1">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-black text-[#1A237E]">{post.replies}</div>
                  <div className="text-[8px] uppercase text-gray-400 font-bold">Respostas</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-bold text-gray-400 hover:text-[#1A237E] transition-colors uppercase tracking-widest">
            Ver Todas as Discussões
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-[#1A237E] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Users size={120} />
          </div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
            <Sparkles size={20} className="text-[#C8973A]"/> Mentoria VIP
          </h3>
          <p className="text-xs text-white/70 leading-relaxed mb-6 relative z-10">
            Acesso exclusivo a mentorias semanais com Lienys Carvalho e convidados.
          </p>
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 mb-6 relative z-10 backdrop-blur-sm">
            <div className="text-[10px] font-bold uppercase text-[#C8973A] mb-1">Próxima Call ao Vivo</div>
            <div className="text-sm font-bold">Quinta-feira, às 15h</div>
            <div className="text-[10px] opacity-60">Tema: Engenharia de Cardápio Lucrativa</div>
          </div>
          <button className="w-full py-3 bg-[#C8973A] text-[#1A237E] font-black rounded-xl text-xs shadow-lg hover:bg-[#e0aa3e] transition-colors relative z-10">
            ENTRAR NO GRUPO VIP
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#C8973A]"/> Biblioteca de Recursos
          </h3>
          <div className="space-y-3">
            {[
              { title: "Guia de Boas Práticas (ANVISA)", type: "PDF", size: "2.4MB" },
              { title: "Modelo de Contrato Freelancer", type: "DOCX", size: "1.1MB" },
              { title: "Checklist Abertura/Fechamento", type: "XLSX", size: "0.8MB" },
              { title: "Planilha de Inventário Mensal", type: "XLSX", size: "1.5MB" },
            ].map((file, i) => (
              <a key={i} href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400 group-hover:text-[#1A237E] transition-colors"><FileText size={16}/></div>
                  <div className="text-[11px] text-gray-600 font-medium group-hover:text-gray-900">{file.title}</div>
                </div>
                <div className="text-[9px] font-bold text-gray-300 uppercase">{file.type}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Platform Shell ---

const ManualView = () => (
  <div className="space-y-8 pb-12">
    <div className="bg-[#1A237E] p-12 rounded-3xl text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8973A] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-serif font-bold mb-4">Manual do Usuário</h2>
        <p className="text-lg text-white/70 max-w-2xl">Bem-vindo ao GastroMetrics. Este guia ajudará você a navegar e extrair o máximo de valor de cada ferramenta da nossa plataforma.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { 
          title: "Dashboard Geral", 
          icon: <LayoutDashboard size={24}/>, 
          desc: "Visão panorâmica do seu negócio. Acompanhe faturamento, ticket médio e CMV em tempo real.",
          use: "Use para começar o dia e identificar tendências rápidas."
        },
        { 
          title: "Diagnóstico 360°", 
          icon: <BarChart3 size={24}/>, 
          desc: "Análise profunda de saúde financeira e operacional.",
          use: "Use mensalmente para ajustes estratégicos de rota."
        },
        { 
          title: "Fichas Técnicas", 
          icon: <ChefHat size={24}/>, 
          desc: "Padronização total de receitas e cálculo automático de custos.",
          use: "Cadastre cada ingrediente para ter precisão cirúrgica no lucro."
        },
        { 
          title: "Markup & CMV", 
          icon: <Calculator size={24}/>, 
          desc: "Ferramenta de precificação inteligente baseada em custos reais.",
          use: "Ajuste seus preços sempre que houver variação nos insumos."
        },
        { 
          title: "Engenharia de Cardápio", 
          icon: <TrendingUp size={24}/>, 
          desc: "Matriz BC para classificar pratos em Estrelas, Cavalos de Carga, Enigmas e Cães.",
          use: "Otimize seu lucro focando nos pratos que realmente trazem margem."
        },
        { 
          title: "Gestão de Estoque", 
          icon: <Box size={24}/>, 
          desc: "Controle de entradas, saídas e alertas de estoque crítico.",
          use: "Evite rupturas e desperdícios com inventários frequentes."
        }
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#C8973A] transition-all group">
          <div className="w-12 h-12 rounded-xl bg-[#1A237E]/5 flex items-center justify-center text-[#1A237E] mb-6 group-hover:bg-[#C8973A] group-hover:text-white transition-all">
            {item.icon}
          </div>
          <h3 className="text-lg font-bold text-[#1A237E] mb-3">{item.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
          <div className="pt-4 border-t border-gray-50">
            <span className="text-[10px] font-bold text-[#C8973A] uppercase tracking-widest">Como usar:</span>
            <p className="text-xs text-gray-400 mt-1 italic">{item.use}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 flex flex-col md:flex-row gap-8 items-center">
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
        <HelpCircle size={32}/>
      </div>
      <div>
        <h3 className="text-lg font-bold text-amber-900 mb-2">Precisa de suporte adicional?</h3>
        <p className="text-sm text-amber-800/70">Nossa equipe de consultores está disponível na Comunidade VIP para ajudar com dúvidas específicas sobre a gestão do seu restaurante.</p>
        <button className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors">Acessar Comunidade</button>
      </div>
    </div>
  </div>
);

export default function PlatformShell({ onClose }: { onClose: () => void }) {
  const [activeTool, setActiveTool] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tools = [
    { id: 'dashboard', label: 'Dashboard Geral', icon: <LayoutDashboard size={20}/>, component: <DashboardView /> },
    { id: 'diagnostico', label: 'Diagnóstico 360°', icon: <BarChart3 size={20}/>, component: <DiagnosticoView /> },
    { id: 'fichas', label: 'Fichas Técnicas', icon: <ChefHat size={20}/>, component: <FichasView /> },
    { id: 'markup', label: 'Markup & CMV', icon: <Calculator size={20}/>, component: <MarkupView /> },
    { id: 'engenharia', label: 'Engenharia Cardápio', icon: <TrendingUp size={20}/>, component: <EngenhariaView /> },
    { id: 'estoque', label: 'Gestão de Estoque', icon: <Box size={20}/>, component: <EstoqueView /> },
    { id: 'dre', label: 'DRE Gerencial', icon: <FileSpreadsheet size={20}/>, component: <DREView /> },
    { id: 'kpi', label: 'KPIs & NPS', icon: <Users size={20}/>, component: <KPIView /> },
    { id: 'escala', label: 'Escala de Equipe', icon: <Calendar size={20}/>, component: <EscalaView /> },
    { id: 'comunidade', label: 'Comunidade', icon: <MessageSquare size={20}/>, component: <ComunidadeView /> },
    { id: 'manual', label: 'Manual do Usuário', icon: <BookOpen size={20}/>, component: <ManualView /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-[#FAF8F4] flex overflow-hidden"
    >
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 240 : 70 }}
        className="bg-[#1A237E] text-white flex flex-col h-full transition-all duration-300 relative z-30 shadow-2xl shrink-0"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C8973A] rounded flex items-center justify-center font-serif font-bold text-[#1A237E] shadow-lg">LC</div>
              <span className="font-serif font-bold tracking-tight text-lg">GastroMetrics</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {isSidebarOpen && (
            <div className="px-6 mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Menu Principal</span>
            </div>
          )}
          <nav className="px-3 space-y-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group ${
                  activeTool === tool.id 
                    ? 'bg-[#C8973A] text-[#1A237E] font-bold shadow-lg' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`shrink-0 transition-transform group-hover:scale-110 ${activeTool === tool.id ? 'text-[#1A237E]' : 'text-[#C8973A]'}`}>
                  {tool.icon}
                </span>
                {isSidebarOpen && <span className="text-sm">{tool.label}</span>}
                {isSidebarOpen && activeTool === tool.id && (
                  <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-[#1A237E] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {isSidebarOpen && (
            <div className="px-6 mt-8 mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Suporte</span>
            </div>
          )}
          <div className="px-3 space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <HelpCircle size={20} className="text-[#C8973A]" />
              {isSidebarOpen && <span className="text-sm">Central de Ajuda</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
              <Settings size={20} className="text-[#C8973A]" />
              {isSidebarOpen && <span className="text-sm">Configurações</span>}
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className={`flex items-center gap-3 p-2 rounded-xl mb-4 ${isSidebarOpen ? 'bg-white/5' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-[#C8973A] flex items-center justify-center text-[#1A237E] font-bold text-xs shrink-0">LC</div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate">Lienys Carvalho</div>
                <div className="text-[10px] text-white/40 truncate">Admin</div>
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FAF8F4] relative">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 md:px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <LogoIcon />
            </div>
            <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {tools.find(t => t.id === activeTool)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors shadow-sm">
              <FileDown size={14} />
              EXPORTAR PDF
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-bold text-gray-800">Lienys Carvalho</div>
                <div className="text-[9px] text-gray-400">Admin</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#C8973A] flex items-center justify-center text-[#1A237E] font-bold text-xs shadow-sm">LC</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tools.find(t => t.id === activeTool)?.component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating AI Assistant Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#1A237E] text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#C8973A] relative group"
          >
            <div className="absolute -top-12 right-0 bg-white text-[#1A237E] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Dúvidas? Fale com a IA GastroMetrics
            </div>
            <Sparkles size={24} className="text-[#C8973A]" />
          </motion.button>
        </div>
      </main>
    </motion.div>
  );
}

function LogoIcon() {
  return (
    <div className="w-8 h-8 bg-[#C8973A] rounded flex items-center justify-center font-serif font-bold text-[#1A237E]">LC</div>
  );
}
