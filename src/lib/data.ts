// ─── RA Hub — Mock Data Store ─────────────────────────────────────────────────
// Todos os dados são simulados. Substitua por chamadas à API real no futuro.

export const USERS = [
  { id: '1', name: 'Admin RA Digital', email: 'admin@radigital.com.br', role: 'ADMIN', avatar: 'A', isActive: true },
  { id: '2', name: 'Carlos Mendes',    email: 'carlos@radigital.com.br', role: 'TRAFFIC', avatar: 'C', isActive: true },
  { id: '3', name: 'Fernanda Lima',    email: 'fernanda@radigital.com.br', role: 'SOCIAL', avatar: 'F', isActive: true },
];

export const CLIENTS = [
  {
    id: '1', name: 'Clínica Dra. Silva', email: 'contato@clinicadrasilva.com.br',
    phone: '(11) 98765-4321', segment: 'Saúde', status: 'ACTIVE',
    monthlyFee: 1800, setupFee: 2500, startDate: '2024-01-15',
    tags: ['Meta Ads', 'Google Ads'], avatar: 'C',
    address: 'Rua das Flores, 123 — São Paulo/SP',
    notes: 'Cliente exigente, foco em agendamentos online.',
    metaConnected: true, googleConnected: true,
  },
  {
    id: '2', name: 'Pizzaria Dom Marco', email: 'dom@pizzariadommarco.com.br',
    phone: '(11) 97654-3210', segment: 'Alimentação', status: 'ACTIVE',
    monthlyFee: 1200, setupFee: 1800, startDate: '2024-02-01',
    tags: ['Meta Ads', 'GMB'], avatar: 'P',
    address: 'Av. Paulista, 456 — São Paulo/SP',
    notes: 'Foco em delivery e reservas.',
    metaConnected: true, googleConnected: false,
  },
  {
    id: '3', name: 'Imobiliária Horizonte', email: 'mktg@imobhorizonte.com.br',
    phone: '(11) 96543-2109', segment: 'Imóveis', status: 'ACTIVE',
    monthlyFee: 3200, setupFee: 4000, startDate: '2023-11-10',
    tags: ['Google Ads', 'Meta Ads', 'Sites'], avatar: 'I',
    address: 'Rua Consolação, 789 — São Paulo/SP',
    notes: 'Alto volume de leads, ciclo de venda longo.',
    metaConnected: true, googleConnected: true,
  },
  {
    id: '4', name: 'Academia FitLife', email: 'academia@fitlife.com.br',
    phone: '(11) 95432-1098', segment: 'Fitness', status: 'ACTIVE',
    monthlyFee: 950, setupFee: 1500, startDate: '2024-03-05',
    tags: ['Meta Ads', 'Social Media'], avatar: 'A',
    address: 'Rua Augusta, 321 — São Paulo/SP',
    notes: 'Campanhas sazonais: janeiro e pré-verão.',
    metaConnected: true, googleConnected: false,
  },
  {
    id: '5', name: 'Restaurante Sabor & Arte', email: 'sabor@restaurantesaborarte.com.br',
    phone: '(11) 94321-0987', segment: 'Alimentação', status: 'PAUSED',
    monthlyFee: 800, setupFee: 1200, startDate: '2024-04-01',
    tags: ['Meta Ads', 'GMB'], avatar: 'R',
    address: 'Rua Oscar Freire, 654 — São Paulo/SP',
    notes: 'Pausado — aguardando renovação de contrato.',
    metaConnected: false, googleConnected: false,
  },
  {
    id: '6', name: 'Tech Soluções ME', email: 'mktg@techsolucoes.com.br',
    phone: '(11) 93210-9876', segment: 'Tecnologia', status: 'ACTIVE',
    monthlyFee: 2400, setupFee: 3000, startDate: '2024-01-20',
    tags: ['Google Ads', 'Sites'], avatar: 'T',
    address: 'Al. Campinas, 852 — São Paulo/SP',
    notes: 'B2B, foco em captação de leads qualificados.',
    metaConnected: false, googleConnected: true,
  },
];

