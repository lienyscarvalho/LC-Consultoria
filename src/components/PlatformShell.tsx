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
  DollarSign
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
  Pie
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
      <button className="btn-primary py-2 px-4 text-sm">Gerar Novo Relatório</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Saúde Financeira</h4>
        <div className="text-3xl font-bold text-emerald-600">8.4/10</div>
        <p className="text-xs text-gray-400 mt-2">Baseado em 24 indicadores de performance</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Potencial de Economia</h4>
        <div className="text-3xl font-bold text-[#C8973A]">R$ 4.250/mês</div>
        <p className="text-xs text-gray-400 mt-2">Identificado em desperdícios de CMV</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Ponto de Equilíbrio</h4>
        <div className="text-3xl font-bold text-[#1A237E]">Dia 18</div>
        <p className="text-xs text-gray-400 mt-2">Projeção para o mês atual</p>
      </div>
    </div>
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold mb-4">Plano de Ação Recomendado</h3>
      <div className="space-y-4">
        {[
          { task: "Revisar fichas técnicas dos 5 pratos mais vendidos", priority: "Alta", status: "Pendente" },
          { task: "Negociar preço do fornecedor de proteínas", priority: "Média", status: "Em andamento" },
          { task: "Implementar controle de desperdício na cozinha", priority: "Alta", status: "Pendente" }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.priority === 'Alta' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium">{item.task}</span>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-white border border-gray-200 rounded uppercase">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FichasView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Fichas Técnicas (FTP)</h2>
      <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Nova Ficha</button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-bottom bg-gray-50 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Buscar prato ou insumo..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#C8973A]" />
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-white"><Filter size={18}/></button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4">Prato / Item</th>
            <th className="px-6 py-4">Categoria</th>
            <th className="px-6 py-4">Custo Unit.</th>
            <th className="px-6 py-4">Preço Venda</th>
            <th className="px-6 py-4">Margem</th>
            <th className="px-6 py-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { name: "Burger Artesanal", cat: "Pratos Principais", cost: "R$ 12,40", price: "R$ 38,00", margin: "67%" },
            { name: "Risoto de Cogumelos", cat: "Pratos Principais", cost: "R$ 15,80", price: "R$ 52,00", margin: "69%" },
            { name: "Petit Gateau", cat: "Sobremesas", cost: "R$ 6,20", price: "R$ 24,00", margin: "74%" },
            { name: "Soda Italiana", cat: "Bebidas", cost: "R$ 2,10", price: "R$ 14,00", margin: "85%" },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
              <td className="px-6 py-4 text-gray-500">{item.cat}</td>
              <td className="px-6 py-4 font-mono">{item.cost}</td>
              <td className="px-6 py-4 font-mono">{item.price}</td>
              <td className="px-6 py-4"><span className="text-emerald-600 font-bold">{item.margin}</span></td>
              <td className="px-6 py-4">
                <button className="text-[#1A237E] hover:underline font-medium">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MarkupView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Calculadora de Markup e CMV</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-6 flex items-center gap-2"><Calculator size={18} className="text-[#C8973A]"/> Simulador de Preço</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Custo da Matéria Prima (R$)</label>
            <input type="number" defaultValue="15.50" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#C8973A]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Impostos (%)</label>
              <input type="number" defaultValue="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Taxas Cartão (%)</label>
              <input type="number" defaultValue="3.5" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Margem de Lucro Desejada (%)</label>
            <input type="number" defaultValue="20" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
          </div>
          <div className="pt-4">
            <div className="p-4 bg-[#1A237E] text-white rounded-xl">
              <div className="text-xs opacity-70 uppercase font-bold mb-1">Preço de Venda Sugerido</div>
              <div className="text-3xl font-bold">R$ 48,40</div>
              <div className="mt-2 text-xs text-[#C8973A]">Markup Multiplicador: 3.12x</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-[#C8973A]"/> Análise de CMV Real</h3>
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-400 uppercase font-bold">CMV Atual</div>
              <div className="text-4xl font-bold text-[#1A237E]">32.4%</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-emerald-600 font-bold">Meta: 28%</div>
              <div className="text-xs text-red-500 font-bold">Desvio: +4.4%</div>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#C8973A]" style={{ width: '32.4%' }}></div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Atenção:</strong> Seu CMV está acima da meta recomendada para sua categoria. Verifique desperdícios na produção ou reajuste preços de itens com markup abaixo de 2.5x.
            </p>
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
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500"><Download size={18}/></button>
        <button className="btn-primary py-2 px-4 text-sm">Atualizar Dados</button>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Faturamento Diário (Últimos 7 dias)</h3>
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
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip />
              <Area type="monotone" dataKey="valor" stroke="#1A237E" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Alertas Críticos</h3>
        <div className="space-y-4">
          <div className="flex gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
            <AlertTriangle className="text-red-500 shrink-0" size={18} />
            <div>
              <h5 className="text-xs font-bold text-red-800">Estoque Baixo: Filé Mignon</h5>
              <p className="text-[10px] text-red-600">Abaixo do estoque de segurança (2kg restantes)</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <Clock className="text-amber-500 shrink-0" size={18} />
            <div>
              <h5 className="text-xs font-bold text-amber-800">Escala Pendente</h5>
              <p className="text-[10px] text-amber-600">Escala de Domingo ainda não foi publicada</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <TrendingUp className="text-blue-500 shrink-0" size={18} />
            <div>
              <h5 className="text-xs font-bold text-blue-800">Meta Batida!</h5>
              <p className="text-[10px] text-blue-600">Faturamento semanal superou a meta em 15%</p>
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
      <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Registrar Entrada</button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Insumo</th>
              <th className="px-6 py-4">Estoque Atual</th>
              <th className="px-6 py-4">Unidade</th>
              <th className="px-6 py-4">Curva ABC</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: "Filé Mignon", stock: "12.5", unit: "kg", curve: "A", status: "Normal" },
              { name: "Arroz Arbóreo", stock: "5.0", unit: "kg", curve: "B", status: "Baixo" },
              { name: "Óleo de Soja", stock: "48", unit: "L", curve: "C", status: "Normal" },
              { name: "Sal Refinado", stock: "10", unit: "kg", curve: "C", status: "Normal" },
            ].map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">{item.unit}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    item.curve === 'A' ? 'bg-red-100 text-red-700' : 
                    item.curve === 'B' ? 'bg-amber-100 text-amber-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>Classe {item.curve}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 text-[10px] font-bold ${item.status === 'Baixo' ? 'text-red-500' : 'text-emerald-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Baixo' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Distribuição ABC</h3>
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
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1A237E]"></div> Classe A (70% valor)</span>
            <span className="font-bold">R$ 14.200</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C8973A]"></div> Classe B (20% valor)</span>
            <span className="font-bold">R$ 4.100</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#2E7D32]"></div> Classe C (10% valor)</span>
            <span className="font-bold">R$ 2.050</span>
          </div>
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
        <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option>Março 2024</option>
          <option>Fevereiro 2024</option>
        </select>
        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Download size={16}/> Exportar PDF</button>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#1A237E] text-white uppercase text-[10px] font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4">Descrição da Conta</th>
            <th className="px-6 py-4 text-right">Valor (R$)</th>
            <th className="px-6 py-4 text-right">% Faturamento</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="bg-gray-50 font-bold">
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
          <tr className="bg-gray-50 font-bold">
            <td className="px-6 py-4">MARGEM DE CONTRIBUIÇÃO</td>
            <td className="px-6 py-4 text-right text-emerald-600">38.927,00</td>
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
          <tr className="bg-[#FAF8F4] font-black text-[#1A237E] text-lg">
            <td className="px-6 py-6">LUCRO LÍQUIDO (EBITDA)</td>
            <td className="px-6 py-6 text-right">12.427,00</td>
            <td className="px-6 py-6 text-right">18.5%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const KPIView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Dashboards Avançados de KPI e NPS</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-sm mb-6">Satisfação do Cliente (NPS)</h3>
        <div className="flex items-center justify-center py-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#C8973A" strokeWidth="10" strokeDasharray="212 282" strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#1A237E]">75</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Zona de Excelência</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
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
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Tempo Médio de Preparo</span>
              <span className="font-bold text-[#1A237E]">14 min</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#1A237E]" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Giro de Mesa</span>
              <span className="font-bold text-[#1A237E]">3.2x / noite</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#C8973A]" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500 font-medium">Ticket Médio por Garçom</span>
              <span className="font-bold text-[#1A237E]">R$ 92,00</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#2E7D32]" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EscalaView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Escala de Equipe Automatizada</h2>
      <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2"><Plus size={16}/> Nova Escala</button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-sm font-bold text-[#1A237E]">Semana Atual</button>
          <button className="text-sm text-gray-400">Próxima Semana</button>
        </div>
        <div className="text-xs font-bold text-gray-500">08 Abr - 14 Abr, 2026</div>
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
            ].map((staff, i) => (
              <tr key={i}>
                <td className="px-4 py-4 border-r">
                  <div className="font-bold text-gray-800">{staff.name}</div>
                  <div className="text-[10px] text-gray-400">{staff.role}</div>
                </td>
                {staff.shifts.map((shift, idx) => (
                  <td key={idx} className="px-2 py-4">
                    <div className={`p-2 rounded text-center font-bold ${shift === 'FOLGA' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
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
  </div>
);

const ComunidadeView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-[#1A237E]">Suporte da Comunidade & Recursos</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-4">Discussões Recentes</h3>
          <div className="space-y-4">
            {[
              { title: "Como vocês estão lidando com a alta do preço do azeite?", author: "João - Trattoria Bella", replies: 12, time: "2h atrás" },
              { title: "Dica: Planilha de escala 12x36 atualizada", author: "LC Consultoria", replies: 45, time: "5h atrás" },
              { title: "Dúvida sobre tributação no Simples Nacional", author: "Maria - Café Central", replies: 8, time: "1d atrás" },
            ].map((post, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><MessageSquare size={18}/></div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800">{post.title}</h5>
                    <div className="text-[10px] text-gray-400">Postado por {post.author} • {post.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#1A237E]">{post.replies}</div>
                  <div className="text-[8px] uppercase text-gray-400">Respostas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-[#1A237E] p-6 rounded-xl text-white shadow-lg">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Users size={18} className="text-[#C8973A]"/> Mentoria em Grupo</h3>
          <p className="text-xs text-white/70 leading-relaxed mb-4">Participe das nossas calls semanais de tira-dúvidas com especialistas da LC Consultoria.</p>
          <div className="p-3 bg-white/10 rounded-lg border border-white/20 mb-4">
            <div className="text-[10px] font-bold uppercase text-[#C8973A]">Próxima Call</div>
            <div className="text-sm font-bold">Quinta-feira, às 15h</div>
            <div className="text-[10px] opacity-60">Tema: Engenharia de Cardápio</div>
          </div>
          <button className="w-full py-2 bg-[#C8973A] text-[#1A237E] font-bold rounded-lg text-xs">Entrar no Grupo VIP</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-sm mb-4">Base de Conhecimento</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1A237E]"><FileText size={14}/> Guia de Boas Práticas (ANVISA)</a>
            <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1A237E]"><FileText size={14}/> Modelo de Contrato de Freelancer</a>
            <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#1A237E]"><FileText size={14}/> Checklist de Abertura e Fechamento</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Platform Shell ---

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
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#1A237E] text-white flex flex-col h-full transition-all duration-300 relative z-10"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C8973A] rounded flex items-center justify-center font-serif font-bold text-[#1A237E]">LC</div>
              <span className="font-serif font-bold tracking-tight">GastroMetrics</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                activeTool === tool.id 
                  ? 'bg-[#C8973A] text-[#1A237E] font-bold shadow-lg' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="shrink-0">{tool.icon}</span>
              {isSidebarOpen && <span className="text-sm">{tool.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onClose}
            className="w-full flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
            {isSidebarOpen && <span className="text-sm">Sair da Plataforma</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FAF8F4] relative">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 md:px-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <LogoIcon />
            </div>
            <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              {tools.find(t => t.id === activeTool)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              SISTEMA ONLINE
            </div>
            <div className="w-8 h-8 rounded-full bg-[#C8973A] flex items-center justify-center text-[#1A237E] font-bold text-xs shadow-sm">
              LC
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tools.find(t => t.id === activeTool)?.component}
            </motion.div>
          </AnimatePresence>
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
