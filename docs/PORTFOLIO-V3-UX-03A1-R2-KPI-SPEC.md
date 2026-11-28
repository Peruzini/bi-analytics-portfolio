# UX-03A1-R2 — Especificação executiva dos cinco KPIs

Estado: especificação pronta para implementação, não aplicada. Base Fleet: PR #14, 930b281, página 825c31049f384847c6ac. Janela de revisão Power BI PID 24148 confirmada aberta em leitura. Não encerrar, abrir outra instância ou sobrescrever alterações do usuário. Implementação futura deve respeitar a sessão aberta; reconciliar alterações do usuário antes de qualquer troca de candidato. Sem merge, sem publicação.

## Objetivo e geometria

Dois protagonistas e três apoios em uma única faixa. Coordenadas lógicas PBIR, não pixels físicos; canvas existente 1440 × 1113, manter todos os elementos externos à faixa intactos. Faixa x=216 a 1416, y=218 a 358; gap 12; padding-alvo 16; alinhamento à esquerda; cinco regiões. Tipografia Segoe UI; tamanhos em pt como alvo nativo, validar renderização em zoom real. Geometria conferida sem sobreposição.

| Indicador | X | Y | W | H | Medida principal |
|---|---:|---:|---:|---:|---|
| Aderência à meta | 216 | 218 | 300 | 140 | [Aderência Meta %] |
| Desvio da meta | 528 | 218 | 252 | 140 | [Desvio Produção (t)] |
| Produção realizada | 792 | 218 | 240 | 140 | [Produção Total] |
| Disponibilidade | 1044 | 218 | 180 | 140 | [Disponibilidade Física %] |
| Custo unitário | 1236 | 218 | 180 | 140 | [Custo por Tonelada] |

## Componentes

1. Hero aderência: fundo #102B3D, valor #FFFFFF 36 pt semibold, label #C7D7E2 12 pt, referência 100% (medida [Ref Meta 100%]), delta em p.p. dinâmico, estado textual Abaixo da meta / Meta atingida / Acima da meta / Sem dados. Barra linear opcional mas desejada, cor #5EEAD4 sobre trilho #365363, marcador de meta; usar dado dinâmico e preservar >100% (escala adaptativa via [Ref Escala Meta] se suportada, ou limitar preenchimento a 100% identificando explicitamente saturação e mostrar valor real). Não desenhar barra estática. Preferência cartão nativo com referência e pequeno gráfico de barras nativo (sem dimensão inventada); região de 300×140 pode ser composta. Fallback se barra não for viável: card de valor/meta/delta sem barra, nunca apresentar progresso decorativo falso. Testar no Desktop e confirmar espaço; remover gauge somente após alternativa comprovada.
2. Desvio: branco, label Desvio da meta 12 pt, valor 28 pt semibold, uma casa decimal, t explícito; vermelho #B42318 negativo, verde #166534 positivo, neutro #475569 zero ou sem dado. Estado textual Déficit / Superação / Na meta / Sem dados. Referência “Frente à meta planejada”. Formatação condicional pelo próprio valor; não usar alerta fixo.
3. Produção: branco, label Produção realizada 12 pt, valor 26 pt #172B3A, abreviação automática/localizada (1,01 mi t no contexto geral) apenas se preservar escala em filtros pequenos; referência dinâmica [Meta Produção] em t, valor exato acessível no tooltip ou tabela. Se abreviação automática inadequada, manter exato com fonte menor, jamais truncar. 
4. Disponibilidade: branco, label Disponibilidade 12 pt, valor 24 pt, duas casas decimais, texto “Disponibilidade física da frota”; sem semáforo sem meta validada.
5. Custo: branco, label Custo unitário 12 pt, valor 24 pt, moeda brasileira duas casas, texto “Por tonelada produzida”; sem variação ou status sem base real.

Cards secundários e desvio: branco #FFFFFF, texto #172B3A, secundário #475569, sem borda interna duplicada; borda externa opcional #CBD5E1 apenas decorativa, raio 8 quando suportado, sem sombra. Hero label 12 pt, referência 11 pt; status negativo em fundo escuro #FCA5A5, positivo #86EFAC, neutro #C7D7E2. Textos e valores alinhados; sem emojis obrigatórios. Ícone de direção opcional redundante com rótulo, não transmite informação sozinho.

## Contrato de dados e estado

Preservar 51 medidas existentes, relações, fontes, grupos de sync, regras de interação e ações. Referências verificadas no model.bim: [Aderência Meta %], [Ref Meta 100%], [Ref Escala Meta], [Desvio Produção (t)], [Produção Total], [Meta Produção], [Disponibilidade Física %], [Custo por Tonelada]. Se necessário criar somente medidas auxiliares de apresentação (sem alterar as antigas), por exemplo Delta Aderência pp = VAR A = [Aderência Meta %] RETURN IF(NOT ISBLANK(A), (A - 1) * 100), formatar com sinal e sufixo p.p.; estado e cor com ISBLANK antes da comparação. Verificar convenção de sinal e localização pt-BR. Nunca fixar os valores do contexto geral em textos ou imagens. Não usar cor de sucesso para disponibilidade/custo sem limiar de negócio. Se BLANK, preservar BLANK e mostrar “Sem dados” quando viável, não zero. Se taxa 100% real, estado Meta atingida; definir tolerância de arredondamento de exibição (0,005 p.p.) ou usar valor bruto com precisão adicional se arredondamento induzir inconsistência. Testar <100, =100, >100, BLANK, filtragem por equipamento e período, meta ausente, produção zero e números longos. 
Contexto geral de referência: aderência 98,00%; desvio -20.581,8 t; produção 1.010.178,2 t; meta 1.030.760 t; disponibilidade 98,55%; custo R$44,05. Delta -2,00 p.p. arredondado. Números de referência, não valores fixos.

## Implementação e gate

Usar cartão nativo com reference labels e formatação condicional; verificar se versão local suporta propriedades desejadas via UI/schema. A documentação oficial não prova que cada configuração está disponível no ambiente local. 
- https://learn.microsoft.com/pt-br/power-bi/visuals/power-bi-visualization-card
- https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-card-visual-new-format-settings
- https://learn.microsoft.com/power-bi/transform-model/desktop-analytics-pane

A altura de 140 é alvo, não prova de fit. Se necessário ajustar fontes internas antes de mudar a faixa ou solicitar aprovação de geometria maior. Sem alterar os demais gráficos/tabela. Verificar regressão focada, valores completos, alinhamento, contrastes, estados, interação dos novos elementos, tabulação e alt text. Não registrar PASS nativo sem teste. Captura única final somente se necessária. Deixar Power BI aberto por solicitação expressa, não iniciar instância adicional. Não expandir para outras páginas.
Próximo: UX-03A1-R2A — Aplicação nativa e revisão visual da faixa KPI, respeitando a sessão atual.