export const AGENCY_METRICS = {
  mrr: 10350,
  mrrGrowth: 8.5,
  activeClients: 5,
  totalClients: 6,
  totalAdSpend: 48600,
  adSpendGrowth: 12.3,
  avgROAS: 4.2,
  roasGrowth: 0.8,
  totalLeads: 1248,
  leadsGrowth: 22.1,
  avgCPL: 12.40,
  cplChange: -8.2,
};

export const REVENUE_CHART = [
  { month: 'Jan', receita: 8200, despesas: 3100, lucro: 5100 },
  { month: 'Fev', receita: 8900, despesas: 3200, lucro: 5700 },
  { month: 'Mar', receita: 9400, despesas: 3400, lucro: 6000 },
  { month: 'Abr', receita: 9100, despesas: 3300, lucro: 5800 },
  { month: 'Mai', receita: 9800, despesas: 3500, lucro: 6300 },
  { month: 'Jun', receita: 10350, despesas: 3800, lucro: 6550 },
];

export const CAMPAIGNS = [
  {
    id: '1', clientId: '1', clientName: 'Clínica Dra. Silva',
    name: 'Campanha Agendamento — Botox & Harmonização',
    platform: 'META', status: 'ACTIVE',
    budget: 3500, spend: 2840, impressions: 124500, clicks: 3820,
    leads: 184, conversions: 47, ctr: 3.07, cpc: 0.74, cpl: 15.43, roas: 3.8,
    startDate: '2024-06-01', objective: 'LEAD_GENERATION',
    topCreative: 'Video — Antes e Depois', creativeScore: 8.4,
  },
  {
    id: '2', clientId: '1', clientName: 'Clínica Dra. Silva',
    name: 'Google Ads — Pesquisa Clínica Estética',
    platform: 'GOOGLE', status: 'ACTIVE',
    budget: 2800, spend: 2210, impressions: 48200, clicks: 2640,
    leads: 142, conversions: 38, ctr: 5.47, cpc: 0.84, cpl: 15.56, roas: 4.2,
    startDate: '2024-05-15', objective: 'CONVERSIONS',
    topCreative: 'Anúncio de texto — harmonização facial', creativeScore: 7.9,
  },
  {
    id: '3', clientId: '3', clientName: 'Imobiliária Horizonte',
    name: 'Meta Ads — Lançamento Residencial Park View',
    platform: 'META', status: 'ACTIVE',
    budget: 8000, spend: 6920, impressions: 280000, clicks: 7840,
    leads: 312, conversions: 28, ctr: 2.80, cpc: 0.88, cpl: 22.18, roas: 5.1,
    startDate: '2024-06-01', objective: 'LEAD_GENERATION',
    topCreative: 'Carrossel — Tour virtual apartamento', creativeScore: 9.1,
  },
  {
    id: '4', clientId: '3', clientName: 'Imobiliária Horizonte',
    name: 'Google Ads — Pesquisa Imóveis SP',
    platform: 'GOOGLE', status: 'ACTIVE',
    budget: 5000, spend: 4150, impressions: 89000, clicks: 4820,
    leads: 198, conversions: 18, ctr: 5.42, cpc: 0.86, cpl: 20.96, roas: 6.2,
    startDate: '2024-05-01', objective: 'CONVERSIONS',
    topCreative: 'Anúncio responsivo — apartamentos zona sul', creativeScore: 8.2,
  },
  {
    id: '5', clientId: '2', clientName: 'Pizzaria Dom Marco',
    name: 'Meta Ads — Delivery Fim de Semana',
    platform: 'META', status: 'ACTIVE',
    budget: 1800, spend: 1650, impressions: 95000, clicks: 4200,
    leads: 89, conversions: 142, ctr: 4.42, cpc: 0.39, cpl: 11.52, roas: 8.4,
    startDate: '2024-06-05', objective: 'CONVERSIONS',
    topCreative: 'Video — Pizza saindo do forno', creativeScore: 9.3,
  },
  {
    id: '6', clientId: '4', clientName: 'Academia FitLife',
    name: 'Meta Ads — Matrícula Janeiro 2024',
    platform: 'META', status: 'PAUSED',
    budget: 2200, spend: 2200, impressions: 110000, clicks: 5500,
    leads: 248, conversions: 68, ctr: 5.00, cpc: 0.40, cpl: 8.87, roas: 5.8,
    startDate: '2024-01-02', objective: 'LEAD_GENERATION',
    topCreative: 'Imagem — Promoção janeiro fit', creativeScore: 7.6,
  },
  {
    id: '7', clientId: '6', clientName: 'Tech Soluções ME',
    name: 'Google Ads — Software Gestão B2B',
    platform: 'GOOGLE', status: 'ACTIVE',
    budget: 4500, spend: 3800, impressions: 62000, clicks: 1860,
    leads: 94, conversions: 12, ctr: 3.00, cpc: 2.04, cpl: 40.43, roas: 3.2,
    startDate: '2024-05-20', objective: 'LEAD_GENERATION',
    topCreative: 'Anúncio texto — software para PMEs', creativeScore: 7.2,
  },
];

