# Projeto de Estudo - DFOOD

Este é um projeto de estudos que tem como objetivo desenvolver uma aplicação mobile. A aplicação foi desenvolvida utilizando o framework Expo, React Native e outras bibliotecas complementares.

## Como rodar o projeto

### Pré-requisitos:

- Node.js (recomendado a versão 14 ou superior)
- Install dependencies
   npm install
- Start the app
   npx expo start

## Versão 0.1

### O que foi feito:

- **Configuração inicial**: Estrutura básica do projeto utilizando `expo-cli`.
- **Primeira tela de Splash**: Tela inicial de carregamento com animação simples e logo da aplicação.
- **Tela de Onboarding**: Tela de introdução para guiar o usuário durante o processo inicial do app.
- **Navegação básica**: Implementação do sistema de navegação entre telas utilizando `expo-router`.
- **Verificação de permissão de localização**: Criação de uma tela para verificar se o usuário concedeu permissão de acesso à sua localização.
- **Armazenamento local com AsyncStorage**: Utilização do `AsyncStorage` para gerenciar o estado da tela de onboarding (se o usuário já concluiu a introdução ou não).

## Versão 0.2

### O que foi feito:

- **Gestão de permissões de localização**: A tela de permissão de localização agora solicita e gerencia as permissões de localização do dispositivo. 
    - Se a permissão for concedida, o usuário é redirecionado para a página principal.
    - Se a permissão for negada, um alerta é mostrado para o usuário.
- **Refatoração do código**: Código otimizado com melhorias na legibilidade e estrutura.
- **Tela de navegação após permissão**: Implementação da navegação para telas específicas baseadas no status da permissão de localização (permitida ou negada).
- **Aprimoramento na usabilidade**: Ajustes no layout das telas para uma melhor experiência do usuário.
