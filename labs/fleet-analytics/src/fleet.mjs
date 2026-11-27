// Fleet: reprodução independente das regras M/DAX homologadas; não executa DAX.
export const EQUIPMENT = Object.freeze([
  {
    "id": "EQ-01",
    "name": "Caminhão 01",
    "type": "Caminhão",
    "model": "CAT 777",
    "area": "Mina Norte"
  },
  {
    "id": "EQ-02",
    "name": "Caminhão 02",
    "type": "Caminhão",
    "model": "CAT 777",
    "area": "Mina Norte"
  },
  {
    "id": "EQ-03",
    "name": "Caminhão 03",
    "type": "Caminhão",
    "model": "Komatsu HD785",
    "area": "Mina Sul"
  },
  {
    "id": "EQ-04",
    "name": "Caminhão 04",
    "type": "Caminhão",
    "model": "Komatsu HD785",
    "area": "Mina Sul"
  },
  {
    "id": "EQ-05",
    "name": "Escavadeira 01",
    "type": "Escavadeira",
    "model": "CAT 6040",
    "area": "Mina Norte"
  },
  {
    "id": "EQ-06",
    "name": "Escavadeira 02",
    "type": "Escavadeira",
    "model": "Liebherr R 9400",
    "area": "Mina Sul"
  },
  {
    "id": "EQ-07",
    "name": "Carregadeira 01",
    "type": "Carregadeira",
    "model": "CAT 994",
    "area": "Pilha"
  },
  {
    "id": "EQ-08",
    "name": "Trator 01",
    "type": "Trator",
    "model": "CAT D11",
    "area": "Infraestrutura"
  }
].map(Object.freeze));
function roundEven(n,d){const q=Math.floor(n/d),r=n%d;return 2*r<d?q:2*r>d?q+1:q+q%2}

function divide(n,d){return d===0||d==null?null:n/d}

function generate(equipment){const rows=[];for(let t=Date.UTC(2025,0,1);t<Date.UTC(2027,0,1);t+=86400000){const date=new Date(t),day=(t-Date.UTC(date.getUTCFullYear(),0,1))/86400000+1;for(const e of equipment){const i=Number(e.id.slice(-2)),planned=15+(day*3+i*5)%8,stop=(day+i*7)%(13+i%4)===0,down=stop?2+(day+i)%7:0,op=Math.min(planned,24-down),kind=stop?["Corretiva","Preventiva","Inspeção"][(day+i)%3]:null,liters=950+i*35+(day*19+i*31)%420;rows.push({...e,date:date.toISOString().slice(0,10),cal:24,planned,op,down,kind,prod10:roundEven((110+i*9+(day*11+i*17)%75)*op,2),meta:145+i*7,liters,fuelCents:liters*(535+day%20),maintenanceCents:down*(850+i*90)*100})}}return rows}

function select(rows,{start="",end="",type="",area="",id=""}={}){return rows.filter(r=>(!start||r.date>=start)&&(!end||r.date<=end)&&(!type||r.type===type)&&(!area||r.area===area)&&(!id||r.id===id))}

function aggregate(rows){if(!rows.length)return null;const a={registros:rows.length,horas_calendario:0,horas_operacao:0,horas_manutencao:0,horas_corretivas:0,paradas:0,falhas_corretivas:0,preventivas:0,inspecoes:0,prod10:0,meta:0,litros:0,combustivel_centavos:0,manutencao_centavos:0};for(const r of rows){a.horas_calendario+=r.cal;a.horas_operacao+=r.op;a.horas_manutencao+=r.down;a.horas_corretivas+=r.kind==="Corretiva"?r.down:0;a.paradas+=Number(r.down>0);a.falhas_corretivas+=Number(r.kind==="Corretiva");a.preventivas+=Number(r.kind==="Preventiva");a.inspecoes+=Number(r.kind==="Inspeção");a.prod10+=r.prod10;a.meta+=r.meta;a.litros+=r.liters;a.combustivel_centavos+=r.fuelCents;a.manutencao_centavos+=r.maintenanceCents}a.producao_t=a.prod10/10;a.custo_total_centavos=a.combustivel_centavos+a.manutencao_centavos;a.disponibilidade=divide(a.horas_calendario-a.horas_manutencao,a.horas_calendario);a.utilizacao=divide(a.horas_operacao,a.horas_calendario-a.horas_manutencao);a.mtbf=divide(a.horas_operacao,a.falhas_corretivas);a.mttr=divide(a.horas_corretivas,a.falhas_corretivas);a.produtividade_t_h=divide(a.producao_t,a.horas_operacao);a.consumo_l_t=divide(a.litros,a.producao_t);a.aderencia=divide(a.producao_t,a.meta);a.custo_t=divide(a.custo_total_centavos/100,a.producao_t);a.desvio_t=(a.prod10-a.meta*10)/10;return a}

