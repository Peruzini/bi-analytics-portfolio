// V3-05B3: referência independente, não execução do motor DAX/M.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
function runReference(model,prior){
const tests=[];function check(name,condition){tests.push({name,pass:!!condition});if(!condition)throw Error(name)}
const tab=model.model.tables,measures=tab.flatMap(t=>t.measures||[]);const table=n=>tab.find(t=>t.name===n);const m=n=>measures.find(m=>m.name===n).expression;const source=n=>table(n).partitions[0].source.expression.join("\n");
check("7 tabelas, 8 relacionamentos, 35 medidas",tab.length===7&&model.model.relationships.length===8&&measures.length===35);
check("datas em cinco consultas",["DimData","FatoOperacao","FatoManutencao","FatoAbastecimento","FatoMeta"].every(n=>source(n).includes("Duration.Days(#date(2027, 1, 1) - #date(2025, 1, 1))")));
check("assinaturas da geração M",source("FatoOperacao").includes("List.Min({HorasPlanejadas, 24 - HorasParada})")&&["FatoOperacao","FatoManutencao"].every(n=>source(n).includes("Number.Mod(DiaAno + Idx * 7, 13 + Number.Mod(Idx,4)) = 0"))&&source("FatoOperacao").includes("Number.Round((110 + Idx * 9 + Number.Mod(DiaAno * 11 + Idx * 17, 75)) * Horas / 20, 1)")&&source("FatoManutencao").includes('Table.SelectRows(Fonte, each [HorasManutencao] > 0)')&&source("FatoAbastecimento").includes("950 + Idx * 35 + Number.Mod(DiaAno * 19 + Idx * 31, 420)")&&source("FatoMeta").includes("145 + Idx * 7"));
check("tipos de colunas dos relacionamentos",model.model.relationships.every(r=>{const a=table(r.fromTable)?.columns.find(c=>c.name===r.fromColumn);const b=table(r.toTable)?.columns.find(c=>c.name===r.toColumn);return a&&b&&a.dataType===b.dataType&&r.isActive!==false&&(!r.crossFilteringBehavior||r.crossFilteringBehavior==="oneDirection")}));
check("assinaturas DAX de confiabilidade",m("Falhas").includes('TipoParada] = "Corretiva"')&&m("Horas Manutenção Corretiva").includes('TipoParada] = "Corretiva"')&&m("MTTR")==="DIVIDE([Horas Manutenção Corretiva], [Falhas])"&&m("MTBF")==="DIVIDE([Horas Operação], [Falhas])");
check("assinaturas DAX Pareto e criticidade",m("Perdas Acumuladas %").includes("[@Perda] >= PerdaAtual")&&!m("Perdas Acumuladas %").includes("Ranking Criticidade")&&m("Índice Criticidade").includes("MAXX(FILTER(Scores")&&m("Ranking Criticidade").includes("[@Score] > Atual"));
const roundEven=(num,den)=>{const q=Math.floor(num/den),r=num%den;return 2*r<den?q:2*r>den?q+1:q+(q%2)};
const dates=[],rows=[],start=Date.UTC(2025,0,1),end=Date.UTC(2027,0,1);const equip=Array.from({length:8},(_,i)=>"EQ-0"+(i+1));const types=["Caminhão","Caminhão","Caminhão","Caminhão","Escavadeira","Escavadeira","Carregadeira","Trator"];
for(let ts=start;ts<end;ts+=86400000){const d=new Date(ts),date=d.toISOString().slice(0,10),day=(ts-Date.UTC(d.getUTCFullYear(),0,1))/86400000+1;dates.push(date);for(let i=1;i<=8;i++){const planned=15+(day*3+i*5)%8,stop=(day+i*7)%(13+i%4)===0,down=stop?2+(day+i)%7:0,op=Math.min(planned,24-down),kind=stop?["Corretiva","Preventiva","Inspeção"][(day+i)%3]:null,liters=950+i*35+(day*19+i*31)%420;rows.push({date,id:equip[i-1],type:types[i-1],cal:24,op,planned,down,kind,prod10:roundEven((110+i*9+(day*11+i*17)%75)*op,2),meta:145+i*7,liters,fuelCents:liters*(535+day%20),maintenanceCents:down*(850+i*90)*100});}}
const events=rows.filter(r=>r.down>0),keys=new Set(rows.map(r=>r.date+"|"+r.id)),ds=new Set(dates),es=new Set(equip);
check("calendário contínuo 730 dias",dates.length===730&&ds.size===730&&dates[0]==="2025-01-01"&&dates.at(-1)==="2026-12-31");
check("grão data/equipamento único",rows.length===5840&&keys.size===rows.length&&new Set(events.map(r=>r.date+"|"+r.id)).size===events.length);
check("integridade das chaves das quatro fatos reproduzidas",rows.every(r=>ds.has(r.date)&&es.has(r.id)));
check("horas válidas em todos os registros",rows.every(r=>r.op>=0&&r.down>=0&&r.op+r.down<=r.cal));
check("produção, metas e custos não negativos",rows.every(r=>r.prod10>=0&&r.meta>0&&r.fuelCents>=0&&r.maintenanceCents>=0&&r.liters>=0));
const div=(a,b)=>b===0||b===null?null:a/b;
function agg(rs){if(!rs.length)return null;let a={registros:rs.length,horas_calendario:0,horas_operacao:0,horas_manutencao:0,horas_corretivas:0,paradas:0,falhas_corretivas:0,preventivas:0,inspecoes:0,prod10:0,meta:0,litros:0,combustivel_centavos:0,manutencao_centavos:0};for(const r of rs){a.horas_calendario+=r.cal;a.horas_operacao+=r.op;a.horas_manutencao+=r.down;a.horas_corretivas+=r.kind==="Corretiva"?r.down:0;a.paradas+=Number(r.down>0);a.falhas_corretivas+=Number(r.kind==="Corretiva");a.preventivas+=Number(r.kind==="Preventiva");a.inspecoes+=Number(r.kind==="Inspeção");a.prod10+=r.prod10;a.meta+=r.meta;a.litros+=r.liters;a.combustivel_centavos+=r.fuelCents;a.manutencao_centavos+=r.maintenanceCents}a.producao_t=a.prod10/10;a.custo_total_centavos=a.combustivel_centavos+a.manutencao_centavos;a.disponibilidade=div(a.horas_calendario-a.horas_manutencao,a.horas_calendario);a.utilizacao=div(a.horas_operacao,a.horas_calendario-a.horas_manutencao);a.mtbf=div(a.horas_operacao,a.falhas_corretivas);a.mttr=div(a.horas_corretivas,a.falhas_corretivas);a.produtividade_t_h=div(a.producao_t,a.horas_operacao);a.consumo_l_t=div(a.litros,a.producao_t);a.aderencia=div(a.producao_t,a.meta);a.custo_t=div(a.custo_total_centavos/100,a.producao_t);return a}
const total=agg(rows);check("partição de tipos de manutenção",total.paradas===total.falhas_corretivas+total.preventivas+total.inspecoes);
check("reconciliação B1: contagens e horas",["paradas","falhas_corretivas","horas_calendario","horas_operacao","horas_manutencao","horas_corretivas"].every(k=>total[k]===prior[k]));
check("reconciliação B1: taxas e confiabilidade",["disponibilidade","utilizacao","mtbf","mttr"].every(k=>Math.abs(total[k]-prior[k])<1e-12));
check("reconciliação B1: horas limitadas",rows.filter(r=>r.planned+r.down>24).length===prior.violacoes_24h_sem_limite&&rows.filter(r=>r.op!==r.planned).length===prior.ajustes_horas_operacao);
const months=[...new Set(dates.map(d=>d.slice(0,7)))].map(month=>({month,...agg(rows.filter(r=>r.date.startsWith(month)))}));
const by=equip.map(id=>({id,...agg(rows.filter(r=>r.id===id))}));
const additive=["registros","horas_calendario","horas_operacao","horas_manutencao","horas_corretivas","paradas","falhas_corretivas","prod10","meta","litros","combustivel_centavos","manutencao_centavos","custo_total_centavos"];
check("24 meses conciliados em métricas aditivas",months.length===24&&additive.every(k=>months.reduce((s,a)=>s+a[k],0)===total[k]));
check("8 equipamentos conciliados em métricas aditivas",additive.every(k=>by.reduce((s,a)=>s+a[k],0)===total[k]));
function score(as){if(!as.length)return [];const max=k=>Math.max(...as.map(a=>a[k]));const mc=max("custo_t"),mf=max("falhas_corretivas"),mp=max("horas_manutencao");const q=as.map(a=>({id:a.id,score:Math.round((.35*(1-a.disponibilidade)+.25*(div(a.custo_t,mc)??0)+.20*(div(a.falhas_corretivas,mf)??0)+.20*(div(a.horas_manutencao,mp)??0))*1e9)/1e9}));return q.map(a=>({...a,rank:1+new Set(q.filter(b=>b.score>a.score).map(b=>b.score)).size,classe:a.score>=.70?"Crítica":a.score>=.50?"Alta":a.score>=.30?"Média":"Baixa"})).sort((a,b)=>a.rank-b.rank||a.id.localeCompare(b.id))}
function pareto(as){let total=as.reduce((s,a)=>s+a.horas_manutencao,0);return as.map(a=>({id:a.id,perda:a.horas_manutencao,acumulado:div(as.filter(b=>b.horas_manutencao>=a.horas_manutencao).reduce((s,b)=>s+b.horas_manutencao,0),total)})).sort((a,b)=>b.perda-a.perda||a.id.localeCompare(b.id))}
const p=pareto(by),s=score(by);check("Pareto B1 conciliado",p.every(a=>{const b=prior.pareto.find(b=>b.id===a.id);return b&&b.perda===a.perda&&Math.abs(a.acumulado-b.acumulado)<1e-12}));
check("Pareto monotônico, empates juntos e último = 100%",p.at(-1).acumulado===1&&p.every((a,i)=>i===0||a.acumulado>=p[i-1].acumulado&&(a.perda!==p[i-1].perda||a.acumulado===p[i-1].acumulado)));
check("score válido e ranking denso",s.every(a=>a.score>=0&&a.score<=1)&&s[0].rank===1&&s.every((a,i)=>i===0||a.rank===s[i-1].rank+(a.score===s[i-1].score?0:1)));
const january=rows.filter(r=>r.date.startsWith("2025-01")),combined=january.filter(r=>r.id==="EQ-01"&&r.type==="Caminhão"),zero=rows.find(r=>r.down===0),planned=rows.find(r=>r.kind==="Preventiva"||r.kind==="Inspeção");
const z=agg([zero]),pr=agg([planned]);check("mês e filtro combinado",january.length===248&&combined.length===31&&agg(combined).horas_calendario===744);
check("dia sem parada: disponibilidade 100%, MTBF/MTTR nulos",z.disponibilidade===1&&z.mtbf===null&&z.mttr===null&&z.falhas_corretivas===0);
check("parada não corretiva: reduz disponibilidade sem gerar falha",pr.disponibilidade<1&&pr.falhas_corretivas===0&&pr.mttr===null);
check("Pareto sem perdas retorna nulo",pareto([{id:zero.id,...z}])[0].acumulado===null);
check("score sem falhas nem perdas continua definido",score([{id:zero.id,...z}])[0].score===.25);
check("contexto sem dados: sem indicador",agg(rows.filter(r=>r.date==="2027-01-01"))===null);
const syntheticTies=score([{id:"A",...z},{id:"B",...z}]);check("empates de score geram rank denso",syntheticTies.every(a=>a.rank===1));
return {scope:"Reprodução independente em JavaScript, sem execução de M ou DAX; arredondamento decimal ideal ties-to-even para produção, custos em centavos inteiros.",tests,totals:total,monthly:months,by_equipment:by,pareto:p,criticality:s,scenarios:{january2025:agg(january),january2025_EQ01_truck:agg(combined),no_stop:{date:zero.date,id:zero.id,metrics:z},noncorrective:{date:planned.date,id:planned.id,kind:planned.kind,metrics:pr},empty_date:"2027-01-01"}};
}
const model=JSON.parse(fs.readFileSync(path.join(root,"powerbi/fleet/FleetAnalytics.SemanticModel/model.bim"),"utf8"));
const prior=JSON.parse(fs.readFileSync(path.join(root,"projetos/fleet-dax-advanced/results/v3-05b1-reference.json"),"utf8"));
const report=runReference(model,prior);
console.log(JSON.stringify(report,null,2));
