
import React from 'react';

const BENEFITS = [
  { title: 'Mentoria Direta', desc: 'Trabalhe lado a lado com alguns dos advogados mais renomados do país em casos de impacto global.' },
  { title: 'Cultura de Elite', desc: 'Ambiente focado em excelência técnica, meritocracia radical e autonomia intelectual.' },
  { title: 'Presença Global', desc: 'Oportunidades de intercâmbio com nossos hubs internacionais em Londres e Nova York.' },
];

const Careers: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="careers-title">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200" 
            alt="Ambiente de escritório corporativo de alto nível" 
            loading="eager"
            className="w-full h-full object-cover grayscale" 
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-6 block">Carreiras na Elite</span>
          <h1 id="careers-title" className="text-5xl md:text-7xl lg:text-9xl font-serif mb-16 leading-[1.1]">
            Onde o <span className="italic">talento</span> encontra a <span className="italic">ambição</span>.
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed max-w-3xl">
            Procuramos mentes brilhantes, independentes e resilientes que desejam moldar o futuro do direito empresarial.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" aria-label="Benefícios de trabalhar conosco">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="group">
                <div className="text-[10px] text-slate-300 font-bold mb-6 transition-colors duration-300 group-hover:text-slate-900" aria-hidden="true">
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-6 transition-all">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl font-serif text-slate-900 mb-8">Nossos Programas</h2>
            <div className="space-y-12">
              <div className="border-b border-slate-200 pb-8">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Summer Job & Estágio</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  Para estudantes que buscam imersão total em casos reais desde o primeiro dia. Valorizamos a curiosidade e o rigor analítico.
                </p>
              </div>
              <div className="border-b border-slate-200 pb-8">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Associados Senior</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  Advogados experientes que desejam um palco global para sua expertise e um caminho claro para a sociedade baseada em performance.
                </p>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-slate-200 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000" 
              alt="Reunião produtiva entre profissionais talentosos" 
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/90 backdrop-blur p-12 text-center shadow-2xl">
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-900 mb-4">Envie seu CV</p>
                 <a href="mailto:talento@elitelegal.com" className="text-xl font-serif italic text-slate-900 border-b border-slate-900 pb-1 focus:ring-2 focus:ring-slate-900">talento@elitelegal.com</a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 text-center px-6">
         <h2 className="text-3xl font-serif text-slate-900 mb-8">Interessado em fazer história?</h2>
         <p className="text-slate-400 font-light mb-12">Estamos sempre em busca de profissionais excepcionais.</p>
         <button className="bg-slate-900 text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-slate-800 transition-all focus:ring-2 focus:ring-slate-900">Ver Vagas Abertas</button>
      </section>
    </div>
  );
};

export default Careers;
