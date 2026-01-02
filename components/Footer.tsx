
import React from 'react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 flex items-center justify-center border border-white">
                <span className="font-bold text-lg">E</span>
              </div>
              <span className="text-xl tracking-widest font-light uppercase">
                Elite <span className="font-bold">Legal</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Um dos escritórios de advocacia líderes mundiais, fornecendo consultoria jurídica estratégica para empresas líderes e instituições financeiras em suas questões mais importantes.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-white">Navegação</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossos Sócios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Casos de Sucesso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Relatórios Anuais</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-white">Jurídico</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diversidade & Inclusão</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8 text-white">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-6">Receba nossos últimos insights jurídicos diretamente em seu e-mail.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-slate-800 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-white w-full rounded-none"
              />
              <button className="bg-white text-slate-900 px-4 py-3 hover:bg-slate-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-500">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <p>© 2024 Elite Legal Chambers. Todos os direitos reservados.</p>
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="hover:text-white transition-colors text-left"
              >
                [ Acesso Administrativo ]
              </button>
            )}
          </div>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Acessibilidade</a>
            <a href="#" className="hover:text-white">Mapa do Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
