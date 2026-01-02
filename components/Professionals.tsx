
import React, { useEffect } from 'react';
import { PROFESSIONALS } from '../constants';

interface ProfessionalsProps {
  scrollToArea?: string | null;
  scrollToProfessionalId?: string | null;
}

const Professionals: React.FC<ProfessionalsProps> = ({ scrollToArea, scrollToProfessionalId }) => {
  useEffect(() => {
    if (scrollToProfessionalId) {
      const element = document.getElementById(`prof-${scrollToProfessionalId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } else if (scrollToArea) {
      const element = document.getElementById(`area-${scrollToArea.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [scrollToArea, scrollToProfessionalId]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12 border-b border-slate-50">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-6 block">Nosso Capital Humano</span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-slate-900 mb-16 leading-[1.1]">
            As mentes que <span className="italic">lideram</span> a vanguarda.
          </h1>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed">
              Nossos sócios e associados são selecionados por sua excelência técnica absoluta e visão estratégica inigualável.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Profissionais */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" aria-label="Lista detalhada de nossos advogados e sócios">
        <div className="max-w-7xl mx-auto space-y-32">
          {PROFESSIONALS.map((prof) => (
            <div 
              key={prof.id} 
              id={`prof-${prof.id}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center group scroll-mt-24"
            >
              <div id={`area-${prof.area.replace(/\s+/g, '-').toLowerCase()}`} className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-sm border border-slate-100">
                <img 
                  src={prof.image} 
                  alt={`Retrato oficial do advogado ${prof.name}, ${prof.role}`} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-4 block">Especialista em {prof.area}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">{prof.name}</h2>
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-900 mb-8 border-b border-slate-900 pb-2 inline-block">{prof.role}</h4>
                <p className="text-lg md:text-xl font-light text-slate-500 leading-relaxed mb-10">
                  {prof.description}
                </p>
                <div className="flex space-x-8">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-900">{prof.oab}</span>
                  <a href="#" className="text-[10px] uppercase tracking-widest font-bold hover:text-slate-400 transition-colors focus:ring-1 focus:ring-slate-900">LinkedIn</a>
                  <a href="#" className="text-[10px] uppercase tracking-widest font-bold hover:text-slate-400 transition-colors focus:ring-1 focus:ring-slate-900">Publicações</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diversidade Statement */}
      <section className="py-24 bg-slate-50 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-slate-900 mb-8">Talento sem Fronteiras</h2>
          <p className="text-slate-600 font-light leading-relaxed text-lg">
            Investimos continuamente na formação de lideranças resilientes e na promoção de um ambiente inclusivo onde a meritocracia e a diversidade de perspectivas impulsionam resultados excepcionais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Professionals;
