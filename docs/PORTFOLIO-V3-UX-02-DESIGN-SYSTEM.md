# PORTFOLIO-V3-UX-02 — Enterprise Analytics Workspace

Data: 27/11/2026 | Design System v1.0.0-proposed | Especificação pronta para revisão; não aprovada ainda para implementação.

## 1. Objetivo e artefatos

Transformar Fleet e E-commerce em produtos de Analytics consistentes, com hierarquia orientada a tarefas, preservando 101 medidas DAX existentes, modelo semântico, significado dos indicadores e filtros já homologados. Base: [UX-01](PORTFOLIO-V3-UX-01-BENCHMARK.md). Arquivos normativos de proposta:
- [Tokens e geometria em JSON](ux-v3/design-system.v1.json): 8 páginas desktop e 8 mobile, regras de contraste e validação geométrica.
- [Wireframes Fleet](ux-v3/fleet-wireframes.svg): 4 páginas desktop e início da versão mobile.
- [Wireframes E-commerce](ux-v3/ecommerce-wireframes.svg): 4 páginas desktop e início da versão mobile.

Os SVGs são esquemas de organização, sem gráficos ou valores inventados. Não são capturas, protótipos interativos nem evidências de homologação. O JSON não é um tema importável pelo Power BI nem um PBIR: é a fonte de tokens/posições para implementação posterior. As coordenadas representam regiões de layout, que poderão conter mais de um visual nativo. O canvas desktop alvo será ajustado após prova de legibilidade e não significa redução obrigatória da altura.

## 2. Identidade e tokens

Marca visual compartilhada: Enterprise Analytics Workspace. Tema claro; barra lateral escura; superfícies brancas; foco por cor de domínio e sinais semânticos independentes. Sem gradientes ornamentais, sombras intensas, glassmorphism ou ícones sem rótulo.

| Token | Fleet | E-commerce |
|---|---|---|
| Barra lateral | #102B3D | #103B33 |
| Navegação ativa | #21586A | #21654F |
| Accent / série primária | #126B78 | #16684F |
| Série comparativa | #64748B | #475569 |
| Texto em navegação | #FFFFFF / #C7D7E2 | #FFFFFF / #C8DED4 |

Comuns: canvas #F4F7FA, surface #FFFFFF, texto #172B3A, secundário #475569, borda decorativa #CBD5E1, contorno funcional #64748B, foco #1D4ED8, positivo #166534, negativo #B42318, alerta #92400E. Tintas de estado no JSON. Cor de domínio não é sinal de sucesso; semântica por texto, sinal, forma ou rótulo além da cor. Paleta categórica no JSON deve passar por avaliação de distinção e contraste no gráfico real; a checagem de 14 pares não cobre todas as combinações.

Tipografia Segoe UI, tamanhos em pt propostos: desktop título 28, subtítulo 14, seção 16, KPI hero 36, secundário 26, label 12, corpo/tabela 12, eixos 11, nav 13; mobile título 20, seção 14, hero 30, secundário 22, label 12, tabela/eixo 11. Ajustar formatação real após importação ou edição; não garantir legibilidade somente com o valor numérico. Escala espacial 4/8/12/16/24/32; radius 8 painel e 6 controle quando suportados; sem sacrificar foco ou bordas.

## 3. Grid e composição desktop

Canvas lógico 1440 de largura, sidebar 192, conteúdo x=216 a 1416, margem direita 24, 1200 de área útil. Grid 12 colunas de 89 com gutter 12. Cabeçalho y=24 h=56; filtros y=96 h=56; contexto y=160 h=24; faixa KPI y=196 h=112; análise inicia y=324. Quatro grupos KPI em 4/3/2/3 colunas, prioridade hero; quatro filtros comuns de 250 + reset 152; na página de produtos cinco de 192 + reset 180. São alvos dimensionais, não necessariamente tamanhos finais de cada visual. Se filtro longo, usar título adequado, tooltip ou fallback de faixa maior, nunca cortar seleção.

Navegação vertical de quatro destinos, labels persistentes, estado ativo por destaque + indicação textual/visual, sem confundir seleção do gráfico com mudança de página. Layout alternativo horizontal para zoom ou área insuficiente. Se o navegador nativo não respeitar o layout, fallback para botões de navegação; não simular link sem ação. Canvas não precisa caber inteiro na primeira dobra: prioridade aos KPIs e análise primária. Tabelas completas e gráficos auxiliares podem ficar abaixo. Cabeçalho e filtros não são fixos durante rolagem; “persistente” significa presentes em cada página, não sticky.

## 4. Biblioteca de componentes e comportamento

