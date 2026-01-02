
import React from 'react';
import { PRACTICE_AREAS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface PracticeAreasProps {
  onNavigate?: () => void;
  onSelectArea?: (area: string) => void;
}

const PracticeAreas: React.FC<PracticeAreasProps> = ({ onNavigate, onSelectArea }) => {
  const featuredAreas = PRACTICE_AREAS.slice(0, 4);
  const delays = ['200ms', '350ms', '500ms', '650ms'];

  return (
    <section id="practice" className="py-24 lg:py-32 px-6 lg:px-12 bg-white" aria-labelledby="practice-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-20">
          <div className="max-w-2xl text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Portfólio de Expertise</span>
            <h2 id="practice-title" className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
              Excelência em dimensões <br/>estratégicas do <span className="italic">direito</span>.
            </h2>
          </div>
          <div className="hidden md:block" aria-hidden="true">
             <div className="h-[1px] w-12 bg-slate-200 mb-6"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {featuredAreas.map((area, index) => (
            <div 
              key={index} 
              onClick={() => onSelectArea?.(area.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectArea?.(area.title)}
              aria-label={`Ver detalhes da área: ${area.title}`}
              className="animate-fadeInUp group relative aspect-square bg-slate-50 border border-slate-100 p-12 flex flex-col items-center text-center transition-all duration-700 hover:border-slate-900 hover:bg-white overflow-hidden shadow-sm hover:shadow-xl cursor-pointer focus:ring-2 focus:ring-slate-900 focus:outline-none"
              style={{ animationDelay: delays[index] }}
            >
              <div className="relative z-10 w-full">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 transition-all duration-300 ease-in-out">
                  {area.title}
                </h3>
                <div className="h-[1px] w-12 bg-slate-900 mx-auto mb-8 group-hover:w-full transition-all duration-700" aria-hidden="true"></div>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {area.description}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-100 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-1000 blur-3xl" aria-hidden="true"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-slate-200 rounded-full opacity-0 group-hover:opacity-5 transition-all duration-1000 blur-2xl" aria-hidden="true"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center border-t border-slate-50 pt-16">
          <button 
            onClick={onNavigate}
            className="group flex items-center space-x-6 text-slate-900 hover:opacity-70 transition-all focus:ring-2 focus:ring-slate-900 focus:outline-none p-2"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold border-b-2 border-slate-900 pb-2">
              Ver todas as áreas de atuação
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
