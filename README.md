# RA Hub — Sistema da Agência RA Digital

Sistema web completo de gestão interna para agência de marketing focada em tráfego pago.

## ✅ O que foi criado

| Módulo | Funcionalidade |
|--------|---------------|
| 🔐 Login | Autenticação com 3 perfis de acesso |
| 📊 Dashboard | KPIs da agência, gráficos de receita e leads |
| 👥 Clientes | Cadastro, status, integrações, perfil detalhado |
| 🎯 Tráfego Pago | Campanhas Meta Ads + Google Ads, briefing de otimização |
| 🗂️ CRM | Kanban de leads inspirado no Kommo, arrastar e soltar |
| 💰 Financeiro | Entradas, saídas, mensalidades, integração futura Asaas |
| 📍 Google Meu Negócio | Perfis, avaliações, responder reviews |
| 📱 Social Media | Calendário de posts, métricas, agendamento |
| 🌐 Sites | Projetos com etapas, progresso e financeiro |
| 🔔 Alertas | Notificações e insights de otimização |
| ⚙️ Configurações | Usuários, permissões, integrações de API |

## 🚀 Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev

# Abrir no navegador
http://localhost:3000
```

## 👤 Logins de demonstração

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Administrador | admin@radigital.com.br | 123456 |
| Tráfego Pago | carlos@radigital.com.br | 123456 |
| Social Media | fernanda@radigital.com.br | 123456 |

## 📦 Deploy no Vercel (5 minutos)

1. Crie uma conta em https://github.com e suba este projeto
2. Acesse https://vercel.com → "Add New Project"
3. Importe o repositório → clique em "Deploy"
4. Pronto! URL gerada automaticamente.

Não precisa configurar nenhuma variável de ambiente — funciona sem backend!

## 🔗 Para conectar APIs reais

Quando quiser dados reais em vez de demonstração, configure:

| Variável | Serviço |
|----------|---------|
| META_APP_ID | developers.facebook.com |
| GOOGLE_CLIENT_ID | console.cloud.google.com |
| ASAAS_API_KEY | asaas.com |
| OPENAI_API_KEY | platform.openai.com |

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx              # Login
│   └── (app)/
│       ├── layout.tsx        # Sidebar + Header
│       ├── dashboard/        # Dashboard geral
│       ├── clients/          # Gestão de clientes
│       ├── traffic/          # Tráfego pago
│       ├── crm/              # CRM kanban
│       ├── financial/        # Financeiro
│       ├── gmb/              # Google Meu Negócio
│       ├── social/           # Social Media
│       ├── sites/            # Criação de Sites
│       ├── alerts/           # Alertas
│       └── settings/         # Configurações
├── lib/
│   ├── data.ts               # Todos os dados mockados
│   └── auth.ts               # Autenticação localStorage
```

---
RA Digital © 2024 — Sistema Interno v1.0
