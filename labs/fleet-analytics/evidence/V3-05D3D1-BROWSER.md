# V3-05D3D1 — Browser acceptance (real)

Candidato `f533ec2adc9304d5a447092192f1ae34dfce8ccd`, 27/11/2026, Windows, Google Chrome 158.0.8127.37, Python 3.11.9, Playwright 1.61.0 em venv isolado, Node 26.13.1. Testes Node reais: 63/63, exit 0. Browser gate: 118/119, exit 1. 16 capturas em 4 resoluções, hashes em browser-validation.json. O arquivo JSON é a saída real do gate, recuperada do computador, não reconstruída. Inspeção visual direta das quatro páginas desktop 1440 e quatro mobile 390. Tablet e 320 testados automaticamente, sem inspeção editorial individual. Capturas locais em portfolio-v3-05d/fleet-browser-results; não publicadas. 

## Achados
Na inspeção desktop: sobreposição EQ-01/EQ-02 e EQ-04/EQ-05 na dispersão produtividade/custo; fontes pequenas em gráficos lado a lado; grande extensão vertical e gráficos de produção quase planos com escala desde zero. Pareto, ranking e decomposição renderizados. No mobile 390px: gráficos e tabelas exigem rolagem horizontal interna para ver valores e últimas categorias, sem overflow do documento; cabeçalho e filtros ocupam grande parte da primeira tela. Console 404 não teve URL registrada neste gate; favicon é hipótese consistente com o E-commerce, não confirmação específica do Fleet.

## Resultado
Gate não aprovado integralmente. Corrigir falhas e refinamentos no D3D2, repetir os gates e inspeção antes de transpor para Power BI. Sem alterações no código da aplicação, PBIP ou fontes, sem merge ou deploy. 