| ID | Componente | Especificação | Implementação-alvo / gate |
|---|---|---|---|
| C01 | Shell e navegação | Identidade, 4 destinos, página ativa, foco visível | Page navigator ou botões nativos; UX-03/04 |
| C02 | Cabeçalho | Título da página, pergunta de negócio, dados sintéticos; contexto dinâmico separado | Texto/medida; sem período hardcoded em seleção; UX-03 |
| C03 | Segmentador | Label persistente, valor atual, seleção múltipla legível; dropdown e tamanho adequado | Slicers existentes com syncGroup preservado; UX-03/04 |
| C04 | Limpar filtros | Reset explícito, não navega, não modifica origem; verificar grupos comuns e categoria local | Botão Clear all slicers nativo; UX-04 |
| C05 | Contexto | Exibir período/escopo e filtros ativos; indicar múltiplos sem truncar significado | Medida auxiliar ou slicer visível; se não possível, não inventar resumo; UX-04 |
| C06 | KPI hero | Label, valor principal, unidade, comparação com base/periodicidade quando disponível | Card/gauge agrupado; usar medidas reais existentes; UX-03 |
| C07 | KPI secundário | Label e valor, precisão coerente; status somente se regra existir | Card nativo, formatação por medida; UX-03 |
| C08 | Painel analítico | Título pergunta ou medida clara, unidade/legenda, margem 12–16, leitura sem hover obrigatório | Visuais nativos existentes; UX-03 |
| C09 | Comparação | Real/meta, mês anterior, referência 100/80% ou benchmark identificado; escala consistente | Linhas/barras/combos existentes; UX-03 |
| C10 | Ranking/tabela | Ordenação explícita, cabeçalho legível, total só quando faz sentido, coluna chave à esquerda | Table/matrix; paginação/scroll documentados; UX-03 |
| C11 | Contexto explicativo | Definição, denominador, granularidade, fonte e limitações | Textos curtos e tooltip complementar; UX-03/04 |
| C12 | Estados | Sem dados ≠ zero; sem base comparável ≠ queda; carregamento nativo; erro real não oculto | BLANK preservado, mensagem contextual só quando viável; UX-04/06 |
| C13 | Detalhamento | Drill-through por ativo/produto se útil, volta e contexto explícitos | Páginas auxiliares ocultas do menu principal, não obrigatórias; UX-04 |
| C14 | Mobile | Header compacto, navegação em duas linhas se preciso, hero primeiro, filtros legíveis, gráficos e tabelas em sequência | Mobile state e formatação por dispositivo; UX-05 |

Estados interativos: padrão, hover/foco (quando disponível), selecionado, desabilitado apenas quando realmente indisponível; estado ativo com contraste. Em bookmarks de abrir/fechar painel, capturar somente display, não redefinir filtros inadvertidamente. Reset deve preservar o escopo definido e ser testado de outra página; no caso de categoria local, documentar o comportamento observado, não prometer reset global se o botão não o fizer. Tooltip explica sem substituir rótulo essencial ou toque. Menus e botões não devem exibir ação inexistente.

Formatação: pt-BR, R$ com duas casas em valores monetários de detalhe; abreviar milhões no hero quando necessário e mostrar valor exato em informação acessível; t, t/h, L/t, h, R$/t explícitos. Percentuais com duas casas quando analiticamente útil, diferenças percentuais e p.p. não intercambiáveis. MoM somente entre meses completos conforme medida existente; delta de produção absoluto com sinal. Não adicionar metas arbitrárias, margem, CAC/ROAS ou dados reais. Regras de criticidade e denominações preservadas. Não transformar status de pedido em funil.

## 5. Arquitetura de informação por página

| Página | Hero e comparação | Análise principal | Segunda camada / detalhe | Canvas alvo |
|---|---|---|---|---|
| Fleet Executiva | Aderência à meta + déficit absoluto; produção, disponibilidade e custo/t | Produção × meta; desvio por ativo | Resumo por equipamento | 1440×944 |
| Fleet Performance | Produtividade; utilização, consumo L/t, horas | Dispersão produtividade × custo com referências; utilização por ativo | Série mensal; detalhe por ativo | 1440×1104 |
| Fleet Manutenção | Horas de manutenção; MTBF, MTTR, falhas | Pareto de horas e referência 80%; intervenções por tipo | Tendências MTBF/MTTR; tabela | 1440×1212 |
| Fleet Criticidade | Ativos alta/crítica; índice, disponibilidade, custo/t | Ranking de criticidade primeiro | Componentes ponderados e dispersão indisponibilidade × custo | 1440×962 |
| E-commerce Executiva | Receita reconhecida e MoM; concluídos, ticket | Receita × mês anterior e receita por região | Receita média/dia e resumo mensal | 1440×1258 |
| E-commerce Pedidos | Taxa de conclusão; pedidos, cancelamento, reembolso | Status e tendências de exceção | Receita diária/7d, acumulada e tabela mensal | 1440×1274 |
| E-commerce Produtos | Taxa de recompra; receita de itens, compradores, recorrentes | Categorias e heatmap regional | Dispersão, Pareto Top 10, detalhe de produtos | 1440×1264 |
| E-commerce Canais | Receita; conclusão, pedidos e ticket | Participação e ticket × conclusão | Pequenos múltiplos com escala comum; tabela de atribuição | 1440×1252 |

