# PORTFOLIO-V3-UX-01 — Benchmark internacional e diagnóstico UX/UI

Data: 27/11/2026. Gate de pesquisa. Escopo: oito páginas principais dos dois relatórios nativos. Não é homologação visual, pesquisa com usuários ou redesign implementado.

## 1. Método e evidência

Pesquisa documental em fontes primárias de fabricantes, design systems, pesquisa de interação e padrões de acessibilidade. Inventário PBIR local em leitura: Fleet commit f7bd9f8, caminho powerbi/fleet/FleetAnalytics.Report; E-commerce commit d3e8cb2, caminho powerbi/EcommerceAnalytics.Report. Ambos limpos. A primeira descoberta genérica no Fleet apontou outro relatório comercial do monorepo; descartada e substituída pelo caminho explícito. Não abrir Power BI nem tirar novos prints; usar evidências anteriores para limitações visuais conhecidas. Diagnóstico heurístico de estrutura e tarefa, não avaliação direta por usuários. Referências não são prova de paridade de recursos ou certificação.

## 2. Referências consultadas e aplicação

| Referência (acesso 27/11/2026) | Evidência/princípio | Aplicação ao portfólio | Limite |
|---|---|---|---|
| [SAP Dashboard Design Guidelines](https://www.sap.com/design-system/sac-dashboard-design-best-practices) e [Analytical Scenarios](https://www.sap.com/design-system/sac-dashboard-design-best-practices/foundation/analytical-page-types) | Diferenciar monitoramento, exploração e relatórios | Página executiva orientada à ação; páginas de investigação com maior densidade | Não replicar componentes SAP literalmente |
| [IBM Carbon](https://www.carbondesignsystem.com/getting-started/designing/overview), [Color](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview), [IBM Data Visualization](https://www.ibm.com/design/language/data-visualization/design/basics/) | Tokens, grid, hierarquia, cor redundante com formas e rótulos | Um sistema de componentes, duas identidades semânticas; informação por múltiplos sinais | Não requer biblioteca Carbon em Power BI |
| [Microsoft Sales and Returns](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-sales-returns) | Exemplo oficial de storytelling e UX em Power BI | Navegação, visão inicial e detalhe contextual | Consultado como referência documental, PBIX não aberto |
| [Microsoft Retail Analysis](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-retail-analysis) | Exploração de vendas por dimensões | Receita, região e produto com passagem coerente para detalhe | Métricas distintas do case |
| [Tableau Visual Best Practices](https://help.tableau.com/current/blueprint/en-us/bp_visual_best_practices.htm) | Fluxo de leitura, hierarquia, adaptação por dispositivo | Grid, prioridade dos KPIs e layout específico de celular | Não importar ações proprietárias |
| [Nielsen Norman Group — Complex Applications](https://www.nngroup.com/articles/complex-application-design/) | Redução de esforço, descoberta de informações, ajuda contextual | Filtros claros, ações identificáveis, evitar ícones e ornamentação desnecessários | Avaliação heurística, sem teste de usuários |
| [MIT — Cooperative Dashboard Design](https://vis.mit.edu/pubs/cooperative-dashboards/) | Dashboard como processo interativo de investigação | Caminho pergunta → seleção → contexto → evidência → decisão | Não implementar IA ou chat nesta etapa |
| [IBCS 2.0](https://www.ibcs.com/ibcs-version-2-0/) | Notação empresarial consistente, comparação, desvios | Real vs meta Fleet, MoM E-commerce, unidades e escalas | Inspiração, não certificação IBCS/ISO |
| [Geotab Maintenance Overview](https://support.geotab.com/product-updates/maintenance-overview-page) e [Asset Utilization](https://support.geotab.com/product-updates/asset-utilization-reporting) | Saúde da frota centralizada e análise por ativo | Prioridade por criticidade, utilização, manutenção e detalhamento | Sem dados de telemetria em tempo real |
| [Samsara Dashboard Menus](https://kb.samsara.com/hc/en-us/articles/48621492984589-Dashboard-Menus) | Navegação por função operacional | Rótulos estáveis e destinos claros | Sem simular gestão operacional transacional |
| [Shopify Analytics Overview](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/overview-dashboard) e [Using overview](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/overview-dashboard/using-the-overview-dashboard) | Indicadores principais e passagem para relatório específico | Cards de receita, volume e qualidade; drill-through contextual | Sem sessões, CAC, ROAS ou margem inventados |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) e [Microsoft report accessibility](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports) | Contraste, teclado, texto alternativo, não depender da cor | Gate UX-06 com evidência específica | Não afirmar conformidade integral sem auditoria |

Síntese: SAP + Carbon como referência de arquitetura; Geotab e Shopify como referência de tarefas; Microsoft como restrição técnica; Tableau, IBCS e NN/g como critérios de comunicação e uso. Não existe ranking absoluto de melhores dashboards.

## 3. Inventário e diagnóstico das oito páginas

Canvas em pontos lógicos; contagem inclui textos e filtros, não representa número de consultas ou gráficos. Todas têm largura 1440. Sem navegadores de página ou botões de reset entre os tipos de visuais inventariados. Quatro filtros comuns repetidos, cinco na página Produtos. Cabeçalho e rodapé existentes são consistentes; KPIs repetem tamanhos uniformes, tabelas ocupam faixa inferior. Não é prova de problemas de legibilidade no desktop já homologado.

| Página | Canvas | Elementos | Diagnóstico e intervenção proposta |
|---|---:|---:|---|
| Fleet Executiva | 1440×1076 | 14 | Produção, disponibilidade, gauge e custo com peso semelhante; destacar aderência + desvio absoluto, tendência real/meta e ativos responsáveis. Resumo detalhado como segunda camada. |
| Fleet Performance | 1440×1140 | 15 | Dispersão grande, ranking de utilização, série e tabela. Organizar quadrantes pela decisão custo/produtividade, explicitar referência da frota, manter ranking acionável. |
| Fleet Manutenção & Pareto | 1440×1204 | 16 | Pareto e intervenções, MTBF/MTTR separados, tabela longa. Priorizar perdas e 80%, agrupar tendências e explicar ausência de falhas sem apresentar zero indevido. |
| Fleet Criticidade | 1440×1020 | 14 | Índice, composição ponderada, dispersão e ranking. Dar protagonismo aos ativos de alta/critica; explicar componentes e metodologia em detalhe, não depender apenas de cor. |
| E-commerce Executiva | 1440×1220 | 16 | Receita, concluídos, ticket e MoM; três gráficos e tabela mensal. Receita/MoM como foco; região e tendência como causas; tabela detalhada secundária. |
| E-commerce Receita e Pedidos | 1440×1260 | 17 | Composição por status, três séries, tabela. Dar destaque à conclusão e exceções; conservar contagem e denominador; não representar estados como funil. |
| E-commerce Clientes e Produtos | 1440×1252 | 18 | Cinco filtros, quatro KPIs, cinco analíticos. Separar recompra de mix, manter matriz e Pareto em detalhe; categoria local, sem contaminar métricas de pedidos. |
| E-commerce Canais e Pedidos | 1440×1240 | 16 | Participação, dispersão, cinco pequenos múltiplos e tabela. Foco na comparação entre canais, denominador explícito, escala comum; não alegar ROI sem investimento realizado. |

Total 126 elementos (59 Fleet + 67 E-commerce); 14–18 por página. Problema transversal: canvas alto e faixa superior extensa; experiência atualmente organizada por componentes mais do que por fluxo de tarefas. D3F2C: layouts de uma coluna completos em metadados, mas preview parcial; reduzir densidade mobile sem eliminar capacidade de investigação desktop. Não remover gráficos ou informações úteis sem alternativa.

## 4. Direção proposta para UX-02 (ainda não aprovada como especificação final)

Enterprise Analytics Workspace: shell comum, tema claro com superfícies neutras, hierarquia editorial e destaque seletivo. Fleet: azul petróleo/ardósia e acentos de risco semânticos; E-commerce: verde profundo/azul e destaque comercial. Paletas exatas e contraste serão definidos em UX-02. Prototipar alternativas de navegação lateral compacta vs horizontal; preferir lateral no desktop se não sacrificar área analítica e horizontal/controles nativos no mobile. Usar rótulos, estado ativo e foco visível, não ícones isolados.

Grid proposto para desktop: 1440 de largura, margens 24, espaçamentos 8/16/24, 12 colunas na área útil, testar canvas 16:9 ou próximo para overview e permitir maior altura nas páginas analíticas. Não impor 16:9 quando isso reduzir legibilidade. Tipografia proposta: título 24–28, subtítulo 12–14, KPI primário 28–36, secundário 20–28; validar unidades reais Power BI e zoom. Padrões de valores: pt-BR, unidades explícitas, precisão consistente, delta com sinal e período comparável. Não tratar cores de série como semântica de sucesso/falha sem rótulo.

## 5. Matriz de priorização (avaliação qualitativa interna)

| ID | Melhoria | Impacto | Esforço | Prioridade | Gate |
|---|---|---|---|---|---|
| P01 | Arquitetura de informação e pergunta principal | Alto | Médio | P0 | UX-02/03 |
| P02 | Hierarquia KPI e contexto de comparação | Alto | Médio | P0 | UX-02/03 |
| P03 | Navegação persistente/estado ativo | Alto | Baixo-médio | P0 | UX-03/04 |
| P04 | Filtros visíveis, limpar, contexto e sincronização | Alto | Médio | P0 | UX-04 |
| P05 | Tokens de cor, tipografia, grid e componentes | Alto | Médio | P0 | UX-02 |
| P06 | Mobile dedicado, selecionar conteúdo prioritário | Alto | Alto | P0 | UX-05 |
| P07 | Contraste, teclado, leitor de tela, estados vazios | Alto | Médio-alto | P0 | UX-02/05/06 |
| P08 | Tooltips explicativos e drill-through por ativo/produto | Médio-alto | Médio | P1 | UX-04 |
| P09 | Painel de filtros recolhível por bookmark | Médio | Médio-alto | P1 condicional | UX-04 |
| P10 | Decoração, animação, sombras complexas | Baixo | Variável | P2 / evitar | Não obrigatório |
| P11 | Performance Analyzer e benchmark antes/depois | Alto | Médio | P0 | UX-03/06 |

P0 obrigatório; P1 condicionado à utilidade e à viabilidade; P2 não deve competir com qualidade. Impacto/esforço são estimativas, não medições.

## 6. Viabilidade nativa Power BI e riscos

- [Page/Bookmark navigators](https://learn.microsoft.com/en-us/power-bi/create-reports/button-navigators): usar estado selecionado e navegação real, sem exigir links externos. Validar ocultação de páginas auxiliares e comportamento mobile.
- [Clear/Apply all slicers](https://learn.microsoft.com/en-us/power-bi/create-reports/buttons-apply-all-clear-all-slicers): reset nativo preferencial; testá-lo com filtros sincronizados. Apply all opcional se performance justificar.
- [Buttons](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-buttons): bookmarks podem apoiar painel recolhível, mas configurar estado de exibição sem reset inadvertido dos dados; testar Ctrl+click no editor e uso do leitor.
- [Drillthrough](https://learn.microsoft.com/power-bi/guidance/report-drillthrough): páginas auxiliares por ativo/produto somente se melhorarem investigação, retorno e contexto explícitos; manter oito páginas principais. Não usar para contornar lógica de categoria.
- [Report page tooltips](https://learn.microsoft.com/en-us/power-bi/guidance/report-page-tooltips): conteúdo informativo curto, sem controles interativos; hover não é único caminho para informação essencial, principalmente mobile.
- [Mobile design](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-best-practices) e [mobile formatting](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals): layout e formatação próprios; não simplesmente empilhar todos os objetos. Verificar comportamento em preview e, separadamente, aparelho real se disponível.
- [Performance Analyzer](https://learn.microsoft.com/en-us/power-bi/create-reports/performance-analyzer): medir tempo das interações e renderizações em hardware/condição iguais; registrar baseline e após redesign, sem prometer latência antes da medição.
- Acessibilidade: 4,5:1 texto comum, 3:1 texto grande quando aplicável; controles e gráficos essenciais com contraste adequado, estado não comunicado apenas por cor, alt text, tabulação e foco. Testes representativos de teclado, leitor de tela e mobile; documentar falhas e alcance real.

## 7. Plano de avaliação UX-06 (critérios propostos, não resultados)

Tarefas representativas: Fleet identificar maior déficit frente à meta, ativo de maior criticidade, principal fonte de perdas, comparar dois ativos; E-commerce identificar tendência MoM, região com maior receita, composição de status, categoria e canal relevantes. Tarefa transversal filtrar, mudar página, confirmar contexto, limpar e voltar. Registrar sucesso, erros, passos/cliques, tempo de execução e observações; comparar com baseline sob condições semelhantes. Meta proposta: todas as tarefas críticas completáveis sem ambiguidade ou perda involuntária de filtros; encontrar KPI principal e ação em até três interações após abertura (quando aplicável). Não alegar pesquisa com usuários sem participantes. Revisar densidade, contraste e clipping no zoom real e mobile; preservar 101 medidas existentes e regras de negócio. Regredir cenários DAX homologados, interações e persistência; registrar evidência mínima. Sem prints repetidos ou abertura de mais de uma instância.

## 8. Resultado e continuidade

PASS da pesquisa documental e inventário; nenhum redesign implementado, nenhuma homologação UX nova, nenhuma abertura de Power BI. Candidatos mobile continuam locais; reconciliar e versionar antes de UX-03. Sem merge/deploy/custo. Próximo: PORTFOLIO-V3-UX-02 — Design System e arquitetura de informação do portfólio (propor componentes, tokens, wireframes desktop/mobile, variantes Fleet/E-commerce e critérios de aceite; aprovar direção antes de aplicar).
