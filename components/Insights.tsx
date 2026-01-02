
import React from 'react';
import { Article } from '../types';
import { ArrowRight } from 'lucide-react';

interface InsightsProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  onSeeAll: () => void;
}

const Insights: React.FC<InsightsProps> = ({ articles, onArticleSelect, onSeeAll }) => {
  return (
    <section id="insights" className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-50 border-t border-slate-100" aria-labelledby="insights-title">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start mb-16 lg:mb-24">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Conhecimento Estratégico</span>
            <h2 id="insights-title" className="text-4xl lg:text-5xl font-serif text-slate-900">Elite <span className="italic">Insights</span></h2>
          </div>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {articles.slice(0, 3).map((article) => (
            <article 
              key={article.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => onArticleSelect(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onArticleSelect(article)}
              aria-label={`Ler artigo: ${article.title}`}
            >
              <div className="overflow-hidden mb-8 aspect-[4/5] relative">
                <img 
                  src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600'} 
                  alt={article.title} 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500" aria-hidden="true" />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">{article.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" aria-hidden="true" />
                <time dateTime={article.date} className="text-[9px] uppercase tracking-widest text-slate-400">{article.date}</time>
              </div>
              <h3 className="text-2xl font-serif text-slate-900 leading-snug transition-all duration-300 group-hover:underline decoration-1 underline-offset-4">
                {article.title}
              </h3>
            </article>
          ))}
        </div>

        {/* Botão Centralizado Abaixo */}
        <div className="mt-20 lg:mt-32 flex justify-center">
          <button 
            onClick={onSeeAll}
            className="group flex items-center space-x-6 text-slate-900 hover:opacity-50 transition-all focus:ring-2 focus:ring-slate-900 focus:outline-none p-2"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold border-b-2 border-slate-900 pb-2">
              Acessar todos os artigos
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Insights;
