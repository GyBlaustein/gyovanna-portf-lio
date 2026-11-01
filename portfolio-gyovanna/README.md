# Portfólio — Gyovanna Blaustein

Como abrir no VS Code
1. Abra a pasta `portfolio-gyovanna` no VS Code (Arquivo > Abrir Pasta).
2. Instale a extensão **Live Server** (Ritwick Dey), clique com o botão direito em `index.html` e escolha **Open with Live Server**.
   (Também funciona dando dois cliques em `index.html`, mas o Live Server é melhor.)
3. É preciso internet para carregar as fontes do Google e a biblioteca 3D (three.js).

Estrutura
- `index.html`  textos e estrutura da página
- `css/style.css`  cores, fontes e animações
- `js/main.js`  fundo líquido 3D, animações, menu, janelas de código
- `js/music.js`  música ambiente
- `img/`  suas fotos

Onde mexer
- **Projetos:** procure por `id="c6"` no `index.html` (cada projeto é um `<a class="pj pr ...">`). Para adicionar outro, copie um cartão inteiro e troque o link, o nome e a descrição.
- **Textos do código que se digita sozinho:** em `js/main.js`, procure por `var CS=`.
- **Cores de cada capítulo:** em `js/main.js`, procure por `var P=`.
- **Contato:** em `js/main.js`, procure por `contato:` (e-mail, LinkedIn, Instagram).

Para publicar de graça: GitHub Pages, Netlify ou Vercel (arraste a pasta inteira).
