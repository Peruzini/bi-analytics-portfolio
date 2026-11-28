# Fleet Analytics — Padrão operacional de componentes Power BI (v2)
28/11/2026 | Piloto Visão Executiva | Norma de implementação e revisão, não aprovação de todos os elementos.

## 1. Fonte de verdade e decisões
O KPI azul V2 (PR #19) foi aprovado pelo usuário; a família de cinco KPIs (PR #20) deriva dele. A camada semântica UX (PRs #23–25) é o padrão de continuidade. Referência da revisão atual: captura enviada pelo usuário em 28/11 mostrando a página inteira, destaque amarelo no botão Limpar filtros e na região inferior da tabela. O usuário pediu três blocos; a terceira região não está individualmente demarcada. Adotamos provisoriamente a nota metodológica/rodapé da área inferior como terceiro bloco, sujeita à confirmação. Não tratar os desenhos abaixo como já implementados.

## 2. Contrato de componentes
| Token | Padrão de referência |
|---|---|
| Canvas executivo | 1440 × 1032, dimensões lógicas PBIR |
| Superfície | #FFFFFF, fundo geral claro, hero #102B3D |
| Texto primário | #172B3A; secundário #475569; texto escuro invertido #C7D7E2 |
| Acento | #126B78 / #5EEAD4 no hero |
| Semântica | déficit #B42318 / #FCA5A5 no escuro; superação #166534 / #86EFAC |
| Raio | 10 como referência do mestre; validar renderização |
| Padding | 16 horizontal para cards; ajustar por função e legibilidade |
| Gap | 4–8 internos, 8–12 entre superfícies, conforme grid |
| Tipografia | Segoe UI, pesos semibold para hierarquia; hero 31 pt e rodapé 11 pt no candidato aprovado |
| Altura KPI | 140; alterar somente em bloco de grid aprovado |

Construir uma superfície única, filhos transparentes e agrupamento nativo quando seguro. Usar cartões nativos com medidas para texto informativo em vez de caixas de texto. Um botão funcional permanece um botão nativo: vincular texto e cores a medidas na própria ação, sem cartão sobreposto bloqueando clique. Formas vazias podem ser decorativas. Grupo não equivale a instância de componente sincronizada. Preservar IDs, vínculos, ordenação, contexto, contraste e ordem de tabulação. Não duplicar consultas só para decoração; não inventar metas ou semânticas. Elementos analíticos devem receber filtros e não emitir interações indevidas.

## 3. Camada semântica
_ UX: nomes reais `_UX_Dicionario` e `_UX_Design`. Dicionário desconectado com 35 registros e seis campos (Chave, Label, Icone, Cor, Ordem, Destino). Tabela de medidas desconectada com 60 medidas organizadas em pastas 01 Labels, 02 Iconografia, 03 Design Tokens, 04 Navegação, 05 Formatação dinâmica, 06 Executivo, 07 Filtros. 68 medidas originais/em Medidas e 128 totais no PR #25. Texto e cor declarativos via medidas; colunas apenas para atributos por registro e chaves. Metadados de campos, valores de slicer, rótulos de legenda e cabeçalhos de coluna podem permanecer nativos; não transformar indiscriminadamente em cartões. Medidas DEST são metadados; vínculos PageNavigation reais mantêm IDs nativos. Medidas de negócio preservadas, aliases explícitos. Novos estados devem ser testados em contexto geral, individual, combinado, múltiplo e vazio.

## 4. Backlog dos três blocos da captura
### R2I-A — Botão Limpar filtros e feedback de seleção
Problema observado: botão cinza de aparência retangular interna, contrastando com cartões arredondados; o estado sem filtros já está indicado pelo contador. Meta: botão compacto, container nativo arredondado sem contorno interno duplicado, label DAX e ícone discreto opcional; alinhar altura e centro do texto com os dropdowns. Estado inativo visualmente neutro, ativo com contraste suficiente, hover/focus perceptíveis se suportados. Não chamar de desabilitado se a ação continua disponível. Manter ClearAllSlicers nativo; testar zero, um e dois campos, limpeza por teclado e clique real, retorno a zero e sincronização. Não alterar filtros nem dados para simular estado.

### R2I-B — Tabela operacional como componente de dados
Problema observado: área de tabela com linhas muito densas, cabeçalho escuro estreito, espaço vazio à direita e abaixo, título próximo à borda. Meta: criar superfície única com título separado em cartão DAX e tabela nativa transparente dentro do grupo, caso o agrupamento preserve interação; alternativamente título dinâmico nativo e superfície integrada. Não criar uma coleção de cartões por linha. Usar as sete colunas atuais, oito equipamentos e total geral; alinhamento numérico à direita, texto à esquerda, largura distribuída sem folga excessiva, cabeçalho e total distintos, altura de linha e fonte legíveis. Barras de aderência com percentual real e escala documentada 0–110%; sinal e cor para desvio, não apenas cor. Priorizar contraste e leitura sobre densidade, sem rolagem desnecessária no contexto geral. Testar filtro estreito, vazio, seleção de linha e retorno, ordenação, total, consistência numérica. Não prometer que uma grade com mais linhas nunca terá rolagem.

### R2I-C — Rodapé/nota metodológica (interpretação provisória do terceiro bloco)
A nota pequena aparece na base, dentro da região inferior circulada. Propor faixa informativa compacta e alinhada à tabela, label DAX com contraste suficiente e espaçamento; evitar ficar rente à borda ou cortada na visualização. Preservar a informação de base sintética e definição de custo. Se o usuário indicar outro terceiro bloco, substituir este item antes de editar. Não iniciar mudanças nesta área sem confirmação visual do escopo.

## 5. Gate operacional
- Base remota: PR #25, commit 6c93dd5, branch portfolio/v3-ux-03a1-r2g-filters. Candidato R2H local em portfolio/v3-ux-03a1-r2h-functional; alterações de escala em dois gráficos, ainda não publicadas no momento inicial da revisão.
- Conferir Power BI aberto, caminho PBIP de revisão, estado de alterações não salvas e filtros antes de qualquer reload. Não salvar ou descartar edição desconhecida; backup e worktree isolada. Não fechar a sessão, não abrir nova instância, não executar merge automático.
- Uma alteração por bloco. Comparar modelo/consultas, preservação de 144 regras anteriores + 8 do contador, quatro grupos de sincronização, 16 slicers. Testar mudanças de página por ação nativa, não confundir aba com botão; observar seleção de destino e valores de filtros. Em edição, restaurar janela antes de usar foco/Ctrl+Enter; controles minimizados deram coordenadas inválidas. Salvar apenas estado controlado com contexto geral.
- Evidência: uma captura final por bloco quando necessária; validar no tamanho real e ajuste à página, não inundar de capturas. Registrar testes, limites, hashes e PR draft. Regressão histórica de 225 valores quando modelo/consulta muda; se apenas estilo, demonstrar igualdade estrutural e reaproveitar regressão, sem alegar rerun.
- Aceite do usuário é distinto da implementação e dos testes estruturais. Não replicar nas outras sete páginas enquanto piloto não aprovado. Mobile e acessibilidade serão revalidados após fechar o desktop.
