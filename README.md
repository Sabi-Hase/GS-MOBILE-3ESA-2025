# WorkWell — Monitoramento de Bem-Estar no Trabalho
Global Solution 2025 — Mobile Development & IoT  
FIAP — Engenharia de Software — 3° Semestre
Integrantes:
Vinícius Almeida Bernardino de Souza - RM 97888
Márcio Hitoshi Tahyra - RM552511
Sabrina Flores - RM550781

---

## Sobre o projeto

WorkWell é um aplicativo mobile desenvolvido em React Native (Expo) com armazenamento local via AsyncStorage.  
O objetivo é permitir que trabalhadores registrem seu humor diariamente, acompanhem como se sentem ao longo do tempo e visualizem sua evolução emocional de forma simples, visual e eficiente.

A proposta visa trazer atenção para bem-estar, saúde emocional e acompanhamento consciente. pilares essenciais do trabalho moderno.

---

## Objetivo

• Monitorar o bem-estar diário do usuário  
• Estimular autoconsciência emocional  
• Facilitar registro e consulta rápida dos sentimentos  
• Apoiar a evolução emocional de forma simples e acessível  

---

## Funcionalidades do Aplicativo

| Funcionalidades 
|
| Registro diário de humor 
| Registro com anotações para descrição 
| Bloqueio de sábado e domingo 
| Histórico de registros 
| Editar e excluir registros já existentes 
| Cálculo automático de média semanal e mensal 
| Armazenamento permanente via AsyncStorage 

---

### Escala de humor utilizada

| Nota | Emoji | Significado |
|---|---|---|
| 1 | 😡 | Péssimo |
| 2 | 😞 | Ruim |
| 3 | 😐 | Neutro |
| 4 | 😊 | Bom |
| 5 | 🤩 | Excelente |

---

## Tecnologias Utilizadas

| Tecnologia | Aplicação |
|---|---|
| React Native / Expo | Interface principal do app |
| TypeScript | Tipo seguro para dados e funções |
| AsyncStorage | Persistência local dos registros |
| React Navigation | Navegação entre telas |
| React Native Calendars | Calendário 

---

## Instalação e Execução do Projeto

```bash
git clone https://github.com/Sabi-Hase/GS-MOBILE-3ESA-2025
cd WorkwellExpo
npm install
npx expo start
Abra no Expo Go via QR Code.