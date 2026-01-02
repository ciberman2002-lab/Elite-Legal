
export type View = 'home' | 'about' | 'practice' | 'blog' | 'article' | 'careers' | 'contact' | 'admin' | 'professionals';

export type BlockType = 'p' | 'h2' | 'h3' | 'img' | 'quote' | 'list';

export interface ContentBlock {
  id: string;
  type: BlockType;
  value: string;
  caption?: string; // Legenda visível
  alt?: string;     // Descrição semântica para SEO (alt tag)
}

export interface NavItem {
  label: string;
  view: View;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  imageAlt?: string; // Alt text da imagem principal
  excerpt: string;
  blocks: ContentBlock[];
}

export interface PracticeArea {
  title: string;
  description: string;
  details: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  area: string;
  image: string;
  description: string;
  oab: string;
}
