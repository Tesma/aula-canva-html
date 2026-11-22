# Animação usando `<canvas>`

Pequeno trabalho da faculdade (Aula Prática de Desenvolvimento em JavaScript) em que experimentei com o elemento `<canvas>` e com animações feitas com `requestAnimationFrame`.

A página mostra três formas, um **círculo**, um **retângulo** e um **triângulo**, que aparecem com animação, mudam de cor sozinhas e reagem ao mouse.

## Funcionalidades

- **Animação de entrada:** cada forma cresce a partir do tamanho 0 até o tamanho final, uma após a outra, com um pequeno atraso entre elas.
- **Troca automática de cor:** depois da entrada, as formas passam a trocar de cor em sequência, uma de cada vez.
- **Clique para trocar de cor:** cada clique em uma forma muda a cor dela, na ordem vermelho → azul → amarelo → preto.
- **Hover:** ao passar o mouse sobre uma forma, ela aumenta 25%. Ao tirar o mouse, ela volta ao tamanho original.

## Como funciona

- Cada forma é um `<canvas>` separado, representado pela classe `Canva`, que guarda o contexto 2D, a cor atual, o tamanho base e os eventos de mouse.
- O desenho de cada forma (`arc`, `fillRect` e `moveTo`/`lineTo`) é definido individualmente e redesenhado sempre que o tamanho ou a cor muda.
- As animações são feitas com `requestAnimationFrame` e uma função de **ease out** (cúbico), que começa rápido e desacelera no final. Como o progresso é calculado pelo tempo (`performance.now()`), a animação dura o mesmo em qualquer taxa de atualização de tela.
- A sequência de entrada e de troca de cor usa `delayAnim`, que encadeia as animações de uma forma para a próxima.

## Estrutura do projeto

```
├── index.html   # estrutura da página e dos três canvas
├── style.css    # layout e estilo (centralização, título e créditos)
└── script.js    # classe Canva, desenho das formas e animações
```

## Como executar

Não há dependências nem etapa de build.

1. Baixe ou clone o repositório ou entre no [link](https://tesma.github.io/aula-canva-html/).
2. Abra o arquivo `index.html` em qualquer navegador moderno.

## Tecnologias

- HTML5 (`<canvas>`)
- CSS3 (Flexbox)
- JavaScript (Canvas 2D API, `requestAnimationFrame`)

## Créditos

Feito por **Lucas Colli Guzelotto** | 2026
