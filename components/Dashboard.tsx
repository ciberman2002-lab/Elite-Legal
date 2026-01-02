
import React, { useState, useEffect, useRef } from 'react';
import { Article, ContentBlock, BlockType } from '../types';
import { 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Type, 
  Image as ImageIcon, 
  Quote, 
  Heading2, 
  X, 
  Check, 
  ArrowLeft, 
  Save, 
  Plus,
  Search,
  FileText,
  Bold,
  Italic,
  RemoveFormatting
} from 'lucide-react';

interface DashboardProps {
  initialArticles: Article[];
  onSave: (articles: Article[]) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ initialArticles, onSave, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  const blockValuesRef = useRef<{ [key: string]: string }>({});

  const handleLogin = () => setIsLoggedIn(true);

  const createEmptyBlock = (type: BlockType): ContentBlock => ({
    id: Math.random().toString(36).substr(2, 9),
    type,
    value: '',
    caption: '',
    alt: ''
  });

  const handleAddNew = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      title: '',
      category: 'Insights',
      date: new Date().toLocaleDateString('pt-BR'),
      author: '',
      image: '',
      imageAlt: '',
      excerpt: '',
      blocks: [createEmptyBlock('p')]
    };
    setEditingArticle(newArticle);
    blockValuesRef.current = { [newArticle.blocks[0].id]: '' };
  };

  const addBlock = (index: number, type: BlockType) => {
    if (!editingArticle) return;
    const newBlocks = [...editingArticle.blocks];
    const newBlock = createEmptyBlock(type);
    newBlocks.splice(index + 1, 0, newBlock);
    setEditingArticle({ ...editingArticle, blocks: newBlocks });
  };

  const removeBlock = (index: number) => {
    if (!editingArticle || editingArticle.blocks.length <= 1) return;
    const newBlocks = editingArticle.blocks.filter((_, i) => i !== index);
    setEditingArticle({ ...editingArticle, blocks: newBlocks });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!editingArticle) return;
    const newBlocks = [...editingArticle.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setEditingArticle({ ...editingArticle, blocks: newBlocks });
  };

  const syncBlockValueToState = (index: number) => {
    const el = document.getElementById(`editor-${index}`);
    if (el && editingArticle) {
      const newVal = el.innerHTML;
      const newBlocks = [...editingArticle.blocks];
      newBlocks[index] = { ...newBlocks[index], value: newVal };
      // Usamos uma função de atualização de estado para evitar sobrescritas durante re-renders rápidos
      setEditingArticle(prev => prev ? { ...prev, blocks: newBlocks } : null);
    }
  };

  const handleFormat = (e: React.MouseEvent, command: string, index: number) => {
    e.preventDefault(); 
    const el = document.getElementById(`editor-${index}`);
    if (!el) return;
    if (document.activeElement !== el) el.focus();
    document.execCommand(command, false);
    // Não sincronizamos o estado aqui para evitar re-render que quebra a seleção do cursor
    // O valor será salvo no onBlur
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    
    // Antes de salvar, garantimos que os valores atuais nos contentEditables sejam sincronizados
    const finalBlocks = editingArticle.blocks.map((block, idx) => {
        const el = document.getElementById(`editor-${idx}`);
        if (el && (block.type === 'p' || block.type === 'h2')) {
            return { ...block, value: el.innerHTML || '' };
        }
        return block;
    });

    const articleToSave = { ...editingArticle, blocks: finalBlocks };
    let updated = articles.find(a => a.id === articleToSave.id)
      ? articles.map(a => a.id === articleToSave.id ? articleToSave : a)
      : [articleToSave, ...articles];
    
    setArticles(updated);
    onSave(updated);
    setEditingArticle(null);
    blockValuesRef.current = {};
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-8 md:p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-t-8 border-slate-900 text-center">
          <div className="w-16 h-16 border border-slate-900 flex items-center justify-center mx-auto mb-8 bg-slate-900 text-white">
            <span className="font-serif text-2xl font-bold">E</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2">Painel do Editor</h2>
          <p className="text-slate-500 text-[11px] tracking-[0.4em] font-bold uppercase mb-10">Acesso Restrito - Elite Legal</p>
          <button onClick={handleLogin} className="w-full bg-slate-900 text-white py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black transition-all shadow-lg active:scale-95">
            Entrar no Console
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-8 md:pt-12 pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 border-b-2 border-slate-900 pb-8 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-slate-900">Editor do <span className="italic text-slate-500">Jornal Elite</span></h1>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto">
            {!editingArticle && (
              <button onClick={handleAddNew} className="bg-slate-900 text-white px-4 md:px-8 py-3 md:py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all flex items-center space-x-2 shadow-md flex-1 md:flex-none justify-center">
                <Plus size={14} />
                <span>Novo Artigo</span>
              </button>
            )}
            <button onClick={onLogout} className="text-slate-600 hover:text-red-700 transition-colors text-[10px] uppercase font-bold tracking-widest border border-slate-200 px-4 py-3 md:py-2">Sair</button>
          </div>
        </div>

        {editingArticle ? (
          <div className="animate-fadeInUp space-y-12 md:space-y-16">
            
            {/* Meta Section */}
            <div className="space-y-8 md:space-y-12">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                 <div className="flex items-center space-x-4">
                    <button onClick={() => setEditingArticle(null)} className="text-slate-900 hover:text-slate-500 transition-colors" title="Voltar"><ArrowLeft size={24}/></button>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-slate-900">Composição do Artigo</span>
                 </div>
                 <span className="text-[9px] md:text-[10px] font-bold text-slate-400">ID: {editingArticle.id}</span>
              </div>
              
              <div className="space-y-8 md:space-y-10">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block">Título Principal</label>
                  <input 
                    className="w-full text-2xl sm:text-4xl md:text-6xl font-serif border-b-2 border-slate-100 outline-none placeholder:text-slate-200 focus:border-slate-900 transition-colors py-2 text-slate-900 bg-transparent"
                    placeholder="Insira a manchete aqui..."
                    value={editingArticle.title}
                    onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block flex items-center space-x-2">
                    <FileText size={14} />
                    <span>Resumo (Cards do Blog)</span>
                  </label>
                  <textarea 
                    className="w-full border-2 border-slate-100 p-3 md:p-4 outline-none focus:border-slate-900 transition-colors text-sm md:text-base font-light text-slate-800 bg-white min-h-[80px] md:min-h-[100px]" 
                    placeholder="Resumo impactante para atrair leitores..."
                    value={editingArticle.excerpt}
                    onChange={e => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-slate-100 pt-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block">Autor</label>
                    <input 
                      className="w-full border-2 border-slate-100 p-3 outline-none focus:border-slate-900 transition-colors text-sm font-medium text-slate-900" 
                      value={editingArticle.author} 
                      placeholder="Nome do profissional"
                      onChange={e => setEditingArticle({...editingArticle, author: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block">Categoria</label>
                    <input 
                      className="w-full border-2 border-slate-100 p-3 outline-none focus:border-slate-900 transition-colors text-sm font-medium text-slate-900" 
                      value={editingArticle.category} 
                      placeholder="Ex: M&A, Tecnologia..."
                      onChange={e => setEditingArticle({...editingArticle, category: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest block mb-4">Imagem de Capa</label>
                  <div className="aspect-video md:aspect-[21/9] bg-slate-100 border-2 border-slate-200 relative overflow-hidden group">
                    {editingArticle.image ? (
                      <img src={editingArticle.image} alt={editingArticle.imageAlt} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <ImageIcon size={64} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">URL da Capa</span>
                      <input 
                        className="w-full border-2 border-slate-100 p-3 outline-none focus:border-slate-900 transition-colors text-xs font-mono text-slate-900" 
                        value={editingArticle.image} 
                        placeholder="Link da imagem..."
                        onChange={e => setEditingArticle({...editingArticle, image: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Descrição SEO (Alt)</span>
                      <input 
                        className="w-full border-2 border-slate-100 p-3 outline-none focus:border-slate-900 transition-colors text-xs italic text-slate-900" 
                        value={editingArticle.imageAlt} 
                        placeholder="O que tem na imagem?"
                        onChange={e => setEditingArticle({...editingArticle, imageAlt: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor de Blocos */}
            <div className="space-y-10 md:space-y-12">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-900 block border-b-2 border-slate-900 pb-4">Blocos de Conteúdo</span>
              {editingArticle.blocks.map((block, index) => (
                <div key={block.id} className="relative bg-white border border-slate-100 p-4 md:p-8 shadow-sm">
                  
                  <div className="flex md:flex-col items-center justify-end md:justify-start space-x-2 md:space-x-0 md:space-y-3 mb-6 md:mb-0 md:absolute md:-left-14 md:top-8">
                     <button onClick={() => moveBlock(index, 'up')} className="p-2 bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="Mover para cima"><ChevronUp size={16}/></button>
                     <button onClick={() => moveBlock(index, 'down')} className="p-2 bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="Mover para baixo"><ChevronDown size={16}/></button>
                     <button onClick={() => removeBlock(index)} className="p-2 bg-white border border-red-100 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Excluir Bloco"><Trash2 size={16}/></button>
                  </div>

                  <div className="md:pl-4">
                    {block.type === 'h2' && (
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Subtítulo</label>
                        <div 
                          id={`editor-${index}`}
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full text-2xl md:text-4xl font-serif text-black outline-none leading-snug focus:bg-slate-50 p-2 border-l-4 border-slate-900"
                          onFocus={() => setFocusedIndex(index)}
                          onBlur={() => {
                            setFocusedIndex(null);
                            syncBlockValueToState(index);
                          }}
                          dangerouslySetInnerHTML={{ __html: block.value }}
                        />
                      </div>
                    )}
                    
                    {block.type === 'p' && (
                      <div className="space-y-4">
                        <div className={`flex items-center space-x-1 md:space-x-2 mb-4 transition-opacity duration-300 ${focusedIndex === index ? 'opacity-100' : 'opacity-60'}`}>
                           <button 
                              onMouseDown={(e) => handleFormat(e, 'bold', index)} 
                              className="w-9 h-9 md:w-10 md:h-10 bg-[#D1D5DB] hover:bg-slate-400 text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Negrito (700)"
                           >
                              <span className="font-serif font-bold text-base md:text-lg select-none">B</span>
                           </button>
                           <button 
                              onMouseDown={(e) => handleFormat(e, 'italic', index)} 
                              className="w-9 h-9 md:w-10 md:h-10 bg-[#D1D5DB] hover:bg-slate-400 text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Itálico"
                           >
                              <span className="font-serif italic text-base md:text-lg select-none">I</span>
                           </button>
                           <button 
                              onMouseDown={(e) => handleFormat(e, 'removeFormat', index)} 
                              className="w-9 h-9 md:w-10 md:h-10 bg-[#D1D5DB] hover:bg-slate-400 text-white flex items-center justify-center transition-colors shadow-sm"
                              title="Limpar Formatação"
                           >
                              <div className="relative font-serif text-sm md:text-base select-none">
                                 T<span className="text-[9px] md:text-[10px] absolute -bottom-1 -right-1">x</span>
                              </div>
                           </button>
                        </div>
                        <div 
                          id={`editor-${index}`}
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full min-h-[5em] text-lg md:text-xl font-light text-black leading-relaxed outline-none focus:bg-white p-2 border border-transparent focus:border-slate-50"
                          onFocus={() => setFocusedIndex(index)}
                          onBlur={() => {
                            setFocusedIndex(null);
                            syncBlockValueToState(index);
                          }}
                          dangerouslySetInnerHTML={{ __html: block.value }}
                        />
                      </div>
                    )}

                    {block.type === 'img' && (
                      <div className="space-y-4 md:space-y-6 bg-slate-50 p-4 md:p-6 border border-slate-200">
                        <div className="aspect-video bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                          {block.value ? (
                            <img src={block.value} alt={block.alt} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={40} className="text-slate-200" />
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-900">URL da Imagem</label>
                            <input 
                              className="w-full bg-white border-2 border-slate-100 p-2 text-xs outline-none focus:border-slate-900 font-mono" 
                              value={block.value} 
                              placeholder="Link..." 
                              onChange={e => {
                                const newBlocks = [...editingArticle.blocks];
                                newBlocks[index] = { ...newBlocks[index], value: e.target.value };
                                setEditingArticle({...editingArticle, blocks: newBlocks});
                              }} 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-900">Alt/SEO</label>
                            <input 
                              className="w-full bg-white border-2 border-slate-100 p-2 text-xs italic text-slate-900 outline-none focus:border-slate-900" 
                              value={block.alt || ''} 
                              placeholder="Descrição..." 
                              onChange={e => {
                                const newBlocks = [...editingArticle.blocks];
                                newBlocks[index] = { ...newBlocks[index], alt: e.target.value };
                                setEditingArticle({...editingArticle, blocks: newBlocks});
                              }} 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-900">Legenda</label>
                          <input 
                            className="w-full bg-white border-2 border-slate-100 p-2 text-xs outline-none focus:border-slate-900" 
                            value={block.caption || ''} 
                            placeholder="Texto visível..." 
                            onChange={e => {
                              const newBlocks = [...editingArticle.blocks];
                              newBlocks[index] = { ...newBlocks[index], caption: e.target.value };
                              setEditingArticle({...editingArticle, blocks: newBlocks});
                            }} 
                          />
                        </div>
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="pl-6 md:pl-10 border-l-[6px] border-[#0f172a] py-8 bg-[#fcfcfc] space-y-8 min-h-[160px] flex flex-col justify-center">
                        <div className="space-y-1">
                          <textarea 
                            className="w-full text-2xl md:text-3xl font-serif italic text-[#1e293b] bg-transparent border-none outline-none resize-none leading-snug placeholder:text-slate-200" 
                            placeholder="Citação de impacto..." 
                            rows={2} 
                            value={block.value} 
                            onChange={e => {
                              const newBlocks = [...editingArticle.blocks];
                              newBlocks[index] = { ...newBlocks[index], value: e.target.value };
                              setEditingArticle({...editingArticle, blocks: newBlocks});
                            }} 
                          />
                        </div>
                        <div className="space-y-1">
                          <input 
                            className="w-full bg-transparent border-none outline-none text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 placeholder:text-slate-300" 
                            placeholder="AUTOR / CARGO"
                            value={block.caption || ''}
                            onChange={e => {
                              const newBlocks = [...editingArticle.blocks];
                              newBlocks[index] = { ...newBlocks[index], caption: e.target.value };
                              setEditingArticle({...editingArticle, blocks: newBlocks});
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 md:mt-12 py-6 bg-white border-t-2 border-dashed border-slate-100">
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                      <button onClick={() => addBlock(index, 'p')} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 transition-colors border border-slate-100 px-3 py-2 hover:bg-slate-50">
                        <Type size={14} /> <span className="hidden sm:inline">Parágrafo</span>
                      </button>
                      <button onClick={() => addBlock(index, 'h2')} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 transition-colors border border-slate-100 px-3 py-2 hover:bg-slate-50">
                        <Heading2 size={14} /> <span className="hidden sm:inline">Subtítulo</span>
                      </button>
                      <button onClick={() => addBlock(index, 'img')} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 transition-colors border border-slate-100 px-3 py-2 hover:bg-slate-50">
                        <ImageIcon size={14} /> <span className="hidden sm:inline">Imagem</span>
                      </button>
                      <button onClick={() => addBlock(index, 'quote')} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 transition-colors border border-slate-100 px-3 py-2 hover:bg-slate-50">
                        <Quote size={14} /> <span className="hidden sm:inline">Citação</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center pt-16 md:pt-24 border-t-2 border-slate-900 space-y-4 md:space-y-0">
              <button onClick={() => setEditingArticle(null)} className="text-slate-900 text-[11px] font-bold uppercase tracking-widest hover:text-red-600 border border-slate-900 px-8 py-4 transition-all order-2 md:order-1">Cancelar</button>
              <button onClick={handleSaveArticle} className="bg-slate-900 text-white px-8 md:px-20 py-5 md:py-6 text-[12px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all shadow-xl active:scale-95 order-1 md:order-2">
                Publicar Insight
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-6 space-y-4 md:space-y-0">
               <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-slate-900">Histórico de Publicações</h2>
               <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded w-full md:w-auto">
                  <Search size={16} className="text-slate-400" />
                  <input className="border-none bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 flex-1 md:w-64" placeholder="Filtrar artigos..." />
               </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {articles.map(article => (
                <div key={article.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 md:py-8 border-b border-slate-100 hover:bg-slate-50 transition-all px-4 md:px-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4 md:space-x-10 w-full">
                    <div className="w-20 md:w-32 h-14 md:h-20 bg-slate-200 overflow-hidden shadow-sm flex-shrink-0">
                      <img src={article.image || 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=100'} alt={article.imageAlt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-serif text-slate-900 truncate group-hover:text-black transition-colors">{article.title || "Rascunho"}</h3>
                      <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{article.category} • {article.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-6 md:space-x-10 w-full sm:w-auto justify-end">
                    <button onClick={() => setEditingArticle({...article})} className="text-[11px] uppercase tracking-widest font-bold text-slate-900 border-b-2 border-slate-900 hover:opacity-50 transition-all">Editar</button>
                    <button onClick={() => {
                      if(confirm('Excluir permanentemente?')) {
                        const updated = articles.filter(a => a.id !== article.id);
                        setArticles(updated);
                        onSave(updated);
                      }
                    }} className="text-[11px] uppercase tracking-widest font-bold text-slate-300 hover:text-red-700 transition-colors">Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
