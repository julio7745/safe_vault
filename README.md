# Projeto Safe Vault 🔒📱💻

## Descrição do Projeto 📝

O projeto Safe Vault tem como objetivo criar um cofre físico controlado por um aplicativo móvel, onde o usuário pode realizar a abertura do cofre de forma segura e conveniente. O sistema inclui uma trava eletromagnética controlada por um microcontrolador ESP8266, comunicação em tempo real via protocolo MQTT e autenticação biométrica através de um sensor. Os dados de usuário são armazenados em um banco de dados MongoDB e as interações com o aplicativo são realizadas através de uma interface desenvolvida em React Native.

## Principais Funcionalidades 🔥

- **Autenticação de Usuário**: Os usuários podem fazer login no aplicativo utilizando usuário e senha armazenados no banco de dados MongoDB.
- **Abertura do Cofre**: O usuário solicita a abertura do cofre através do aplicativo e, após autenticação biométrica e inserção de senha gerada pelo app, a trava eletromagnética é liberada para abrir o cofre.
- **Registro de Acessos**: Cada abertura do cofre é registrada em um log armazenado no MongoDB, fornecendo um histórico de acesso.
- **Gerenciamento de Perfis:** Os usuários podem criar e gerenciar perfis dentro do aplicativo, permitindo diferentes níveis de acesso e personalização das configurações (planejado para o futuro). Isso inclui a criação de múltiplos perfis para diferentes usuários, com opções de personalização individualizada para cada perfil.

## Tecnologias Utilizadas 🔧

- **Controle de Sistemas de Malha Fechada**: Implementação de um sistema de controle para garantir a segurança e o funcionamento adequado do cofre.
- **Comunicação MQTT**: Utilização do protocolo MQTT para comunicação em tempo real entre o aplicativo móvel e o microcontrolador ESP8266 responsável pelo controle da parte física.
- **Criação de Designer das Telas**: Elaboração do design das telas do aplicativo, garantindo uma experiência de usuário agradável e coesa.
- **Integração de IoT com ESP8266**: Integração do microcontrolador ESP8266 ao sistema IoT para controle da trava eletromagnética do cofre e receimento de informações.
- **Desenvolvimento de Circuitos Eletrônicos**: Desenvolvimento de circuitos eletrônicos para alimentação, controle da trava eletromagnética e comunicação do microcontrolador com demais intrumentos.
- **Utilização de Banco de Dados MongoDB**: Armazenamento dos dados de usuário e registros de acessos no banco de dados MongoDB.
- **Programação de Microcontroladores**: Utilização da linguagem de programação adequada para programar o microcontrolador ESP8266.
- **Desenvolvimento de Servidores BackEnd utilizando JavaScript**: Utilização do Node.js e Express.js para desenvolver o backend do aplicativo.
- **Desenvolvimento de App Mobile utilizando React Native**: Utilização do framework React Native para desenvolver o aplicativo móvel.
- **Desenvolvimento de Placas de Circuito Impresso (PCB)**: Elaboração de PCBs para a montagem dos componentes eletrônicos do sistema.
