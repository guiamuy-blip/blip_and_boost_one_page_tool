# Boost × Blip — One Page compartilhado

Aplicação web com três visões (Strategic Initiatives, Executive One Page, Executive Help Needed), editável por várias pessoas ao mesmo tempo, com login por senha e histórico de versões.

Os dados ficam guardados **dentro do próprio repositório**, no arquivo `data/content.json`. Sempre que alguém salva, o arquivo é atualizado e todos os outros usuários passam a ver a mesma versão.

---

## Passo 1 — Criar o repositório

1. Entre em https://github.com com a sua conta.
2. No canto superior direito, clique no **+** e depois em **New repository**.
3. Preencha:
   - **Repository name:** `boost-blip-onepage`
   - **Description:** (opcional) `One page compartilhado Boost x Blip`
   - Marque **Public**. É obrigatório: o GitHub Pages gratuito não publica repositório privado.
   - Marque **Add a README file**.
4. Clique em **Create repository**.

> O que fica público é o **código**, não a senha de acesso ao conteúdo. Ainda assim, leia a seção "Segurança" no final.

---

## Passo 2 — Subir os arquivos

1. Descompacte o arquivo `boost-blip-onepage.zip` no seu computador. Você verá:

```
index.html
.nojekyll
assets/config.js
assets/app.js
assets/styles.css
data/original.json
data/content.json
data/versions/.gitkeep
```

2. No repositório recém-criado, clique em **Add file → Upload files**.
3. Arraste **todos os itens de dentro da pasta descompactada** (o arquivo `index.html` e as pastas `assets` e `data`) para a área de upload.
   - Não arraste a pasta-mãe; arraste o conteúdo dela.
   - Se o arquivo `.nojekyll` não aparecer no seu explorador, ative "mostrar arquivos ocultos". Ele é pequeno mas importante.
4. Desça a página, escreva em **Commit changes** algo como `primeira carga da aplicação` e clique em **Commit changes**.

---

## Passo 3 — Configurar o endereço da aplicação (GitHub Pages)

1. No repositório, clique na aba **Settings** (engrenagem, no topo).
2. No menu da esquerda, clique em **Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Em **Branch**, selecione **main** e a pasta **/ (root)**. Clique em **Save**.
5. Espere de 1 a 3 minutos e recarregue a página. Vai aparecer no topo:
   `Your site is live at https://SEU-USUARIO.github.io/boost-blip-onepage/`

Esse é o link que você compartilha com o time.

---

## Passo 4 — Apontar a aplicação para o seu repositório

A aplicação precisa saber em qual repositório gravar os dados.

1. No repositório, entre na pasta **assets** e clique no arquivo **config.js**.
2. Clique no ícone de **lápis** (Edit this file), no canto direito.
3. Troque `SEU-USUARIO-GITHUB` pelo seu usuário do GitHub (o mesmo que aparece no endereço do site). Exemplo:

```js
window.CFG = {
  owner: 'guilhermeamuy',
  repo: 'boost-blip-onepage',
  branch: 'main',
  dataPath: 'data/content.json'
};
```

4. Clique em **Commit changes** (botão verde) e confirme.

---

## Passo 5 — Criar a chave de acesso (token do GitHub)

Essa chave é o que autoriza a aplicação a gravar os dados no repositório. Ela virou o único campo de login: **quem digita a chave certa, entra e já pode editar e salvar.**

1. Clique na sua foto (canto superior direito) → **Settings**.
2. No fim do menu da esquerda, clique em **Developer settings**.
3. Clique em **Personal access tokens → Fine-grained tokens** e depois em **Generate new token**.
4. Preencha:
   - **Token name:** `boost-onepage`
   - **Expiration:** escolha a data mais longa possível (anote para renovar depois).
   - **Repository access:** marque **Only select repositories** e escolha `boost-blip-onepage`.
   - **Permissions → Repository permissions:** procure **Contents** e mude para **Read and write**. Não marque mais nada.
5. Clique em **Generate token** e **copie o código** que aparece (começa com `github_pat_`). Ele só aparece uma vez.
6. Guarde esse código num lugar seguro. É ele que você vai passar para quem for editar.

---

## Passo 6 — Usar

1. Abra `https://SEU-USUARIO.github.io/boost-blip-onepage/`.
2. Na tela de login informe:
   - **Chave de acesso:** cole o token gerado no Passo 5. É a mesma chave para todo o time — compartilhe por um canal privado (não pelo próprio GitHub).
   - **Seu nome:** aparece para os outros como autor da última alteração.
3. Pronto. Todo mundo que entrar já pode editar. Alterne entre as abas, edite no modo **Edição** e clique em **Salvar versão** para publicar para todos.

Como funciona a convivência entre vários usuários:
- A aplicação verifica o repositório a cada 20 segundos.
- Se outra pessoa salvou e você não está editando, sua tela atualiza sozinha.
- Se você está no meio de uma edição, aparece um aviso no topo com o botão **Carregar a mais recente** — você decide quando trazer a versão do colega.
- Cada save gera um arquivo em `data/versions/`, então nada é perdido e a versão original nunca é sobrescrita.

---

## Como atualizar o conteúdo depois

Pela própria aplicação, no modo Edição. Não é preciso mexer no GitHub de novo, exceto para:
- **renovar o token** quando ele expirar (repita o Passo 5 e avise o time);
- **restaurar a base original**, apagando `data/content.json` pelo GitHub — a aplicação volta a carregar `data/original.json`.

---

## Segurança — leia antes de compartilhar

- **A chave de acesso é o próprio token do GitHub — não fica escrita em nenhum arquivo do repositório.** Cada pessoa digita a chave na tela de login; ela é guardada só no navegador dela. Compartilhe a chave por um canal privado (Slack, WhatsApp), nunca dentro do repositório.
- **Quem tem a chave, edita.** Não existe mais um modo "somente visualização": a chave dá acesso e permissão de edição juntos. Se alguém que não deveria mais ter acesso a obtiver, revogue-a (próximo item) e gere uma nova para o time.
- **Nunca coloque o token dentro de um arquivo do repositório.** O GitHub detecta e cancela o token automaticamente; além disso, ficaria público. Ele deve ser digitado na tela de login, onde fica guardado apenas no navegador de cada pessoa.
- **O conteúdo dos dados fica público**, já que o repositório é público. Se as informações da conta Boost não puderem ser públicas, o caminho é outro: repositório privado com GitHub Pages pago, ou um backend com autenticação real (Firebase, Supabase). Posso montar essa versão se preferir.
