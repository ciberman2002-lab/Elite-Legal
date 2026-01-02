
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import Insights from './components/Insights';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import About from './components/About';
import PracticeView from './components/PracticeView';
import Careers from './components/Careers';
import Professionals from './components/Professionals';
import LegalAssistant from './components/LegalAssistant';
import { View, Article as ArticleType, ContentBlock } from './types';
import { PRACTICE_AREAS } from './constants';
import { ArrowRight } from 'lucide-react';

const INITIAL_ARTICLES: ArticleType[] = [
  {
    id: 'art-1',
    title: 'A Nova Era da Regulamentação Digital no Brasil',
    category: 'Tecnologia',
    date: '15 Mai 2024',
    author: 'Dra. Marina Silva',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Foto de uma estátua da justiça com balança e espada em ambiente jurídico moderno',
    excerpt: 'Como o novo marco legal das garantias digitais impacta o setor de fintechs e bancos tradicionais no cenário nacional.',
    blocks: [
      { id: '1', type: 'p', value: 'A evolução tecnológica tem imposto desafios sem precedentes ao ordenamento jurídico brasileiro. Recentemente, a aprovação de novas diretrizes para o mercado digital sinaliza uma mudança de paradigma.' },
      { id: '2', type: 'h2', value: 'Transparência Algorítmica' },
      { id: '3', type: 'p', value: 'O foco central das novas regulamentações reside na transparência algorítmica e na proteção de dados sensíveis em transações de alta frequência.' },
      { id: '4', type: 'quote', value: 'A conformidade regulatória nas fintechs passou de uma obrigação para um pilar de sobrevivência estratégica.', caption: 'Dr. Arthur Mello, Sócio Sênior' }
    ]
  },
  {
    id: 'art-2',
    title: 'Fusões e Aquisições: Tendências Globais',
    category: 'Corporativo',
    date: '12 Mai 2024',
    author: 'Dr. Roberto Almeida',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Duas pessoas em ternos apertando as mãos sobre uma mesa de reunião',
    excerpt: 'Análise detalhada sobre o aquecimento do mercado de M&A em setores de energia limpa.',
    blocks: [
      { id: 'b1', type: 'p', value: 'O mercado de M&A demonstra uma resiliência notável apesar da volatilidade dos juros globais. Observamos um movimento agressivo de consolidação.' },
      { id: 'b2', type: 'img', value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200', caption: 'Análise de mercado global 2024', alt: 'Gráfico de barras mostrando crescimento financeiro em tons de azul e cinza' },
      { id: 'b3', type: 'p', value: 'Investidores institucionais estão priorizando ativos que apresentam métricas ESG auditáveis e fluxos de caixa previsíveis a longo prazo.' }
    ]
  }
];

const InsightsHighlight: React.FC<{ article: ArticleType; onSelect: (a: ArticleType) => void }> = ({ article, onSelect }) => {
  return (
    <section className="pt-16 pb-0 px-6 lg:px-12 bg-white overflow-hidden" aria-label="Destaque do Insight">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-left">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight uppercase mb-3 serif">Insights</h2>
          <div className="w-16 h-[2px] bg-red-600" aria-hidden="true"></div>
        </div>

        <div 
          onClick={() => onSelect(article)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(article)}
          aria-label={`Ler insight em destaque: ${article.title}`}
          className="relative w-full h-[380px] md:h-[420px] lg:h-[480px] group cursor-pointer overflow-hidden shadow-lg border border-slate-100 focus:ring-4 focus:ring-slate-900/20 focus:outline-none"
        >
          <div className="absolute inset-0 w-full h-full bg-slate-200">
            <img 
              src={article.image} 
              alt={article.imageAlt || `Capa do artigo: ${article.title}`} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
          </div>

          <div 
            className="absolute inset-0 bg-white/70 backdrop-blur-md z-10 flex items-center transition-all duration-700 ease-in-out glass-slant"
          >
            <div className="pl-6 sm:pl-8 md:pl-16 lg:pl-20 pr-10 md:pr-24 max-w-[70%] sm:max-w-[50%] lg:max-w-[45%]">
              <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 uppercase leading-[1.1] tracking-tight serif">
                {article.title}
              </h3>
              <p className="text-[#008080] text-sm sm:text-lg font-medium mb-6 sm:mb-8">
                Confira nossas análises jurídicas
              </p>
              
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center transition-transform duration-500 transform group-hover:translate-x-3" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-[#008080] stroke-[1px]">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedGrid: React.FC<{ onNavigate: (v: View) => void }> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="pt-8 pb-12 px-6 lg:px-12 bg-white" aria-label="Navegação em destaque">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div 
            onClick={() => onNavigate('about')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('about')}
            aria-label="Sobre a nossa firma"
            className={`group relative h-[500px] flex flex-col cursor-pointer overflow-hidden transition-all duration-700 ease-out border border-slate-100 shadow-sm hover:shadow-xl focus:ring-4 focus:ring-slate-900/10 focus:outline-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="h-2/3 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                alt="Fachada iluminada de um centro empresarial moderno"
                loading="lazy"
              />
              <div className="absolute top-8 left-8 z-20">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] block mb-2 drop-shadow-md">Quem Somos</span>
                <div className="w-12 h-[2px] bg-red-600" aria-hidden="true"></div>
              </div>
            </div>
            <div className="h-1/3 w-full bg-[#2a232e] p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white uppercase serif mb-3 tracking-wide">Nossa Firma</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Descubra nossa história e o compromisso inabalável com a excelência técnica em escala global.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('professionals')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('professionals')}
            aria-label="Nossos Profissionais"
            className={`group relative h-[500px] flex flex-col cursor-pointer overflow-hidden transition-all duration-700 ease-out border border-slate-100 shadow-sm hover:shadow-xl focus:ring-4 focus:ring-slate-900/10 focus:outline-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="h-2/3 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                alt="Nossa equipe técnica altamente qualificada em reunião"
                loading="lazy"
              />
              <div className="absolute top-8 left-8 z-20">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] block mb-2 drop-shadow-md">Profissionais</span>
                <div className="w-12 h-[2px] bg-red-600" aria-hidden="true"></div>
              </div>
            </div>
            <div className="h-1/3 w-full bg-[#1b2533] p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white uppercase serif mb-3 tracking-wide">Sócios & Equipe</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Conheça as mentes brilhantes que lideram as transações mais complexas do mercado.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('contact')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('contact')}
            aria-label="Nossos contatos e escritórios"
            className={`group relative h-[500px] flex flex-col cursor-pointer overflow-hidden transition-all duration-700 ease-out border border-slate-100 shadow-sm hover:shadow-xl focus:ring-4 focus:ring-slate-900/10 focus:outline-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className="h-2/3 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                alt="Vista aérea de um hub financeiro global"
                loading="lazy"
              />
              <div className="absolute top-8 left-8 z-20">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] block mb-2 drop-shadow-md">Contato</span>
                <div className="w-12 h-[2px] bg-red-600" aria-hidden="true"></div>
              </div>
            </div>
            <div className="h-1/3 w-full bg-[#1c2e2e] p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white uppercase serif mb-3 tracking-wide">Presença Global</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Nossos escritórios operam em sincronia para oferecer soluções integradas em qualquer jurisdição.
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('careers')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('careers')}
          aria-label="Oportunidades de carreira"
          className={`group relative w-full h-[480px] bg-slate-100 shadow-sm flex items-center cursor-pointer overflow-hidden border border-slate-100 transition-all duration-[300ms] ease-out focus:ring-4 focus:ring-slate-900/10 focus:outline-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-105"
              alt="Ambiente de escritório inspirador para carreiras de sucesso"
              loading="lazy"
            />
          </div>

          <div 
            className="absolute inset-0 bg-white/70 backdrop-blur-md z-10 flex items-center transition-all duration-700 ease-in-out glass-slant"
          >
            <div className="pl-6 sm:pl-12 md:pl-20 max-w-[65%] sm:max-w-[45%]">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase serif mb-4 sm:mb-8 tracking-tighter">
                Carreiras
              </h2>
              <p className="text-[#008080] text-sm sm:text-lg font-medium mb-6 sm:mb-10 leading-relaxed max-w-[200px] sm:max-w-[320px] md:max-w-xs lg:max-w-sm">
                Buscamos mentes criativas que pensem de forma imaginativa e abordem problemas sob diferentes ângulos.
              </p>
              
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center transition-transform duration-500 transform group-hover:translate-x-4" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-[#008080] stroke-[1px]">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);
  const [articles, setArticles] = useState<ArticleType[]>(() => {
    const saved = localStorage.getItem('elite_articles_v3');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  useEffect(() => {
    if (currentView !== 'professionals' || (!selectedArea && !selectedProfessionalId)) {
      window.scrollTo(0, 0);
    }
  }, [currentView, selectedArticle]);

  useEffect(() => {
    localStorage.setItem('elite_articles_v3', JSON.stringify(articles));
  }, [articles]);

  const navigateToArticle = (article: ArticleType) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const navigateToProfessionalArea = (area: string) => {
    setSelectedProfessionalId(null);
    setSelectedArea(area);
    setCurrentView('professionals');
  };

  const navigateToProfessional = (id: string) => {
    setSelectedArea(null);
    setSelectedProfessionalId(id);
    setCurrentView('professionals');
  };

  const renderBlocks = (blocks: ContentBlock[]) => {
    return blocks.map((block) => {
      switch (block.type) {
        case 'h2':
          return <h2 key={block.id} className="text-3xl font-serif text-slate-900 mt-16 mb-8">{block.value}</h2>;
        case 'p':
          return <p key={block.id} className="text-lg font-light text-slate-700 leading-[1.8] mb-8" dangerouslySetInnerHTML={{ __html: block.value }} />;
        case 'img':
          return (
            <figure key={block.id} className="my-16">
              <img 
                src={block.value} 
                className="w-full h-auto" 
                alt={block.alt || block.caption || 'Conteúdo visual do artigo'} 
                loading="lazy" 
              />
              {block.caption && <figcaption className="text-center mt-4 text-sm text-slate-400 italic">{block.caption}</figcaption>}
            </figure>
          );
        case 'quote':
          return (
            <blockquote key={block.id} className="border-l-4 border-slate-900 pl-8 my-16">
              <p className="text-2xl font-serif italic text-slate-800 mb-4">"{block.value}"</p>
              {block.caption && <cite className="text-xs uppercase tracking-widest font-bold text-slate-400">— {block.caption}</cite>}
            </blockquote>
          );
        default:
          return null;
      }
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <Dashboard initialArticles={articles} onSave={setArticles} onLogout={() => setCurrentView('home')} />;
      case 'home':
        return (
          <>
            <Hero />
            
            <section className="pt-24 lg:pt-40 pb-8 px-6 lg:px-12 bg-white flex justify-center border-b border-slate-50 transition-all duration-700" aria-label="Introdução da Firma">
              <div className="max-w-5xl text-center">
                <span className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-bold mb-8 block">Who We Are</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-12 leading-[1.15]">
                  Uma tradição de <span className="italic">integridade</span> ancorada em uma visão global sem fronteiras.
                </h2>
                <div className="h-[1px] w-24 bg-slate-900 mx-auto mb-12 opacity-10" aria-hidden="true" />
                <p className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-3xl mx-auto italic">
                  "Fornecemos clareza jurídica e estratégica para os momentos mais críticos da história corporativa de nossos clientes."
                </p>
                <button 
                  onClick={() => setCurrentView('about')} 
                  className="group flex items-center space-x-4 mx-auto text-xs uppercase tracking-[0.3em] font-bold border-b-2 border-slate-900 pb-2 hover:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 p-2"
                >
                  <span>Descobrir nossa história</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </section>

            {articles.length > 0 && (
              <InsightsHighlight article={articles[0]} onSelect={navigateToArticle} />
            )}

            <FeaturedGrid onNavigate={setCurrentView} />

            <PracticeAreas 
              onNavigate={() => setCurrentView('practice')} 
              onSelectArea={navigateToProfessionalArea}
            />
            
            <Insights articles={articles} onArticleSelect={navigateToArticle} onSeeAll={() => setCurrentView('blog')} />
            
            <section className="py-24 lg:py-40 px-6 lg:px-12 bg-slate-900 text-white overflow-hidden" aria-labelledby="culture-title">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mb-8 block">People & Culture</span>
                  <h2 id="culture-title" className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
                    Mentes <span className="italic">brilhantes</span>, <br/>resultados excepcionais.
                  </h2>
                  <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md">
                    Atraímos os talentos mais resilientes e criativos para construir o futuro das soluções jurídicas em um ambiente de meritocracia radical e colaboração global.
                  </p>
                  <button 
                    onClick={() => setCurrentView('careers')}
                    className="flex items-center space-x-6 group focus:outline-none focus:ring-2 focus:ring-white p-1"
                  >
                    <span className="bg-white text-slate-900 px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-slate-200 transition-all">
                      Junte-se à Elite
                    </span>
                    <ArrowRight size={20} className="text-white group-hover:translate-x-3 transition-transform" aria-hidden="true" />
                  </button>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="aspect-[4/5] overflow-hidden grayscale opacity-70 hover:opacity-100 transition-opacity duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" 
                      alt="Advogados da Elite Legal colaborando em espaço moderno" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-10 -left-10 bg-slate-800/90 backdrop-blur-md p-10 hidden md:block border border-white/5" aria-hidden="true">
                     <p className="text-3xl font-serif italic text-white/90">"Onde a ambição <br/>encontra o propósito."</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      case 'blog':
        return (
          <div className="pt-32 pb-24 px-6 lg:px-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 pb-12">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Insights & Inteligência</span>
                  <h1 className="text-5xl font-serif text-slate-900">Elite Journal</h1>
                </div>
                <button onClick={() => setCurrentView('admin')} className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-900 transition-colors mb-2">[ Dashboard ]</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {articles.map(article => (
                  <article key={article.id} onClick={() => navigateToArticle(article)} className="group cursor-pointer bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="aspect-video overflow-hidden mb-8">
                      <img 
                        src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800'} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                        alt={article.imageAlt || `Capa do Insight: ${article.title}`} 
                        loading="lazy" 
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 block">{article.category} / {article.date}</span>
                    <h3 className="text-2xl font-serif mb-4 leading-snug group-hover:underline">{article.title}</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Ler Artigo Completo +</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );
      case 'article':
        if (!selectedArticle) return null;
        return (
          <article className="bg-white">
            <div className="h-[40vh] md:h-[60vh] w-full relative">
              <img 
                src={selectedArticle.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200'} 
                className="w-full h-full object-cover" 
                alt={selectedArticle.imageAlt || selectedArticle.title} 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-4xl text-center">
                  <span className="px-3 py-1 bg-white text-slate-900 text-[10px] uppercase tracking-widest font-bold mb-6 inline-block">{selectedArticle.category}</span>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white leading-tight">{selectedArticle.title}</h1>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-24">
              <div className="flex items-center space-x-4 mb-16 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100 pb-8">
                <time dateTime={selectedArticle.date}>{selectedArticle.date}</time>
                <span className="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
                <span>Autor: {selectedArticle.author}</span>
              </div>
              <div className="article-body">
                {selectedArticle.blocks ? renderBlocks(selectedArticle.blocks) : <p>Conteúdo não disponível.</p>}
              </div>
            </div>
          </article>
        );
      case 'about':
        return <About onNavigateProfessionals={() => setCurrentView('professionals')} />;
      case 'practice':
        return <PracticeView onSelectProfessional={navigateToProfessional} />;
      case 'careers':
        return <Careers />;
      case 'professionals':
        return <Professionals scrollToArea={selectedArea} scrollToProfessionalId={selectedProfessionalId} />;
      case 'contact':
        return (
          <div className="pt-40 pb-24 px-6 lg:px-12 bg-white min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold mb-4 block">Fale Conosco</span>
                <h1 className="text-5xl font-serif text-slate-900 mb-8">Conecte-se com <span className="italic">excelência</span>.</h1>
                <p className="text-slate-500 font-light leading-relaxed mb-8">Estamos prontos para discutir seus desafios mais complexos. Nossos escritórios operam em escala global para atender sua demanda onde ela surgir.</p>
                <div className="space-y-4 text-sm font-bold tracking-widest uppercase text-slate-900">
                  <p><a href="mailto:contato@elitelegal.com" className="hover:underline">contato@elitelegal.com</a></p>
                  <p><a href="tel:+551130000000" className="hover:underline">+55 11 3000-0000</a></p>
                </div>
              </div>
              <div className="bg-slate-50 p-8">
                <form className="space-y-6" aria-label="Formulário de Contato">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Nome Completo</label>
                    <input id="contact-name" type="text" placeholder="Nome Completo" className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-slate-900" required />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">E-mail Corporativo</label>
                    <input id="contact-email" type="email" placeholder="E-mail Corporativo" className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-slate-900" required />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Mensagem</label>
                    <textarea id="contact-message" placeholder="Como podemos ajudar?" rows={4} className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-slate-900" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-slate-800 transition-all focus:ring-2 focus:ring-slate-900">Enviar Mensagem</button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Em breve.</div>;
    }
  };

  return (
    <div className="min-h-screen selection:bg-slate-900 selection:text-white">
      {currentView !== 'admin' && <Header currentView={currentView} onNavigate={(view) => {
        setSelectedArea(null);
        setSelectedProfessionalId(null);
        setCurrentView(view);
      }} />}
      <main id="main-content" className="transition-all duration-500 focus:outline-none" tabIndex={-1}>
        {renderContent()}
      </main>
      {currentView !== 'admin' && <Footer onAdminClick={() => setCurrentView('admin')} />}
      <LegalAssistant />
    </div>
  );
};

export default App;
