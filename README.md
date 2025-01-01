# Projeto de Estudo - DFOOD

Este é um projeto de estudos que tem como objetivo desenvolver uma aplicação mobile. A aplicação foi desenvolvida utilizando o framework Expo, React Native e outras bibliotecas complementares.

## Como rodar o projeto

### Pré-requisitos:

- Node.js (recomendado a versão 14 ou superior)
- Install dependencies
   npm install
- Start the app
   npx expo start

## Versão 0.4

### O que foi feito:

- **Melhorias de Otimização**:
   - Otimizações gerais para melhorar a performance do aplicativo e reduzir a complexidade do código.
   - Redução do tempo de carregamento de páginas e melhor uso de estados para atualizações dinâmicas.
- **Novas Páginas Adicionadas**:
   - **Search**: Página dedicada para busca de restaurantes, categorias ou pratos específicos.
   - **Category**: Implementada uma página para navegação e seleção de categorias.
   - **Products**: Página para exibição detalhada dos produtos de uma categoria ou restaurante.
- **Aprimoramentos de Navegação**:
   - Melhor integração entre as páginas recém-adicionadas e as já existentes.
   - Fluxo de navegação ajustado para facilitar a experiência do usuário.

## Versão 0.3

### O que foi feito:

- **Arquitetura de Páginas**: Refatoração na estrutura de pastas para melhorar a organização do projeto.
   - **Pasta auth**: Todas as páginas que exigem autenticação foram movidas para a pasta auth.
   - **Pasta public**: Páginas públicas, como login e registro, foram movidas para a pasta public.
   - **Pagina verification removida**: A página de verificação foi combinada com a de registro, criando uma experiência mais fluida para o usuário.
- **Otimização de Páginas**: Algumas páginas foram otimizadas para melhorar o desempenho e a legibilidade do código, garantindo uma navegação mais rápida e eficiente.
- **Criação de Paginação na Home**: Foi implementada a funcionalidade de paginação na tela principal (Home), permitindo que os usuários visualizem os restaurantes ou categorias em várias páginas, melhorando a navegação em listas grandes.

## Versão 0.2

### O que foi feito:

- **Gestão de permissões de localização**: A tela de permissão de localização agora solicita e gerencia as permissões de localização do dispositivo. 
    - Se a permissão for concedida, o usuário é redirecionado para a página principal.
    - Se a permissão for negada, um alerta é mostrado para o usuário.
- **Refatoração do código**: Código otimizado com melhorias na legibilidade e estrutura.
- **Tela de navegação após permissão**: Implementação da navegação para telas específicas baseadas no status da permissão de localização (permitida ou negada).
- **Aprimoramento na usabilidade**: Ajustes no layout das telas para uma melhor experiência do usuário.

## Versão 0.1

### O que foi feito:

- **Configuração inicial**: Estrutura básica do projeto utilizando `expo-cli`.
- **Primeira tela de Splash**: Tela inicial de carregamento com animação simples e logo da aplicação.
- **Tela de Onboarding**: Tela de introdução para guiar o usuário durante o processo inicial do app.
- **Navegação básica**: Implementação do sistema de navegação entre telas utilizando `expo-router`.
- **Verificação de permissão de localização**: Criação de uma tela para verificar se o usuário concedeu permissão de acesso à sua localização.
- **Armazenamento local com AsyncStorage**: Utilização do `AsyncStorage` para gerenciar o estado da tela de onboarding (se o usuário já concluiu a introdução ou não).