export const PERFORMANCE_CHART = [
  { date: '01/06', leads: 38, spend: 1240 },
  { date: '08/06', leads: 52, spend: 1680 },
  { date: '15/06', leads: 67, spend: 2100 },
  { date: '22/06', leads: 89, spend: 2840 },
  { date: '29/06', leads: 74, spend: 2320 },
];

export const CRM_STAGES = [
  { id: 'NOVO',        label: 'Novo Lead',       color: 'bg-slate-100 text-slate-700',    dot: 'bg-slate-400'   },
  { id: 'CONTATO',     label: 'Em Contato',      color: 'bg-blue-100 text-blue-700',      dot: 'bg-blue-500'    },
  { id: 'PROPOSTA',    label: 'Proposta Enviada', color: 'bg-yellow-100 text-yellow-700',  dot: 'bg-yellow-500'  },
  { id: 'NEGOCIACAO',  label: 'Negociação',      color: 'bg-orange-100 text-orange-700',  dot: 'bg-orange-500'  },
  { id: 'FECHADO_WON', label: 'Ganho ✓',         color: 'bg-green-100 text-green-700',    dot: 'bg-green-500'   },
  { id: 'FECHADO_LOST',label: 'Perdido ✗',       color: 'bg-red-100 text-red-700',        dot: 'bg-red-400'     },
];

export const CRM_LEADS = [
  { id: '1', name: 'Dr. Roberto Costa',   company: 'Clínica Estética RC',  phone: '(11) 98111-2233', email: 'roberto@clinicaestrc.com', stage: 'PROPOSTA',    value: 2400, source: 'Indicação',  assignee: 'Carlos',   tags: ['Saúde'],     lastContact: '2024-06-24', notes: 'Interessado em plano trimestral.' },
  { id: '2', name: 'Ana Paula Ferreira',  company: 'Boutique Ana',         phone: '(11) 97222-3344', email: 'ana@boutiqueana.com',    stage: 'CONTATO',     value: 1200, source: 'Instagram',  assignee: 'Fernanda', tags: ['Moda'],      lastContact: '2024-06-25', notes: 'Veio pelo post do feed.' },
  { id: '3', name: 'Marcos Oliveira',     company: 'Construtora MO',       phone: '(11) 96333-4455', email: 'marcos@construtoamo.com', stage: 'NEGOCIACAO',  value: 5800, source: 'Google',     assignee: 'Carlos',   tags: ['Imóveis'],   lastContact: '2024-06-23', notes: 'Aguardando aprovação diretoria.' },
  { id: '4', name: 'Juliana Mendonça',    company: 'Studio Juliana',       phone: '(11) 95444-5566', email: 'ju@studiojuliana.com',   stage: 'NOVO',        value: 950,  source: 'WhatsApp',  assignee: 'Fernanda', tags: ['Beleza'],    lastContact: '2024-06-26', notes: 'Primeiro contato.' },
  { id: '5', name: 'Pedro Alves',         company: 'Pet Shop Amigo Fiel',  phone: '(11) 94555-6677', email: 'pedro@amigofiel.com',    stage: 'FECHADO_WON', value: 1600, source: 'Indicação',  assignee: 'Carlos',   tags: ['Pet'],       lastContact: '2024-06-20', notes: 'Contrato assinado — início em julho.' },
  { id: '6', name: 'Carla Rodrigues',     company: 'Escola de Idiomas VIP',phone: '(11) 93666-7788', email: 'carla@idiomasvip.com',  stage: 'CONTATO',     value: 2100, source: 'Facebook',   assignee: 'Carlos',   tags: ['Educação'],  lastContact: '2024-06-24', notes: 'Reunião agendada para 28/06.' },
  { id: '7', name: 'Bruno Santos',        company: 'Transportes BS',       phone: '(11) 92777-8899', email: 'bruno@transportebs.com',  stage: 'FECHADO_LOST',value: 3200, source: 'Cold Call', assignee: 'Fernanda', tags: ['Logística'], lastContact: '2024-06-15', notes: 'Optou por solução interna.' },
  { id: '8', name: 'Luciana Azevedo',     company: 'Farmácia Vida & Saúde',phone: '(11) 91888-9900', email: 'lu@farmaciavida.com',   stage: 'PROPOSTA',    value: 1800, source: 'Google',     assignee: 'Carlos',   tags: ['Saúde'],     lastContact: '2024-06-22', notes: 'Aguardando resposta da proposta.' },
];

