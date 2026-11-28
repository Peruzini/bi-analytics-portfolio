# UX-03A1-R2D0 — KPI Hero: componente mestre em blocos

Data: 28/11/2026. Especificação proposta, não implementada. Base: [PR #17](https://github.com/Peruzini/bi-analytics-portfolio/pull/17), commit 52b7d27. Prioridade alterada pelo usuário: finalizar um único cartão azul antes de derivar os outros quatro; postergar tabela e demais refinamentos até aprovação do mestre. Referência visual: captura da faixa KPI apresentada pelo usuário. Ela mostra título/valor/progresso/rodapé compactados e uma linha divisória visível entre barra e rodapé. Inventário PBIR confirmado em leitura no GitHub: três cardVisuals ocupam a região x216–516, y196–336, com alturas 84/26/30 e fundos escuros independentes.

## 1. Contrato geométrico

[Tokens e coordenadas legíveis por máquina](ux-v3/kpi-hero-master.v1.json).
Canvas 1440×1032, área do cartão 300×140 (x216, y196). Preservar a faixa e os quatro cartões vizinhos. Padding horizontal 12, vertical 8, gap vertical 4, superfície única #102B3D, raio-alvo 8, sem sombra/borda interna. Valores em unidades lógicas PBIR, tipografia em pt; a geometria não garante o encaixe dos visuais nativos.

| Zona | X relativo | Y relativo | W | H | X absoluto | Y absoluto |
|---|---:|---:|---:|---:|---:|---:|
| A Header | 12 | 8 | 276 | 20 | 228 | 204 |
| B Valor | 12 | 32 | 276 | 48 | 228 | 228 |
| C Progresso | 12 | 84 | 276 | 20 | 228 | 280 |
| D Rodapé | 12 | 108 | 276 | 24 | 228 | 304 |
| D1 Meta | 12 | 108 | 88 | 24 | 228 | 304 |
| D2 Desvio/status | 108 | 108 | 180 | 24 | 324 | 304 |

Trilho de progresso: x228, y286, W276, H8, raio-alvo 4. O preenchimento tem a mesma altura do trilho. D1 e D2 têm gap 8; D2 alinhado à direita. Nenhuma área ultrapassa o cartão. Se elementos nativos exigirem mais altura, testar integração de título/valor e rótulos de referência antes de alterar fonte ou margens. Se persistir clipping, propor faixa de 160–168 pontos e revisar grid separadamente, sem aumentar a altura de modo unilateral.

## 2. Componentes e estilos

| Elemento | Família/peso | Tamanho | Cor | Regra |
|---|---|---:|---|---|
| A Header | Segoe UI Semibold | 12 pt | #C7D7E2 | Aderência à meta; ícone alvo opcional decorativo |
| B Valor | Segoe UI Semibold | 34 pt | #FFFFFF | percentual real, duas casas |
| C Trilho | forma/visual nativo | 8 pontos | #365363 | fundo único |
| C Preenchimento | medida dinâmica | 8 pontos | #5EEAD4 | proporcional, limitado a 100% |
| D1 Referência | Segoe UI | 11 pt | #C7D7E2 | Meta: 100% (referência dinâmica) |
| D2 Desvio/status | Segoe UI Semibold | 11 pt | semântica dinâmica | −2,00 p.p. · Abaixo, por exemplo |

Abaixo #FCA5A5, acima #86EFAC, na meta e sem dados #C7D7E2. Não depender exclusivamente de cor. Texto do status e sinal de desvio são obrigatórios. Sem linha divisória entre blocos; alinhamento horizontal coerente. Ícone opcional, não necessário para entender o KPI.

## 3. Dados e comportamento

Reutilizar [UX Aderencia Exibicao], [Ref Meta 100%], [UX Progresso Meta], [UX Progresso Linear], [UX Aderencia Status] e [Aderência Meta %]. A barra atual é uma sequência de caracteres segmentados calculada em DAX, não uma barra contínua. Preferir trilho/preenchimento nativo dinâmico se renderizável no espaço; alternativa já funcional é a barra de texto segmentada. Nunca fixar a largura do preenchimento conforme o valor do contexto geral. Saturação em 100% significa cumprimento integral; mostrar percentual real inclusive acima da meta. Se não houver dados, preservar BLANK e informar Sem dados, sem desenhar preenchimento fictício. Se a meta estiver ausente ou inválida, não inferir déficit. Delta em p.p. e status derivados da mesma referência e precisão; usar arredondamento coerente com valor exibido. D2 pode exigir medida auxiliar textual e de cor; adicionar somente auxiliares, preservar as 63 medidas e a coluna mensal existentes. Valores gerais de referência 98,00%, meta 100%, −2,00 p.p. Não inserir valores fixos. Testar déficit, superação, igualdade, ausência de dados e filtros combinados; distinguir testes DAX de testes de UI.

## 4. Agrupamento real no Power BI

Criar grupo no painel Seleção com nome KPI | Hero | Aderencia. Camadas: 00 Fundo, 01 Header, 02 Valor, 03 Progresso, 04 Referencia, 05 Desvio e status. Usar uma única forma de fundo (quando suportada) com raio 8; filhos transparentes e sem preenchimentos internos duplicados. O fundo é decorativo, excluir da navegação por teclado se permitido. A/B podem ser um único cartão se o layout interno respeitar a especificação; D1/D2 podem usar rótulos de referência de um único visual, preservando duas zonas. Não criar objetos sem função. O grupo deve poder ser movido junto, e os membros devem poder ser selecionados e editados individualmente. Não confundir grupo com componente automaticamente sincronizado entre cópias: as derivadas precisam de atualização controlada, parametrizada em JSON ou por duplicação e ajustes verificados. O grupo deve preservar o contexto de filtros e interação; novos visuais analíticos recebem os mesmos filtros do hero original; decorativos não devem gerar interações. Ordem de leitura header, valor, progresso, referência/status; evitar redundância no leitor de tela.

Fontes Microsoft (consultadas em 28/11): [Agrupar visuais](https://learn.microsoft.com/pt-br/power-bi/create-reports/desktop-grouping-visuals), [Visual cartão](https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-card), [Configurações de formatação](https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-card-visual-new-format-settings). A documentação sustenta a viabilidade geral, não comprova a serialização PBIR nem o encaixe local; ambos serão validados.

## 5. Gate R2D1 — aplicação e aceite

- Verificar estado da sessão, backup dos arquivos, trabalhar apenas no hero em branch isolada. Recarregar no mesmo Power BI se seguro; não fechar nem abrir outra instância sem autorização.
- Validar existência do grupo real, seleção de membros, deslocamento conjunto e retorno à posição, persistência após salvar/recarregar sem perder alterações do usuário. Verificar que outros quatro cartões, gráficos, tabela, filtros e outras páginas permanecem intactos.
- Comparar DAX, verificar estados e filtros no motor e, de forma representativa, na UI. Alt text e sequência lógica. Confirmar contraste, largura, ausência de recortes, rolagem interna ou divisórias espúrias. Conferir a 100% e em ajustar à página; evidência única final suficiente salvo correção pontual.
- Especificação já validada: 14 checagens geométricas e 5 pares de contraste (9,93; 14,63; 7,71; 10,42; 5,51). Não equivale a aprovação de renderização ou conformidade integral.
- Após aprovação visual do mestre, derivar: Hero claro de alerta (desvio); KPI claro contextual (produção); KPI claro simples (disponibilidade/custo). Mesma grade interna, padding, fontes, alinhamento, cores semânticas; não obrigar barra onde não há meta.
- Sem expansão às outras páginas, sem merge, sem deploy e sem custos. Nesta etapa apenas documentação, sem abrir/fechar/alterar o Power BI, sem modificar PBIR ou DAX e sem nova captura. Estado ao vivo não verificado nesta etapa.

Próximo: **UX-03A1-R2D1 — Construção nativa e homologação visual do cartão mestre azul, com agrupamento real e quatro blocos internos.** Somente após aceite do usuário iniciar derivação dos demais KPIs.
