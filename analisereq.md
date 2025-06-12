Documentação do Projeto SchoolManager
A. PROJETO DE SISTEMA DE GESTÃO ESCOLAR – Organização de
Turmas, Alunos e Professores

1. Informações Gerais
   Nome: SchoolManager
   Objetivo: Plataforma web para professores gerenciarem turmas, alunos e
   frequências de forma simples e segura.
   Produto/Serviço apresentado: Sistema de cadastro de turmas, alunos e
   professores, com dashboards de acompanhamento e relatórios de presença.
   Público-alvo: Instituições de ensino fundamentais e médio; professores e
   coordenadores pedagógicos.
   Principal CTA: "Acessar Dashboard" — exige login seguro (JWT) e direciona para o
   painel principal do professor.
   B. REQUISITOS FUNCIONAIS
1. Front-end (React)
   • Páginas:

- Login (autenticação via JWT)
- Dashboard do Professor (visão geral de turmas e frequências)
- Cadastro/Edição de Turma
- Lista de Alunos
  • Chamadas à API: Usar axios ou fetch para consumir endpoints de turmas, alunos
  e frequência.
  • Navegação: Organizar rotas com React Router, incluindo proteção de rotas após
  login.

2. Back-end (Node.js + Express)
   • Rotas REST para: /turmas, /alunos, /professores, /frequencias
   • Endpoints de vinculação: alocar alunos em turmas e professor responsável.
   • Autenticação: JWT com rotas públicas (login) e protegidas (CRUD).
   • Validação de dados: Usar Joi ou express-validator para garantir payloads
   corretos.
3. Banco de Dados (MongoDB + Mongoose)
   • Modelagem de documentos:

- Professor (nome, e-mail, senha-hash)
- Turma (nome, semestre, professorId)
- Aluno (nome, matrícula, e-mail)
- Frequência (turmaId, alunoId, data, status)
  • Schemas Mongoose com validações de campo (required, unique, formatos).
  • Seed: scripts para popular dados iniciais (professores, turmas, alunos).

4. DevOps & Integração
   • Versionamento: Git + GitHub (branch por feature, pull requests).
   • Deploy Front-end: Vercel
   • Deploy Back-end: Render ou Heroku
   • Configuração segura: armazenar variáveis sensíveis em .env, nunca comitar
   tokens.
5. UX/UI Designer & Documentação
   • Protótipo de layout: Figma ou componentes Tailwind UI
   • Responsividade e acessibilidade: usar práticas WCAG (contraste, labels,
   navegação por teclado).
   • README.md no repositório:

- Instruções de instalação, scripts de seed, endpoints documentados.
  C. REQUISITOS NÃO FUNCIONAIS
  • Responsividade: mobile-first, compatível com smartphones e tablets.
  • Performance: carregamento sob 2 s; lazy-loading de listas grandes.
  • Escalabilidade: arquitetura modular (services/controllers), fácil adição de novos
  módulos.
  • Manutenção: código seguindo Clean Code; estrutura em camadas (routes →
  controllers services models). → →
  • Segurança: criptografia de senhas (bcrypt), headers HTTP seguros (helmet), CORS
  restrito.
  D. DESIGN E UX/UI
  • Identidade visual: paleta escolar suave (tons de azul e branco).
  • Componentes reutilizáveis: botões, inputs, cards e tabelas estilizados com
  Tailwind CSS.
  • Fluxo de uso:

1.  Login 2. Dashboard 3. Selecionar Turma 4. Gerenciar → → →
    Alunos/Frequências.
    • Feedbacks visuais: indicadores de sucesso/erro em formulários, loaders durante
    chamadas à API.
    E. PLANEJAMENTO E ENTREGA
    • Prazo total: 1 mês
    • Sprints (quizenais):
1.  Autenticação e layout de login
1.  CRUD de turmas e modelagem de dados
1.  CRUD de alunos e vinculação em turmas
1.  Marcação de frequência e dashboards
    • Ferramenta de gestão: Trello (listas: Backlog, Em Progresso, Em Revisão,
    Concluído).
    • Revisão de entregas: demos ao final de cada sprint.
    F. ATORES DO SISTEMA
    • Professor: Acessa dashboard, cria/edita turmas, marca frequência e visualiza
    lista de alunos.
    • Administrador (opcional): Gerencia usuários (professores), configurações gerais
    e acessos.
    • Aluno (visualização futura): Consulta notas e presença (módulo a ser
    implementado).
    H. TECNOLOGIAS SUGERIDAS
    • Front-end: React, React Router, axios, Tailwind CSS
    • Back-end: Node.js, Express, JWT, express-validator
    • Banco de Dados: MongoDB, Mongoose
    • DevOps: GitHub, Vercel, Render, Docker (opcional)
    I. RELATÓRIOS E INDICADORES
1.  Relatório de Turmas: listagem com filtros por semestre e professor.
1.  Relatório de Alunos: status de matrícula e percentual de presença.
1.  Indicadores de Frequência: taxa média por turma e por aluno; alertas de baixa
    presença (< 75%).
    J. SEGURANÇA E PERMISSÕES
    • Autenticação JWT: tokens de acesso com expiração (e refresh tokens).
    • Middleware de autorização: rotas protegidas por perfil (professor x admin).
    • Validação de entradas: prevenir injeção de NoSQL e XSS.
    • CORS restrito: apenas domínios confiáveis.
