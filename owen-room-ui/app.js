const TODAY = new Date('2026-09-11T12:00:00');
const STORAGE = {
  dinnerEdits: 'owenHome.dinnerEdits.v1',
  shoppingChecks: 'owenHome.shoppingChecks.v1',
  customItems: 'owenHome.customItems.v1',
  tipSeen: 'owenHome.tipSeen.v1'
};

const state = {
  tab: 'dinner',
  shoppingMode: 'weekly',
  activeWeek: weekForDay(TODAY.getDate()),
  dinnerEdits: readJSON(STORAGE.dinnerEdits, {}),
  checks: readJSON(STORAGE.shoppingChecks, {}),
  customItems: readJSON(STORAGE.customItems, [])
};

function readJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function writeJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function weekForDay(day){
  const idx = WEEKS.findIndex(w => w.days.includes(day));
  return idx >= 0 ? idx : 0;
}
function dayLabel(day){ return new Date(2026,8,day).toLocaleDateString('en-US',{weekday:'short'}); }
function mealFor(day){
  const base = MEALS[day] || {};
  const edited = state.dinnerEdits[day];
  return {...base, meal: edited !== undefined ? edited : base.meal};
}

const panel = document.getElementById('panel');
const scrim = document.getElementById('scrim');
const panelTitle = document.getElementById('panelTitle');
const todayLabel = document.getElementById('todayLabel');
todayLabel.textContent = TODAY.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

function openPanel(tab){
  state.tab = tab;
  panel.classList.add('open');
  scrim.classList.add('open');
  panel.setAttribute('aria-hidden','false');
  setTab(tab);
}
function closePanel(){
  panel.classList.remove('open');
  scrim.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
}
function setTab(tab){
  state.tab = tab;
  document.querySelectorAll('.primary-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.getElementById('dinnerPanel').classList.toggle('active',tab==='dinner');
  document.getElementById('shoppingPanel').classList.toggle('active',tab==='shopping');
  panelTitle.textContent = tab === 'dinner' ? 'Dinner Schedule' : 'Shopping List';
  document.querySelectorAll('.table-toggle-btn').forEach(b => {
    const active = b.dataset.open === tab;
    b.classList.toggle('active',active);
    b.setAttribute('aria-pressed',String(active));
  });
  if(tab==='dinner') renderDinner(); else renderShopping();
}

document.querySelectorAll('.table-toggle-btn').forEach(b => b.addEventListener('click',()=>openPanel(b.dataset.open)));
document.querySelectorAll('.primary-tab').forEach(b => b.addEventListener('click',()=>setTab(b.dataset.tab)));
document.getElementById('closeBtn').addEventListener('click',closePanel);
scrim.addEventListener('click',closePanel);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closePanel(); });

function renderDinner(){
  const wrap = document.getElementById('dinnerList');
  const monthWrap = document.getElementById('monthGrid');
  const wk = WEEKS[state.activeWeek];
  document.getElementById('dinnerRangeLabel').textContent = `${wk.label.toUpperCase()} · ${wk.range.toUpperCase()}`;
  wrap.innerHTML='';
  wk.days.forEach(day=>{
    const info=mealFor(day);
    const card=document.createElement('article');
    card.className='dinner-card'+(day===TODAY.getDate()?' today-card':'');
    const display = info.meal || info.note || (info.prep ? 'Chicken & rice meal prep' : 'No dinner planned');
    const note = info.meal && info.note ? info.note : info.noshop ? 'No shopping needed' : '';
    const tags=[];
    if(info.tag==='left') tags.push('<span class="tag left">leftovers</span>');
    if(info.tag==='lunch') tags.push('<span class="tag lunch">lunch extra</span>');
    if(info.prep) tags.push('<span class="tag prep">meal prep</span>');
    card.innerHTML=`<div class="date-chip"><span class="dow">${dayLabel(day).toUpperCase()}</span><span class="num">${day}</span></div>
      <div><div class="meal-name">${escapeHTML(display)}</div>${note?`<div class="meal-note">${escapeHTML(note)}</div>`:''}${tags.length?`<div class="meal-tags">${tags.join('')}</div>`:''}</div>
      <button class="edit-btn" aria-label="Edit dinner for September ${day}">✎</button>`;
    card.querySelector('.edit-btn').addEventListener('click',()=>editDinner(card,day,display));
    wrap.appendChild(card);
  });
  renderMonth(monthWrap);
}

