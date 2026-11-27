# Fleet Analytics — laboratório HTML (V3-05D3B1)

Base funcional de um futuro laboratório de oito páginas. Não é a versão final do relatório. Modelo reproduzido do candidato Power BI 6e91d4543e992b85a75f53274c3cea7a1881c5da, a partir das regras M/DAX e da dimensão de equipamentos. 730 dias, 8 equipamentos, 5.840 registros data/equipamento. Custos em centavos e produção em décimos, arredondamento decimal half-even; nulo para divisão por zero e seleção vazia. Criticidade e Pareto relativos ao contexto filtrado, com empates; ranking agregado não definido. Comparação anterior usa janela imediatamente anterior de duração igual em dias (não DATEADD); se não couber na base, retorna nulo. A base sintética repete 2025/26.

## Executar localmente
Na raiz do repositório:
```bash
node labs/fleet-analytics/tests/parity.mjs
python -m http.server 8080 --bind 127.0.0.1 --directory labs/fleet-analytics
```
Abrir http://127.0.0.1:8080. Não requer npm nem serviço externo. Navegador moderno com módulos ES. Filtros inclusivos por data, tipo, área e equipamento, tabela, gráfico SVG diagnóstico e exportação de resumo CSV. CSS com tokens de identidade visual, layout responsivo, foco visível, navegação semântica e alternativa tabular. Contraste e responsividade ainda não homologados em navegador.

## Evidências
28/28 verificações executadas sobre as mesmas funções publicadas em sessão JavaScript, comparando referência B3: totais, todos os meses, oito ativos, criticidade, Pareto e casos especiais. Ver [evidência](evidence/parity.json). Wrapper Node e interface ainda não executados em clone/navegador; Desktop Commander offline. Sem edição PBIP, sem merge ou deploy. A página é diagnóstica, não homologação das quatro telas. ECharts com dependência versionada e exportação PNG ficam para B2, evitando CDN e dependências desnecessárias nesta fundação. Design system e motor reaproveitáveis em módulos; para E-commerce, implementar motor próprio de grãos e filtros sobre o mesmo CSS/contrato visual.