export const TRANSACTIONS = [
  { id: '1',  date: '2024-06-25', description: 'Mensalidade — Imobiliária Horizonte',  type: 'INCOME',  category: 'Mensalidade', amount: 3200, status: 'PAID',    clientId: '3' },
  { id: '2',  date: '2024-06-25', description: 'Mensalidade — Clínica Dra. Silva',     type: 'INCOME',  category: 'Mensalidade', amount: 1800, status: 'PAID',    clientId: '1' },
  { id: '3',  date: '2024-06-24', description: 'Mensalidade — Tech Soluções ME',       type: 'INCOME',  category: 'Mensalidade', amount: 2400, status: 'PAID',    clientId: '6' },
  { id: '4',  date: '2024-06-23', description: 'Mensalidade — Academia FitLife',       type: 'INCOME',  category: 'Mensalidade', amount: 950,  status: 'PENDING', clientId: '4' },
  { id: '5',  date: '2024-06-22', description: 'Mensalidade — Pizzaria Dom Marco',     type: 'INCOME',  category: 'Mensalidade', amount: 1200, status: 'PAID',    clientId: '2' },
  { id: '6',  date: '2024-06-21', description: 'Setup — Cliente Tech Soluções',        type: 'INCOME',  category: 'Setup',       amount: 3000, status: 'PAID',    clientId: '6' },
  { id: '7',  date: '2024-06-20', description: 'Ferramenta — Semrush Pro',             type: 'EXPENSE', category: 'Ferramentas', amount: 420,  status: 'PAID',    clientId: null },
  { id: '8',  date: '2024-06-18', description: 'Freelancer — Designer gráfico',        type: 'EXPENSE', category: 'Equipe',      amount: 800,  status: 'PAID',    clientId: null },
  { id: '9',  date: '2024-06-15', description: 'Plataforma — Meta Business Suite',     type: 'EXPENSE', category: 'Plataformas', amount: 199,  status: 'PAID',    clientId: null },
  { id: '10', date: '2024-06-15', description: 'Mensalidade — Sabor & Arte',           type: 'INCOME',  category: 'Mensalidade', amount: 800,  status: 'OVERDUE', clientId: '5' },
  { id: '11', date: '2024-06-10', description: 'Comissão — Indicação Imobiliária',     type: 'INCOME',  category: 'Comissão',    amount: 500,  status: 'PAID',    clientId: '3' },
  { id: '12', date: '2024-06-08', description: 'Servidor — VPS Produção',              type: 'EXPENSE', category: 'Infraestrutura',amount: 290, status: 'PAID',   clientId: null },
];