function editDinner(card,day,current){
  if(card.querySelector('.edit-row')) return;
  const row=document.createElement('div');
  row.className='edit-row';
  row.innerHTML=`<input aria-label="Dinner for September ${day}" value="${escapeAttr(current)}"><button class="save-btn">Save</button><button class="cancel-btn">Cancel</button>`;
  card.appendChild(row);
  const input=row.querySelector('input');input.focus();input.select();
  const save=()=>{
    state.dinnerEdits[day]=input.value.trim();
    writeJSON(STORAGE.dinnerEdits,state.dinnerEdits);
    renderDinner();
  };
  row.querySelector('.save-btn').addEventListener('click',save);
  row.querySelector('.cancel-btn').addEventListener('click',()=>row.remove());
  input.addEventListener('keydown',e=>{if(e.key==='Enter') save();});
}

function renderMonth(wrap){
  const dow=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html=`<div class="calendar-head">${dow.map(d=>`<div>${d}</div>`).join('')}</div><div class="calendar-grid">`;
  for(let i=0;i<2;i++) html+='<div class="calendar-day empty"></div>';
  for(let day=1;day<=30;day++){
    const info=mealFor(day); const label=info.meal||info.note||(info.prep?'Meal prep':'—');
    html+=`<div class="calendar-day ${info.noshop?'noshop':''} ${day===TODAY.getDate()?'current':''}"><div class="daynum">${day}</div><div class="mini-meal">${escapeHTML(label)}</div></div>`;
  }
  html+='</div>';wrap.innerHTML=html;
}

document.getElementById('calendarToggle').addEventListener('click',e=>{
  const grid=document.getElementById('monthGrid');
  const list=document.getElementById('dinnerList');
  const opening=grid.classList.contains('hidden');
  grid.classList.toggle('hidden',!opening);list.classList.toggle('hidden',opening);
  e.currentTarget.textContent=opening?'This week':'Full month';
});

function renderShopping(){
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode===state.shoppingMode));
  renderWeekSelector();
  const list=document.getElementById('shoppingList'); list.innerHTML='';
  if(state.shoppingMode==='weekly') renderWeekly(list); else renderMaster(list);
  renderCustomItems(list);
  updateProgress();
}

document.querySelectorAll('.mode-btn').forEach(b=>b.addEventListener('click',()=>{
  state.shoppingMode=b.dataset.mode; renderShopping();
}));

function renderWeekSelector(){
  const wrap=document.getElementById('weekSelector');
  wrap.style.display = state.shoppingMode==='weekly' ? 'flex' : 'none';
  wrap.innerHTML='';
  WEEKS.forEach((w,idx)=>{
    const b=document.createElement('button');b.className='week-btn'+(idx===state.activeWeek?' active':'');
    b.innerHTML=`<strong>${w.label}</strong><span>${w.range}</span>`;
    b.addEventListener('click',()=>{state.activeWeek=idx;renderShopping();renderDinner();});
    wrap.appendChild(b);
  });
}

function renderWeekly(wrap){
  const week=WEEKS[state.activeWeek];
  const days=week.days.filter(day=>DAY_INGR[day]?.length);
  if(!days.length){wrap.innerHTML='<div class="empty-note">Nothing to shop for this week — eating out, beach days, or no dinner planned yet.</div>';return;}
  const agg={};
  days.forEach(day=>DAY_INGR[day].forEach(it=>{
    const key=it.i.toLowerCase();
    if(!agg[key]) agg[key]={name:it.i,cat:it.c,qtys:[]};
    agg[key].qtys.push(it.q);
  }));
  const cats={};Object.values(agg).forEach(it=>(cats[it.cat]??=[]).push(it));
  Object.entries(cats).forEach(([cat,items])=>{
    const block=document.createElement('section');block.className='cat-block';
    block.innerHTML=`<h3 class="cat-title">${escapeHTML(cat)}</h3>`;
    items.forEach((it,idx)=>block.appendChild(checkRow(`weekly|${state.activeWeek}|${cat}|${it.name}`,it.name,it.qtys.join(' + '))));
    wrap.appendChild(block);
  });
}

