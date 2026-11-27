# V3-05B1 — Contrato canônico do Fleet PBIP

## Regras corrigidas
- Período fechado: 01/01/2025–31/12/2026 (730 dias) nas cinco consultas que geram datas. O calendário e as quatro fatos usam o mesmo limite explícito.
- Operação: horas desejadas limitadas às horas de calendário menos todas as paradas; produção recalculada a partir das horas efetivas. A fórmula de parada é igual nas duas consultas; preventiva e inspeção reduzem disponibilidade, mas não contam como falha.
- Falhas: cada evento sintético corretivo é uma proxy de falha; MTTR usa horas corretivas, MTBF usa horas operadas; zero falhas implica BLANK em ambas. Sem dados de calendário, contagem/horas retornam BLANK. Não equivale a confiabilidade industrial observada.
- Pareto: ordem decrescente de horas de manutenção; equipamentos empatados entram conjuntamente; curva ordenada pelo percentual acumulado ascendente; sem perdas, BLANK. Não utiliza ranking de criticidade.
- Criticidade: indisponibilidade absoluta, custo/t, falhas e perda normalizados pelo máximo dos ativos válidos selecionados; máximo zero implica score zero; sem dados válidos, BLANK. Score arredondado a nove casas para ranking denso; agregado representa maior score, classe/ranking apenas com um equipamento. Pesos e limites existentes mantidos. Não é risco absoluto.
- Modelo semântico mantém 7 tabelas, 8 relações, agora 35 medidas. O único visual alterado neste bloco é a semântica/título/ordenação do Pareto. Layout V3-05B2.
- Catálogo DAX e gerador legado são exemplos diferentes, não paridade. Nenhuma migração Snowflake, nenhuma mudança de fonte, nenhum dado real.

## Evidência
[Referência sintética independente](../results/v3-05b1-reference.json). Cálculo em JavaScript reproduziu calendário, eventos e horas, não executou o motor M/DAX. Conferir no Desktop: totais, filtros de mês/tipo/equipamento, zero falhas, zero perdas, empate Pareto, primeiro/último ponto, rank denso, cartão de pior ativo e ausência de dados. Testar seleção de todos e subconjuntos; verificar integridade das chaves, medidas temporais e salvar/reabrir PBIP. O layout permanece pendente.