export const SUBSCRIPTIONS = [
  { clientId: '1', clientName: 'Clínica Dra. Silva',     plan: 'Meta + Google + GMB', amount: 1800, dueDay: 25, status: 'ACTIVE',  nextDue: '2024-07-25' },
  { clientId: '2', clientName: 'Pizzaria Dom Marco',     plan: 'Meta + GMB',          amount: 1200, dueDay: 1,  status: 'ACTIVE',  nextDue: '2024-07-01' },
  { clientId: '3', clientName: 'Imobiliária Horizonte',  plan: 'Meta + Google + Sites',amount: 3200, dueDay: 25, status: 'ACTIVE',  nextDue: '2024-07-25' },
  { clientId: '4', clientName: 'Academia FitLife',       plan: 'Meta + Social Media',  amount: 950,  dueDay: 5,  status: 'PENDING', nextDue: '2024-07-05' },
  { clientId: '5', clientName: 'Sabor & Arte',           plan: 'Meta + GMB',           amount: 800,  dueDay: 15, status: 'OVERDUE', nextDue: '2024-06-15' },
  { clientId: '6', clientName: 'Tech Soluções ME',       plan: 'Google + Sites',        amount: 2400, dueDay: 24, status: 'ACTIVE',  nextDue: '2024-07-24' },
];

export const GMB_PROFILES = [
  {
    id: '1', clientId: '1', clientName: 'Clínica Dra. Silva',
    placeId: 'ChIJ_fake_1', name: 'Clínica Dra. Silva — Estética Avançada',
    category: 'Clínica de estética', address: 'Rua das Flores, 123 — São Paulo/SP',
    phone: '(11) 98765-4321', website: 'https://clinicadrasilva.com.br',
    rating: 4.8, totalReviews: 127, monthlyViews: 3420, monthlySearches: 1840,
    monthlyActions: 284, lastPost: '2024-06-24', isVerified: true,
    pendingReviews: 3,
    recentReviews: [
      { author: 'Maria S.', rating: 5, text: 'Atendimento incrível! Resultado perfeito no botox.', date: '2024-06-25', replied: false },
      { author: 'João P.',  rating: 5, text: 'Profissionalismo exemplar. Recomendo muito!',        date: '2024-06-23', replied: true  },
      { author: 'Ana C.',   rating: 4, text: 'Ótimo serviço, só achei o preço um pouco alto.',    date: '2024-06-20', replied: false },
    ],
  },
  {
    id: '2', clientId: '2', clientName: 'Pizzaria Dom Marco',
    placeId: 'ChIJ_fake_2', name: 'Pizzaria Dom Marco — Tradição Italiana',
    category: 'Pizzaria', address: 'Av. Paulista, 456 — São Paulo/SP',
    phone: '(11) 97654-3210', website: 'https://pizzariadommarco.com.br',
    rating: 4.6, totalReviews: 348, monthlyViews: 8920, monthlySearches: 4210,
    monthlyActions: 612, lastPost: '2024-06-22', isVerified: true,
    pendingReviews: 7,
    recentReviews: [
      { author: 'Lucas M.', rating: 5, text: 'Pizza sensacional! Massa fina crocante.',    date: '2024-06-26', replied: false },
      { author: 'Renata B.', rating: 3, text: 'Demorou 90min pra chegar. Sabor bom.',      date: '2024-06-24', replied: false },
      { author: 'Carlos F.', rating: 5, text: 'Melhor pizza do bairro sem dúvida!',        date: '2024-06-21', replied: true  },
    ],
  },
  {
    id: '3', clientId: '4', clientName: 'Academia FitLife',
    placeId: 'ChIJ_fake_3', name: 'Academia FitLife — Treino & Saúde',
    category: 'Academia de ginástica', address: 'Rua Augusta, 321 — São Paulo/SP',
    phone: '(11) 95432-1098', website: 'https://fitlife.com.br',
    rating: 4.4, totalReviews: 89, monthlyViews: 2140, monthlySearches: 980,
    monthlyActions: 165, lastPost: '2024-06-18', isVerified: true,
    pendingReviews: 1,
    recentReviews: [
      { author: 'Pedro R.', rating: 5, text: 'Equipamentos modernos e instrutores ótimos!', date: '2024-06-25', replied: true  },
      { author: 'Camila T.', rating: 4, text: 'Gosto muito, mas fica lotada nos horários de pico.', date: '2024-06-20', replied: false },
    ],
  },
];