Os oito grids e ordens mobile estão no JSON. A faixa hero pode combinar valor e delta em grupo visual se não houver recurso nativo equivalente. Não remover visual aprovado sem mapeamento de onde o usuário encontra a mesma informação. No Fleet, isolar clique em tipo de intervenção para evitar distorções. E-commerce: mês/região/status/canal compartilhados, categoria local; denominadores e granularidade de pedidos/itens preservados.

## 6. Mobile — decisão de arquitetura

Largura máxima de canvas 323 pontos; margens 8, área útil 307, gap 8. Primeiro bloco: título (104), navegação 2×2 (104), contexto (56), hero (144), KPIs secundários (112 por linha; par 149/150 apenas se ambos legíveis). O quarto KPI fica full-width. Filtros no fluxo após os KPIs e antes da análise: label + valor e altura inicial 116, largura 307; reset 56; painel recolhível somente depois de testar bookmarks/visibilidade em mobile. Não usar elementos falsamente interativos. A meta interna de alvo acionável de 48 unidades lógicas exige comprovação de hit area real; não equiparar a 48 CSS px nem declarar conformidade WCAG.

Análises em largura total, altura inicial 300; heatmap 360, múltiplos 560, detalhe 320. A geometria completa contempla todos os blocos e gera páginas longas (2.372–3.192 pontos): é um fallback conservador para manter informação disponível, não a meta de densidade final. Em UX-05 reduzir scroll por prioridade e, se necessário, mover detalhes não essenciais para caminho alternativo acessível (com validação de que a informação não se perde). Navegação para páginas auxiliares somente se útil. Não colocar tabelas largas como única evidência do KPI, documentar rolagem deliberada. No primeiro protótipo testar 149/150 de largura, fontes e controles; se cortados, voltar a coluna única e recalcular posições. Acessibilidade em mobile não depende de preview sozinho.

## 7. Acessibilidade e QA

Checagem matemática dos 14 pares de cores no JSON: PASS (limites 4,5:1 texto e 3:1 contorno/foco); 2.534 verificações de geometria (limites e pares de não sobreposição) PASS em 16 layouts de regiões. Esses testes não verificam clipping de rótulo, viewport real, navegação, foco, cor de cada gráfico ou PBIR. Em UX-03/05 validar nativamente; UX-06 testar teclado e leitor de tela, contraste de visuais essenciais, ordem de leitura, estados sem dados e comportamento com zoom; registrar teste físico à parte se disponível. Alt text deve explicar finalidade e leitura, não repetir valores estáticos desatualizados. Elementos puramente decorativos não devem entrar em tab order quando a ferramenta permitir. Preservar a distinção entre seleção e página ativa sem depender exclusivamente de cor.

Métrica de sucesso proposta: concluir tarefas críticas sem ambiguidade; identificar KPI principal e ponto de ação em até três interações quando aplicável; comparar passos, tempo, erros e recálculo/performance sob mesma condição. Não alegar melhoria medida antes do teste. Capturas mínimas: uma por candidato final da página piloto e por exceção que exija comprovação; preferir testes automatizados e DAX.

## 8. Implementação e gate

UX-03A1 (piloto Fleet Executiva): reconciliar os commits mobile locais f7bd9f8 e d3e8cb2 com os candidatos remotos funcionais (Fleet #11, E-commerce #7), preservar local/remote com branches isoladas; aplicar tokens e layout de uma página, gerar tema importável nativo separadamente usando schema oficial, manter as outras páginas intactas. Validar tema e overrides, navegação/segmentadores, regressão DAX, um preview real final, comparar com baseline e fechar Power BI. Aprovar o piloto antes de expandir para três páginas Fleet (UX-03A2). E-commerce UX-03B usa a mesma arquitetura e variantes depois. UX-04 valida as ações; UX-05 mobile; UX-06 homologação final. Nenhuma autorização de merge, publicação ou serviço pago.

Referências técnicas: [Temas JSON](https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom), [Mobile design](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-best-practices), [Mobile formatting](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals), [Acessibilidade](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports), [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Benchmark UX-01 contém referências de navegação, reset, drill-through e performance.

Resultado: especificação UX-02 concluída, validações conceituais PASS, pendente aprovação de direção pelo usuário. Nenhum Power BI aberto, nenhuma captura nova, nenhum PBIR/DAX modificado, nenhum merge/deploy. Próximo proposto: PORTFOLIO-V3-UX-03A1 — Piloto nativo da Visão Executiva Fleet Analytics.