function renderMaster(wrap){
  MASTER.forEach(block=>{
    const el=document.createElement('section');el.className='cat-block';el.innerHTML=`<h3 class="cat-title">${escapeHTML(block.cat)}</h3>`;
    block.items.forEach((it,idx)=>el.appendChild(checkRow(`master|${block.cat}|${idx}`,it[0],it[1])));
    wrap.appendChild(el);
  });
}

function checkRow(key,name,qty){
  const row=document.createElement('div'); const checked=!!state.checks[key];
  row.className='item-row'+(checked?' checked':'');
  const id='c-'+hashKey(key);
  row.innerHTML=`<input type="checkbox" id="${id}" ${checked?'checked':''}><label for="${id}">${escapeHTML(name)} ${qty?`<span class="qty">— ${escapeHTML(qty)}</span>`:''}</label>`;
  row.querySelector('input').addEventListener('change',e=>{
    state.checks[key]=e.target.checked;writeJSON(STORAGE.shoppingChecks,state.checks);row.classList.toggle('checked',e.target.checked);updateProgress();
  });
  row.dataset.checkKey=key;return row;
}

function renderCustomItems(wrap){
  if(!state.customItems.length) return;
  const block=document.createElement('section');block.className='cat-block custom-heading';block.innerHTML='<h3 class="cat-title">Personal additions</h3>';
  state.customItems.forEach(item=>{
    const row=checkRow(`custom|${item.id}`,item.name,'');
    const del=document.createElement('button');del.className='text-btn';del.textContent='remove';del.style.marginLeft='auto';
    del.addEventListener('click',()=>{state.customItems=state.customItems.filter(x=>x.id!==item.id);writeJSON(STORAGE.customItems,state.customItems);delete state.checks[`custom|${item.id}`];writeJSON(STORAGE.shoppingChecks,state.checks);renderShopping();});
    row.appendChild(del);block.appendChild(row);
  });wrap.appendChild(block);
}

document.getElementById('addItemForm').addEventListener('submit',e=>{
  e.preventDefault(); const input=document.getElementById('addItemInput'); const name=input.value.trim(); if(!name)return;
  state.customItems.push({id:Date.now(),name});writeJSON(STORAGE.customItems,state.customItems);input.value='';renderShopping();
});

document.getElementById('clearChecks').addEventListener('click',()=>{state.checks={};writeJSON(STORAGE.shoppingChecks,{});renderShopping();});

function updateProgress(){
  const rows=[...document.querySelectorAll('#shoppingList .item-row[data-check-key]')];
  const total=rows.length,done=rows.filter(r=>state.checks[r.dataset.checkKey]).length;
  document.getElementById('progressText').textContent=`${done} of ${total} checked`;
  document.getElementById('progressFill').style.width=total?`${done/total*100}%`:'0%';
}
function hashKey(s){let h=0;for(let i=0;i<s.length;i++)h=(Math.imul(31,h)+s.charCodeAt(i))|0;return Math.abs(h);}
function escapeHTML(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function escapeAttr(s=''){return escapeHTML(s).replace(/`/g,'&#96;');}

const tip=document.getElementById('tip');
function showTip(){scrim.classList.add('open');tip.classList.add('open');}
function hideTip(){tip.classList.remove('open');scrim.classList.remove('open');localStorage.setItem(STORAGE.tipSeen,'1');}
document.getElementById('helpBtn').addEventListener('click',showTip);
document.getElementById('dismissTip').addEventListener('click',hideTip);
if(!localStorage.getItem(STORAGE.tipSeen)) setTimeout(showTip,450);

renderDinner();
renderShopping();
