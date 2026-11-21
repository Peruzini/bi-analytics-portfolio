# Fleet Analytics — DataViz V2 (proposta para homologação)

**Status:** CANDIDATA em branch/PR; **sem aprovação de Power BI Desktop ou merge**. **Data:** 21/11/2026. **Base:** PBIP/PBIR versionado em `powerbi/fleet/`, com dados 100% sintéticos. Não foram alterados cálculos DAX, relações, Power Query nem dados.

## Objetivo de negócio

A leitura atual privilegia tabelas de detalhe antes da pergunta decisória. Em páginas com 960 px de altura, a tabela ocupava 480 px e os gráficos apenas 240 px. O redesenho estabelece a sequência **contexto → filtros → três KPIs → visual principal → tabela de detalhe**.

## Nova hierarquia nas quatro páginas

**Canvas uniforme: 1280 × 960.** Cabeçalho (y=8 e y=50), 3 filtros dropdown (y=88), 3 KPIs (y=198), gráficos (y=328) e tabela (y=642). Margens 24 px. Os blocos evitam sobreposição pela geometria especificada.

| Página | KPIs | Gráfico(s) com prioridade visual | Detalhe |
| --- | --- | --- | --- |
| **Visão Executiva** | Produção (t), aderência à meta, custo por tonelada | Produção × meta por mês | Produção, meta e custo por equipamento |
| **Performance da Frota** | Utilização, produtividade (t/h), produção | Ranking de produção decrescente | Produção, utilização, produtividade e ranking |
| **Manutenção e Custos** | MTBF (h), falhas, custo de manutenção | Horas de manutenção **versus** custo por equipamento, em gráficos separados | Falhas, horas, custos e participação |
| **Criticidade** | Índice no filtro, disponibilidade, custo por tonelada | Comparação de índice composto e indisponibilidade por equipamento | Classe, índice, ranking e disponibilidade |

**Interação existente preservada:** filtros de `DimData[AnoMes]`, `DimEquipamento[Equipamento]` e `DimEquipamento[Tipo]`, além da filtragem entre visuais conforme configuração anterior.

## Pareto — ajuste de integridade antes do visual

O gráfico original usava `Perdas Acumuladas %` em uma linha ordenada visualmente por `Ranking Criticidade`. A medida define `RankAtual = [Ranking Criticidade]`, porém agrega `TOPN(RankAtual, ..., [Horas Manutenção], DESC)`: a ordem **por criticidade** não coincide necessariamente com a seleção dos maiores tempos de manutenção.

Por isso, na V2 **não apresentamos uma curva de Pareto como se fosse válida**. Em seu lugar, há duas distribuições independentes, de horas e custo, que respondem perguntas diferentes. A medida DAX histórica foi **preservada**, não promovida nem alterada.

**Bloco posterior opcional:** projetar um Pareto verdadeiro, com ranking determinístico por horas ou por custo, acumulado na mesma ordem, testes de empate, filtro e total 100%, sem comparar curvas de granularidades distintas.

## Sistema visual

- Fundo claro `#F8FAFC` e cartões brancos; títulos em `#0F172A` e textos secundários `#475569`.
- Teal `#0F766E`, azul `#2563EB` e âmbar `#D97706` em KPIs diferenciados; a cor **não** substitui rótulos e unidades.
- Títulos e subtítulos em todas as páginas; o subtítulo declara o uso de **dados sintéticos**.
- Unidades explicitadas quando cabíveis: toneladas, t/h, horas, R$, R$/t e percentuais.
- Gráficos acima das tabelas para favorecer diagnóstico visual; tabelas mantidas para auditoria.

## Gates e evidências

### Gate A — estático (aplicável ao Git sem execução Power BI)
1. Executar `node scripts/validate-fleet-dataviz.mjs` a partir da raiz.
2. Confirmar 4 páginas, 41 visuais, IDs únicos, posições internas ao canvas e ausência de colisões geométricas.
3. Confirmar que as medidas de todos os gráficos/KPIs existem no modelo semântico versionado.
4. Confirmar que o gráfico acumulado anterior não é apresentado como Pareto.

### Gate B — Power BI Desktop (obrigatório antes de merge/homologação)
1. Abrir `powerbi/fleet/FleetAnalytics.pbip` com pastas `.Report` e `.SemanticModel` intactas.
2. Verificar carregamento/refresh, ausência de visuais quebrados, erros de schema e medidas.
3. Confirmar texto legível em 100%/tela integral, rótulos, cores, comportamento de seleção e tooltips.
4. Exercitar filtros (mês, equipamento e tipo) em **todas as páginas**, inclusive seleções múltiplas e sem dados.
5. Verificar rankings, evolução temporal e consistência entre os gráficos de horas e custo; não inferir causalidade.
6. Confirmar comportamento do índice de criticidade com filtros e ausência de alegações de previsão de falha.
7. Salvar o PBIP no Desktop e verificar round-trip dos arquivos de definição antes do merge.
8. Só depois coletar quatro **capturas reais** em `docs/screenshots/`, datadas e vinculadas ao commit aprovado.

### Regras de governança
- Sem GitHub Actions, runner, artefatos hospedados ou deploy para essa revisão.
- Sem alteração de modelo, DAX ou dados para maquiar visualizações.
- **CI/JSON PASS ≠ Power BI Desktop PASS ≠ aceite visual.**
- Não incorporar à `main` sem aprovação explícita.
