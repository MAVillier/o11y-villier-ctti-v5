(()=>{
'use strict';
const L=window.AtlesLenses,R=window.AtlesReading,E=window.ATLES_EDITORIAL,cards=window.ATLES_DATA.cards;
const groupNames={A:'Dades',B:'Govern',C:'IA i agents',D:'Autoservei',E:'Servei i cost',F:'Control i portabilitat',G:'Experiència i confiança'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grid=document.getElementById('map-groups'),viewButton=document.getElementById('map-view');
let fitFrame;
function title(c){return R?.title(c)||E?.cards?.[c.id]?.title||c.title;}
function visible(c){return L.visible?L.visible(c):L.has(c)&&(L.scope==='all'||E.principal.includes(c.id));}
function marks(c){return L.blocks(c).map(b=>`<span class="${b.kind}-mark" aria-hidden="true">${b.kind==='evolve'?'■':'◆'}</span>`).join('');}
function tech(c){return L.blocks(c).map(b=>b.tech).join(' · ');}
function updateView(){
  const userList=new URLSearchParams(location.search).get('view')==='list',narrow=innerWidth<1280;
  document.body.classList.toggle('is-list',userList||narrow);
  viewButton.hidden=narrow;viewButton.textContent=userList?'Veure el mapa':'Veure en llista';viewButton.setAttribute('aria-pressed',String(userList));
  cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(()=>{
    if(userList||narrow)return;
    const footer=document.querySelector('.map-footer').getBoundingClientRect();
    const overflow=[...grid.querySelectorAll('.map-group')].some(g=>g.getBoundingClientRect().bottom>footer.top-10);
    if(overflow){document.body.classList.add('is-list');viewButton.hidden=true;}
  });
}
function draw(){
  L.sync(new URLSearchParams(location.search));document.body.dataset.scope=L.scope;
  document.querySelectorAll('[data-map-lens]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapLens===L.mode)));
  document.querySelectorAll('[data-map-scope]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapScope===L.scope)));
  const matching=cards.filter(visible),groups=Object.keys(groupNames);
  document.getElementById('map-status').textContent=`${matching.length} idees · ${L.scope==='all'?'Catàleg complet':'Idees principals'} · ${L.labels[L.mode]}`;
  grid.innerHTML=groups.map(id=>{
    const group=E?.groups?.[id]||{},list=matching.filter(c=>c.id[0]===id);
    return `<section class="map-group" aria-labelledby="group-${id}"><header class="group-heading"><h2 id="group-${id}">${esc(group.name||groupNames[id])} <span class="group-count">${list.length}</span></h2>${group.benefit?`<p>${esc(group.benefit)}</p>`:''}</header>${list.length?`<ul class="ideas">${list.map(c=>`<li class="idea" data-card-id="${c.id}"><a href="${esc(L.carry('index.html#card/'+c.id))}" target="atles-detail" rel="noopener" title="${esc(c.id+' · '+title(c))}"><span class="idea-mark">${marks(c)}</span><span class="idea-title">${esc(title(c))}</span><span class="screenreader"> · ${L.blocks(c).map(b=>L.labels[b.kind]).join(' i ')}</span><span class="idea-tech">${esc(tech(c))}</span></a></li>`).join('')}</ul>`:`<p class="empty-group">Explora aquesta palanca en la visió conjunta.<br><button type="button" data-map-lens="all">Veure les dues vessants</button></p>`}</section>`;
  }).join('');
  document.getElementById('atlas-link').href=L.carry('index.html#atlas');
  document.title=`Mapa de les idees · ${L.labels[L.mode]} · Atles O11y V5`;updateView();
}
function setParam(key,value){const u=new URL(location.href);u.searchParams.set(key,value);history.pushState({},'',u);draw();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-map-lens],[data-map-scope]');if(!b)return;if(b.dataset.mapLens)setParam('lens',b.dataset.mapLens);else setParam('scope',b.dataset.mapScope);});
viewButton.addEventListener('click',()=>{const u=new URL(location.href);if(u.searchParams.get('view')==='list')u.searchParams.delete('view');else u.searchParams.set('view','list');history.pushState({},'',u);updateView();});
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.getElementById('map-status').textContent+=' · Pots ampliar el navegador amb F11.';}}
document.getElementById('fullscreen').addEventListener('click',fullscreen);
document.addEventListener('fullscreenchange',()=>{document.getElementById('fullscreen').textContent=document.fullscreenElement?'Surt de pantalla completa':'Pantalla completa';updateView();});
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='f'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){e.preventDefault();fullscreen();}});
window.addEventListener('popstate',draw);window.addEventListener('resize',updateView);draw();
})();
