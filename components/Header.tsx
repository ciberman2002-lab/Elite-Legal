
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        if (!isMenuOpen) setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const handleLinkClick = (view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
    setIsVisible(true);
    window.scrollTo(0, 0);
  };

  const isDarkHeader = (currentView === 'home' || currentView === 'article' || currentView === 'careers') && !isScrolled && !isMenuOpen;

  return (
    <>
      <header 
        role="banner"
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 lg:px-12 h-20 flex justify-between items-center ${
          isVisible ? 'translate-y-0' : '-translate-y-full shadow-none'
        } ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
        }`}
      >
        <div 
          onClick={() => handleLinkClick('home')}
          role="button"
          tabIndex={0}
          aria-label="Elite Legal - Voltar para Home"
          onKeyDown={(e) => e.key === 'Enter' && handleLinkClick('home')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
            isDarkHeader ? 'border-white bg-transparent text-white' : 'border-slate-900 bg-slate-900 text-white'
          }`}>
            <span className="font-bold text-lg" aria-hidden="true">E</span>
          </div>
          <span className={`text-xl tracking-widest font-light uppercase hidden sm:block transition-colors duration-300 ${
            isDarkHeader ? 'text-white' : 'text-slate-900'
          }`}>
            Elite <span className="font-bold">Legal</span>
          </span>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Navegação Principal">
            <ul className="flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleLinkClick(item.view)}
                    className={`text-[11px] uppercase tracking-[0.2em] transition-all hover:opacity-50 py-2 ${
                      isDarkHeader ? 'text-white' : 'text-slate-900'
                    } ${currentView === item.view ? 'border-b border-current' : ''}`}
                    aria-current={currentView === item.view ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="mobile-menu"
            className="flex items-center justify-center group focus:outline-none p-4"
          >
            <div className="relative w-7 h-5" aria-hidden="true">
              <span className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'top-2 rotate-45 bg-slate-900' : 'top-0 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
              <span className={`absolute left-0 w-full h-[1.5px] top-2 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
              <span className={`absolute left-0 w-full h-[1.5px] transition-all duration-300 ${
                isMenuOpen ? 'top-2 -rotate-45 bg-slate-900' : 'bottom-0 ' + (isDarkHeader ? 'bg-white' : 'bg-slate-900')
              }`} />
            </div>
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div 
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[90] bg-white transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)] ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col justify-start px-6 lg:px-12 pt-32 lg:pt-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto w-full">
            <nav className="flex flex-col space-y-6 lg:space-y-10" aria-label="Menu Mobile">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-4">Diretório Principal</span>
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => handleLinkClick(item.view)}
                  className="text-left text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 hover:text-slate-500 transition-colors duration-300 whitespace-nowrap py-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col space-y-12 border-l border-slate-100 pl-12 hidden md:flex pt-14" aria-label="Informações de Contato">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-8 block">Presença Global</span>
                <div className="space-y-8">
                  <address className="not-italic">
                    <h4 className="font-bold text-slate-900 mb-2 tracking-widest text-[11px] uppercase">São Paulo</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Av. Brig. Faria Lima, 4500<br/>Itaim Bibi, SP<br/><a href="tel:+551130000000">+55 11 3000-0000</a></p>
                  </address>
                  <address className="not-italic">
                    <h4 className="font-bold text-slate-900 mb-2 tracking-widest text-[11px] uppercase">Londres</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">1 Bunhill Row, EC1Y 8YZ<br/>London, United Kingdom<br/><a href="tel:+442076001200">+44 20 7600 1200</a></p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
