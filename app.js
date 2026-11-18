'use strict';
// =====================================================================
//  Klimmzug-Tracker – App-Logik
// =====================================================================

const STORE_KEY = 'kstate4';
const DEADLINE = new Date(2026, 11, 31);
const FEELS = ['😫','😕','😐','🙂','💪'];
const FEEL_TXT = ['sehr schwer','schwer','okay','gut','stark'];
const DE_DAYS = ['Mo','Di','Mi','Do','Fr','Sa','So'];
const DE_MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const PULL_IDS = ['pullup','chinup','wide-pullup','negative-pullup'];

// ---------------------------------------------------------------------
//  Icons (inline SVG)
// ---------------------------------------------------------------------
const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  bar: '<path d="M2 4h20M5 2v4M19 2v4"/><circle cx="12" cy="10" r="2.2"/><path d="M8 4l2.5 9h3L16 4M10.5 13 9.5 22M13.5 13l1 9"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  next: '<path d="M5 4l10 8-10 8z"/><path d="M19 5v14"/>',
  prev: '<path d="M19 20 9 12l10-8z"/><path d="M5 19V5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  flame: '<path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 4 1-3 0-5 0-8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  heart: '<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chev: '<path d="m9 6 6 6-6 6"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  vol: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  push: '<path d="M3 17h4l3-6 4 3 3-5h4"/><circle cx="6" cy="8" r="2"/>',
  legs: '<path d="M10 2v7l-3 6 2 7M14 2v7l3 6-2 7"/>',
  core: '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M7 9h10M7 15h10M12 3v18"/>',
  cardio: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  mob: '<circle cx="12" cy="4" r="2"/><path d="M3 9l9 2 9-2M12 11v5l-4 6M12 16l4 6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
};
const CAT_ICON = { bar: 'bar', push: 'push', legs: 'legs', core: 'core', cardio: 'cardio', mobility: 'mob' };
function icon(name, cls){ return '<svg class="i'+(cls ? ' '+cls : '')+'" viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[name] || '')+'</svg>'; }
function hydrateIcons(root){ (root || document).querySelectorAll('[data-i]').forEach(el => { el.outerHTML = icon(el.dataset.i); }); }
const YT_SVG = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

// ---------------------------------------------------------------------
//  Zustand
// ---------------------------------------------------------------------
function loadState(){
  const fresh = { currentMax: 8, goal: 20, sessions: [], sessionCount: 0, doneSets: 0, tests: [],
    workouts: [], custom: [], badges: [], coach: null, pbs: {}, pbHits: 0,
    settings: { name: '', weeklyGoal: 3, weight: 75, sound: true, voice: true, warmup: true } };
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (s && Array.isArray(s.sessions)) {
      const st = Object.assign(fresh, s);
      st.settings = Object.assign({}, fresh.settings, s.settings || {});
      ['tests','workouts','custom','badges'].forEach(k => { if(!Array.isArray(st[k])) st[k] = []; });
      if(!st.pbs || typeof st.pbs !== 'object' || Array.isArray(st.pbs)) st.pbs = {};
      return st;
    }
  } catch(e) {}
  return fresh;
}
let state = loadState();
function save(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch(e) {} }

