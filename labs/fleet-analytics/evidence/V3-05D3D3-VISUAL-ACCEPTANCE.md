# V3-05D3D3 — Fleet: aprovação visual do laboratório HTML

27/11/2026. Candidato de aplicação `d8c22154c9b81072e5e4c960abbe90abb79ac9e9`, Chrome 158.0.8127.37, Windows, Playwright 1.61.0. Reutilizados resultados reais D3D2: Node 63/63 e browser 167/167, sem alteração de código após o candidato (74d0eed apenas evidência). D3D3: 115/115 verificações adicionais, incluindo 16 hashes de capturas e 96 verificações página × resolução × interação e três consoles. Emulação com touch nas resoluções 390×844, 320×720 e 1024×768, primeiro gráfico filtrável por página, navegação, persistência, reset, encaixe, primeiro PNG por página, CSV, contexto vazio; não smartphone físico. Saída original em mobile-validation-d3d3.json.

## Inspeção editorial das 16 capturas
| Página | 1440 | 1024 | 390 | 320 | Observação |
|---|---|---|---|---|---|
| Executiva | Aprovada | Aprovada | Aprovada | Aprovada | Aderência, meta e desvio contextualizados; tendência quase plana reflete dados sintéticos. |
| Performance | Aprovada | Aprovada | Aprovada | Aprovada | Dispersão sem colisão de rótulos de pontos; referência pode cruzar rótulo. Utilização próxima de 78% exige leitura dos valores. |
| Manutenção | Aprovada | Aprovada | Aprovada | Aprovada com ressalva | Pareto combinado e MTBF/MTTR; em 320 rótulos dos oito ativos pequenos e próximos, alternativa tabular disponível. |
| Criticidade | Aprovada | Aprovada | Aprovada | Aprovada | Componentes ponderados, escala 0–1 e ranking relativo; não matriz de risco absoluto. |

Decisão editorial: aprovado como referência de Data Viz para transposição ao Power BI; não homologação do PBIP. Layout responsivo vertical em telas estreitas e tabelas com rolagem interna são deliberados. Não é certificação WCAG, teste de leitores de tela nem validação em dispositivo físico. Capturas originais mantidas em %USERPROFILE%/portfolio-v3-05d/fleet-browser-d3d2-final; hashes D3D2 confirmados. Sem publicação, merge, alterações nas bases ou no Power BI.

## Transposição D3D E
Preservar medidas homologadas e filtros; priorizar desvio divergente e indicador de meta; dispersão produtividade/custo com agregados de referência; Pareto combinado e séries MTBF/MTTR; decomposição real do score com escala fixa e ranking. Avaliar equivalentes nativos Power BI, sem instalar visuais pagos ou alterar modelo sem testes. Ajustar legibilidade e layout no canvas, não copiar literalmente HTML.
