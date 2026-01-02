
import { NavItem, PracticeArea, Professional } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Quem Somos', view: 'about' },
  { label: 'Áreas de Atuação', view: 'practice' },
  { label: 'Insights & Notícias', view: 'blog' },
  { label: 'Carreiras', view: 'careers' },
  { label: 'Contato', view: 'contact' },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    title: 'Corporativo e M&A',
    description: 'Assessoria em fusões, aquisições e reestruturações societárias complexas.',
    details: 'Lideramos transações de alta relevância, desde a estruturação de deals complexos até o fechamento estratégico para compradores e vendedores nacionais e internacionais.'
  },
  {
    title: 'Mercado de Capitais',
    description: 'Orientação em ofertas públicas de ações (IPO) e títulos de dívida.',
    details: 'Atuamos junto a emissores e coordenadores em operações de equity e debt capital markets, incluindo emissões de debêntures, CRI, CRA e fundos de investimento.'
  },
  {
    title: 'Bancário e Financeiro',
    description: 'Estruturação de operações de crédito e regulação do sistema financeiro.',
    details: 'Consultoria estratégica em financiamentos estruturados, securitização de ativos e conformidade com normas do Banco Central e CVM.'
  },
  {
    title: 'Infraestrutura e Direito Público',
    description: 'Assessoramento em concessões, PPPs e grandes projetos de energia.',
    details: 'Expertise em licitações e contratos administrativos, com foco em rodovias, aeroportos, portos e o setor de saneamento básico.'
  },
  {
    title: 'Tributário Estratégico',
    description: 'Planejamento fiscal complexo e contencioso tributário de alto valor.',
    details: 'Otimização de estruturas fiscais e defesa de teses jurídicas inovadoras em tribunais superiores e instâncias administrativas (CARF).'
  },
  {
    title: 'Contencioso Cível e Comercial',
    description: 'Resolução de disputas corporativas de alta complexidade.',
    details: 'Representação em litígios judiciais envolvendo disputas societárias, contratos comerciais e responsabilidade civil empresarial.'
  },
  {
    title: 'Arbitragem Internacional',
    description: 'Solução extrajudicial de conflitos em fóruns globais.',
    details: 'Atuação em arbitragens nacionais e internacionais sob as regras das principais câmaras (ICC, CAM-CCBC, AMCHAM) para resolution de conflitos estratégicos.'
  },
  {
    title: 'Compliance e Anticorrupção',
    description: 'Implementação de programas de integridade e investigações internas.',
    details: 'Consultoria em governança corporativa, adequação à Lei Anticorrupção e gestão de riscos em transações corporativas.'
  },
  {
    title: 'Trabalhista Estratégico',
    description: 'Assessoria consultiva e contenciosa focada em executivos e RH.',
    details: 'Foco na prevenção de passivos, planos de stock options, contratação de altos executivos e negociações sindicais complexas.'
  },
  {
    title: 'Direito Imobiliário',
    description: 'Operações imobiliárias estruturadas e desenvolvimento urbano.',
    details: 'Assessoria em aquisições de imóveis, incorporações, Built-to-Suit, Sale-Leaseback e regularização fundiária para grandes players.'
  },
  {
    title: 'Agronegócio',
    description: 'Instrumentos financeiros e proteção jurídica para o setor rural.',
    details: 'Especialistas em títulos de crédito do agro (LCA, CPR), contratos agrários, exportação de commodities e regulação ambiental no campo.'
  },
  {
    title: 'Tecnologia e Privacidade',
    description: 'Proteção de dados (LGPD) e regulação de novos negócios digitais.',
    details: 'Consultoria em propriedade intelectual digital, termos de uso, conformidade com a LGPD e estruturação jurídica para startups e Big Techs.'
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dr. Arthur Mello',
    role: 'Sócio-Diretor',
    area: 'Corporativo e M&A',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    description: 'Especialista em fusões transfronteiriças e reestruturações societárias de alta complexidade com mais de 20 anos de experiência.',
    oab: 'OAB/SP 123.456'
  },
  {
    id: 'prof-1-2',
    name: 'Dr. Ricardo Borges',
    role: 'Sócio',
    area: 'Corporativo e M&A',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
    description: 'Focado em reestruturações de dívida e governança corporativa em setores de varejo.',
    oab: 'OAB/SP 112.233'
  },
  {
    id: 'prof-2',
    name: 'Dra. Marina Silva',
    role: 'Sócia',
    area: 'Mercado de Capitais',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
    description: 'Lidera ofertas públicas inovadoras e assessora empresas na governança perante órgãos reguladores nacionais e internacionais.',
    oab: 'OAB/SP 234.567'
  },
  {
    id: 'prof-3',
    name: 'Dr. Roberto Almeida',
    role: 'Sócio',
    area: 'Bancário e Financeiro',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800',
    description: 'Especialista em financiamentos estruturados e regulação bancária, atuando nos principais deals do setor financeiro brasileiro.',
    oab: 'OAB/SP 345.678'
  },
  {
    id: 'prof-4',
    name: 'Dra. Helena Costa',
    role: 'Sócia',
    area: 'Infraestrutura e Direito Público',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800',
    description: 'Expertise em concessões e parcerias público-privadas, focada em grandes projetos de energia e logística.',
    oab: 'OAB/SP 456.789'
  },
  {
    id: 'prof-5',
    name: 'Dra. Carolina Ferraz',
    role: 'Sócia Sênior',
    area: 'Tributário Estratégico',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800',
    description: 'Reconhecida por teses tributárias inovadoras em tribunais superiores, focada na otimização de encargos fiscais para multinacionais.',
    oab: 'OAB/SP 567.890'
  },
  {
    id: 'prof-6',
    name: 'Dr. Leonardo Santos',
    role: 'Sócio',
    area: 'Contencioso Cível e Comercial',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800',
    description: 'Estrategista em disputas comerciais complexas, com atuação destacada em litígios societários de alto valor financeiro.',
    oab: 'OAB/SP 678.901'
  },
  {
    id: 'prof-7',
    name: 'Dra. Beatriz Oliveira',
    role: 'Sócia',
    area: 'Arbitragem Internacional',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800',
    description: 'Ampla experiência em arbitragens perante a CCI e o CAM-CCBC, representando clientes globais em conflitos de infraestrutura.',
    oab: 'OAB/SP 789.012'
  },
  {
    id: 'prof-8',
    name: 'Dr. Felipe Gusmão',
    role: 'Sócio',
    area: 'Agronegócio',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
    description: 'Especialista em títulos de crédito do agro e estruturação de garantias rurais, conectando o campo ao mercado de capitais.',
    oab: 'OAB/SP 890.123'
  },
  {
    id: 'prof-9',
    name: 'Dra. Isabella Rocha',
    role: 'Sócia',
    area: 'Tecnologia e Privacidade',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800',
    description: 'Especialista em LGPD e governança de dados para Big Techs, atuando na vanguarda da regulamentação da inteligência artificial.',
    oab: 'OAB/SP 901.234'
  },
  {
    id: 'prof-10',
    name: 'Dr. Gabriel Mendes',
    role: 'Sócio',
    area: 'Compliance e Anticorrupção',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800',
    description: 'Especialista em investigações internas e programas de integridade corporativa.',
    oab: 'OAB/SP 012.345'
  },
  {
    id: 'prof-11',
    name: 'Dra. Letícia Antunes',
    role: 'Sócia',
    area: 'Trabalhista Estratégico',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800',
    description: 'Expertise em negociações sindicais e defesa de executivos em lides de alta complexidade.',
    oab: 'OAB/SP 123.012'
  },
  {
    id: 'prof-12',
    name: 'Dr. Hugo Viana',
    role: 'Sócio',
    area: 'Direito Imobiliário',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    description: 'Lidera operações de Sale-Leaseback e regularização de ativos imobiliários institucionais.',
    oab: 'OAB/SP 234.123'
  }
];
