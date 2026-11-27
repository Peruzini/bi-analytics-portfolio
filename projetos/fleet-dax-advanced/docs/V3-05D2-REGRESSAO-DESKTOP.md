# V3-05D2 — Refinamento e regressão Fleet

Candidato executado: 787f060eb84f9be65b03eedf31fe108f8f97460d. Power BI Desktop 2.160.1151.0, Windows, worktree isolada. 26/11/2026 BRT.

- Ranking Equipamento usa ISINSCOPE e retorna BLANK no total; oito posições individuais preservadas. Tabelas de performance e criticidade ordenadas por ranking ascendente.
- Tema com unidades de exibição explícitas; produção 1.010.178,2 t, horas operadas 107.742,0 e manutenção 2.034,0 exibidas integralmente.
- Execução real de `node scripts/validar-fleet-v3-05b3.mjs`: 27/27 PASS, exit 0.
- DAX nativo: 5.840 linhas, produção 1010178.2, ranking total BLANK, MTBF 533.376237623762, MTTR 5.0990099009901, criticidade máxima 0.599190062. Oito rankings e Pareto conciliados.
- Quatro capturas reais pós-alteração inspecionadas: cartões completos, tabelas ordenadas, total sem ranking, curva Pareto preservada; nenhum erro visual observado.

Sem alteração de fontes, sem merge. Capturas de inspeção locais em pasta inspection-d2, não publicadas; capturas editoriais com painéis ocultos no V3-05E. Rótulos/rodapés continuam pequenos no zoom de edição de 60%; não houve homologação exaustiva de acessibilidade/mobile, nem novo round-trip de salvamento/reabertura do candidato D2 (D1 comprovado para baseline anterior).
