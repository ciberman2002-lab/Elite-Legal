
import React from 'react';

const TEAM = [
  { name: 'Dr. Arthur Mello', role: 'Sócio-Diretor, M&A', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800' },
  { name: 'Dra. Marina Silva', role: 'Sócia, Mercado de Capitais', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800' },
  { name: 'Dr. Roberto Almeida', role: 'Sócio, Tributário Estratégico', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800' },
  { name: 'Dra. Helena Costa', role: 'Sócia, Arbitragem Internacional', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800' },
];

interface AboutProps {
  onNavigateProfessionals?: () => void;
}

const About: React.FC<AboutProps> = ({ onNavigateProfessionals }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-12 border-b border-slate-50">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-6 block">Sobre a Elite Legal</span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-slate-900 mb-16 leading-[1.1]">
            Um legado de <span className="italic">integridade</span> e visão global.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-start">
            <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed">
              Fundada sobre os pilares da excelência técnica e discrição absoluta, a Elite Legal Chambers consolidou-se como o parceiro estratégico preferencial para as transações mais complexas e sensíveis do mercado global.
            </p>
            <p className="text-slate-500 leading-relaxed font-light">
              Nossa abordagem combina a tradição secular do direito clássico com uma agilidade contemporânea, permitindo-nos antecipar mudanças regulatórias e moldar o ambiente jurídico em vez de apenas reagir a ele. Não apenas resolvemos problemas; criamos caminhos para o progresso de nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* The Firm / History */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="aspect-[4/5] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200" 
              alt="Interior sofisticado e arquitetônico do escritório Elite Legal Chambers" 
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-10 leading-tight">Excelência sem fronteiras.</h2>
            <div className="space-y-8 text-slate-600 font-light leading-relaxed">
              <p className="text-lg">
                Operamos como uma única firma global, integrando especialistas de diversas jurisdições para oferecer uma perspectiva holística e precisa. Nossos escritórios em São Paulo e Londres funcionam como hubs estratégicos de inovação jurídica.
              </p>
              <p>
                A Elite Legal Chambers é reconhecida consistentemente pelos principais rankings internacionais por sua capacidade de lidar com litígios de alto valor e estruturas societárias que desafiam o status quo. Nosso compromisso com a diversidade de pensamento e a meritocracia radical é o que atrai os talentos mais brilhantes do setor.
              </p>
              
              <div className="pt-12 grid grid-cols-2 gap-12 border-t border-slate-200">
                <div className="space-y-2">
                  <span className="block text-5xl font-serif text-slate-900 leading-none">40+</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 block">Anos de História</span>
                </div>
                <div className="space-y-2">
                  <span className="block text-5xl font-serif text-slate-900 leading-none">120+</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 block">Sócios Globais</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-serif text-slate-900">Nossa <span className="italic">Liderança</span></h2>
            <button 
              onClick={onNavigateProfessionals}
              className="text-[10px] uppercase tracking-widest font-bold border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity"
            >
              Ver todos os profissionais
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {TEAM.map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <img 
                    src={member.image} 
                    alt={`Retrato oficial de ${member.name}, ${member.role}`} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-slate-100 transition-colors m-4" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-serif text-slate-900 mb-1">{member.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 bg-slate-900 text-white text-center px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-4xl font-serif italic leading-relaxed">
            "Não somos apenas advogados; somos arquitetos de soluções estratégicas que garantem a perenidade do sucesso de nossos clientes."
          </p>
          <div className="w-16 h-[1px] bg-white/20 mx-auto mt-12" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
};

export default About;
