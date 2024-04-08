# Sistema de Corregedoria Web

Bem-vindo(a) ao meu Sistema de Corregedoria Web, uma solução moderna e eficaz para a gestão de denúncias. Este sistema permite que usuários façam denúncias de forma anônima ou identificada, as quais são automaticamente enviadas para o servidor Discord especificado, facilitando a comunicação e o tratamento ágil das questões reportadas.

## Funcionalidades

- **Envio de Denúncias**: Os usuários podem enviar denúncias de forma rápida e segura, incluindo detalhes importantes e evidências para suportar a reclamação.
- **Anonimato Garantido**: Oferece a opção de enviar denúncias anonimamente, protegendo a identidade do denunciante.
- **Integração com Discord**: As denúncias são enviadas diretamente para um canal no servidor do Discord escolhido, permitindo que a equipe responsável tome conhecimento e ação imediatas.
- **Gestão de Denúncias**: Através do Discord, a equipe pode gerenciar as denúncias, marcando-as como resolvidas, pendentes ou encaminhando para outras instâncias se necessário.

## Demonstração

Aqui está uma rápida demonstração de como o Sistema de Corregedoria Web funciona:

![Demonstração do Sistema de Corregedoria Web](https://github.com/pl4kill/Corregedoria-Web/assets/85031806/32674e75-0d00-41ea-b6e7-b001a5af8ad9)

Aqui está o link do youtube para configuração de ambiente (https://youtu.be/VP6YHJM2Oaw?si=Sh_tt4BD5W_guxMZ)

## Como Usar

Para utilizar o sistema, siga os passos abaixo:

1. **Configuração do Ambiente**: Certifique-se de ter um ambiente de desenvolvimento com JavaScript.
2. **Clonagem do Repositório**: Clone o repositório para sua máquina local usando `git clone url_do_repositorio`.
4. **Configuração do Bot no Discord**: Siga as instruções na seção de Configuração abaixo para configurar um bot no Discord e receber as denúncias.
5. **Execução**: Após a configuração, inicie o sistema pelo arquivo web.

## Configuração

Para que as denúncias sejam enviadas para o seu servidor Discord corretamente, é necessário ter privilégios de administrador ou ser o dono do servidor para acessar as configurações necessárias. Siga os passos abaixo para configurar o sistema de corregedoria no seu servidor Discord:

1. **Criação de um Webhook no Discord**:
   - Acesse o servidor do Discord onde você deseja receber as denúncias.
   - Vá para as `Configurações do Servidor` > `Integrações` > `Webhooks`.
   - Clique em `Novo Webhook`.
   - Escolha um nome para o Webhook e selecione o canal onde as denúncias serão postadas.
   - Clique em `Copiar URL do Webhook` para salvar a URL do Webhook que será usada no projeto.

2. **Configuração dos IDs dos Cargos para Notificação**:
   - Ainda no servidor do Discord, vá para `Configurações do Servidor` > `Cargos`.
   - Localize os cargos que você deseja que recebam notificações das denúncias.
   - Clique em um cargo específico e copie o ID do cargo. Certifique-se de ativar o modo de desenvolvedor nas configurações do Discord para visualizar os IDs.

3. **Configuração do Projeto**:
   - No seu ambiente de desenvolvimento, abra o arquivo de configuração JavaScript do projeto. Este arquivo geralmente está localizado na raiz do projeto ou em uma pasta de configurações.
   - Procure a variável `webhookURL` e cole a URL do Webhook que você copiou anteriormente.
   ```javascript
   const webhookURL = 'Sua_URL_do_Webhook_aqui';

 ![image](https://github.com/pl4kill/Corregedoria-Web/assets/85031806/c28f38cf-b31d-41ef-99be-b458007267f5)
 
Certifique-se de revisar e testar essas instruções no seu ambiente para garantir que tudo funcione conforme o esperado.

## Contribuições

Contribuições são muito bem-vindas! Se você tem alguma ideia para melhorar o sistema ou encontrou um bug, sinta-se à vontade para criar uma issue ou enviar um pull request.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Espero que este Sistema de Corregedoria Web ajude a tornar os ambientes online mais seguros e acolhedores. Para quaisquer outras informações ou suporte, por favor, abra uma issue neste repositório.

