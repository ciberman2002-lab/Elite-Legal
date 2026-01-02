
import React, { useEffect, useRef, useState } from 'react';
import { PRACTICE_AREAS, PROFESSIONALS } from '../constants';

interface PracticeItemProps {
  area: typeof PRACTICE_AREAS[0];
  index: number;
  onSelectProfessional: (id: string) => void;
}

const PracticeItem: React.FC<PracticeItemProps> = ({ area, index, onSelectProfessional }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  const areaProfessionals = PROFESSIONALS.filter(p => p.area === area.title).slice(0, 3);

  return (
    <div className="group border-t border-slate-100 pt-12 flex flex-col h-full">
      {/* Indicador e Título */}
      <div className="flex justify-between items-start mb-8">
        <span className="text-4xl font-serif text-slate-100 group-hover:text-slate-900 transition-colors duration-500">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <div className="w-12 h-[1px] bg-slate-100 mt-6 group-hover:w-20 group-hover:bg-slate-900 transition-all duration-700" aria-hidden="true"></div>
      </div>

      <h3 className="text-3xl font-serif text-slate-900 mb-6 leading-tight">{area.title}</h3>
      
      {/* Descrição */}
      <div className="flex-grow">
        <p className="text-slate-500 font-light leading-relaxed text-lg mb-10">
          {area.description}
        </p>
      </div>

      {/* Bloco de Conteúdo Fixo na Base */}
      <div className="mt-auto space-y-12">
        {/* Destaques da Prática */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-4">Destaques da Prática</h4>
          <p className="text-base text-slate-700 leading-relaxed font-light italic border-l border-slate-100 pl-6">
            {area.details}
          </p>
        </div>

        {/* Liderança na Área */}
        <div 
          ref={domRef}
          className={`pt-8 border-t border-slate-50 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h5 className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-6">Liderança na Área</h5>
          <div className="flex flex-wrap gap-8 items-start">
            {areaProfessionals.map((prof) => (
              <div 
                key={prof.id} 
                onClick={() => onSelectProfessional(prof.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectProfessional(prof.id)}
                aria-label={`Ver perfil de ${prof.name}`}
                className="flex flex-col items-center space-y-3 group/prof cursor-pointer focus:outline-none"
              >
                <div className="w-24 h-24 overflow-hidden rounded-full border border-slate-100 grayscale group-hover/prof:grayscale-0 transition-all duration-700 shadow-sm hover:shadow-xl">
                  <img 
                    src={prof.image} 
                    alt={`Foto de perfil: ${prof.name}`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/prof:scale-110 transition-transform duration-1000" 
                  />
                </div>
                <div className="text-center">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-slate-900 block leading-tight group-hover/prof:underline decoration-1 underline-offset-4">
                    {prof.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PracticeViewProps {
  onSelectProfessional?: (id: string) => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ onSelectProfessional = () => {} }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 lg:px-12 border-b border-slate-50 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-bold mb-8 block">Nossa Expertise</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-slate-900 mb-20 leading-[1.05]">
            Excelência em <br/><span className="italic">todas</span> as dimensões.
          </h1>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed">
              Atuamos na intersecção entre o direito e a estratégia global, operando de forma fluida para resolver os desafios mais complexos do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de 2 Colunas Alinhado */}
      <section className="py-24 lg:py-40 px-6 lg:px-12" aria-label="Lista de áreas de atuação detalhadas">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
          {PRACTICE_AREAS.map((area, index) => (
            <PracticeItem 
              key={index} 
              area={area} 
              index={index} 
              onSelectProfessional={onSelectProfessional} 
            />
          ))}
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 bg-slate-900 text-white px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:md:grid-cols-2 gap-24 items-center">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            Nossa abordagem é <span className="italic text-slate-400">indivisível</span>.
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Não fragmentamos seus problemas. Seus desafios são analisados por uma equipe multidisciplinar, garantindo que a solução jurídica seja, acima de tudo, uma vantagem competitiva.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PracticeView;