function group(rows,key){const buckets=new Map;for(const r of rows){const k=key(r);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(r)}return [...buckets].map(([key,values])=>({key,...aggregate(values)})).sort((a,b)=>a.key.localeCompare(b.key))}

function rankAssets(assets){if(!assets.length)return [];const max=k=>Math.max(...assets.map(a=>a[k]));const mc=max("custo_t"),mf=max("falhas_corretivas"),mp=max("horas_manutencao");const q=assets.map(a=>{const components={availability:.35*(1-a.disponibilidade),cost:.25*(divide(a.custo_t,mc)??0),failures:.20*(divide(a.falhas_corretivas,mf)??0),loss:.20*(divide(a.horas_manutencao,mp)??0)};const score=Math.round(Object.values(components).reduce((s,v)=>s+v,0)*1e9)/1e9;return {...a,components,score,classe:score>=.7?"Crítica":score>=.5?"Alta":score>=.3?"Média":"Baixa"}});return q.map(a=>({...a,rank:1+new Set(q.filter(b=>b.score>a.score).map(b=>b.score)).size,productionRank:1+new Set(q.filter(b=>b.prod10>a.prod10).map(b=>b.prod10)).size})).sort((a,b)=>a.rank-b.rank||a.key.localeCompare(b.key))}

function pareto(assets){const total=assets.reduce((s,a)=>s+a.horas_manutencao,0);return assets.map(a=>({id:a.key,perda:a.horas_manutencao,acumulado:divide(assets.filter(b=>b.horas_manutencao>=a.horas_manutencao).reduce((s,b)=>s+b.horas_manutencao,0),total)})).sort((a,b)=>b.perda-a.perda||a.id.localeCompare(b.id))}

function summarize(rows,filters={}){const selected=select(rows,filters),total=aggregate(selected),assets=group(selected,r=>r.id),monthly=group(selected,r=>r.date.slice(0,7)),ranked=rankAssets(assets);return {total,assets:ranked,monthly,pareto:pareto(assets),maxCriticality:ranked[0]?.score??null}}

function comparePrevious(rows,filters={}){const selected=select(rows,filters);if(!selected.length)return null;const start=filters.start||selected[0].date,end=filters.end||selected.at(-1).date;const a=Date.parse(start+"T00:00:00Z"),b=Date.parse(end+"T00:00:00Z");if(!Number.isFinite(a)||!Number.isFinite(b)||b<a)return null;const days=(b-a)/86400000+1,fmt=t=>new Date(t).toISOString().slice(0,10),priorStart=fmt(a-days*86400000),priorEnd=fmt(a-86400000);if(priorStart<"2025-01-01"||end>"2026-12-31"||start<"2025-01-01")return null;const previous=aggregate(select(rows,{...filters,start:priorStart,end:priorEnd}));const current=aggregate(selected);return previous?{start:priorStart,end:priorEnd,days,previous,productionChange:divide(current.producao_t-previous.producao_t,previous.producao_t)}:null}
export {generate,select,aggregate,group,rankAssets,pareto,summarize,comparePrevious,divide};
