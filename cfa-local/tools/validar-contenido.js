const vm=require('vm'),fs=require('fs'),path=require('path');
const dir=path.join(__dirname,'..','data');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir+'/meta.js','utf8'),ctx);
const meta=ctx.window.CFA_META;
const expect={ethics:24,quant:24,fsa:24,equities:24,fixedincome:24,portfolio:20,econ:15,corpfin:15,deriv:15,alt:15};
let total=0,problems=[];const ids=new Set();const dist=[0,0,0];const dd=[0,0,0,0];
for(const t of meta){
  const f=path.join(dir,t.id+'.js');
  if(!fs.existsSync(f)){problems.push('falta '+t.id);continue}
  vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
  const c=ctx.window.CFA_CONTENT[t.id];
  if(!c){problems.push('sin contenido '+t.id);continue}
  if(c.preguntas.length!==expect[t.id])problems.push(`${t.id}: ${c.preguntas.length} preguntas, se esperaban ${expect[t.id]}`);
  c.preguntas.forEach((q,i)=>{
    total++;
    if(ids.has(q.id))problems.push('id duplicado '+q.id);ids.add(q.id);
    if(!q.id.startsWith(t.id+'-'))problems.push('id fuera de tema '+q.id);
    if(!q.q||!q.e)problems.push('vacío '+q.id);
    if(!Array.isArray(q.o)||q.o.length!==3||new Set(q.o).size!==3)problems.push('opciones '+q.id);
    if(![0,1,2].includes(q.c))problems.push('c '+q.id);
    if(![1,2,3].includes(q.d))problems.push('d '+q.id);
    if(/all of the above|none of the above|cannot be determined|\bA and B\b/i.test(q.o.join(' ')))problems.push('opción prohibida '+q.id);
    dist[q.c]++;dd[q.d]++;
    if(/^[\x00-\x7F]*$/.test(q.q)===false && false){}
  });
  if(c.tarjetas.length<10)problems.push(t.id+' tarjetas '+c.tarjetas.length);
  if(c.resumen.length<5)problems.push(t.id+' resumen '+c.resumen.length);
  console.log(t.id.padEnd(12),'preg',c.preguntas.length,'tarj',c.tarjetas.length,'res',c.resumen.length,'form',c.formulas.length);
}
console.log('TOTAL',total,'dist c',dist,'d',dd.slice(1));
console.log(problems.length?'PROBLEMAS:\n'+problems.join('\n'):'sin problemas de esquema');