// ---------------------------------------------------------------------
//  Helfer
// ---------------------------------------------------------------------
const $ = id => document.getElementById(id);
function pad(n){ return String(n).padStart(2,'0'); }
function toStr(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function todayStr(){ return toStr(new Date()); }
function parseDate(str){ const [y,m,d] = str.split('-').map(Number); return new Date(y, m-1, d); }
function addDays(d, n){ const r = new Date(d); r.setDate(r.getDate()+n); return r; }
function formatDate(str){ if(!str) return ''; const [y,m,d] = str.split('-'); return d+'.'+m+'.'+y; }
function esc(t){ return String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function sortByDate(a){ a.sort((x,y) => x.date < y.date ? -1 : x.date > y.date ? 1 : 0); }
function weekKey(d){ return toStr(addDays(d, -((d.getDay()+6) % 7))); }
function sum(a){ return a.reduce((x,y) => x+y, 0); }
function fmtTime(sec){ sec = Math.max(0, Math.round(sec)); const m = Math.floor(sec/60), s = sec%60; return m+':'+pad(s); }
function fmtMin(sec){ const m = Math.round(sec/60); return m < 60 ? m+' min' : Math.floor(m/60)+' h '+(m%60)+' min'; }
const exById = id => EXERCISES.find(e => e.id === id);
function ytThumb(id){ const v = VIDEOS[id]; return v ? 'https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg' : ''; }
function ytUrl(id){ const v = VIDEOS[id], e = exById(id);
  return v ? 'https://www.youtube.com/watch?v='+v.id : 'https://www.youtube.com/results?search_query='+encodeURIComponent(e.name+' richtig ausführen'); }
// Wenn ein Vorschaubild nicht existiert, liefert YouTube einen 120px-Platzhalter oder einen Fehler -> auf Suche umschalten
function thumbCheck(img){ if(img.naturalWidth && img.naturalWidth <= 120) img.onerror(); }
function thumbFail(img, exId){
  const box = img.closest('.video');
  if(box){
    box.classList.add('search-only'); box.href = 'https://www.youtube.com/results?search_query='+encodeURIComponent(exById(exId).name+' richtig ausführen');
    box.innerHTML = '<div class="yt">'+YT_SVG+'</div><span>Tutorial auf YouTube suchen</span>';
  } else img.style.visibility = 'hidden';
}

// Kalorien grob nach MET: kcal = MET × kg × Stunden
function kcalFor(met, sec){ return met * (state.settings.weight || 75) * sec / 3600; }

// Alle Trainingstage (Klimmzug-Einheiten + Workouts)
function activityDates(){ return state.sessions.map(s => s.date).concat(state.workouts.map(w => w.date)); }
function activityCount(){ return state.sessions.length + state.workouts.length; }
function sessionSec(s){ return s.dur || 15*60; }
function totalPullups(){
  return sum(state.sessions.map(s => sum(s.sets))) +
    sum(state.workouts.map(w => sum(PULL_IDS.map(id => (w.reps && w.reps[id]) || 0))));
}

// ---------------------------------------------------------------------
//  Navigation
// ---------------------------------------------------------------------
let currentTab = 'home';
function go(tab){
  currentTab = tab; closeSheet();
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-'+tab));
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  window.scrollTo({ top: 0 });
  if(location.hash !== '#'+tab) history.replaceState(null, '', '#'+tab);
  renderTab(tab);
}
function renderTab(tab){
  if(tab === 'home') renderHome();
  else if(tab === 'workouts') renderWorkouts();
  else if(tab === 'library') renderLibrary();
  else if(tab === 'profile') renderProfile();
}
document.querySelectorAll('#tabbar button').forEach(b => b.onclick = () => go(b.dataset.tab));

// ---------------------------------------------------------------------
//  Bottom-Sheet & Toast
// ---------------------------------------------------------------------
function openSheet(html){
  $('sheetBody').innerHTML = html;
  $('sheet').scrollTop = 0;
  $('scrim').classList.add('show'); $('sheet').classList.add('show');
}
function closeSheet(){ $('scrim').classList.remove('show'); $('sheet').classList.remove('show'); }
let toastTimer;
function toast(em, title, sub){
  const t = $('toast');
  t.innerHTML = '<div class="em">'+em+'</div><div><b>'+esc(title)+'</b>'+(sub ? '<small>'+esc(sub)+'</small>' : '')+'</div>';
  t.classList.add('show'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ if($('player').classList.contains('show')) return; closeSheet(); } });

// Ring-SVG
function ringSVG(pct, stroke){
  const r = 52, c = 2*Math.PI*r, off = c * (1 - Math.min(1, Math.max(0, pct)));
  return '<svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="'+r+'" fill="none" stroke-width="'+(stroke||11)+'"/>'
    + '<circle class="bar" cx="60" cy="60" r="'+r+'" fill="none" stroke-width="'+(stroke||11)+'" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/></svg>';
}

// =====================================================================
//  HEUTE
// =====================================================================
function workoutOfDay(){
  const d = parseDate(todayStr()), idx = Math.floor(d.getTime() / 86400000);
  return WORKOUTS[idx % WORKOUTS.length];
}
function pullupDue(){
  if(!state.sessions.length) return 0;
  const next = addDays(parseDate(state.sessions[state.sessions.length-1].date), 2);
  return Math.round((next - parseDate(todayStr())) / 86400000);
}
function renderHome(){
  const h = new Date().getHours();
  const greet = h < 11 ? 'Guten Morgen' : h < 18 ? 'Hi' : 'Guten Abend';
  $('hello').textContent = greet + (state.settings.name ? ', '+state.settings.name : '') + ' 👋';
  const d = new Date();
  $('todayLine').textContent = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'][d.getDay()]+', '+d.getDate()+'. '+DE_MONTHS[d.getMonth()]+' · Bereit für dein Training?';

  // Hero: Klimmzug-Einheit, wenn fällig – sonst Workout des Tages
  const due = pullupDue(), doneToday = activityDates().includes(todayStr());
  const plan = weekPlan(), todayItem = plan.find(it => it.date === todayStr() && !planItemDone(it, plan));
  renderPlan();
  let hero;
  if(todayItem && todayItem.wid !== 'pullup'){
    const w = getWorkout(todayItem.wid);
    hero = '<div class="hero"><div class="hero-icon">'+icon(CAT_ICON[w.focus])+'</div><div><div class="tag">Heute in deinem Plan</div><h3>'+esc(w.name)+'</h3>'
      + '<div class="meta">'+w.steps.length+' Übungen · '+w.rounds+' Runden · ~'+Math.round(estimateSec(w)/60)+' min</div></div>'
      + '<button class="btn btn-dark" onclick="startW(\''+w.id+'\')">Workout starten '+icon('chev','s')+'</button></div>';
  } else if((todayItem && todayItem.wid === 'pullup') || (!state.coach && due <= 0 && !doneToday)){
    const base = Math.floor(state.currentMax/2), n = state.sessionCount % 10;
    hero = '<div class="hero"><div class="hero-icon">'+icon('bar')+'</div><div><div class="tag">Heute fällig</div><h3>Klimmzug-Programm<br/>Session '+(state.sessions.length+1)+'</h3>'
      + '<div class="meta">10 Sätze · '+n+'× '+(base+1)+' + '+(10-n)+'× '+base+' Wdh.</div></div>'
      + '<button class="btn btn-dark" onclick="go(\'pullup\')">Training starten '+icon('chev','s')+'</button></div>';
  } else {
    const w = workoutOfDay();
    hero = '<div class="hero"><div class="hero-icon">'+icon(CAT_ICON[w.focus])+'</div><div><div class="tag">'+(doneToday ? 'Bonus-Workout' : 'Workout des Tages')+'</div><h3>'+esc(w.name)+'</h3>'
      + '<div class="meta">'+w.steps.length+' Übungen · '+w.rounds+' Runden · ~'+Math.round(estimateSec(w)/60)+' min</div></div>'
      + '<button class="btn btn-dark" onclick="startW(\''+w.id+'\')">Workout starten '+icon('chev','s')+'</button></div>';
  }
  $('heroBox').innerHTML = hero;

  // Wochenring
  const wk = weekKey(new Date());
  const thisWeek = activityDates().filter(ds => weekKey(parseDate(ds)) === wk);
  const days = new Set(thisWeek).size, goal = state.coach ? state.coach.days : (state.settings.weeklyGoal || 3);
  $('weekRing').innerHTML = ringSVG(days/goal) + '<div class="center"><div class="big">'+days+'/'+goal+'</div><div class="small">Trainingstage</div></div>';
  const wSec = sum(state.workouts.filter(w => weekKey(parseDate(w.date)) === wk).map(w => w.dur))
    + sum(state.sessions.filter(s => weekKey(parseDate(s.date)) === wk).map(sessionSec));
  const wKcal = sum(state.workouts.filter(w => weekKey(parseDate(w.date)) === wk).map(w => w.kcal || 0))
    + sum(state.sessions.filter(s => weekKey(parseDate(s.date)) === wk).map(s => kcalFor(8, sessionSec(s)*0.4)));
  $('weekStats').innerHTML =
      '<div class="mini-stat"><div class="ic">'+icon('clock','s')+'</div><div><b>'+fmtMin(wSec)+'</b><small>Trainingszeit</small></div></div>'
    + '<div class="mini-stat"><div class="ic">'+icon('flame','s')+'</div><div><b>'+Math.round(wKcal)+' kcal</b><small>geschätzt</small></div></div>'
    + '<div class="mini-stat"><div class="ic">'+icon('zap','s')+'</div><div><b>'+streakWeeks()+' Wochen</b><small>Serie</small></div></div>';

  // Klimmzug-Teaser
  const pct = Math.min(100, Math.round(state.currentMax / (state.goal||20) * 100));
  const dueTxt = !state.sessions.length ? 'Jetzt starten' : due <= 0 ? 'Bereit!' : due === 1 ? 'Morgen' : 'in '+due+' Tagen';
  $('pullupTeaser').innerHTML = '<button class="list-item" onclick="go(\'pullup\')"><div class="thumb" style="background:var(--lime);color:var(--lime-ink)">'+icon('bar')+'</div>'
    + '<div class="grow"><b>Max '+state.currentMax+' / '+(state.goal||20)+' · '+pct+'%</b><small>Nächste Einheit: '+dueTxt+'</small>'
    + '<div style="height:5px;background:var(--card2);border-radius:9px;margin-top:8px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:var(--lime);border-radius:9px"></div></div></div>'
    + '<span class="chev">'+icon('chev')+'</span></button>';

  // Letzte Aktivitäten
  const items = allActivities().slice(0, 4);
  $('recentList').innerHTML = items.length ? items.map(activityRow).join('')
    : '<div class="card" style="text-align:center"><div style="font-size:32px">🏁</div><p class="sub" style="margin-top:6px">Noch keine Aktivität. Starte dein erstes Workout!</p></div>';
}

// =====================================================================
//  COACH: Ziel, Level, Wochenplan
// =====================================================================
const GOALS = {
  pullups:  { em: '🧗', name: 'Mehr Klimmzüge', desc: 'Klimmzug-Programm plus passende Ergänzung' },
  strength: { em: '💪', name: 'Kraft aufbauen', desc: 'Stange, Push, Beine und Core im Wechsel' },
  fit:      { em: '🧘', name: 'Fit & beweglich', desc: 'Ganzkörper, Core und Mobility' },
  burn:     { em: '🔥', name: 'Fett verbrennen', desc: 'HIIT und intensive Zirkel' },
};
const PLAN_DAYS = { 2: [0,3], 3: [0,2,4], 4: [0,1,3,5], 5: [0,1,2,4,5], 6: [0,1,2,3,4,5] };
function planSeq(goal, level){
  const bar = ['first-pullup','bar-strength','bar-beast'][Math.max(0, Math.min(2, level-1))];
  return {
    pullups:  ['pullup', level === 1 ? 'first-pullup' : 'core-crusher', 'pullup', 'mobility-flow', 'pullup', 'push-day'],
    strength: [bar, 'push-day', 'leg-day', 'core-crusher', bar, 'full-body-starter'],
    fit:      ['full-body-starter', 'mobility-flow', 'core-crusher', 'leg-day', 'quick-7', 'push-day'],
    burn:     ['hiit-15', 'full-body-starter', 'quick-7', 'leg-day', 'hiit-15', 'core-crusher'],
  }[goal] || ['full-body-starter'];
}
function weekPlan(){
  if(!state.coach) return [];
  const c = state.coach, days = PLAN_DAYS[c.days] || PLAN_DAYS[3], seq = planSeq(c.goal, c.level);
  const mon = parseDate(weekKey(new Date()));
  return days.map((dow, i) => ({ dow, date: toStr(addDays(mon, dow)), wid: seq[i % seq.length] }));
}
// Welche Plantage sind erledigt? Flexibel: Training an einem anderen Tag der Woche zählt auch.
// Erst exakte Workout-Treffer zuordnen, dann übrige Workouts den frühesten offenen Tagen.
function planDoneSet(plan){
  const done = new Set();
  if(!plan.length) return done;
  const wk = weekKey(parseDate(plan[0].date));
  const pullN = state.sessions.filter(s => weekKey(parseDate(s.date)) === wk).length;
  plan.forEach((it, i) => { if(it.wid === 'pullup' && plan.slice(0, i+1).filter(p => p.wid === 'pullup').length <= pullN) done.add(i); });
  const logs = state.workouts.filter(w => weekKey(parseDate(w.date)) === wk && w.wid !== 'cooldown' && w.wid !== 'warmup');
  const rest = [], used = new Set();   // höchstens ein Plantag pro Trainingstag
  logs.forEach(w => {
    if(used.has(w.date)) return;
    const i = plan.findIndex((it, k) => !done.has(k) && it.wid === w.wid);
    if(i >= 0){ done.add(i); used.add(w.date); } else rest.push(w);
  });
  rest.forEach(w => {
    if(used.has(w.date)) return;
    const i = plan.findIndex((it, k) => !done.has(k) && it.wid !== 'pullup');
    if(i >= 0){ done.add(i); used.add(w.date); }
  });
  return done;
}
function planItemDone(it, plan){ return planDoneSet(plan).has(plan.indexOf(it)); }
function planName(wid){ return wid === 'pullup' ? 'Klimmzug-Programm' : (getWorkout(wid) || {}).name || ''; }
function openPlanItem(wid){ if(wid === 'pullup') go('pullup'); else openWorkout(wid); }

function renderPlan(){
  const box = $('planBox');
  if(!state.coach){
    box.innerHTML = '<button class="card coach-cta" onclick="openOnboarding()"><div class="w-ic" style="background:var(--lime)">'+icon('target')+'</div>'
      + '<div class="grow" style="text-align:left"><b>Dein persönlicher Coach</b><small>3 Fragen – dein Trainingsplan für jede Woche</small></div><span class="chev">'+icon('chev')+'</span></button>';
    return;
  }
  const plan = weekPlan(), today = todayStr(), mon = parseDate(weekKey(new Date()));
  let html = '<div class="plan">';
  for(let d = 0; d < 7; d++){
    const ds = toStr(addDays(mon, d)), it = plan.find(p => p.dow === d);
    const done = it && planItemDone(it, plan), past = ds < today;
    const cls = 'pday' + (ds === today ? ' today' : '') + (it ? ' planned' : '') + (done ? ' done' : '') + (it && past && !done ? ' missed' : '');
    const w = it && it.wid !== 'pullup' ? getWorkout(it.wid) : null;
    const ic = !it ? '<i class="rest-dot"></i>' : done ? icon('check','s') : icon(it.wid === 'pullup' ? 'bar' : CAT_ICON[w ? w.focus : 'cardio'], 's');
    html += '<button class="'+cls+'"'+(it ? ' onclick="openPlanItem(\''+it.wid+'\')" title="'+esc(planName(it.wid))+'"' : ' disabled')+'><small>'+DE_DAYS[d]+'</small><span class="pdot">'+ic+'</span></button>';
  }
  html += '</div>';
  const doneN = plan.filter(it => planItemDone(it, plan)).length;
  const next = plan.find(it => !planItemDone(it, plan) && it.date >= today);
  html += '<div class="plan-foot"><span>'+GOALS[state.coach.goal].em+' '+GOALS[state.coach.goal].name+' · '+doneN+'/'+plan.length+' erledigt</span>'
    + (next ? '<span class="muted">'+(next.date === today ? 'Heute' : DE_DAYS[next.dow])+': '+esc(planName(next.wid))+'</span>' : '<span style="color:var(--lime)">Woche geschafft! 🎉</span>')+'</div>';
  box.innerHTML = '<div class="card">'+html+'</div>';
}

let ob = null;
function openOnboarding(){
  ob = { step: 0, goal: state.coach ? state.coach.goal : null, level: state.coach ? state.coach.level : null, days: state.coach ? state.coach.days : 3 };
  renderOnboarding();
}
function renderOnboarding(){
  const dots = '<div class="ob-dots">'+[0,1,2,3].map(i => '<i class="'+(i <= ob.step ? 'on' : '')+'"></i>').join('')+'</div>';
  let body = '';
  if(ob.step === 0){
    body = '<h3>Was ist dein Ziel?</h3><p>Dein Coach baut daraus deinen Wochenplan.</p><div class="opts">'
      + Object.entries(GOALS).map(([k, g]) => '<button class="opt'+(ob.goal === k ? ' on' : '')+'" onclick="ob.goal=\''+k+'\';ob.step=1;renderOnboarding()"><span class="em">'+g.em+'</span><span><b>'+g.name+'</b><small>'+g.desc+'</small></span></button>').join('')+'</div>';
  } else if(ob.step === 1){
    const lv = [['🌱','Einsteiger','Klimmzüge sind noch schwer oder unmöglich'],['🔥','Fortgeschritten','Ein paar saubere Klimmzüge klappen'],['⚡','Profi','10+ Klimmzüge, Lust auf Herausforderung']];
    body = '<h3>Wie fit bist du?</h3><p>Ehrlich sein lohnt sich – der Coach passt sich später an.</p><div class="opts">'
      + lv.map((l, i) => '<button class="opt'+(ob.level === i+1 ? ' on' : '')+'" onclick="ob.level='+(i+1)+';ob.step=2;renderOnboarding()"><span class="em">'+l[0]+'</span><span><b>'+l[1]+'</b><small>'+l[2]+'</small></span></button>').join('')+'</div>';
  } else if(ob.step === 2){
    body = '<h3>Wie oft pro Woche?</h3><p>Lieber realistisch – Regelmäßigkeit schlägt alles.</p>'
      + '<div class="days-pick">'+[2,3,4,5,6].map(n => '<button class="'+(ob.days === n ? 'on' : '')+'" onclick="ob.days='+n+';renderOnboarding()"><b>'+n+'</b><small>Tage</small></button>').join('')+'</div>'
      + '<button class="btn btn-lime btn-block" style="margin-top:18px;padding:16px" onclick="ob.step=3;renderOnboarding()">Plan erstellen</button>';
  } else {
    const prev = state.coach; state.coach = { goal: ob.goal, level: ob.level, days: ob.days, scale: prev ? prev.scale : 1 };
    const plan = weekPlan(); state.coach = prev;
    body = '<h3>Dein Wochenplan 🎯</h3><p>'+GOALS[ob.goal].name+' · '+ob.days+' Tage pro Woche. Er erneuert sich jeden Montag.</p><div style="margin-top:14px">'
      + plan.map(it => { const w = it.wid === 'pullup' ? null : getWorkout(it.wid);
          return '<div class="list-item"><div class="thumb" style="background:'+(w ? CATEGORIES[w.focus].color : 'var(--lime)')+';color:var(--lime-ink)">'+icon(w ? CAT_ICON[w.focus] : 'bar')+'</div>'
            + '<div class="grow"><b>'+DE_DAYS[it.dow]+' · '+esc(planName(it.wid))+'</b><small>'+(w ? '~'+Math.round(estimateSec(w)/60)+' min · '+LEVELS[w.level] : '10 Sätze · steigende Last')+'</small></div></div>'; }).join('')
      + '</div><button class="btn btn-lime btn-block" style="margin-top:18px;padding:16px" onclick="finishOnboarding()">Los geht\'s</button>';
  }
  const back = ob.step > 0 ? '<button class="btn btn-ghost" style="padding:8px 14px;font-size:12px" onclick="ob.step--;renderOnboarding()">‹ Zurück</button>' : '<button class="btn btn-ghost" style="padding:8px 14px;font-size:12px" onclick="skipOnboarding()">Später</button>';
  openSheet('<div class="row" style="justify-content:space-between;margin-bottom:14px">'+back+dots+'</div>'+body);
}
function finishOnboarding(){
  const scale = state.coach ? state.coach.scale : ({ 1: .8, 2: 1, 3: 1.2 }[ob.level]);
  state.coach = { goal: ob.goal, level: ob.level, days: ob.days, scale };
  state.settings.weeklyGoal = ob.days;
  if(ob.goal === 'pullups' && ob.level === 1 && state.currentMax > 5 && !state.sessions.length) state.currentMax = 3;
  save(); closeSheet(); renderHome(); confetti();
  toast('🎯', 'Dein Plan steht!', ob.days+' Trainingstage pro Woche');
}
function skipOnboarding(){ state.coachSkipped = true; save(); closeSheet(); }

function allActivities(){
  const a = state.sessions.map((s, i) => ({ kind: 's', date: s.date, x: s, i }))
    .concat(state.workouts.map((w, i) => ({ kind: 'w', date: w.date, x: w, i, t: w.t || 0 })))
    .concat(state.tests.map((t, i) => ({ kind: 't', date: t.date, x: t, i })));
  return a.sort((p, q) => p.date < q.date ? 1 : p.date > q.date ? -1 : (q.t||0) - (p.t||0));
}
function activityRow(it){
  const x = it.x;
  if(it.kind === 's'){
    const extra = (x.feel ? FEELS[x.feel-1]+' ' : '') + (x.note ? esc(x.note) : '');
    return '<button class="list-item" onclick="showSession(\''+x.date+'\')"><div class="thumb" style="background:var(--lime);color:var(--lime-ink)">'+icon('bar')+'</div>'
      + '<div class="grow"><b>Klimmzug-Einheit</b><small>'+formatDate(x.date)+' · '+sum(x.sets)+' Klimmzüge'+(extra ? ' · '+extra : '')+'</small></div><div class="check">'+icon('check','s')+'</div></button>';
  }
  if(it.kind === 'w'){
    const w = WORKOUTS.find(q => q.id === x.wid);
    const cat = (w && w.focus) || (CATEGORIES[x.focus] ? x.focus : 'cardio');
    return '<button class="list-item" onclick="showWorkoutLog('+it.i+')"><div class="thumb" style="background:'+CATEGORIES[cat].color+';color:var(--lime-ink)">'+icon(CAT_ICON[cat])+'</div>'
      + '<div class="grow"><b>'+esc(x.name)+'</b><small>'+formatDate(x.date)+' · '+fmtMin(x.dur)+' · '+Math.round(x.kcal||0)+' kcal'+(x.feel ? ' · '+FEELS[x.feel-1] : '')+'</small></div><div class="check">'+icon('check','s')+'</div></button>';
  }
  return '<div class="list-item"><div class="thumb" style="background:var(--card2);color:var(--lime)">'+icon('target')+'</div>'
    + '<div class="grow"><b>Max-Test: '+x.max+'</b><small>'+formatDate(x.date)+'</small></div>'
    + '<button class="icon-btn" style="width:34px;height:34px" aria-label="Max-Test löschen" onclick="deleteTest('+it.i+')">'+icon('trash','s')+'</button></div>';
}

// =====================================================================
//  WORKOUTS
// =====================================================================
let workoutFilter = 'all';
function allWorkouts(){ return WORKOUTS.concat(state.custom); }
function getWorkout(id){ return allWorkouts().concat([WARMUP, COOLDOWN]).find(w => w.id === id); }
// Der Coach skaliert Wiederholungen/Haltezeiten je nach Rückmeldung (nicht bei Intervall- und Mobility-Workouts)
function coachScale(w){ return (w.work || w.focus === 'mobility') ? 1 : ((state.coach && state.coach.scale) || 1); }
function stepAmount(w, step){
  const e = exById(step[0]);
  if(w.work) return w.work;
  return Math.max(1, Math.round((step[1] || e.def) * coachScale(w)));
}
function startW(id){ const w = getWorkout(id); if(w) startWorkout(w, { warm: state.settings.warmup && w.focus !== 'mobility' }); }
function stepIsTime(w, step){ return !!w.work || exById(step[0]).type === 'time'; }
function estimateSec(w){
  const per = w.steps.map(s => stepIsTime(w, s) ? stepAmount(w, s) : stepAmount(w, s) * 3.5);
  return w.rounds * (sum(per) + w.rest * (w.steps.length - 1)) + w.roundRest * (w.rounds - 1) + 5;
}
function levelDots(l){ return '<span class="dots">'+[1,2,3].map(i => '<i class="'+(i <= l ? 'on' : '')+'"></i>').join('')+'</span>'; }

function renderWorkouts(){
  const chips = [['all','Alle']].concat(Object.entries(CATEGORIES).map(([k,v]) => [k, v.name])).concat([['custom','Eigene']]);
  $('workoutChips').innerHTML = chips.map(([k,n]) => '<button class="chip'+(workoutFilter === k ? ' on' : '')+'" onclick="workoutFilter=\''+k+'\';renderWorkouts()">'+n+'</button>').join('');
  let list = allWorkouts();
  if(workoutFilter === 'custom') list = state.custom;
  else if(workoutFilter !== 'all') list = list.filter(w => w.focus === workoutFilter);
  const featured = workoutFilter === 'all' ? workoutOfDay() : null;
  let html = '';
  if(featured){
    html += '<button class="w-card featured" onclick="openWorkout(\''+featured.id+'\')"><div class="glow" style="background:var(--lime)"></div>'
      + '<div class="row" style="justify-content:space-between;width:100%"><div class="w-ic" style="background:var(--lime)">'+icon(CAT_ICON[featured.focus])+'</div><span class="pill lime">Workout des Tages</span></div>'
      + '<div><h4 style="font-size:22px">'+esc(featured.name)+'</h4><div class="w-meta"><span>~'+Math.round(estimateSec(featured)/60)+' min</span><span>'+featured.steps.length+' Übungen</span><span>'+levelDots(featured.level)+'</span></div></div></button>';
  }
  html += list.filter(w => w !== featured).map(w => {
    const c = CATEGORIES[w.focus] || CATEGORIES.cardio;
    return '<button class="w-card" onclick="openWorkout(\''+w.id+'\')"><div class="glow" style="background:'+c.color+'"></div>'
      + '<div class="w-ic" style="background:'+c.color+'">'+icon(CAT_ICON[w.focus] || 'zap')+'</div>'
      + '<div><h4>'+esc(w.name)+'</h4><div class="w-meta"><span>~'+Math.round(estimateSec(w)/60)+' min</span><span>'+levelDots(w.level || 1)+'</span>'+(w.custom ? '<span>Eigenes</span>' : '')+'</div></div></button>';
  }).join('');
  html += '<button class="w-card add-card" onclick="openBuilder()">'+icon('plus')+' Eigenes Workout</button>';
  $('workoutGrid').innerHTML = html;
}

function openWorkout(id){
  const w = getWorkout(id); if(!w) return;
  const c = CATEGORIES[w.focus] || CATEGORIES.cardio;
  const done = state.workouts.filter(x => x.wid === id).length;
  const steps = w.steps.map(s => {
    const e = exById(s[0]), amt = stepAmount(w, s), t = stepIsTime(w, s);
    return '<button class="list-item" onclick="openExercise(\''+e.id+'\')">'
      + '<img class="thumb" style="object-fit:cover;background:#222" src="'+ytThumb(e.id)+'" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'"/>'
      + '<div class="grow"><b>'+esc(e.name)+'</b><small>'+(t ? amt+' Sek.' : amt+' Wdh.')+' · '+esc(e.muscles)+'</small></div><span class="chev">'+icon('chev')+'</span></button>';
  }).join('');
  openSheet('<div class="pills"><span class="pill lime">'+c.name+'</span><span class="pill">'+LEVELS[w.level || 1]+'</span>'+(done ? '<span class="pill">'+done+'× absolviert</span>' : '')+(coachScale(w) !== 1 ? '<span class="pill lime">Coach: '+Math.round(coachScale(w)*100)+' %</span>' : '')+'</div>'
    + '<h3>'+esc(w.name)+'</h3>'
    + (w.desc ? '<p style="margin-top:6px">'+esc(w.desc)+'</p>' : '')
    + '<div class="tiles" style="margin:16px 0">'
    + '<div class="tile"><div class="ic">'+icon('clock','s')+'</div><b>~'+Math.round(estimateSec(w)/60)+'</b><small>Minuten</small></div>'
    + '<div class="tile"><div class="ic">'+icon('repeat','s')+'</div><b>'+w.rounds+'</b><small>Runden</small></div>'
    + '<div class="tile"><div class="ic">'+icon('flame','s')+'</div><b>~'+Math.round(estimateKcal(w))+'</b><small>kcal</small></div></div>'
    + '<div class="label">Übungen pro Runde · '+w.rest+' s Pause</div>' + steps
    + (w.focus !== 'mobility' ? '<div class="card" style="margin-top:16px;padding:4px 16px"><div class="field"><span>Mit Aufwärmen<br/><small class="muted">3 Minuten Mobilisation vorab</small></span><button class="switch'+(state.settings.warmup ? ' on' : '')+'" role="switch" aria-checked="'+!!state.settings.warmup+'" aria-label="Mit Aufwärmen" onclick="toggleSetting(\'warmup\',this)"></button></div></div>' : '')
    + '<button class="btn btn-lime btn-block" style="margin-top:14px;padding:16px" onclick="startW(\''+w.id+'\')">'+icon('play','f')+' Workout starten</button>'
    + (w.custom ? '<button class="btn btn-danger btn-block" style="margin-top:8px" onclick="deleteCustom(\''+w.id+'\')">Workout löschen</button>' : ''));
}
function estimateKcal(w){
  return w.rounds * sum(w.steps.map(s => { const e = exById(s[0]); return kcalFor(e.met, stepIsTime(w, s) ? stepAmount(w, s) : stepAmount(w, s) * 3.5); }));
}

// ---- Eigenes Workout bauen ----
let builder = null;
function openBuilder(){
  builder = { name: '', rounds: 3, rest: 30, sel: {} };
  renderBuilder();
}
function renderBuilder(){
  const b = builder;
  const groups = Object.entries(CATEGORIES).map(([k, c]) => '<div class="label" style="margin-top:16px">'+c.name+'</div>'
    + EXERCISES.filter(e => e.cat === k).map(e => {
      const on = b.sel[e.id] !== undefined;
      return '<div class="list-item" style="padding:10px 12px">'
        + '<button class="grow" style="text-align:left;display:flex;align-items:center;gap:12px" onclick="toggleBuild(\''+e.id+'\')">'
        + '<span class="check" style="'+(on ? '' : 'background:var(--card2);color:transparent;border:1px solid var(--line)')+'">'+icon('check','s')+'</span>'
        + '<span><b>'+esc(e.name)+'</b><small>'+(e.type === 'time' ? 'Sekunden' : 'Wiederholungen')+'</small></span></button>'
        + (on ? '<input type="number" min="1" max="300" value="'+b.sel[e.id]+'" aria-label="Menge" onchange="builder.sel[\''+e.id+'\']=Math.max(1,parseInt(this.value)||1)" style="width:64px;background:var(--card2);border:1px solid var(--line);border-radius:10px;padding:8px;color:var(--text);text-align:center;font:inherit"/>' : '')
        + '</div>';
    }).join('')).join('');
  openSheet('<h3>Eigenes Workout</h3><p style="margin-top:4px">Wähle Übungen in der Reihenfolge, in der du sie machen willst.</p>'
    + '<div class="card" style="margin-top:14px;padding:6px 16px">'
    + '<div class="field"><span>Name</span><input type="text" id="bName" maxlength="40" placeholder="Mein Workout" value="'+esc(b.name)+'" oninput="builder.name=this.value" style="width:60%"/></div>'
    + '<div class="field"><span>Runden</span><div class="stepper"><button onclick="builder.rounds=Math.max(1,builder.rounds-1);renderBuilder()">−</button><b>'+b.rounds+'</b><button onclick="builder.rounds=Math.min(10,builder.rounds+1);renderBuilder()">+</button></div></div>'
    + '<div class="field"><span>Pause</span><div class="stepper"><button onclick="builder.rest=Math.max(0,builder.rest-10);renderBuilder()">−</button><b>'+b.rest+' s</b><button onclick="builder.rest=Math.min(180,builder.rest+10);renderBuilder()">+</button></div></div>'
    + '</div>' + groups
    + '<button class="btn btn-lime btn-block" style="margin-top:18px;padding:16px;position:sticky;bottom:0" onclick="saveBuilder()">Speichern ('+Object.keys(b.sel).length+' Übungen)</button>');
}
function toggleBuild(id){
  const top = $('sheet').scrollTop;
  if(builder.sel[id] !== undefined) delete builder.sel[id]; else builder.sel[id] = exById(id).def;
  renderBuilder(); $('sheet').scrollTop = top;
}
function saveBuilder(){
  const ids = Object.keys(builder.sel);
  if(!ids.length){ toast('✋', 'Wähle mindestens eine Übung'); return; }
  const counts = {}; ids.forEach(id => { const c = exById(id).cat; counts[c] = (counts[c]||0)+1; });
  const focus = Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
  const w = { id: 'c'+Date.now(), custom: true, name: builder.name.trim() || 'Mein Workout', level: 1, focus,
    rounds: builder.rounds, rest: builder.rest, roundRest: Math.max(builder.rest, 60), steps: ids.map(id => [id, builder.sel[id]]) };
  state.custom.push(w); save(); closeSheet(); workoutFilter = 'custom'; renderWorkouts();
  toast('✨', 'Workout gespeichert', w.name);
}
function deleteCustom(id){
  if(!confirm('Dieses Workout löschen?')) return;
  state.custom = state.custom.filter(w => w.id !== id); save(); closeSheet(); renderWorkouts();
}

// =====================================================================
//  ÜBUNGEN
// =====================================================================
let libFilter = 'all';
function renderLibrary(){
  $('libCount').textContent = EXERCISES.length+' Übungen · jede mit Video-Tutorial';
  const chips = [['all','Alle']].concat(Object.entries(CATEGORIES).map(([k,v]) => [k, v.name]));
  $('libChips').innerHTML = chips.map(([k,n]) => '<button class="chip'+(libFilter === k ? ' on' : '')+'" onclick="libFilter=\''+k+'\';renderLibrary()">'+n+'</button>').join('');
  const q = ($('libSearch').value || '').trim().toLowerCase();
  const list = EXERCISES.filter(e => (libFilter === 'all' || e.cat === libFilter) && (!q || (e.name+' '+e.muscles).toLowerCase().includes(q)));
  $('libGrid').innerHTML = list.length ? list.map(e => {
    const c = CATEGORIES[e.cat];
    return '<button class="ex-card" onclick="openExercise(\''+e.id+'\')"><div class="ex-img" style="background-image:url('+ytThumb(e.id)+'),radial-gradient(circle at 70% 30%,'+c.color+'55,transparent 60%),linear-gradient(135deg,#1d1d1d,#101010)">'
      + '<div class="play">'+icon('play','f s')+'</div><span class="cat-dot" style="background:'+c.color+'">'+c.name+'</span></div>'
      + '<div class="ex-body"><b>'+esc(e.name)+'</b><small>'+LEVELS[e.level]+' · '+(e.type === 'time' ? e.def+' s' : e.def+' Wdh.')+'</small></div></button>';
  }).join('') : '<p class="sub" style="grid-column:1/-1;text-align:center;padding:30px 0">Keine Übung gefunden.</p>';
}

function videoCard(id){
  const v = VIDEOS[id], e = exById(id);
  if(!v) return '<a class="video search-only" href="'+ytUrl(id)+'" target="_blank" rel="noopener"><div class="yt">'+YT_SVG+'</div><span>Tutorial auf YouTube suchen</span></a>';
  return '<a class="video" href="'+ytUrl(id)+'" target="_blank" rel="noopener" aria-label="Video-Tutorial: '+esc(v.title)+'">'
    + '<img src="'+ytThumb(id)+'" alt="" onload="thumbCheck(this)" onerror="thumbFail(this,\''+e.id+'\')"/>'
    + '<div class="yt">'+YT_SVG+'</div>'
    + '<div class="vinfo"><b>'+esc(v.title)+'</b><small>'+(v.channel ? esc(v.channel)+' · ' : '')+'Auf YouTube ansehen</small></div></a>';
}

function openExercise(id){
  const e = exById(id), c = CATEGORIES[e.cat];
  const inW = allWorkouts().filter(w => w.steps.some(s => s[0] === id));
  const reps = sum(state.workouts.map(w => (w.reps && w.reps[id]) || 0));
  openSheet('<div class="pills"><span class="pill" style="background:'+c.color+';color:var(--lime-ink);border:none">'+c.name+'</span><span class="pill">'+LEVELS[e.level]+'</span><span class="pill">'+(e.type === 'time' ? e.def+' Sek.' : e.def+' Wdh.')+'</span></div>'
    + '<h3>'+esc(e.name)+'</h3><p style="margin-top:2px">'+esc(e.muscles)+'</p>'
    + videoCard(id)
    + '<div class="label" style="margin-top:16px">So geht\'s</div><ol class="steps">'+e.steps.map(s => '<li>'+esc(s)+'</li>').join('')+'</ol>'
    + '<div class="tip">'+icon('bulb')+'<span>'+esc(e.tip)+'</span></div>'
    + (reps || state.pbs[id] ? '<div class="tiles" style="margin-top:14px;grid-template-columns:1fr 1fr">'
      + '<div class="tile"><div class="ic">'+icon('trophy','s')+'</div><b>'+(state.pbs[id] || '–')+(state.pbs[id] ? (e.type === 'time' ? ' s' : '') : '')+'</b><small>Bestleistung'+(e.type === 'time' ? '' : ' (Wdh.)')+'</small></div>'
      + '<div class="tile"><div class="ic">'+icon('repeat','s')+'</div><b>'+reps+(e.type === 'time' ? ' s' : '')+'</b><small>gesamt in Workouts</small></div></div>' : '')
    + (inW.length ? '<div class="label" style="margin-top:18px">Enthalten in</div><div class="row">'+inW.map(w => '<button class="chip" onclick="openWorkout(\''+w.id+'\')">'+esc(w.name)+'</button>').join('')+'</div>' : '')
    + '<button class="btn btn-lime btn-block" style="margin-top:18px;padding:16px" onclick="startSingle(\''+id+'\')">'+icon('play','f')+' 3 Sätze trainieren</button>');
}
function startSingle(id){
  const e = exById(id);
  startWorkout({ id: 'single-'+id, name: e.name, focus: e.cat, level: e.level, rounds: 3, rest: 60, roundRest: 60, steps: [[id, e.def]] });
}

// =====================================================================
//  KLIMMZUG-PROGRAMM (10 Sätze, steigend)
// =====================================================================
let selectedDate = null;
let swInterval = null, swBase = 0, swStart = 0, swRunning = false;
let completedSets = [], currentSetIndex = 0, setsForSession = [];
let sessionFinished = false, wakeLock = null, lastSession = null;

function getSets(n, max){
  const base = Math.floor(max/2), high = base+1, s = [];
  for(let i=0;i<10;i++) s.push(i<n ? high : base);
  return s;
}

// render() = Klimmzug-Tab + alles Abhängige neu zeichnen
function render(){
  const goal = state.goal || 20;
  $('maxDisplay').textContent = state.currentMax;
  document.querySelectorAll('#goalDisplay,#goalDisplay2').forEach(el => el.textContent = goal);
  const pct = Math.min(Math.round((state.currentMax / goal) * 100), 100);
  $('goalRing').innerHTML = ringSVG(pct/100) + '<div class="center"><div class="big">'+pct+'%</div><div class="small">vom Ziel</div></div>';
  $('progressText').textContent = (goal - state.currentMax > 0 ? 'noch '+(goal - state.currentMax) : 'Ziel erreicht 🎉');

  const n = state.sessionCount % 10;
  setsForSession = getSets(n, state.currentMax);
  const done = Math.min(Math.max(parseInt(state.doneSets) || 0, 0), 9);
  completedSets = setsForSession.map((_, i) => i < done);
  currentSetIndex = done;
  sessionFinished = false; lastSession = null;
  $('pickNextPrompt').style.display = 'none';
  $('sessionDate').value = selectedDate || todayStr();

  const base = Math.floor(state.currentMax / 2);
  $('sessionLabel').textContent = 'Session ' + (state.sessions.length + 1);
  $('planInfo').textContent = n + '× ' + (base+1) + ' + ' + (10-n) + '× ' + base + ' Wdh.';

  renderSets(); renderNext(); renderStreak(); renderStats(); renderChart();
  renderTab(currentTab);
}

function renderSets(){
  const grid = $('setsGrid');
  grid.innerHTML = '';
  setsForSession.forEach((reps, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'set-btn' + (completedSets[i] ? ' done' : (i === currentSetIndex && !sessionFinished ? ' active' : ''));
    btn.setAttribute('aria-label', 'Satz '+(i+1)+': '+reps+' Wiederholungen'+(completedSets[i] ? ', erledigt' : ''));
    btn.innerHTML = '<span class="sl">Satz '+(i+1)+'</span><span class="sr">'+(completedSets[i] ? '✓' : reps+'×')+'</span>';
    btn.onclick = () => completeSet(i);
    grid.appendChild(btn);
  });
  $('undoBtn').disabled = sessionFinished || currentSetIndex === 0;
}

function completeSet(i){
  if(sessionFinished || i !== currentSetIndex) return;
  if(i === 0) state.sessionStart = Date.now();
  completedSets[i] = true; currentSetIndex = i+1;
  state.doneSets = currentSetIndex;
  buzz(40); beep(880, .08);
  if(currentSetIndex >= 10){ finishSession(); }
  else {
    save(); requestWake();
    resetSW(); toggleSW();
  }
  renderSets();
}

function undoSet(){
  if(sessionFinished || currentSetIndex === 0) return;
  currentSetIndex--; completedSets[currentSetIndex] = false;
  state.doneSets = currentSetIndex;
  save(); resetSW(); renderSets();
}

function finishSession(){
  const dateStr = selectedDate || todayStr();
  state.sessionCount++;
  const dur = state.sessionStart ? Math.min(Math.round((Date.now() - state.sessionStart)/1000), 3*3600) : undefined;
  lastSession = { date: dateStr, sets: [...setsForSession], max: state.currentMax };
  if(dur && dur > 60) lastSession.dur = dur;
  state.sessions.push(lastSession);
  sortByDate(state.sessions);
  state.doneSets = 0; delete state.sessionStart;
  selectedDate = null;
  sessionFinished = true;
  save(); releaseWake(); resetSW();
  confetti();

  const cycleDone = state.sessionCount % 10 === 0;
  $('pickNextText').textContent = cycleDone
    ? '✓ Einheit gespeichert – Zyklus komplett (10 Einheiten)! Mach jetzt einen Max-Test.'
    : '✓ Einheit gespeichert! Wie war\'s? Empfehlung: mindestens 2 Tage Pause.';
  renderFeel();
  $('noteInput').value = '';
  $('pickNextPrompt').style.display = 'block';
  renderSets(); renderNext(); renderStreak(); renderStats(); renderChart();
  checkBadges();
}

function renderFeel(){
  const row = $('feelRow');
  row.innerHTML = '';
  FEELS.forEach((e, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = e;
    b.setAttribute('aria-label', FEEL_TXT[i]);
    b.className = lastSession && lastSession.feel === i+1 ? 'on' : '';
    b.onclick = () => { if(!lastSession) return; lastSession.feel = lastSession.feel === i+1 ? undefined : i+1; save(); renderFeel(); };
    row.appendChild(b);
  });
}
function saveNote(){
  if(!lastSession) return;
  const v = $('noteInput').value.trim();
  if(v) lastSession.note = v; else delete lastSession.note;
  save();
}

function selectDate(ds){
  if(!ds || ds === todayStr()){ selectedDate = null; return; }
  if(ds > todayStr()){ toast('📅', 'Datum liegt in der Zukunft'); $('sessionDate').value = todayStr(); selectedDate = null; return; }
  selectedDate = ds;
  toast('📅', 'Einheit wird für den '+formatDate(ds)+' gespeichert');
}

// ---- Max / Ziel / Test ----
function openGoalSheet(){
  openSheet('<h3>Max & Ziel</h3><p>Dein aktuelles Maximum bestimmt den Trainingsplan.</p>'
    + '<div class="card" style="margin-top:14px;padding:6px 16px">'
    + '<div class="field"><span>Mein Max</span><input type="number" id="maxInput" min="1" max="100" value="'+state.currentMax+'"/></div>'
    + '<div class="field"><span>Ziel</span><input type="number" id="goalInput" min="1" max="100" value="'+(state.goal||20)+'"/></div></div>'
    + '<button class="btn btn-lime btn-block" style="margin-top:16px" onclick="updateGoals()">Speichern</button>');
}
function updateGoals(){
  const max = parseInt($('maxInput').value), goal = parseInt($('goalInput').value);
  if(!max || max < 1 || !goal || goal < 1) return;
  if(max !== state.currentMax) state.doneSets = 0;
  state.currentMax = max; state.goal = goal;
  save(); resetSW(); closeSheet(); render(); checkBadges();
}
function openTestSheet(){
  openSheet('<h3>Max-Test</h3><p>Ausgeruht und gut aufgewärmt: so viele saubere Klimmzüge wie möglich in einem Satz.</p>'
    + videoCard('pullup')
    + '<div class="card" style="margin-top:10px;padding:6px 16px"><div class="field"><span>Geschafft</span><input type="number" id="testInput" min="1" max="100" placeholder="Wdh." value="'+state.currentMax+'"/></div></div>'
    + '<button class="btn btn-lime btn-block" style="margin-top:16px" onclick="saveTest()">Test speichern</button>');
}
function saveTest(){
  const v = parseInt($('testInput').value);
  if(!v || v < 1 || v > 100){ $('testInput').focus(); return; }
  const prev = state.currentMax;
  state.tests.push({ date: todayStr(), max: v });
  sortByDate(state.tests);
  if(v !== state.currentMax) state.doneSets = 0;
  state.currentMax = v;
  save(); resetSW(); closeSheet(); render();
  if(v > prev){ confetti(); toast('🚀', 'Neuer Rekord: '+v+' Klimmzüge!', '+'+(v-prev)+' seit dem letzten Stand'); }
  else toast('📝', 'Max-Test gespeichert', v+' Klimmzüge');
  checkBadges();
}
function deleteTest(i){
  const t = state.tests[i];
  if(!t || !confirm('Max-Test vom '+formatDate(t.date)+' ('+t.max+') löschen? Dein aktuelles Max bleibt unverändert.')) return;
  state.tests.splice(i, 1);
  save(); render();
}

// ---- Stoppuhr ----
function swSecs(){ return Math.floor((swBase + (swRunning ? Date.now() - swStart : 0)) / 1000); }
function toggleSW(){
  if(swRunning){
    swBase += Date.now() - swStart; clearInterval(swInterval); swRunning = false;
    $('swBtn').textContent = 'Weiter'; updateSW();
  } else {
    swStart = Date.now(); swRunning = true;
    $('swBtn').textContent = 'Stop';
    swInterval = setInterval(updateSW, 250);
  }
}
function resetSW(){ clearInterval(swInterval); swRunning = false; swBase = 0; updateSW(); $('swBtn').textContent = 'Start'; }
function updateSW(){ $('swDisplay').textContent = fmtTime(swSecs()); }

function renderNext(){
  const box = $('nextSessionBox');
  if(state.sessions.length === 0){
    box.innerHTML = '<div class="next-box ready"><div class="t">Nächstes Training</div><div class="d">Heute starten!</div><div class="s">Leg jetzt los mit Session 1.</div></div>';
    return;
  }
  const diff = pullupDue(), next = addDays(parseDate(state.sessions[state.sessions.length-1].date), 2);
  let label, sub, cls;
  if(diff <= 0){ label = 'Bereit!'; sub = 'Genug pausiert – los geht\'s!'; cls = 'ready'; }
  else if(diff === 1){ label = 'Morgen'; sub = 'Noch 1 Tag Ruhe. Heute passt ein Core- oder Bein-Workout.'; cls = ''; }
  else { label = formatDate(toStr(next)); sub = 'Noch '+diff+' Tage Ruhe für optimale Regeneration.'; cls = ''; }
  box.innerHTML = '<div class="next-box '+cls+'"><div class="t">Empfohlenes Training</div><div class="d">'+label+'</div><div class="s">'+sub+'</div></div>';
}

// Serie: aufeinanderfolgende Wochen mit mindestens einer Aktivität
function streakWeeks(){
  const keys = new Set(activityDates().map(ds => weekKey(parseDate(ds))));
  let w = parseDate(weekKey(new Date()));
  if(!keys.has(toStr(w))) w = addDays(w, -7);
  let streak = 0;
  while(keys.has(toStr(w))){ streak++; w = addDays(w, -7); }
  return streak;
}
function renderStreak(){
  const s = streakWeeks(), badge = $('streakBadge');
  badge.textContent = s === 0 ? '0 Wochen' : '🔥 '+s+' Woche'+(s !== 1 ? 'n' : '');
  badge.title = 'Aufeinanderfolgende Wochen mit Training';
}
function renderStats(){
  const reps = sum(state.sessions.map(s => sum(s.sets)));
  const days = Math.max(0, Math.round((DEADLINE - parseDate(todayStr())) / 86400000));
  $('statSessions').textContent = state.sessions.length;
  $('statReps').textContent = reps;
  $('statDays').textContent = days;
}

// ---- Max-Verlauf + Prognose ----
function maxPoints(){
  const pts = state.sessions.map(s => ({ t: parseDate(s.date).getTime(), v: s.max }))
    .concat(state.tests.map(x => ({ t: parseDate(x.date).getTime(), v: x.max, test: true })))
    .sort((a, b) => a.t - b.t);
  const todayT = parseDate(todayStr()).getTime();
  if(!pts.length || pts[pts.length-1].v !== state.currentMax) pts.push({ t: todayT, v: state.currentMax, today: true });
  return pts;
}
function renderChart(){
  const box = $('chartBox'), fc = $('forecast');
  const pts = maxPoints(), goal = state.goal || 20;
  if(state.sessions.length + state.tests.length < 2){
    box.innerHTML = '<div class="sub">Nach zwei Einheiten oder Max-Tests siehst du hier deinen Verlauf.</div>';
    fc.textContent = ''; return;
  }
  const W = 300, H = 130, L = 22, R = 8, T = 8, B = 18;
  const t0 = pts[0].t, t1 = Math.max(pts[pts.length-1].t, t0 + 86400000);
  const lo = Math.max(0, Math.min(...pts.map(p => p.v)) - 1), hi = Math.max(goal, ...pts.map(p => p.v)) + 1;
  const x = t => L + (t - t0) / (t1 - t0) * (W - L - R);
  const y = v => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const line = pts.map((p,i) => (i ? 'L' : 'M') + x(p.t).toFixed(1) + ' ' + y(p.v).toFixed(1)).join(' ');
  const area = line + ' L' + x(pts[pts.length-1].t).toFixed(1) + ' ' + (H-B) + ' L' + x(pts[0].t).toFixed(1) + ' ' + (H-B) + ' Z';
  const dots = pts.map(p => p.test
    ? '<circle cx="'+x(p.t).toFixed(1)+'" cy="'+y(p.v).toFixed(1)+'" r="4" fill="#0a0a0a" stroke="#f5f5f0" stroke-width="1.5"/>'
    : '<circle cx="'+x(p.t).toFixed(1)+'" cy="'+y(p.v).toFixed(1)+'" r="2.5" fill="#d4ff3a"/>').join('');
  const fmt = t => { const d = new Date(t); return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'; };
  box.innerHTML = '<svg class="chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Verlauf deines Maximums">'
    + '<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4ff3a" stop-opacity=".35"/><stop offset="1" stop-color="#d4ff3a" stop-opacity="0"/></linearGradient></defs>'
    + '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(goal)+'" y2="'+y(goal)+'" stroke="#8aa52a" stroke-dasharray="3 3"/>'
    + '<text x="'+(L-3)+'" y="'+(y(goal)+3)+'" text-anchor="end">'+goal+'</text>'
    + '<text x="'+(L-3)+'" y="'+(y(lo)+3)+'" text-anchor="end">'+lo+'</text>'
    + '<path d="'+area+'" fill="url(#ga)"/>'
    + '<path d="'+line+'" fill="none" stroke="#d4ff3a" stroke-width="2" stroke-linejoin="round"/>'+dots
    + '<text x="'+L+'" y="'+(H-4)+'">'+fmt(t0)+'</text>'
    + '<text x="'+(W/2)+'" y="'+(H-4)+'" text-anchor="middle">○ Max-Test · ● Einheit</text>'
    + '<text x="'+(W-R)+'" y="'+(H-4)+'" text-anchor="end">'+fmt(t1)+'</text></svg>';

  const days = (t1 - t0) / 86400000, left = Math.max(1, Math.round((DEADLINE - parseDate(todayStr())) / 86400000));
  const need = goal - state.currentMax;
  let txt = '';
  if(need <= 0) txt = '<b>Ziel erreicht!</b> Zeit für ein neues Ziel.';
  else {
    txt = 'Bis Ende 2026 fehlen noch <b>'+need+'</b> Klimmzüge (≈ '+(need / left * 30).toFixed(1).replace('.',',')+' pro Monat nötig). ';
    if(days >= 14){
      const n = pts.length, mt = sum(pts.map(p => (p.t-t0)/86400000))/n, mv = sum(pts.map(p => p.v))/n;
      let num = 0, den = 0;
      pts.forEach(p => { const dx = (p.t-t0)/86400000 - mt; num += dx*(p.v-mv); den += dx*dx; });
      const slope = den ? num/den : 0;
      if(slope > 0){
        const eta = new Date(parseDate(todayStr()).getTime() + (need / slope) * 86400000);
        txt += 'Bei deinem Tempo erreichst du das Ziel ca. <b>'+formatDate(toStr(eta))+'</b>' + (eta > DEADLINE ? ' – also nach dem Stichtag.' : ' – im Plan.');
      } else txt += 'Dein Max stagniert bisher – mach regelmäßig einen Max-Test.';
    } else txt += 'Eine Prognose gibt es nach 2 Wochen Training.';
  }
  fc.innerHTML = txt;
}

function showSession(ds){
  const s = state.sessions.filter(x => x.date === ds).pop(); if(!s) return;
  openSheet('<div class="pills"><span class="pill lime">Klimmzug-Programm</span></div><h3>'+formatDate(ds)+'</h3>'
    + '<p>Max damals: '+s.max+' Klimmzüge'+(s.dur ? ' · Dauer '+fmtMin(s.dur) : '')+'</p>'
    + '<div class="sets-grid" style="margin-top:14px">'+s.sets.map((r,i) => '<div class="set-btn done"><span class="sl">Satz '+(i+1)+'</span><span class="sr">'+r+'</span></div>').join('')+'</div>'
    + '<p style="margin-top:14px;color:var(--lime);font-weight:700">Gesamt: '+sum(s.sets)+' Klimmzüge</p>'
    + (s.feel ? '<p>Gefühl: '+FEELS[s.feel-1]+' '+FEEL_TXT[s.feel-1]+'</p>' : '')
    + (s.note ? '<p>Notiz: '+esc(s.note)+'</p>' : ''));
}
function showWorkoutLog(i){
  const w = state.workouts[i]; if(!w) return;
  const rows = Object.entries(w.reps || {}).map(([id, n]) => { const e = exById(id); return e ? '<div class="field"><span>'+esc(e.name)+'</span><b>'+n+(e.type === 'time' || w.timed ? ' s' : ' Wdh.')+'</b></div>' : ''; }).join('');
  openSheet('<div class="pills"><span class="pill lime">Workout</span></div><h3>'+esc(w.name)+'</h3><p>'+formatDate(w.date)+'</p>'
    + '<div class="tiles" style="margin:14px 0"><div class="tile"><b>'+fmtMin(w.dur)+'</b><small>Dauer</small></div><div class="tile"><b>'+Math.round(w.kcal||0)+'</b><small>kcal</small></div><div class="tile"><b>'+(w.feel ? FEELS[w.feel-1] : '–')+'</b><small>Gefühl</small></div></div>'
    + (rows ? '<div class="card" style="padding:4px 16px">'+rows+'</div>' : '')
    + '<button class="btn btn-danger btn-block" style="margin-top:14px" onclick="deleteWorkoutLog('+i+')">Eintrag löschen</button>');
}
function deleteWorkoutLog(i){
  if(!confirm('Diesen Workout-Eintrag löschen?')) return;
  state.workouts.splice(i, 1); save(); closeSheet(); render();
}

// =====================================================================
//  FORTSCHRITT
// =====================================================================
let barRange = '7';
let calYear = new Date().getFullYear(), calMon = new Date().getMonth();
document.querySelectorAll('#barSeg button').forEach(b => b.onclick = () => {
  barRange = b.dataset.r;
  document.querySelectorAll('#barSeg button').forEach(x => x.classList.toggle('on', x === b));
  renderBars();
});

function secByDate(){
  const m = {};
  state.workouts.forEach(w => { m[w.date] = (m[w.date]||0) + (w.dur||0); });
  state.sessions.forEach(s => { m[s.date] = (m[s.date]||0) + sessionSec(s); });
  return m;
}
function renderProfile(){
  const totalSec = sum(Object.values(secByDate()));
  const totalKcal = sum(state.workouts.map(w => w.kcal || 0)) + sum(state.sessions.map(s => kcalFor(8, sessionSec(s)*0.4)));
  $('totalStats').innerHTML =
      '<div class="tile"><div class="ic">'+icon('zap','s')+'</div><b>'+activityCount()+'</b><small>Trainings</small></div>'
    + '<div class="tile"><div class="ic">'+icon('clock','s')+'</div><b>'+Math.round(totalSec/3600*10)/10+' h</b><small>Gesamtzeit</small></div>'
    + '<div class="tile"><div class="ic">'+icon('bar','s')+'</div><b>'+totalPullups()+'</b><small>Klimmzüge</small></div>';
  renderBars(); renderBadges(); renderCal();
  const items = allActivities().slice(0, 30);
  $('historyList').innerHTML = items.length ? items.map(activityRow).join('') : '<div class="card sub">Noch kein Training eingetragen.</div>';
}
function renderBars(){
  const m = secByDate(), today = parseDate(todayStr());
  let cols = [];
  if(barRange === '7'){
    for(let i = 6; i >= 0; i--){ const d = addDays(today, -i); cols.push({ l: DE_DAYS[(d.getDay()+6)%7], v: m[toStr(d)] || 0, today: i === 0 }); }
  } else {
    const wk = parseDate(weekKey(today));
    for(let i = 7; i >= 0; i--){
      const start = addDays(wk, -7*i); let v = 0;
      for(let k = 0; k < 7; k++) v += m[toStr(addDays(start, k))] || 0;
      cols.push({ l: pad(start.getDate())+'.'+pad(start.getMonth()+1)+'.', v, today: i === 0 });
    }
  }
  const max = Math.max(...cols.map(c => c.v), 600);
  $('bars').innerHTML = cols.map(c => '<div class="b'+(c.v ? ' on' : '')+(c.today ? ' today' : '')+'" title="'+fmtMin(c.v)+'"><i style="height:'+Math.max(5, c.v/max*100)+'%"></i><small>'+c.l+'</small></div>').join('');
  const tot = sum(cols.map(c => c.v));
  $('barsSum').textContent = (barRange === '7' ? 'Letzte 7 Tage: ' : 'Letzte 8 Wochen: ') + fmtMin(tot) + ' Training';
}

function renderCal(){
  $('calMonth').textContent = DE_MONTHS[calMon] + ' ' + calYear;
  const grid = $('calGrid');
  let html = DE_DAYS.map(d => '<div class="cal-dl">'+d+'</div>').join('');
  const offset = (new Date(calYear, calMon, 1).getDay() + 6) % 7;
  const dim = new Date(calYear, calMon+1, 0).getDate();
  const today = todayStr();
  const sDates = new Set(state.sessions.map(s => s.date)), wDates = new Set(state.workouts.map(w => w.date));
  for(let i = 0; i < offset; i++) html += '<div></div>';
  for(let d = 1; d <= dim; d++){
    const ds = calYear+'-'+pad(calMon+1)+'-'+pad(d);
    const s = sDates.has(ds), w = wDates.has(ds);
    let cls = 'cal-day' + (s || w ? ' has' : '') + (w && !s ? ' w' : '') + (s && w ? ' both' : '') + (ds === today ? ' today' : '');
    html += '<div class="'+cls+'"'+(s || w ? ' role="button" tabindex="0" onclick="showDay(\''+ds+'\')" onkeydown="if(event.key===\'Enter\')showDay(\''+ds+'\')"' : '')+'>'+d+'</div>';
  }
  grid.innerHTML = html;
}
function showDay(ds){
  const s = state.sessions.filter(x => x.date === ds), w = state.workouts.map((x, i) => ({ x, i })).filter(o => o.x.date === ds);
  if(s.length && !w.length) return showSession(ds);
  if(w.length === 1 && !s.length) return showWorkoutLog(w[0].i);
  openSheet('<h3>'+formatDate(ds)+'</h3><div style="margin-top:12px">'
    + s.map(x => activityRow({ kind: 's', x })).join('') + w.map(o => activityRow({ kind: 'w', x: o.x, i: o.i })).join('') + '</div>');
}
function prevMonth(){ calMon--; if(calMon<0){calMon=11;calYear--;} renderCal(); }
function nextMonth(){ calMon++; if(calMon>11){calMon=0;calYear++;} renderCal(); }

// ---- Erfolge ----
const BADGES = [
  { id: 'first',   em: '🏁', name: 'Erster Schritt', desc: 'Erstes Training absolviert', test: s => s.count >= 1 },
  { id: 'ten',     em: '🔟', name: 'Zehner',         desc: '10 Trainings', test: s => s.count >= 10 },
  { id: 'fifty',   em: '🏅', name: 'Halbes Hundert', desc: '50 Trainings', test: s => s.count >= 50 },
  { id: 'streak3', em: '🔥', name: 'Dranbleiben',    desc: '3 Wochen in Folge', test: s => s.streak >= 3 },
  { id: 'streak8', em: '⚡', name: 'Eiserne Serie',  desc: '8 Wochen in Folge', test: s => s.streak >= 8 },
  { id: 'pull100', em: '💯', name: '100 Klimmzüge',  desc: 'Insgesamt 100 Klimmzüge', test: s => s.pulls >= 100 },
  { id: 'pull1k',  em: '🦍', name: 'Gorilla',        desc: 'Insgesamt 1000 Klimmzüge', test: s => s.pulls >= 1000 },
  { id: 'max10',   em: '💪', name: 'Zweistellig',    desc: 'Max von 10 Klimmzügen', test: s => s.max >= 10 },
  { id: 'goal',    em: '🏆', name: 'Ziel erreicht',  desc: 'Dein Klimmzug-Ziel geschafft', test: s => s.max >= s.goal },
  { id: 'cycle',   em: '🔄', name: 'Zyklus',         desc: '10 Klimmzug-Einheiten', test: s => s.sessions >= 10 },
  { id: 'allround',em: '🧭', name: 'Allrounder',     desc: '15 verschiedene Übungen', test: s => s.distinct >= 15 },
  { id: 'hiit',    em: '🥵', name: 'HIIT-Held',      desc: '5× HIIT 15', test: s => s.hiit >= 5 },
  { id: 'hour',    em: '⏱️', name: 'Erste Stunde',   desc: '60 Minuten Training', test: s => s.sec >= 3600 },
  { id: 'tenh',    em: '🕙', name: '10 Stunden',     desc: '10 Stunden Training', test: s => s.sec >= 36000 },
  { id: 'early',   em: '🌅', name: 'Früher Vogel',   desc: 'Workout vor 8 Uhr', test: s => s.early },
  { id: 'night',   em: '🌙', name: 'Nachteule',      desc: 'Workout nach 21 Uhr', test: s => s.night },
  { id: 'mobile',  em: '🧘', name: 'Geschmeidig',    desc: '5 Mobility-Einheiten', test: s => s.mobility >= 5 },
  { id: 'pbs',     em: '📈', name: 'Rekordjäger',    desc: '5 neue Bestleistungen', test: s => s.pbHits >= 5 },
  { id: 'plan',    em: '🎯', name: 'Planerfüller',   desc: 'Eine Woche nach Plan komplett', test: s => s.planWeek },
  { id: 'lib',     em: '📚', name: 'Entdecker',      desc: '30 verschiedene Übungen', test: s => s.distinct >= 30 },
];
function badgeStats(){
  const distinct = new Set(); state.workouts.forEach(w => Object.keys(w.reps || {}).forEach(k => distinct.add(k)));
  if(state.sessions.length) distinct.add('pullup');
  const hours = state.workouts.filter(w => w.t).map(w => new Date(w.t).getHours());
  return { count: activityCount(), streak: streakWeeks(), pulls: totalPullups(), max: state.currentMax, goal: state.goal || 20,
    sessions: state.sessions.length, distinct: distinct.size, hiit: state.workouts.filter(w => w.wid === 'hiit-15').length,
    sec: sum(Object.values(secByDate())), early: hours.some(h => h < 8), night: hours.some(h => h >= 21),
    mobility: state.workouts.filter(w => w.focus === 'mobility').length, pbHits: state.pbHits || 0,
    planWeek: (() => { const pl = weekPlan(); return pl.length > 0 && pl.every(it => planItemDone(it, pl)); })() };
}
function renderBadges(){
  const st = badgeStats(), have = BADGES.filter(b => b.test(st)).length;
  $('badgeCount').textContent = have+' / '+BADGES.length;
  $('badges').innerHTML = BADGES.map(b => { const on = b.test(st);
    return '<button class="badge'+(on ? ' on' : '')+'" onclick="toast(\''+b.em+'\', \''+b.name+'\', \''+(on ? 'Freigeschaltet · ' : 'Noch offen · ')+b.desc+'\')"><div class="em">'+b.em+'</div><small>'+b.name+'</small></button>'; }).join('');
}
function checkBadges(){
  const st = badgeStats(), fresh = BADGES.filter(b => b.test(st) && !state.badges.includes(b.id));
  if(!fresh.length) return;
  fresh.forEach(b => state.badges.push(b.id)); save();
  fresh.forEach((b, i) => setTimeout(() => { toast(b.em, 'Erfolg freigeschaltet: '+b.name, b.desc); beep(1320, .12); }, 600 + i*3400));
}

// ---- Einstellungen ----
function openSettings(){
  const s = state.settings;
  const sw = (k, label, sub) => '<div class="field"><span>'+label+(sub ? '<br/><small class="muted">'+sub+'</small>' : '')+'</span><button class="switch'+(s[k] ? ' on' : '')+'" role="switch" aria-checked="'+!!s[k]+'" aria-label="'+label+'" onclick="toggleSetting(\''+k+'\',this)"></button></div>';
  const c = state.coach;
  openSheet('<h3>Einstellungen</h3>'
    + '<button class="card coach-cta" style="margin-top:14px" onclick="openOnboarding()"><div class="w-ic" style="background:var(--lime)">'+icon('target')+'</div><div class="grow" style="text-align:left"><b>'+(c ? GOALS[c.goal].em+' '+GOALS[c.goal].name : 'Coach einrichten')+'</b><small>'+(c ? c.days+' Tage/Woche · '+LEVELS[c.level]+' · Intensität '+Math.round((c.scale||1)*100)+' %' : 'Ziel, Level und Trainingstage festlegen')+'</small></div><span class="chev">'+icon('chev')+'</span></button>'
    + '<div class="card" style="margin-top:12px;padding:6px 16px">'
    + '<div class="field"><span>Dein Name</span><input type="text" maxlength="20" value="'+esc(s.name)+'" placeholder="optional" onchange="state.settings.name=this.value.trim();save();renderHome()" style="width:55%"/></div>'
    + (c ? '' : '<div class="field"><span>Wochenziel<br/><small class="muted">Trainingstage pro Woche</small></span><div class="stepper"><button onclick="setWeekly(-1)">−</button><b id="wgVal">'+s.weeklyGoal+'</b><button onclick="setWeekly(1)">+</button></div></div>')
    + '<div class="field"><span>Körpergewicht<br/><small class="muted">für die kcal-Schätzung</small></span><input type="number" min="30" max="200" value="'+s.weight+'" onchange="state.settings.weight=Math.min(200,Math.max(30,parseInt(this.value)||75));save()"/></div>'
    + sw('warmup', 'Automatisch aufwärmen', '3 Minuten vor jedem Workout')
    + sw('sound', 'Töne', 'Countdown-Pieptöne im Workout')
    + sw('voice', 'Sprachansage', 'Sagt Übungen und Pausen an')
    + '</div>');
}
function toggleSetting(k, el){ state.settings[k] = !state.settings[k]; save(); if(el && el.classList){ el.classList.toggle('on', state.settings[k]); el.setAttribute('aria-checked', state.settings[k]); } if(k === 'voice' && state.settings.voice) say('Sprachansage an'); }
function setWeekly(d){ state.settings.weeklyGoal = Math.min(7, Math.max(1, state.settings.weeklyGoal + d)); $('wgVal').textContent = state.settings.weeklyGoal; save(); renderHome(); }

// =====================================================================
//  WORKOUT-PLAYER
// =====================================================================
let P = null;   // Player-Zustand
function addRounds(q, w, warm){
  for(let r = 0; r < w.rounds; r++){
    w.steps.forEach((s, i) => {
      const time = stepIsTime(w, s);
      q.push({ kind: 'work', ex: s[0], amount: stepAmount(w, s), time, round: r+1, warm });
      const last = i === w.steps.length - 1;
      if(!last && w.rest > 0) q.push({ kind: 'rest', secs: w.rest, round: r+1, warm });
      if(last && r < w.rounds - 1 && w.roundRest > 0) q.push({ kind: 'rest', secs: w.roundRest, round: r+1, roundBreak: true });
    });
  }
}
function buildQueue(w, warm){
  const q = [{ kind: 'ready', secs: 5, ex: (warm ? WARMUP : w).steps[0][0] }];
  if(warm){ addRounds(q, WARMUP, true); q.push({ kind: 'rest', secs: 20, round: 1, warmEnd: true }); }
  addRounds(q, w, false);
  return q;
}
function startWorkout(arg, opts){
  const w = typeof arg === 'string' ? getWorkout(arg) : arg;
  if(!w) return;
  closeSheet();
  unlockAudio();
  P = { w, q: buildQueue(w, opts && opts.warm), i: 0, paused: false, segStart: Date.now(), pausedAt: 0, startedAt: Date.now(),
        workSec: {}, reps: {}, best: {}, cur: 0, lastBeep: -1, timer: null, summary: false, feel: 0 };
  $('player').classList.add('show');
  document.body.style.overflow = 'hidden';
  requestWake();
  enterSeg();
  P.timer = setInterval(tick, 200);
}
function seg(){ return P.q[P.i]; }
function segDuration(s){ return s.kind === 'work' ? (s.time ? s.amount : 0) : s.secs; }
function segElapsed(){ return ((P.paused ? P.pausedAt : Date.now()) - P.segStart) / 1000; }
function nextWork(from){ for(let k = from; k < P.q.length; k++) if(P.q[k].kind === 'work') return P.q[k]; return null; }

function enterSeg(){
  const s = seg();
  P.segStart = Date.now(); P.lastBeep = -1;
  if(P.paused){ P.pausedAt = Date.now(); }
  const e = s.ex ? exById(s.ex) : null;
  if(s.kind === 'ready') say('Mach dich bereit. Erste Übung: '+e.name);
  else if(s.kind === 'work'){
    P.cur = s.amount;
    beep(1046, .18); buzz(80);
    say(e.name + (s.time ? ', ' + s.amount + ' Sekunden' : ', ' + s.amount + ' Wiederholungen'));
  } else {
    const nx = nextWork(P.i+1);
    say((s.warmEnd ? 'Aufwärmen geschafft. Jetzt geht es richtig los. ' : s.roundBreak ? 'Runde geschafft. ' : 'Pause. ') + (nx ? 'Als Nächstes: ' + exById(nx.ex).name : ''));
  }
  drawPlayer();
}
function logWork(s, secs){
  if(!s || s.kind !== 'work') return;
  const val = s.time ? Math.round(secs) : P.cur;
  P.workSec[s.ex] = (P.workSec[s.ex] || 0) + secs;
  P.reps[s.ex] = (P.reps[s.ex] || 0) + val;
  // Bestleistung pro Satz (ohne Aufwärmen und ohne feste Intervalle)
  if(!s.warm && !P.w.work && val > (P.best[s.ex] || 0)) P.best[s.ex] = val;
}
function adjReps(d){
  if(!P) return; const s = seg(); if(s.kind !== 'work' || s.time) return;
  P.cur = Math.max(0, Math.min(999, P.cur + d)); buzz(15); updatePlayerTime();
  const r = $('pRing'); if(r){ r.classList.remove('pulse'); void r.offsetWidth; r.classList.add('pulse'); }
}
function advance(dir){
  if(!P || P.summary) return;
  const s = seg();
  if(dir > 0 && s.kind === 'work') logWork(s, s.time ? Math.min(segElapsed(), s.amount) : segElapsed());
  P.i += dir;
  if(P.i < 0) P.i = 0;
  if(P.i >= P.q.length) return finishWorkout();
  enterSeg();
}
function tick(){
  if(!P || P.summary) return;
  if(P.paused) return;
  const s = seg(), dur = segDuration(s), el = segElapsed();
  if(dur){
    const left = Math.ceil(dur - el);
    if(left <= 3 && left >= 1 && left !== P.lastBeep){ P.lastBeep = left; beep(660, .1); }
    if(el >= dur) return advance(1);
  }
  updatePlayerTime();
}
function togglePause(){
  if(!P) return;
  if(P.paused){ P.segStart += Date.now() - P.pausedAt; P.paused = false; }
  else { P.pausedAt = Date.now(); P.paused = true; }
  drawPlayer();
}
function addRest(sec){ const s = seg(); if(s.kind !== 'work'){ s.secs += sec; drawPlayer(); } }
function closePlayer(force){
  if(!P) return;
  const didWork = Object.keys(P.reps).length > 0;
  if(!force && !P.summary){
    if(didWork){ if(confirm('Workout beenden? Bisherige Übungen werden gespeichert.')) return finishWorkout(); return; }
    if(!confirm('Workout abbrechen?')) return;
  }
  clearInterval(P.timer); P = null;
  $('player').classList.remove('show','rest');
  document.body.style.overflow = '';
  releaseWake(); try { speechSynthesis.cancel(); } catch(e) {}
  render();
}

function workProgress(){ // Fortschritt über Arbeits-Segmente für Balken oben
  const works = P.q.map((s, k) => ({ s, k })).filter(o => o.s.kind === 'work');
  return works;
}
function drawPlayer(){
  const pl = $('player'), s = seg(), w = P.w;
  pl.classList.toggle('rest', s.kind !== 'work');
  const works = workProgress();
  const totalRounds = w.rounds;
  const prog = works.map(o => '<i class="'+(o.k < P.i ? 'done' : (o.k === P.i ? 'cur' : ''))+'"></i>').join('');
  const e = s.ex ? exById(s.ex) : null;
  let phase, name, unit, center;
  if(s.kind === 'ready'){ phase = 'Gleich geht\'s los'; name = 'Mach dich bereit'; unit = 'Sekunden'; }
  const single = w.steps.length === 1;
  if(s.kind === 'work'){ phase = s.warm ? 'Aufwärmen' : (single ? 'Satz ' : 'Runde ')+s.round+' / '+totalRounds; name = e.name; unit = s.time ? 'Sekunden' : 'Wiederholungen'; }
  else if(s.kind === 'rest'){ phase = s.warmEnd ? 'Aufwärmen geschafft' : s.roundBreak ? (single ? 'Satz geschafft' : 'Runde geschafft') : 'Pause'; name = s.warmEnd ? 'Jetzt geht\'s los' : 'Durchatmen'; unit = 'Sekunden Pause'; }

  const showNext = s.kind !== 'work' ? (s.kind === 'ready' ? nextWork(1) : nextWork(P.i+1)) : nextWork(P.i+1);
  const nextHtml = showNext ? '<div class="p-next">'+(VIDEOS[showNext.ex] ? '<img src="'+ytThumb(showNext.ex)+'" alt="" onerror="this.style.visibility=\'hidden\'"/>' : '<div class="ph"></div>')
    + '<div><small>'+(s.kind === 'work' ? 'Danach' : 'Als Nächstes')+'</small><b>'+esc(exById(showNext.ex).name)+' · '+(showNext.time ? showNext.amount+' s' : showNext.amount+'×')+'</b></div></div>'
    : '<div class="p-next"><div class="ph" style="display:grid;place-items:center;color:var(--lime)">🏁</div><div><small>Danach</small><b>Geschafft!</b></div></div>';

  const repsWork = s.kind === 'work' && !s.time;
  pl.innerHTML =
    '<div class="p-top"><button class="icon-btn" onclick="closePlayer()" aria-label="Schließen">'+icon('x')+'</button>'
    + '<div class="ttl">'+esc(w.name)+'</div>'
    + '<button class="icon-btn" onclick="toggleSetting(\'voice\');drawPlayer()" aria-label="Sprachansage umschalten" style="'+(state.settings.voice ? 'color:var(--lime)' : 'opacity:.4')+'">'+icon('vol')+'</button></div>'
    + '<div class="p-prog">'+prog+'</div>'
    + '<div class="p-main">'
    + '<div class="p-phase">'+phase+'</div>'
    + '<div class="p-name">'+esc(name)+'</div>'
    + '<div class="p-ring" id="pRing">'+ringSVG(1, 7)+'<div class="center"><div class="num" id="pNum"></div><div class="unit">'+unit+'</div></div></div>'
    + (s.kind === 'work' ? '<a class="vlink" href="'+ytUrl(s.ex)+'" target="_blank" rel="noopener" onclick="if(P&&!P.paused)togglePause()"><span class="yt-s">'+YT_SVG+'</span>Technik-Video ansehen</a>' : '')
    + nextHtml
    + '</div>'
    + '<div class="p-extra">'
    + (repsWork ? '<div class="adj"><button onclick="adjReps(-1)" aria-label="Eine Wiederholung weniger">−</button><span>Geschafft? Anpassen</span><button onclick="adjReps(1)" aria-label="Eine Wiederholung mehr">+</button></div><button class="btn btn-lime done-btn" onclick="advance(1)">'+icon('check')+' Erledigt</button>' : '')
    + (s.kind === 'rest' ? '<div class="row center"><button class="btn btn-ghost" onclick="addRest(20)">+20 s</button><button class="btn btn-ghost" onclick="advance(1)">Pause überspringen</button></div>' : '')
    + (s.kind === 'ready' ? '<button class="btn btn-ghost" onclick="advance(1)">Sofort starten</button>' : '')
    + '</div>'
    + '<div class="p-ctrl">'
    + '<button class="sm" onclick="advance(-1)" aria-label="Zurück">'+icon('prev')+'</button>'
    + '<button class="big" onclick="togglePause()" aria-label="'+(P.paused ? 'Weiter' : 'Pause')+'">'+icon(P.paused ? 'play' : 'pause', 'f')+'</button>'
    + '<button class="sm" onclick="advance(1)" aria-label="Weiter">'+icon('next')+'</button></div>';
  updatePlayerTime();
}
function updatePlayerTime(){
  if(!P || P.summary) return;
  const s = seg(), dur = segDuration(s), el = segElapsed();
  const num = $('pNum'); if(!num) return;
  const bar = document.querySelector('#pRing .bar');
  const c = 2*Math.PI*52;
  if(dur){
    const left = Math.max(0, dur - el);
    num.textContent = Math.ceil(left);
    bar.style.strokeDashoffset = (c * (1 - left/dur)).toFixed(1);
  } else {
    num.textContent = P.cur + '×';
    bar.style.strokeDashoffset = (c * (1 - Math.min(1, P.cur / Math.max(1, s.amount)))).toFixed(1);
    const unit = document.querySelector('#pRing .unit'); if(unit) unit.textContent = 'Wiederholungen · '+fmtTime(el);
  }
  const cur = document.querySelector('.p-prog i.cur');
  if(cur) cur.style.setProperty('--p', dur ? Math.min(100, el/dur*100)+'%' : '50%');
}

function finishWorkout(){
  const p = P; clearInterval(p.timer);
  const totalSec = Math.round((Date.now() - p.startedAt) / 1000);
  const kcal = sum(Object.entries(p.workSec).map(([id, sec]) => kcalFor(exById(id).met, sec))) + kcalFor(2, Math.max(0, totalSec - sum(Object.values(p.workSec))));
  const log = { wid: p.w.id, name: p.w.name, focus: p.w.focus, date: todayStr(), t: Date.now(), dur: totalSec, kcal: Math.round(kcal), reps: p.reps };
  if(p.w.work) log.timed = true;
  // Bestleistungen vergleichen – nur echte Verbesserungen gegenüber einem früheren Wert feiern
  const newPBs = [];
  Object.entries(p.best).forEach(([id, v]) => {
    const old = state.pbs[id] || 0;
    if(v > old){ if(old > 0) newPBs.push({ id, v, old }); state.pbs[id] = v; }
  });
  state.pbHits = (state.pbHits || 0) + newPBs.length;
  if(newPBs.length) log.pbs = newPBs.map(x => x.id);
  if(Object.keys(p.reps).length) { state.workouts.push(log); sortByDate(state.workouts); save(); }
  p.summary = true; p.log = log;
  releaseWake();
  say('Stark! Workout geschafft.');
  beep(784, .12); setTimeout(() => beep(1046, .25), 140);
  const totalReps = sum(Object.entries(p.reps).filter(([id]) => exById(id).type !== 'time' && !p.w.work).map(([, n]) => n));
  $('player').classList.remove('rest');
  $('player').innerHTML = '<div class="p-top"><div class="ttl"></div><button class="icon-btn" onclick="closePlayer(true)" aria-label="Schließen">'+icon('x')+'</button></div>'
    + '<div class="summary"><div class="trophy">'+icon('trophy')+'</div>'
    + '<div class="p-phase">Workout geschafft</div><div class="h1">'+esc(p.w.name)+'</div>'
    + '<div class="tiles">'
    + '<div class="tile"><div class="ic">'+icon('clock','s')+'</div><b>'+fmtTime(totalSec)+'</b><small>Dauer</small></div>'
    + '<div class="tile"><div class="ic">'+icon('flame','s')+'</div><b>'+Math.round(kcal)+'</b><small>kcal</small></div>'
    + '<div class="tile"><div class="ic">'+icon('repeat','s')+'</div><b>'+(totalReps || Object.keys(p.reps).length)+'</b><small>'+(totalReps ? 'Wiederholungen' : 'Übungen')+'</small></div></div>'
    + (newPBs.length ? '<div class="pb-box"><div class="label" style="color:var(--lime);margin-bottom:6px">🏅 Neue Bestleistung'+(newPBs.length > 1 ? 'en' : '')+'</div>'
        + newPBs.map(x => { const e = exById(x.id); return '<div class="pb-row"><span>'+esc(e.name)+'</span><b>'+x.old+' → '+x.v+(e.type === 'time' ? ' s' : '')+'</b></div>'; }).join('')+'</div>' : '')
    + '<div class="sub">Wie hat es sich angefühlt?</div>'
    + '<div class="feel" style="width:100%;max-width:380px" id="pFeel">'+FEELS.map((f, i) => '<button aria-label="'+FEEL_TXT[i]+'" onclick="setWorkoutFeel('+(i+1)+')">'+f+'</button>').join('')+'</div>'
    + '<div class="sub" id="pCoach" style="min-height:18px;color:var(--lime)"></div>'
    + '<button class="btn btn-lime done-btn" onclick="closePlayer(true)">Fertig</button>'
    + (p.w.focus !== 'mobility' ? '<button class="btn btn-ghost done-btn" style="padding:14px" onclick="startCooldown()">'+icon('mob','s')+' Cool-down & Dehnen · 4 min</button>' : '')
    + '</div>';
  if(newPBs.length) setTimeout(() => { beep(1320, .1); setTimeout(() => beep(1568, .2), 120); }, 600);
  confetti();
  checkBadges();
}
function setWorkoutFeel(v){
  if(!P || !P.log) return;
  P.log.feel = v;
  // Coach passt die Intensität an: zu schwer -> weniger, locker -> mehr
  if(state.coach && !P.w.work && P.w.focus !== 'mobility'){
    if(P.scaleBefore === undefined) P.scaleBefore = state.coach.scale || 1;
    const f = { 1: .9, 2: .95, 3: 1, 4: 1.03, 5: 1.06 }[v];
    state.coach.scale = Math.round(Math.min(1.6, Math.max(.6, P.scaleBefore * f)) * 100) / 100;
    const diff = Math.round((state.coach.scale - P.scaleBefore) * 100);
    $('pCoach').textContent = diff > 0 ? 'Coach: Nächstes Mal +'+diff+' % Wiederholungen 💪' : diff < 0 ? 'Coach: Nächstes Mal '+diff+' % – wir bauen dich auf.' : 'Coach: Intensität passt – so bleibt\'s.';
  }
  save();
  document.querySelectorAll('#pFeel button').forEach((b, i) => b.classList.toggle('on', i === v-1));
}
function startCooldown(){ closePlayer(true); startWorkout('cooldown'); }

// Tastatur im Player (Mac)
document.addEventListener('keydown', e => {
  if(!P || P.summary || !$('player').classList.contains('show')) return;
  if(e.target.tagName === 'INPUT') return;
  if(e.code === 'Space'){ e.preventDefault(); const s = seg(); if(s.kind === 'work' && !s.time) advance(1); else togglePause(); }
  else if(e.key === '+' || e.key === 'ArrowUp'){ e.preventDefault(); adjReps(1); }
  else if(e.key === '-' || e.key === 'ArrowDown'){ e.preventDefault(); adjReps(-1); }
  else if(e.key === 'ArrowRight') advance(1);
  else if(e.key === 'ArrowLeft') advance(-1);
  else if(e.key === 'Escape') closePlayer();
});

// =====================================================================
//  Ton, Sprache, Vibration, Wake-Lock, Konfetti
// =====================================================================
let actx = null;
function unlockAudio(){ try { if(!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if(actx.state === 'suspended') actx.resume(); } catch(e) {} }
function beep(freq, dur){
  if(!state.settings.sound) return;
  try {
    unlockAudio(); if(!actx) return;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(.0001, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(.25, actx.currentTime + .01);
    g.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + dur);
    o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + dur + .02);
  } catch(e) {}
}
let deVoice = null;
function say(text){
  if(!state.settings.voice || !('speechSynthesis' in window)) return;
  try {
    if(!deVoice){ deVoice = speechSynthesis.getVoices().find(v => /^de/i.test(v.lang)) || null; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE'; u.rate = 1.05; if(deVoice) u.voice = deVoice;
    speechSynthesis.speak(u);
  } catch(e) {}
}
function buzz(ms){ try { navigator.vibrate && navigator.vibrate(ms); } catch(e) {} }
async function requestWake(){
  try {
    if('wakeLock' in navigator && !wakeLock){
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch(e) {}
}
function releaseWake(){ try { wakeLock && wakeLock.release(); } catch(e) {} wakeLock = null; }
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && (P || (currentSetIndex > 0 && !sessionFinished))) requestWake();
});

function confetti(){
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('confetti'), ctx = cv.getContext('2d');
  cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const colors = ['#d4ff3a','#ffffff','#7cc8ff','#ff9f5a','#c89bff'];
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth/2 + (Math.random()-.5)*80, y: innerHeight*.35, vx: (Math.random()-.5)*14, vy: -Math.random()*14 - 4,
    s: 4 + Math.random()*6, r: Math.random()*6, vr: (Math.random()-.5)*.4, c: colors[Math.floor(Math.random()*colors.length)] }));
  const t0 = performance.now();
  (function frame(t){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach(p => { p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s/2, -p.s/4, p.s, p.s/2); ctx.restore(); });
    if(t - t0 < 2600) requestAnimationFrame(frame); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })(t0);
}