export const SOCIAL_POSTS = [
  { id: '1', clientId: '1', clientName: 'Clínica Dra. Silva', platform: 'INSTAGRAM', type: 'FEED',   status: 'PUBLISHED', date: '2024-06-25', caption: 'Resultado incrível de harmonização facial ✨ Agende sua avaliação!', likes: 284, comments: 42, shares: 18, reach: 4820 },
  { id: '2', clientId: '1', clientName: 'Clínica Dra. Silva', platform: 'INSTAGRAM', type: 'STORY',  status: 'PUBLISHED', date: '2024-06-24', caption: 'Stories: promoção especial de julho!',                             likes: 0,   comments: 12, shares: 0,  reach: 1240 },
  { id: '3', clientId: '2', clientName: 'Pizzaria Dom Marco', platform: 'INSTAGRAM', type: 'FEED',   status: 'PUBLISHED', date: '2024-06-24', caption: 'Pizza Margherita novidade do cardápio 🍕',                       likes: 520, comments: 67, shares: 34, reach: 9840 },
  { id: '4', clientId: '2', clientName: 'Pizzaria Dom Marco', platform: 'FACEBOOK',  type: 'POST',   status: 'PUBLISHED', date: '2024-06-23', caption: 'Fim de semana é dia de pizza em família!',                       likes: 142, comments: 28, shares: 56, reach: 5420 },
  { id: '5', clientId: '4', clientName: 'Academia FitLife',   platform: 'INSTAGRAM', type: 'REEL',   status: 'PUBLISHED', date: '2024-06-22', caption: 'Transformação de 90 dias — resultado real! 💪',                  likes: 1840,comments: 183,shares: 142,reach: 28400},
  { id: '6', clientId: '3', clientName: 'Imobiliária Horizonte', platform: 'INSTAGRAM', type: 'FEED', status: 'SCHEDULED', date: '2024-06-28', caption: 'Novo lançamento: Park View Residencial 🏢 Tour virtual disponível!', likes: 0, comments: 0, shares: 0, reach: 0 },
  { id: '7', clientId: '1', clientName: 'Clínica Dra. Silva', platform: 'INSTAGRAM', type: 'REEL',   status: 'DRAFT',     date: '2024-07-01', caption: 'Reel: 5 cuidados pós-procedimento',                              likes: 0,   comments: 0,  shares: 0,  reach: 0 },
  { id: '8', clientId: '2', clientName: 'Pizzaria Dom Marco', platform: 'INSTAGRAM', type: 'STORY',  status: 'SCHEDULED', date: '2024-06-27', caption: 'Story: enquete — qual pizza você prefere?',                     likes: 0,   comments: 0,  shares: 0,  reach: 0 },
];

export const SITES_PROJECTS = [
  {
    id: '1', clientId: '3', clientName: 'Imobiliária Horizonte',
    name: 'Site Institucional + Landing Pages',
    type: 'Institucional + LP', status: 'IN_PROGRESS', progress: 65,
    startDate: '2024-05-15', deadline: '2024-07-20',
    budget: 8500, paid: 4250,
    tech: 'WordPress + Elementor',
    stages: [
      { name: 'Briefing', done: true },
      { name: 'Wireframes', done: true },
      { name: 'Design', done: true },
      { name: 'Desenvolvimento', done: false },
      { name: 'Conteúdo', done: false },
      { name: 'Revisão', done: false },
      { name: 'Publicação', done: false },
    ],
    notes: 'Aguardando conteúdo textual do cliente.',
  },
  {
    id: '2', clientId: '6', clientName: 'Tech Soluções ME',
    name: 'Landing Page — Software de Gestão',
    type: 'Landing Page', status: 'DELIVERED', progress: 100,
    startDate: '2024-04-01', deadline: '2024-05-15',
    budget: 3200, paid: 3200,
    tech: 'Next.js + Tailwind',
    stages: [
      { name: 'Briefing', done: true },
      { name: 'Wireframes', done: true },
      { name: 'Design', done: true },
      { name: 'Desenvolvimento', done: true },
      { name: 'Conteúdo', done: true },
      { name: 'Revisão', done: true },
      { name: 'Publicação', done: true },
    ],
    notes: 'Projeto entregue e aprovado pelo cliente.',
  },
  {
    id: '3', clientId: '1', clientName: 'Clínica Dra. Silva',
    name: 'Redesign Site Clínica',
    type: 'Institucional', status: 'BRIEFING', progress: 15,
    startDate: '2024-06-20', deadline: '2024-08-30',
    budget: 5500, paid: 1375,
    tech: 'WordPress + Elementor',
    stages: [
      { name: 'Briefing', done: true },
      { name: 'Wireframes', done: false },
      { name: 'Design', done: false },
      { name: 'Desenvolvimento', done: false },
      { name: 'Conteúdo', done: false },
      { name: 'Revisão', done: false },
      { name: 'Publicação', done: false },
    ],
    notes: 'Briefing concluído. Iniciar wireframes esta semana.',
  },
];

