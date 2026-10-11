window.AtlesReading=(()=>{
 'use strict';
 const e=window.ATLES_EDITORIAL, data=window.ATLES_DATA;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cards=Object.fromEntries(data.cards.map(c=>[c.id,c]));
 for(const c of data.cards){c.originalTitle=c.title;c.originalSubtitle=c.subtitle;const d=e.cards[c.id];if(d){c.title=d.title;c.subtitle=d.summary;}const p=window.ATLES_POSITIVE_CONTEXT?.[c.id];if(p){c.problem=p.opportunity;c.caution=p.conditions;}}
 const title=c=>cards[typeof c==='string'?c:c.id]?.title||String(c);
 const group=id=>e.groups[id];
 let dialog,opener;
 function show(html){
  opener=document.activeElement;
  if(!dialog){dialog=document.createElement('dialog');dialog.className='reading-dialog';dialog.setAttribute('aria-labelledby','reading-title');document.body.append(dialog);dialog.addEventListener('close',()=>opener?.isConnected&&opener.focus({preventScroll:true}));dialog.addEventListener('click',ev=>{if(ev.target===dialog){const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)dialog.close();}});}
  dialog.innerHTML='<button type="button" class="dialog-close" data-preview-close aria-label="Tanca el detall">Tanca ×</button>'+html;
  if(!dialog.open)dialog.showModal();
  window.AtlesLenses?.markLinks(dialog);
  dialog.querySelector('[data-preview-close]').focus();
 }
 function previewCard(id,from){
  const c=cards[id],L=window.AtlesLenses;if(!c)return;
  const edge=e.cards[from]?.relations.find(r=>r.id===id);
  show(`<p class="eyebrow">${esc(group(id[0]).name)} · ${e.principal.includes(id)?'Idea principal':'Catàleg complet'}</p><h2 id="reading-title">${esc(c.title)}</h2><p class="lead">${esc(c.subtitle)}</p>${edge?`<h3>${esc(edge.label)}</h3><p>${esc(edge.reason)}</p>`:''}${L.badges(c)}<p>${esc(e.cards[id].benefit)}</p><p class="note">${L.has(c)?'Pots continuar llegint aquesta idea en el recorregut actual.':'Aquesta idea es desenvolupa a l’altre recorregut. El detall s’obrirà en visió conjunta.'}</p><a class="btn primary" data-preview-go data-lens-fixed href="${L.carry('#card/'+id,L.has(c)?L.mode:'all')}">Obre la idea completa →</a>`);
 }
 function previewSource(id){
  const s=data.sources.find(s=>s.id===id)||window.ATLES_MODEL.sources.find(s=>s.id===id);if(!s)return;
  const external=s.url&&/^https?:\/\//i.test(s.url);
  show(`<p class="eyebrow">Font de la proposta</p><h2 id="reading-title">${esc(s.title)}</h2><p>${esc(s.publisher||'Documentació CTTI')}${s.country?' · '+esc(s.country):''}</p>${s.kind?`<p class="note">${esc(s.kind)}${s.date?' · '+esc(s.date):''}</p>`:''}${s.summary?`<p>${esc(s.summary)}</p>`:''}${s.status?`<p>${esc(s.status)}</p>`:''}${s.limitation?`<h3>Abast de l’evidència</h3><p>${esc(s.limitation)}</p>`:''}${external?`<a class="btn" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Consulta la font original ↗</a>`:'<p class="note">Referència a un document aportat al projecte. Aquesta còpia de l’Atles en recull l’aportació.</p>'}`);
 }
 function relationButtons(c){return `<div class="reading-relations">${(e.cards[c.id]?.relations||[]).map(r=>`<button type="button" data-preview-card="${r.id}" data-preview-from="${c.id}"><span>${esc(title(r.id))}</span><small>${esc(r.label)}</small></button>`).join('')}</div>`;}
 document.addEventListener('click',ev=>{
  const b=ev.target.closest('[data-preview-card],[data-preview-source],[data-preview-close],[data-preview-go]');
  if(b?.dataset.previewCard){ev.preventDefault();previewCard(b.dataset.previewCard,b.dataset.previewFrom);}
  else if(b?.dataset.previewSource){ev.preventDefault();previewSource(b.dataset.previewSource);}
  else if(b&&(b.hasAttribute('data-preview-close')||b.hasAttribute('data-preview-go')))dialog?.close();
 });
 window.addEventListener('hashchange',()=>dialog?.open&&dialog.close());
 return {e,title,group,relationButtons,previewCard,previewSource,esc};
})();
