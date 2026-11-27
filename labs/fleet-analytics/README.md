# Fleet Analytics — Decision Center (V3-05D3B2)

Quatro páginas interativas sobre 5.840 registros sintéticos (730 dias × 8 ativos), com as regras M/DAX reproduzidas no motor do B1. 11 gráficos: produção/meta e desvios; dispersão produtividade/custo, utilização e produtividade mensal; Pareto combinado, MTBF/MTTR mensais e intervenções; composição do score e contexto indisponibilidade/custo. Filtros compartilhados por período, tipo, área e equipamento. Seleção de ativo em gráficos filtráveis via mouse/Enter/Espaço. Tabelas acessíveis com alternativas a cada gráfico; exportação CSV dos indicadores por ativo e PNG 2× por gráfico. Notas e insights derivados da seleção, não métricas inventadas.

## Executar
Na raiz do clone:
```bash
node labs/fleet-analytics/tests/parity.mjs
node labs/fleet-analytics/tests/dashboard.mjs
python -m http.server 8080 --bind 127.0.0.1 --directory labs/fleet-analytics
``
Abrir http://127.0.0.1:8080. Sem npm, CDN ou API externa. Optou-se por SVG nativo para reprodução offline e exportação; ECharts permanece uma alternativa futura, não foi incorporado. Os gráficos em mobile têm rolagem horizontal dentro do painel para preservar rótulos.

## Contrato
Criticidade relativa ao conjunto selecionado, não risco absoluto. Empates de Pareto agrupados. MTBF/MTTR nulos quando sem falhas. Comparação anterior de janela igual em dias, não DATEADD. Linhas de referência de dispersão são agregados ponderados, não metas; comparar por tipo de equipamento. Base sintética repete 2025/2026. Exportação e filtros requerem navegador moderno.

## Evidências
28 verificações B1 + 35 verificações B2 executadas em JavaScript nesta sessão. Ver [resultado](evidence/dashboard.json). Testes de geração HTML/SVG em seis cenários; não equivalem a execução DOM, teste de cliques, acessibilidade, screenshots ou exportação efetiva. Desktop Commander offline; homologação browser no D3D. Nenhum merge, deploy ou modificação PBIP.
