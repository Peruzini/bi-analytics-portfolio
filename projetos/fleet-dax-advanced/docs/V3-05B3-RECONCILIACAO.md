# V3-05B3 — Reconciliação Fleet Analytics

Candidato auditado: `509665229e7a3f2b85ab1fd027c4f115951d5a8d`. Modelo semântico blob `11cd7962238b0cf806359ec04c56faefb5e7b031`.

## Resultados
- Releitura dos 56 visual.json, quatro page.json e modelo: 85 vínculos incluindo ordenação, zero referências ausentes, zero colisões, zero elementos fora do canvas, zero IDs/tabOrder duplicados por página; altText presente em 44 visuais não textuais.
- 92 ocorrências de referências DAX reais conferidas estaticamente, sem ausência. Não equivale a parser DAX ou execução.
- 27 verificações independentes PASS em JavaScript, com reprodução das quatro fatos, 730 dias, 8 equipamentos, 5840 registros diários, reconciliação por 24 meses e 8 ativos, casos de contexto vazio, parada não corretiva, zero falhas/perdas e empates. O código reproduz o contrato e verifica assinaturas selecionadas de M/DAX; não interpreta M/DAX.
- [Evidência detalhada](../results/v3-05b3-reconciliation.json). [Script](../../../scripts/validar-fleet-v3-05b3.mjs): na raiz, `node scripts/validar-fleet-v3-05b3.mjs`. A função de referência foi executada no ambiente JavaScript da auditoria; o wrapper Node não foi executado em clone local.

## Ressalvas para homologação
1. Não houve validação integral dos schemas Microsoft nem abertura/refresh do PBIP; ambiente local sem DNS para GitHub. Executar o gate oficial e Power BI Desktop em V3-05D. Validar altText, funções de contexto ALLSELECTED, DATEADD e DATESINPERIOD, filtros e round-trip de sortDefinition.
2. Produção usa arredondamento decimal ideal ties-to-even; confirmar paridade do motor M e centavos exibidos. Combustível é sintético e não condicionado às horas de operação; não representa telemetria real.
3. Ranking Equipamento não tem guarda para total sem ativo único: confirmar comportamento no total da tabela e ocultar total de ranking ou retornar BLANK se necessário. Criticidade é relativa; não interpretar classes como limites absolutos de risco.
4. Nenhuma captura real, execução CI ou merge. Sem mudanças no modelo/relatório neste bloco.
