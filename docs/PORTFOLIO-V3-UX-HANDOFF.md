# PORTFOLIO V3 — Handoff e roadmap UX/UI

Atualização: 28/11/2026 | Estado: UX-03A1-R2F menu lateral refinado; homologação funcional da navegação pendente | Documento de continuidade operacional

## 1. Objetivo e decisão de escopo

Construir um portfólio de BI e Analytics com qualidade de produto corporativo, demonstrando entendimento de negócio, modelagem, DAX, engenharia de dados, visualização, UX/UI e validação reproduzível. Os dois cases são Fleet Analytics (gestão operacional de ativos) e E-commerce Analytics (inteligência comercial).

Decisão de 27/11: priorizar a experiência das telas antes das capturas profissionais e publicação da V3. A etapa mobile D3F2C foi implementada, mas sua homologação ficou parcial; não repetir a homologação integral de um layout que será redesenhado. Incorporar as pendências de D3F2C a UX-05/UX-06, preservando as evidências e os candidatos. Não alterar o modelo semântico sem justificativa e teste de regressão.

## 2. Fonte de verdade e versionamento

| Projeto | Repositório | Candidato funcional remoto | Candidato mobile local |
|---|---|---|---|
| Fleet | [bi-analytics-portfolio](https://github.com/Peruzini/bi-analytics-portfolio) | [PR #11](https://github.com/Peruzini/bi-analytics-portfolio/pull/11), `portfolio/v3-05d3f2a-fleet-functional`, `7a9c3d5` | `portfolio/v3-05d3f2c-fleet-mobile`, `f7bd9f8` |
| E-commerce | [analytics-engineering-snowflake-dbt](https://github.com/Peruzini/analytics-engineering-snowflake-dbt) | [PR #7](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/pull/7), `portfolio/v3-05d3f2b-ecommerce-functional`, `5c3a9c4` | `portfolio/v3-05d3f2c-ecommerce-mobile`, `d3e8cb2` |

Na conferência inicial os candidatos mobile estavam locais. UX-03A1 preservou a branch Fleet mobile no remoto, sem merge; E-commerce segue local. Antes de UX-03B, reconciliar remoto/local do E-commerce, confirmar SHA e preservar as alterações mobile. Os PRs existentes foram conferidos no GitHub: todos abertos em Draft, sem merge. Este handoff tem branch documental independente de main; não é a branch para editar relatórios.

Cadeias de PRs: Fleet [#9](https://github.com/Peruzini/bi-analytics-portfolio/pull/9) → [#10](https://github.com/Peruzini/bi-analytics-portfolio/pull/10) → [#11](https://github.com/Peruzini/bi-analytics-portfolio/pull/11); E-commerce [#5](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/pull/5) → [#6](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/pull/6) → [#7](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/pull/7). Não misturar os números dos dois repositórios.

## 3. Estado validado (histórico, não uma nova execução)

| Gate | Fleet | E-commerce |
|---|---|---|
| Transposição nativa D3E | PASS funcional; ressalvas tratadas em D3F1 | PASS funcional; ressalvas tratadas em D3F1 |
| Refinamento visual D3F1 | PASS, 4 páginas, 59 visuais | PASS, 4 páginas, 66 visuais |
| Homologação funcional D3F2A/B | PASS representativo, 602/602 comparações, 11/11 testes | PASS representativo, 852/852 comparações, 52/52 testes |
| Inventário após funcional | 59 visuais, 51 medidas, 16 segmentadores, 4 grupos, 336 regras | 67 visuais, 50 medidas, 17 segmentadores, 4 grupos comuns + categoria local, 414 regras |
| D3F2C mobile | 4 layouts reconhecidos, 1 topo corrigido inspecionado, DAX 225/225 | 4 layouts implementados, validação nativa pendente |
| Acessibilidade | Metadados e ordem de tabulação implementados | Metadados e ordem implementados; 4 rodapés com contraste 4,43:1 → 7,05:1 |

Total: oito páginas principais, 126 elementos mobile com texto alternativo, 63 testes Python aprovados nos candidatos mobile. Layout atual em uma coluna (307 pontos úteis, limite 323); não confundir com UX mobile final. As verificações DAX de contextos vazios e multisseleção foram feitas no motor, não na interface. As regras de interação foram verificadas estruturalmente e após salvar; a UI teve amostragem representativa, não cobertura exaustiva. O salvamento e reabertura foram comprovados nos candidatos funcionais. A captura de tela não prova acessibilidade.

### Indicadores de referência (dados sintéticos, contexto geral)

Fleet: 5.840 registros, produção 1.010.178,2 t, meta 1.030.760 t, disponibilidade 98,55%, custo R$ 44,05/t, MTBF 533,38 h, MTTR 5,10 h.
E-commerce: 4.200 pedidos, 8.400 itens, receita reconhecida R$ 2.699.981,55, ticket R$ 752,50, taxa de conclusão 85,43%, 420 compradores, recompra 98,57%.
Preservar definições existentes, denominadores, referências ponderadas e significado dos KPIs; não inventar CAC, ROAS, margem ou dados indisponíveis.

Evidências:
- [Fleet — homologação funcional](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-05d3f2a-fleet-functional/projetos/fleet-dax-advanced/docs/V3-05D3F2A-HOMOLOGACAO-FUNCIONAL.md)
- [Fleet — resultados nativos](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-05d3f2a-fleet-functional/projetos/fleet-dax-advanced/results/v3-05d3f2a-native-checks.json)
- [E-commerce — homologação funcional](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/blob/portfolio/v3-05d3f2b-ecommerce-functional/docs/V3-05D3F2B_FUNCTIONAL_ACCEPTANCE.md)
- [E-commerce — resultados nativos](https://github.com/Peruzini/analytics-engineering-snowflake-dbt/blob/portfolio/v3-05d3f2b-ecommerce-functional/docs/V3-05D3F2B_NATIVE_CHECKS.json)

## 4. Nova direção UX/UI

Priorizar perguntas de negócio, tarefas do usuário, hierarquia informacional, fluxo de navegação e redução de esforço cognitivo. Identidade comum de produto, com diferenciação visual entre gestão de frota e comércio. Evitar decoração sem função, excesso de cards, gráficos redundantes e elementos que disputem atenção. Manter visuais nativos e custo zero. Estudos de referência devem ser datados e fundamentados; não copiar trabalhos de terceiros.

Investigar: navegação persistente e estado ativo, filtros compactos com seleção visível e limpeza, KPIs com contexto de meta/tendência, tipografia e grid, unidades coerentes, feedback de interação, estados vazios, tooltips e drill-through quando úteis, responsividade e contraste. Menus, bookmarks, tooltips e drill-through são propostas sujeitas à viabilidade e validação nativa, não entregas já implementadas.

### Mapa de páginas e tarefas

| Página | Pergunta principal |
|---|---|
| Fleet — Visão Executiva | A produção atingiu a meta e onde agir primeiro? |
| Fleet — Performance | Quais ativos entregam melhor produtividade e custo? |
| Fleet — Manutenção & Pareto | Onde se concentram perdas e falhas? |
| Fleet — Criticidade | Quais ativos demandam ação prioritária e por quê? |
| E-commerce — Visão Executiva | Como está a receita e sua evolução? |
| E-commerce — Receita e Pedidos | Qual a composição e o desempenho dos pedidos? |
| E-commerce — Clientes e Produtos | Onde estão receita, recorrência e concentração? |
| E-commerce — Canais e Pedidos | Quais canais apresentam melhor desempenho comercial? |

## 5. Roadmap vigente (substitui a sequência de finalização imediata)

| Bloco | Entrega e gate | Estado |
|---|---|---|
| UX-01 | Pesquisa aprofundada de referências BI/UX/UI; benchmark comparativo, princípios aplicáveis ao Power BI, diagnóstico dos oito dashboards e recomendações priorizadas | PASS pesquisa documental |
| UX-02 | Design System: tokens, paleta, contraste, grid, tipografia, cartões, filtros, navegação, tabelas, gráficos, estados e especificação mobile; aprovar direção antes de implementar | PASS especificação; direção autorizada para piloto |
| UX-03A1 | Piloto nativo Fleet Visão Executiva, após aprovação da direção UX-02; reconciliar candidatos mobile e aplicar tema/layout; validar e obter aceite do piloto | PASS representativo desktop; aceite visual pendente |
| UX-03A2 | Expandir piloto aprovado às três páginas Fleet restantes | Próximo após aceite |
| UX-03B | Redesign E-commerce: mesma estratégia, adequada às tarefas comerciais | Pendente |
| UX-04 | Navegação e interação avançadas, limpeza de filtros, tooltips e drill-through onde fizerem sentido; testar comportamento e persistência | Pendente |
| UX-05 | Mobile-first dedicado: hierarquia compacta, rolagem funcional, controles legíveis; absorve pendências D3F2C-R1 | Pendente |
| UX-06 | Homologação de UX, regressão DAX, filtros, interações, salvamento/reabertura, acessibilidade, teclado e leitor de tela; teste físico se disponível | Pendente |
| V3-05E1 | Capturas profissionais reais (desktop e mobile validado) | Pendente |
| V3-05E2 | Integração dos dashboards ao portfólio | Pendente |
| V3-05E3 | Cases de negócio e documentação técnica | Pendente |
| V3-05F | Auditoria final e regressão | Pendente |
| V3-06 | Integração controlada de branches e publicação, somente com autorização | Pendente |

D3F2C-R1 fica incorporado aos gates UX-05/06; não declarar concluído. A reordenação evita retrabalho. UX-01 é pesquisa e planejamento, não altera PBIR, DAX, dados ou layout.

## 6. Modelo de trabalho obrigatório

1. Execução direta no chat com GitHub e Desktop Commander no Windows; sem Worker separado.
2. Antes de editar, verificar branch, SHA, git status, dependências e evidências. Isolar cada bloco; PR inicialmente Draft; nenhum merge automático.
3. Um Power BI Desktop por vez. Antes de abrir, verificar processos existentes. Não fechar instâncias abertas pelo usuário; se houver uma, não abrir outra. Salvar trabalho pertinente e fechar a instância própria imediatamente ao terminar. Confirmar ausência de processos residuais próprios (Desktop/Analysis Services); se fechamento normal falhar, preservar o trabalho e só encerrar de forma controlada o PID descartável identificado. Nunca descartar alterações do usuário.
4. Priorizar código, análise estrutural e consultas DAX. Capturar somente quando a evidência visual for necessária: correção pontual, resultado final por página, exceção documentada. Não tirar prints a cada ação, não repetir capturas idênticas, não usar capturas simuladas como evidência. Verificar se a captura corresponde à página e modo efetivamente testados.
5. Preferir testes automatizados, comparações com dados de origem, regressões focadas e evidências reproduzíveis. Não executar novamente testes caros sem risco relevante; não confundir PASS estrutural com PASS nativo.
6. Usar os recursos existentes, sem custo adicional, sem visuais pagos e sem consumo desnecessário de Snowflake. Não publicar/deploy sem autorização. Não versionar caches, dados privados, credenciais ou artefatos temporários.
7. Entregar status, métricas verificadas, branch/commit/PR, limitações, decisões técnicas e próximo bloco. Atualizar este handoff ao concluir cada gate ou mudar a direção.
8. Não marcar PASS integral se algum critério obrigatório não tiver sido testado. Classificar PASS, PASS representativo/com ressalvas, FAIL, bloqueado ou não executado conforme evidência.

## 7. Critérios de aceite UX-06

- Oito telas coerentes com o Design System aprovado, com KPIs e gráficos úteis para a decisão; títulos/rótulos legíveis e sem cortes.
- Navegação clara, estado de filtros visível, limpeza previsível, feedback de interação, ausência de sobreposições; tabelas largas podem ter rolagem deliberada e documentada.
- Mobile nativo verificado em todas as páginas, incluindo topo, KPIs, gráficos e rolagem; teste físico separado se houver acesso, sem confundir preview com smartphone real.
- Contraste textual de referência 4,5:1 para texto comum, 3:1 para texto grande quando aplicável; informação não depender exclusivamente de cor; texto alternativo relevante e ordem de leitura; verificar teclado e leitor de tela, registrar cobertura. Não alegar certificação WCAG sem auditoria apropriada.
- Regressão DAX contra os candidatos funcionais, preservação da lógica de filtros (Fleet: período/tipo/área/equipamento; E-commerce: mês/região/status/canal e categoria local), sincronização e interações representativas. Se houver alterações funcionais, testar novos casos e persistência após salvar e reabrir.
- Evidências reais suficientes, sem excesso de screenshots; zero processos próprios residuais; PR Draft e sem merge até autorização.

## 8. Comando de continuidade

**Próximo proposto: PORTFOLIO-V3-UX-03A2 — Expansão do redesign às três páginas Fleet restantes (após aceite visual do piloto).**

Ler [Design System UX-02](PORTFOLIO-V3-UX-02-DESIGN-SYSTEM.md) e [PR #13 — piloto Fleet](https://github.com/Peruzini/bi-analytics-portfolio/pull/13). Piloto final 9bde2c9, branch portfolio/v3-ux-03a1-fleet-pilot; base mobile Fleet f7bd9f8 agora preservada no remoto portfolio/v3-05d3f2c-fleet-mobile. E-commerce mobile d3e8cb2 segue local e não foi alterado. Evidências: [documentação](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-ux-03a1-fleet-pilot/projetos/fleet-dax-advanced/docs/V3-UX-03A1-FLEET-PILOT.md), [captura nativa recortada](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-ux-03a1-fleet-pilot/projetos/fleet-dax-advanced/results/v3-ux-03a1-pilot.png), [validações](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-ux-03a1-fleet-pilot/projetos/fleet-dax-advanced/results/v3-ux-03a1-native-checks.json). 13/13 testes; 602/602 comparações nativas; filtro, reset e navegação para Performance verificados. 51 medidas, consultas existentes e demais páginas preservadas. Aplicar mesmo sistema somente após aceite visual; tema global, mobile, resumo dinâmico, acessibilidade e persistência ampla pendentes. Uma instância Power BI por vez, zero processos residuais, sem Worker, sem merge ou gastos.

## Atualização UX-03A1-R1 — revisão visual

[PR #14](https://github.com/Peruzini/bi-analytics-portfolio/pull/14), branch `portfolio/v3-ux-03a1-r1-fleet-polish`, commit `930b281`. A pedido do usuário, manter foco exclusivo na qualidade visual do piloto e não fechar a instância aberta para avaliação (PID 24148 no momento da entrega; confirmar estado antes de qualquer nova ação). Esta é uma exceção à regra anterior de fechamento. Não abrir instância adicional. 13/13 testes e 225/225 regressão; ações e modelo preservados. Não expandir às outras telas sem aprovação visual. [Captura real](https://github.com/Peruzini/bi-analytics-portfolio/blob/portfolio/v3-ux-03a1-r1-fleet-polish/projetos/fleet-dax-advanced/results/v3-ux-03a1-r1-pilot.png). Próximo: continuar refinando o piloto conforme feedback ao vivo.

## Atualização UX-03A1-R2 — especificação KPI

[Especificação dos cinco KPIs](PORTFOLIO-V3-UX-03A1-R2-KPI-SPEC.md), commit f5d9064. Faixa x=216–1416, y=218–358, larguras 300/252/240/180/180, gap 12; aderência hero escuro, desvio com semântica dinâmica, três cards de apoio. Medidas existentes verificadas; não usar barra estática, valores fixos ou status sem limiar. Nenhuma alteração PBIR/DAX ou fechamento do Power BI nesta etapa. Próximo: UX-03A1-R2A — aplicação nativa e revisão visual dos KPIs, preservando sessão aberta e verificando alterações do usuário antes de editar; sem expansão das demais páginas.

## Atualização UX-03A1-R2A — KPIs nativos

[PR #15](https://github.com/Peruzini/bi-analytics-portfolio/pull/15), commit `d9064e8`, branch `portfolio/v3-ux-03a1-r2a-kpi`. Cinco regiões, 12 medidas de apresentação novas, 51 originais intactas. 13 testes e 225 valores históricos coincidentes; quatro contextos DAX (geral, déficit, superação, vazio). Barra nativa de texto dinâmica segmentada, saturada em 100%; alternativa ao gráfico de barra que não coube na altura. Desktop Bridge recarregou a mesma janela PID 24148 (confirmar estado antes de editar; cópia salva e backup local). Não fechar nem abrir segunda instância. Demais páginas intactas. Próximo: revisão visual ao vivo da faixa KPI e reorganização do grid somente após feedback. Sem merge/deploy.

## Atualização UX-03A1-R2B — grid executivo

[PR #16](https://github.com/Peruzini/bi-analytics-portfolio/pull/16), commit `3595b02`, branch `portfolio/v3-ux-03a1-r2b-grid`. Canvas 1440×1032 (−81 pontos, −7,28%), 27 posições alteradas. Candidato de 984 rejeitado por ocultar dois ativos; gráficos voltaram a 310 de altura, série temporal ampliada a 688 de largura, tabela 270. Oito ativos e total visíveis. Rótulos das pequenas barras positivas ainda ausentes; valores na tabela. 63 medidas e 119 regras intactas; 13/13 testes; regressão DAX anterior reutilizada por não haver mudança de modelo ou consulta. Mesma sessão PID 24148 mantida aberta, recarga sem modelo. Próximo: revisão visual e refinamento dos gráficos (eixos, séries, rótulos e barras positivas). Sem expansão ou merge.

## Atualização UX-03A1-R2C — gráficos executivos

[PR #17](https://github.com/Peruzini/bi-analytics-portfolio/pull/17), commit `52b7d27`, branch `portfolio/v3-ux-03a1-r2c-charts`. Dois gráficos: produção com eixo mensal contínuo e oito marcas trimestrais no contexto geral, meta tracejada; desvio assinado com oito rótulos externos, seis barras vermelhas e duas verdes. 63 medidas intactas, uma coluna calculada Inicio Mes UX; 339/339 comparações DAX e 13/13 testes. Mesmo grid e regras de interação. Power BI PID 24148 aberto, sessão preservada. Próximo: redesign da tabela operacional e formatação condicional; navegação, filtros, mobile e acessibilidade ainda pendentes. Sem expansão ou merge.

## Atualização UX-03A1-R2D0 — componente mestre KPI

Por decisão do usuário, priorizar exclusivamente o cartão azul antes de derivar os demais KPIs. [Especificação mestre](PORTFOLIO-V3-UX-03A1-R2D0-KPI-MASTER.md) e [tokens/posição JSON](ux-v3/kpi-hero-master.v1.json). Região 300×140, x216/y196, 4 zonas internas, 12 padding horizontal, 8 vertical, gap 4. 14 checagens geométricas e 5 contrastes aprovados matematicamente. Agrupamento nativo real será testado em R2D1; não se trata de componente automaticamente sincronizado. Preservar demais KPIs, modelo, gráficos e tabela. Nenhuma edição PBIR ou DAX, nenhuma nova captura, nenhuma ação na janela Power BI nesta etapa. Última sessão conhecida PID 24148; conferir estado antes de editar e manter aberta conforme pedido. Próximo: UX-03A1-R2D1 — Construção nativa e homologação visual do cartão mestre azul. Depois do aceite, derivar os quatro restantes; redesign da tabela postergado. Sem merge/deploy.

## Atualização UX-03A1-R2D1 — cartão mestre agrupado

[PR #18](https://github.com/Peruzini/bi-analytics-portfolio/pull/18), commit `afceb25`, branch `portfolio/v3-ux-03a1-r2d1-hero`. Grupo nativo ScaleMode, fundo único, cinco filhos transparentes, quatro zonas. 300×140 mantido; fonte valor 28 pt e rodapé 9 pt para evitar recortes. 14 testes, 225/225 regressão histórica e quatro contextos DAX. 63 medidas anteriores intactas e três novas de apresentação. Grupo reconhecido no painel Seleção, mas movimento, edição individual e round-trip ainda pendentes. Barra segmentada dinâmica mantida, raio não confirmado. Power BI PID 24148 permanece aberto. Não replicar antes do aceite visual. Próximo: revisão do mestre com usuário e validação de manipulação do grupo. Sem merge/deploy.

## Atualização UX-03A1-R2D2 — Hero V2

[PR #19](https://github.com/Peruzini/bi-analytics-portfolio/pull/19), commit `1c7258a`, branch `portfolio/v3-ux-03a1-r2d2-hero-v2`. Fundo arredondado, ícone alvo, barra SVG contínua ImageUrl em tabela nativa de uma célula, sete filhos do grupo. 300×140 mantido para preservar grid e demais KPIs; valor 31 pt, rodapé 11 pt. 14/14 testes, 225/225 regressão histórica, quatro contextos DAX e largura da barra verificada em três contextos mais ausência de dados. 66 medidas anteriores intactas, duas novas de apresentação. Power BI PID 24148 permanece aberto. Aceite visual, movimento e persistência do grupo pendentes; não replicar antes de aprovação. Sem merge/deploy.

## Atualização UX-03A1-R2D3 — família de KPIs

Mestre azul V2 aprovado expressamente pelo usuário. [PR #20](https://github.com/Peruzini/bi-analytics-portfolio/pull/20), commit `ad1ffbe`, branch `portfolio/v3-ux-03a1-r2d3-kpi-family`. Quatro grupos derivados, cinco grupos totais, fundo arredondado, header, valor e referência/status transparentes. 15/15 testes, 68 medidas e 144 regras intactas, oito consultas preservadas. Rodapé de custo 9 pt para evitar recorte. Nenhuma mudança no hero, gráficos, tabela ou outras páginas. Power BI PID 24148 permanece aberto. Revisão visual dos cinco cartões pendente; próximo: UX-03A1-R2E — redesign da tabela operacional após aceite da família. Movimento/persistência dos grupos e acessibilidade pendentes. Sem merge/deploy.

## Atualização UX-03A1-R2E — tabela operacional

[PR #21](https://github.com/Peruzini/bi-analytics-portfolio/pull/21), commit `b9781b1`, branch `portfolio/v3-ux-03a1-r2e-table`. Tabela nativa de sete campos preservados, cabeçalho azul escuro, linhas alternadas, desvios vermelho/verde por UX Desvio Cor, barras de aderência com valores numéricos e escala configurada 0–110%, total geral destacado. Oito ativos e total visíveis sem rolagem na captura final após correção de larguras e espaçamento. 16/16 testes, 68 medidas e 144 regras intactas. Nenhuma alteração no modelo, consultas, outros visuais ou páginas; regressão anterior reutilizada. Power BI PID 24148 mantido aberto. Próximo: UX-03A1-R2F — refinamento da navegação lateral com iconografia e hierarquia; depois filtros e acabamento. Sem merge/deploy.

## Atualização UX-03A1-R2F — menu lateral

[PR #22](https://github.com/Peruzini/bi-analytics-portfolio/pull/22), commit `6f40493`, branch `portfolio/v3-ux-03a1-r2f-sidebar`. Grupo decorativo nativo com sete filhos e quatro botões PageNavigation independentes, iconografia textual, alinhamento esquerdo e faixa turquesa para a Visão Executiva. A primeira tentativa agrupava os botões; a seleção do grupo interferiu no acionamento automatizado. Separados os botões; vínculos originais preservados, mas Performance ainda não teve acionamento confirmado por automação. 17/17 testes, 68 medidas e 144 regras intactas. Captura final sem recorte da marca. Não afirmar homologação funcional da navegação. Power BI PID 24148 aberto na Visão Executiva. Próximo: UX-03A1-R2F1 — homologar navegação nativa; depois R2G — filtros e acabamento. Sem merge/deploy.
