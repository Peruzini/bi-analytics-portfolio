import {EQUIPMENT,summarize,comparePrevious} from "./fleet.mjs";
export const PAGES=[
  {
    "id": "executiva",
    "name": "Visão executiva",
    "question": "Quanto produzimos frente à meta, e quais ativos explicam o desvio?"
  },
  {
    "id": "performance",
    "name": "Performance da frota",
    "question": "Onde se concentram produtividade, utilização e custo por tonelada?"
  },
  {
    "id": "manutencao",
    "name": "Manutenção e confiabilidade",
    "question": "Quais ativos concentram as perdas e como evolui a confiabilidade?"
  },
  {
    "id": "criticidade",
    "name": "Criticidade e priorização",
    "question": "Quais equipamentos priorizar e quais componentes explicam o score?"
  }
];
function buildView(rows,filters={}){const s=summarize(rows,filters);if(!s.total)return {...s,comparison:null,loss80:null,interventions:[]};const names=new Map(EQUIPMENT.map(e=>[e.id,e]));const assets=s.assets.map(a=>({...a,...names.get(a.key)}));const loss80=s.pareto.find(a=>a.acumulado!==null&&a.acumulado>=.8);const concentration=loss80?{count:s.pareto.filter(a=>a.perda>=loss80.perda).length,share:loss80.acumulado}:null;return {...s,assets,comparison:comparePrevious(rows,filters),loss80:concentration,interventions:[{label:"Corretivas",value:s.total.falhas_corretivas},{label:"Preventivas",value:s.total.preventivas},{label:"Inspeções",value:s.total.inspecoes}]}}
export {buildView};
