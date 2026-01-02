
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-slate-900" aria-labelledby="hero-title">
      {/* Background with abstract overlay - Optimized Loading */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
          alt="Edifício comercial moderno representando a sede da Elite Legal Chambers" 
          role="img"
          loading="eager"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay grayscale hero-img"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" aria-hidden="true" />
      </div>

      <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-6 block animate-fade-in">
            Liderança Legal Global
          </span>
          <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-tight mb-8">
            Moldando o <br/><span className="italic">futuro</span> das transações complexas.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
            Combinamos tradição e inovação para entregar soluções jurídicas que definem mercados e impulsionam o progresso global.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-slate-900 px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-white focus:outline-none">
              Explorar Expertise
            </button>
            <button className="border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white focus:outline-none">
              Nossa História
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end text-white/50 text-xs tracking-widest uppercase space-y-2" aria-hidden="true">
        <span>01 / 04</span>
        <div className="w-32 h-[1px] bg-white/20 relative">
          <div className="absolute left-0 top-0 h-full bg-white w-1/4" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