// =====================================================================
//  Backup
// =====================================================================
function deleteLastSession(){
  if(state.sessions.length === 0) return;
  const last = state.sessions[state.sessions.length-1];
  if(!confirm('Klimmzug-Einheit vom '+formatDate(last.date)+' wirklich löschen?')) return;
  state.sessions.pop();
  state.sessionCount = Math.max(0, state.sessionCount - 1);
  state.doneSets = 0;
  save(); resetSW(); render();
}
function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'klimmzug-backup-'+todayStr()+'.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function importData(e){
  const file = e.target.files[0]; e.target.value = '';
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const d = JSON.parse(reader.result);
      const dateOk = x => /^\d{4}-\d{2}-\d{2}$/.test(x.date);
      const ok = d && Array.isArray(d.sessions)
        && Number.isInteger(d.currentMax) && d.currentMax > 0
        && Number.isInteger(d.goal) && d.goal > 0
        && (d.tests === undefined || (Array.isArray(d.tests) && d.tests.every(t => dateOk(t) && Number.isFinite(t.max))))
        && (d.workouts === undefined || (Array.isArray(d.workouts) && d.workouts.every(w => dateOk(w) && Number.isFinite(w.dur))))
        && d.sessions.every(s => dateOk(s) && Array.isArray(s.sets) && s.sets.every(Number.isFinite) && Number.isFinite(s.max));
      if(!ok) throw new Error('format');
      if(!confirm('Aktuelle Daten durch das Backup ersetzen?')) return;
      localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign({ sessionCount: d.sessions.length }, d, { doneSets: 0 })));
      state = loadState();
      sortByDate(state.sessions); sortByDate(state.tests); sortByDate(state.workouts);
      save(); resetSW(); render(); toast('✅', 'Backup importiert');
    } catch(err) { toast('⚠️', 'Ungültige Datei', 'Das ist kein Klimmzug-Backup.'); }
  };
  reader.readAsText(file);
}

// =====================================================================
//  Start
// =====================================================================
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
if('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => { deVoice = null; };
hydrateIcons();
const startTab = (location.hash || '').slice(1);
render();
go(['home','workouts','library','pullup','profile'].includes(startTab) ? startTab : 'home');
// Erfolge, die schon vor diesem Update erreicht wurden, still nachtragen (kein Toast-Gewitter)
if(!state.coach && !state.coachSkipped) setTimeout(openOnboarding, 700);
if(!state.badgesInit){ const st = badgeStats(); state.badges = BADGES.filter(b => b.test(st)).map(b => b.id); state.badgesInit = true; save(); }
