import React, { useState } from 'react';
import { Droplets, Utensils, ChevronRight, Info, X, Clock, Download, ChefHat } from 'lucide-react';
import { Recipe } from '../../types';

const Nutrition: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState(1.2);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const waterGoal = 2.8;

  const addWater = () => {
    setWaterIntake(prev => Math.min(prev + 0.25, waterGoal));
  };

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Frango Grelhado com Ervas',
      tags: ['Almoço', 'Low Carb'],
      time: '25 min',
      kcal: 320,
      img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1469&auto=format&fit=crop',
      ingredients: ['150g Peito de Frango', 'Suco de 1 limão', 'Alecrim a gosto', 'Sal rosa', '1 colher de azeite'],
      method: ['Tempere o frango com limão e sal.', 'Aqueça a grelha com azeite.', 'Grelhe por 5 min cada lado.', 'Adicione alecrim no final.']
    },
    {
      id: '2',
      title: 'Bowl de Açaí Proteico',
      tags: ['Pós-Treino', 'Energético'],
      time: '10 min',
      kcal: 450,
      img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1336&auto=format&fit=crop',
      ingredients: ['200g Açaí puro', '1 scoop Whey Protein', '1 banana', 'Granola sem açúcar'],
      method: ['Bata o açaí com whey no liquidificador.', 'Sirva no bowl.', 'Adicione a banana fatiada e granola.']
    },
    {
      id: '3',
      title: 'Omelete de Claras com Espinafre',
      tags: ['Pós-Treino', 'Leve'],
      time: '15 min',
      kcal: 180,
      img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1328&auto=format&fit=crop',
      ingredients: ['4 claras de ovo', '1 punhado de espinafre', 'Tomate cereja', 'Orégano'],
      method: ['Bata as claras.', 'Refogue o espinafre levemente.', 'Misture tudo e leve à frigideira.']
    },
    {
      id: '4',
      title: 'Shake de Recuperação Muscular',
      tags: ['Pós-Treino', 'Líquido'],
      time: '5 min',
      kcal: 250,
      img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1396&auto=format&fit=crop',
      ingredients: ['300ml leite desnatado', '1 scoop Whey Chocolate', '5g Creatina', 'Gelo'],
      method: ['Misture tudo na coqueteleira.', 'Agite bem e beba imediatamente.']
    },
    {
      id: '5',
      title: 'Batata Doce Rústica com Atum',
      tags: ['Pós-Treino', 'Sólido'],
      time: '30 min',
      kcal: 400,
      img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1470&auto=format&fit=crop',
      ingredients: ['200g Batata Doce', '1 lata de Atum em água', 'Páprica doce', 'Azeite'],
      method: ['Corte a batata em cubos.', 'Tempere com páprica e azeite.', 'Airfryer por 20min.', 'Sirva com atum.']
    },
    {
      id: '6',
      title: 'Panqueca de Banana Fit',
      tags: ['Café da Manhã', 'Doce'],
      time: '15 min',
      kcal: 280,
      img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1374&auto=format&fit=crop',
      ingredients: ['1 banana madura', '2 ovos', 'Canela em pó', 'Aveia em flocos'],
      method: ['Amasse a banana.', 'Misture com ovos e aveia.', 'Frite em frigideira antiaderente.']
    },
    {
      id: '7',
      title: 'Iogurte Grego com Frutas Vermelhas',
      tags: ['Lanche', 'Proteico'],
      time: '5 min',
      kcal: 200,
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1374&auto=format&fit=crop',
      ingredients: ['1 pote Iogurte Grego Natural', 'Morangos picados', 'Mirtilos', 'Mel (opcional)'],
      method: ['Coloque o iogurte no pote.', 'Adicione as frutas por cima.', 'Finalize com um fio de mel.']
    }
  ];

  return (
    <div className="px-6 space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Hydration Card */}
      <section className="bg-white dark:bg-lf-dark border border-gray-200 dark:border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Droplets className="w-32 h-32 text-blue-500" />
        </div>
        
        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-1">Hidratação</h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">Mantenha sua performance no auge.</p>

        <div className="flex items-end gap-2 mb-2">
           <span className="text-4xl font-display font-bold text-gray-900 dark:text-white">{waterIntake.toFixed(1)}</span>
           <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">/ {waterGoal} Litros</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-lf-navy/30 rounded-full h-3 mb-6 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(waterIntake / waterGoal) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={addWater}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-wider shadow-lg"
        >
          <Droplets className="w-4 h-4" /> Registrar +250ml
        </button>
      </section>

      {/* Recipes List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-gray-900 dark:text-white">Receitas Pós-Treino</h2>
          <Utensils className="w-5 h-5 text-gray-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white dark:bg-lf-dark rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 flex group cursor-pointer hover:border-lf-navy/30 dark:hover:border-lf-neon/30 transition-colors shadow-sm"
            >
               <div className="w-1/3 relative">
                 <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover" />
               </div>
               <div className="p-4 flex-1">
                 <div className="flex flex-wrap gap-1 mb-2">
                   {recipe.tags.map(tag => (
                     <span key={tag} className="text-[9px] font-bold text-lf-navy dark:text-lf-neon bg-lf-navy/10 dark:bg-lf-neon/10 px-1.5 py-0.5 rounded uppercase">
                       {tag}
                     </span>
                   ))}
                 </div>
                 <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-tight">{recipe.title}</h3>
                 <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                   <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {recipe.time}</span>
                   <span>{recipe.kcal} kcal</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECIPE MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedRecipe(null)}
          ></div>
          <div className="bg-white dark:bg-lf-dark w-full max-w-md rounded-2xl relative border dark:border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="h-48 relative shrink-0">
               <img src={selectedRecipe.img} className="w-full h-full object-cover" />
               <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-white/20"
               >
                 <X className="w-5 h-5" />
               </button>
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white dark:from-lf-dark to-transparent p-6 pt-12">
                 <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{selectedRecipe.title}</h2>
               </div>
            </div>

            <div className="p-6 overflow-y-auto">
               {/* Stats */}
               <div className="flex gap-4 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="text-center px-4 border-r border-gray-100 dark:border-white/5">
                    <span className="block text-lf-navy dark:text-lf-neon font-bold text-lg">{selectedRecipe.time}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Tempo</span>
                  </div>
                  <div className="text-center px-4">
                    <span className="block text-lf-navy dark:text-lf-neon font-bold text-lg">{selectedRecipe.kcal}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Calorias</span>
                  </div>
               </div>

               <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">Ingredientes</h3>
               <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lf-navy dark:bg-lf-neon mt-1.5 shrink-0"></span>
                      {ing}
                    </li>
                  ))}
               </ul>

               <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                 <ChefHat className="w-4 h-4 text-lf-navy dark:text-lf-neon" /> Modo de Preparo
               </h3>
               <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  {selectedRecipe.method.map((step, i) => (
                    <div key={i} className="flex gap-3">
                       <span className="font-bold text-lf-navy dark:text-lf-neon text-lg">{i + 1}.</span>
                       <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-lf-navy/20 border-t border-gray-100 dark:border-white/5 shrink-0">
               <button className="w-full bg-lf-navy dark:bg-lf-navy text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors">
                 <Download className="w-4 h-4" /> Baixar Receita (PDF)
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Nutrition;