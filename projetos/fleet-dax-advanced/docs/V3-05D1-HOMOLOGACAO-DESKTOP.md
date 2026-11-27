# V3-05D1 — Homologação nativa Fleet Analytics

Candidato: `ab9ce911f27111a54fe8397bd7849f9f53b6732e`. Power BI Desktop Windows 2.160.1151.0; 26/11/2026 BRT (27/11 UTC). Abertura, refresh, navegação, salvamento e reabertura efetivamente executados em clone isolado. O Desktop reserializou BIM para TMDL localmente; 35 medidas, 56 visuais, 8 sortDefinition e 44 altText preservados. Reabertura em novo processo com KPIs populados. Nenhuma reserialização publicada.

## Evidência do motor DAX
- 730 dias; 8 equipamentos; 5.840 operações, abastecimentos e metas; 406 eventos de manutenção; tabela auxiliar Medidas com uma linha.
- Produção 1.010.178,2 t; disponibilidade 0,98548801369863; utilização 0,780026931931715; MTBF 533,376237623762; MTTR 5,0990099009901; 202 falhas; custo/t 44,0461387901659; pior criticidade 0,599190062.
- Ranking relativo dos oito equipamentos e Pareto coincidiram com V3-05B3. Dia sem parada: disponibilidade 1, falhas zero, MTBF/MTTR/Pareto BLANK; inspeção em 07/01: disponibilidade 0,875 e zero falhas; janeiro Caminhão 01: 31 linhas, 4.475,7 t, zero falhas.
- Após reabertura, as sete tabelas têm linhas. O aviso de tabelas incompletas observado anteriormente não reapareceu na inspeção das páginas; sua causa exata não foi estabelecida.

## Inspeção visual real (quatro páginas)
Capturas das janelas do Desktop foram lidas e inspecionadas, a 60% de zoom com painéis laterais abertos. Todos os cartões, gráficos e tabelas exibiam dados; a curva de Pareto atingiu 100%, e a matriz de criticidade exibiu as classes e rankings. Sem erros de visual observados. Ajustes antes da publicação final: [Ranking Equipamento] retorna 1 no total (reproduzido por DAX), deve ser BLANK quando não há um único equipamento; melhorar precisão dos cartões abreviados, ordenação das tabelas de ranking e legibilidade de rótulos/rodapés. Para a captura editorial, ocultar painéis de edição e tooltips; não usar as capturas de inspeção como arte final.

Capturas locais reais, ainda não publicadas:
- FleetAnalytics-1.png: `debea8bc367bc17feeb0259b6a94f4fa9c317403929aca8659192b329ba2bdfa`
- FleetAnalytics-2.png: `cc2503552a2401a13fde37fecc52abfe175c69d2e5093a08e132c2fc8819fb66`
- FleetAnalytics-3.png: `a2015f74c575de9c9282aa48899b6bcdb714b2d267da18446920a47a76b4114b`
- FleetAnalytics-4.png: `dddca31624c70cf863e6583cb43d461127a33b16c04aa5195e2e02da50d6169c`

Status: PASS de abertura, refresh, salvamento/reabertura, navegação, KPIs testados e renderização desktop; ressalva de ranking agregado e acabamento. Filtros foram testados em consultas DAX, não foi executada matriz exaustiva de interações por mouse/teclado, leitor de tela ou mobile. Sem merge, sem migração TMDL no Git, sem publicação no Power BI Service. Próximo: corrigir acabamento/total e recapturar.