export const INSIGHTS = [
  { id: '1', clientId: '2', clientName: 'Pizzaria Dom Marco', type: 'OPPORTUNITY', priority: 'HIGH',
    title: 'CTR acima da média — escalar orçamento', icon: '🚀',
    description: 'A campanha "Delivery Fim de Semana" tem CTR de 4.42% (média do setor: 2.1%). Aumentar o orçamento em 30% pode gerar mais 38 conversões/semana.',
    action: 'Aumentar budget de R$1.800 para R$2.340', impact: '+R$1.240 receita estimada/mês' },
  { id: '2', clientId: '3', clientName: 'Imobiliária Horizonte', type: 'ALERT', priority: 'MEDIUM',
    title: 'CPL subindo — revisar segmentação', icon: '⚠️',
    description: 'O CPL do Google Ads subiu 18% nas últimas 2 semanas (R$17.80 → R$21.20). Provável aumento de concorrência.',
    action: 'Revisar palavras-chave negativas e ajustar lances', impact: 'Redução de 15% no CPL' },
  { id: '3', clientId: '1', clientName: 'Clínica Dra. Silva', type: 'QUICK_WIN', priority: 'HIGH',
    title: 'Testar novo criativo em vídeo', icon: '🎬',
    description: 'O criativo "Before & After" tem performance 34% acima dos estáticos. Produzir 2-3 novos vídeos similares pode aumentar o ROAS.',
    action: 'Briefing para 3 vídeos de antes/depois', impact: '+R$2.800 leads estimados/mês' },
  { id: '4', clientId: '5', clientName: 'Sabor & Arte', type: 'ALERT', priority: 'HIGH',
    title: 'Mensalidade em atraso — contatar cliente', icon: '💰',
    description: 'A mensalidade de junho (R$800) está em atraso há 11 dias. Contato necessário para regularização.',
    action: 'Ligar para o cliente hoje', impact: 'Risco de cancelamento' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const fmt = {
  currency: (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  number:   (v: number) => v.toLocaleString('pt-BR'),
  percent:  (v: number, decimals = 1) => `${v.toFixed(decimals)}%`,
  change:   (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
};

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE:  'Ativo', PAUSED: 'Pausado', INACTIVE: 'Inativo',
  PAID: 'Pago', PENDING: 'Pendente', OVERDUE: 'Atrasado',
  IN_PROGRESS: 'Em andamento', DELIVERED: 'Entregue', BRIEFING: 'Briefing',
  PUBLISHED: 'Publicado', SCHEDULED: 'Agendado', DRAFT: 'Rascunho',
};

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE:      'bg-green-100 text-green-700',
  PAUSED:      'bg-yellow-100 text-yellow-700',
  INACTIVE:    'bg-slate-100 text-slate-500',
  PAID:        'bg-green-100 text-green-700',
  PENDING:     'bg-yellow-100 text-yellow-700',
  OVERDUE:     'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  DELIVERED:   'bg-green-100 text-green-700',
  BRIEFING:    'bg-purple-100 text-purple-700',
  PUBLISHED:   'bg-green-100 text-green-700',
  SCHEDULED:   'bg-blue-100 text-blue-700',
  DRAFT:       'bg-slate-100 text-slate-600',
};
