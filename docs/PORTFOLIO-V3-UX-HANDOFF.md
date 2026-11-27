# PORTFOLIO V3 — Handoff e roadmap UX/UI

Atualização: 27/11/2026 | Estado: UX-03A1 piloto desktop concluído; aceite visual pendente antes de UX-03A2 | Documento de continuidade operacional

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
