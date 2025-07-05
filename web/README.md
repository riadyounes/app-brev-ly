# Brev.ly Web

## Passo a passo para rodar o projeto

1. **Instale as dependências**

   Execute o comando abaixo na raiz do projeto para instalar todas as dependências necessárias:

   ```bash
   npm install
   ```

2. **Rodando o projeto em modo desenvolvimento**

   Para iniciar o servidor de desenvolvimento, utilize:

   ```bash
   npm run dev
   ```

   O Vite irá iniciar o projeto e fornecer um endereço local para acesso.

3. **Build de produção**

   Para gerar os arquivos otimizados para produção, execute:

   ```bash
   npm run build
   ```

## Funcionalidades e Regras

- [x] Deve ser possível criar um link
- [x] Não deve ser possível criar um link com encurtamento mal formatado
- [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados
- [x] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [x] Siga o mais fielmente possível o layout do Figma;
- [x] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [x] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.
