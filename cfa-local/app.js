(function () {
  'use strict';

  /* ---------- Datos ---------- */
  var META = window.CFA_META || [];
  var CONTENT = window.CFA_CONTENT || {};
  var FORMATO = window.CFA_FORMATO || { preguntasPorSesion: 90, minutosPorSesion: 135, sesiones: 2 };
  var REFERENCIA_APROBACION = 70; // orientativo; el CFA Institute no publica una nota mínima

  function topicMeta(id) { return META.filter(function (t) { return t.id === id; })[0]; }
  function mid(t) { return (t.min + t.max) / 2; }
  function contentOf(id) { return CONTENT[id] || { resumen: [], formulas: [], tarjetas: [], preguntas: [] }; }

  var QUESTIONS = {};
  var ALLQ = [];
  META.forEach(function (t) {
    contentOf(t.id).preguntas.forEach(function (q) {
      var item = Object.assign({}, q, { topic: t.id });
      QUESTIONS[q.id] = item;
      ALLQ.push(item);
    });
  });

  /* ---------- Utilidades ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function addDays(iso, n) {
    var p = iso.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2] + n);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysBetween(a, b) {
    var pa = a.split('-').map(Number), pb = b.split('-').map(Number);
    return Math.round((new Date(pb[0], pb[1] - 1, pb[2]) - new Date(pa[0], pa[1] - 1, pa[2])) / 86400000);
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  function mmss(sec) {
    sec = Math.max(0, sec);
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
  var toastTimer;
  function toast(msg) {
    var el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  function bar(p, cls) { return '<div class="bar ' + (cls || '') + '"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></div>'; }

  /* ---------- Almacenamiento ---------- */
  var KEY = 'cfa-local-v1';
  function defaults() { return { settings: { examDate: '' }, cards: {}, answers: {}, exams: [], days: {} }; }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) { /* sin almacenamiento */ }
    return defaults();
  }
  var S = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { toast('No se pudo guardar en este navegador. Exporta tu progreso desde Ajustes.'); }
  }
  function markDay() { S.days[todayISO()] = true; }
  function streak() {
    var n = 0, d = todayISO();
    if (!S.days[d]) d = addDays(d, -1);
    while (S.days[d]) { n++; d = addDays(d, -1); }
    return n;
  }
  function record(qid, ok) {
    var a = S.answers[qid] || { s: 0, c: 0, last: 0 };
    a.s++; if (ok) a.c++; a.last = ok ? 1 : 0; a.t = Date.now();
    S.answers[qid] = a; markDay();
  }
  function topicStats(id) {
    var qs = contentOf(id).preguntas, seen = 0, ok = 0, tot = 0;
    qs.forEach(function (q) {
      var a = S.answers[q.id];
      if (a) { seen++; ok += a.c; tot += a.s; }
    });
    return { total: qs.length, seen: seen, correct: ok, attempts: tot, acc: pct(ok, tot) };
  }
  function cardKey(topic, i) { return topic + ':' + i; }
  function dueCards(topic) {
    var out = [], today = todayISO();
    META.forEach(function (t) {
      if (topic && topic !== t.id) return;
      contentOf(t.id).tarjetas.forEach(function (c, i) {
        var k = cardKey(t.id, i), st = S.cards[k];
        if (!st || st.due <= today) out.push({ key: k, topic: t.id, card: c, box: st ? st.box : 1 });
      });
    });
    return out;
  }
  var INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };

  /* ---------- Estado de interfaz ---------- */
  var ui = { tab: 'panel', studyTopic: null, cards: null, prac: null, pracSetup: { topic: 'all', n: 10, dif: 'all', filtro: 'todas' }, exam: null, simSetup: { mode: 'session' }, review: null };

  /* ---------- Render ---------- */
  function render() {
    document.querySelectorAll('#nav button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.tab === ui.tab);
    });
    var v = $('#view'), html = '';
    if (ui.tab === 'panel') html = viewPanel();
    else if (ui.tab === 'estudiar') html = viewStudy();
    else if (ui.tab === 'tarjetas') html = viewCards();
    else if (ui.tab === 'practica') html = ui.prac ? viewPractice() : viewPracticeSetup();
    else if (ui.tab === 'simulador') html = ui.exam ? (ui.exam.done ? viewExamResult() : viewExam()) : viewSimSetup();
    else if (ui.tab === 'historial') html = viewHistory();
    else if (ui.tab === 'ajustes') html = viewSettings();
    v.innerHTML = html;
  }

  function topicOptions(sel, withAll) {
    var h = withAll ? '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>Todos los temas</option>' : '';
    META.forEach(function (t) {
      h += '<option value="' + t.id + '"' + (sel === t.id ? ' selected' : '') + '>' + esc(t.es) + ' (' + contentOf(t.id).preguntas.length + ')</option>';
    });
    return h;
  }

  /* Panel */
  function viewPanel() {
    var seen = 0, ok = 0, att = 0, bank = ALLQ.length;
    META.forEach(function (t) { var s = topicStats(t.id); seen += s.seen; ok += s.correct; att += s.attempts; });
    var due = dueCards().length;
    var days = '';
    if (S.settings.examDate) {
      var n = daysBetween(todayISO(), S.settings.examDate);
      days = n >= 0 ? n + ' días' : 'Fecha pasada';
    } else days = 'Sin fecha';
    var wnum = 0, wden = 0;
    META.forEach(function (t) {
      var s = topicStats(t.id);
      if (s.attempts >= 5) { wnum += mid(t) * s.acc; wden += mid(t); }
    });
    var weighted = wden ? Math.round(wnum / wden) : null;

    var rows = META.map(function (t) {
      var s = topicStats(t.id), cls = s.attempts >= 5 ? (s.acc >= REFERENCIA_APROBACION ? 'good' : (s.acc < 55 ? 'bad' : '')) : '';
      return '<tr><td><b>' + esc(t.es) + '</b><div class="small muted">' + esc(t.nombre) + '</div></td>' +
        '<td>' + t.min + '–' + t.max + ' %</td>' +
        '<td>' + s.seen + ' / ' + s.total + '</td>' +
        '<td style="min-width:120px">' + (s.attempts ? s.acc + ' %' : '–') + bar(s.acc, cls) + '</td>' +
        '<td>' + dueCards(t.id).length + '</td>' +
        '<td><button class="btn ghost" data-act="practice-topic" data-topic="' + t.id + '">Practicar</button></td></tr>';
    }).join('');

    var weak = META.map(function (t) { return { t: t, s: topicStats(t.id) }; })
      .filter(function (x) { return x.s.attempts >= 5; })
      .sort(function (a, b) { return a.s.acc - b.s.acc; }).slice(0, 3);
    var weakHtml = weak.length
      ? '<ul class="tight">' + weak.map(function (x) { return '<li><b>' + esc(x.t.es) + '</b>: ' + x.s.acc + ' % de aciertos</li>'; }).join('') + '</ul>'
      : '<p class="muted small">Responde al menos 5 preguntas de un tema para ver tus puntos débiles.</p>';

    return '<h1>Panel</h1>' +
      '<div class="grid">' +
      '<div class="stat"><b>' + days + '</b><span>Para tu examen</span></div>' +
      '<div class="stat"><b>' + seen + ' / ' + bank + '</b><span>Preguntas vistas</span></div>' +
      '<div class="stat"><b>' + (att ? pct(ok, att) + ' %' : '–') + '</b><span>Aciertos acumulados</span></div>' +
      '<div class="stat"><b>' + due + '</b><span>Tarjetas por repasar hoy</span></div>' +
      '<div class="stat"><b>' + streak() + '</b><span>Racha de días</span></div>' +
      '<div class="stat"><b>' + (weighted == null ? '–' : weighted + ' %') + '</b><span>Aciertos ponderados por peso del examen</span></div>' +
      '</div>' +
      '<div class="card" style="margin-top:14px"><h2 style="margin-top:0">Temas</h2><div style="overflow-x:auto"><table>' +
      '<tr><th>Tema</th><th>Peso</th><th>Vistas</th><th>Aciertos</th><th>Tarjetas hoy</th><th></th></tr>' + rows + '</table></div></div>' +
      '<div class="card"><h2 style="margin-top:0">Donde conviene reforzar</h2>' + weakHtml +
      '<p class="small muted">El CFA Institute no publica una nota mínima de aprobación. La referencia de ' + REFERENCIA_APROBACION + ' % es orientativa y no oficial.</p></div>';
  }

  /* Estudiar */
  function viewStudy() {
    var list = '<div class="topics">' + META.map(function (t) {
      return '<button data-act="study-topic" data-topic="' + t.id + '" class="' + (ui.studyTopic === t.id ? 'on' : '') + '">' +
        '<b>' + esc(t.es) + '</b><div class="small muted">' + esc(t.nombre) + ' · ' + t.min + '–' + t.max + ' %</div></button>';
    }).join('') + '</div>';
    var body = '';
    if (ui.studyTopic) {
      var c = contentOf(ui.studyTopic), t = topicMeta(ui.studyTopic);
      if (!c.resumen.length) body = '<div class="card note">Este tema todavía no tiene contenido cargado.</div>';
      else {
        body = '<h2>' + esc(t.es) + '</h2>' +
          c.resumen.map(function (s) {
            return '<div class="card"><h3 style="margin-top:0">' + esc(s.titulo) + '</h3><ul class="tight">' +
              s.puntos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>';
          }).join('') +
          (c.formulas.length ? '<div class="card"><h3 style="margin-top:0">Fórmulas y reglas</h3>' +
            c.formulas.map(function (f) {
              return '<div style="margin-bottom:10px"><b>' + esc(f.nombre) + '</b><code class="formula">' + esc(f.formula) + '</code>' +
                (f.nota ? '<div class="small muted">' + esc(f.nota) + '</div>' : '') + '</div>';
            }).join('') + '</div>' : '');
      }
    }
    return '<h1>Estudiar</h1>' + list + body;
  }

  /* Tarjetas */
  function viewCards() {
    if (!ui.cards) {
      var rows = META.map(function (t) {
        var n = dueCards(t.id).length, tot = contentOf(t.id).tarjetas.length;
        return '<tr><td>' + esc(t.es) + '</td><td>' + n + ' / ' + tot + '</td><td><button class="btn ghost" data-act="cards-start" data-topic="' + t.id + '"' + (n ? '' : ' disabled') + '>Repasar</button></td></tr>';
      }).join('');
      var all = dueCards().length;
      return '<h1>Tarjetas</h1><div class="card"><p>Repaso espaciado con cinco cajas. Lo que fallas vuelve hoy; lo que sabes se espacia hasta 16 días.</p>' +
        '<button class="btn" data-act="cards-start" data-topic="all"' + (all ? '' : ' disabled') + '>Repasar todo lo pendiente (' + all + ')</button></div>' +
        '<div class="card"><table><tr><th>Tema</th><th>Pendientes / total</th><th></th></tr>' + rows + '</table></div>';
    }
    var cs = ui.cards;
    if (cs.i >= cs.queue.length) {
      return '<h1>Tarjetas</h1><div class="card"><h2 style="margin-top:0">Repaso terminado</h2><p>Revisaste ' + cs.queue.length + ' tarjetas.</p>' +
        '<button class="btn" data-act="cards-end">Volver</button></div>';
    }
    var cur = cs.queue[cs.i], t = topicMeta(cur.topic);
    return '<h1>Tarjetas</h1><div class="card"><div class="row small muted"><span class="pill">' + esc(t.es) + '</span><span>' + (cs.i + 1) + ' de ' + cs.queue.length + '</span><span>Caja ' + cur.box + '</span></div>' +
      '<div class="cardface"><div>' + esc(cur.card.f) + '</div></div>' +
      (cs.show
        ? '<div class="cardface" style="border-top:1px solid var(--line)"><div>' + esc(cur.card.b) + '</div></div>' +
        '<div class="row"><button class="btn danger" data-act="cards-grade" data-g="0">Otra vez</button><button class="btn ghost" data-act="cards-grade" data-g="1">Bien</button><button class="btn" data-act="cards-grade" data-g="2">Fácil</button></div>'
        : '<div class="row"><button class="btn" data-act="cards-show">Mostrar respuesta</button><button class="btn ghost" data-act="cards-end">Salir</button></div>') +
      '</div>';
  }

  /* Práctica */
  function viewPracticeSetup() {
    var p = ui.pracSetup;
    return '<h1>Práctica por tema</h1><div class="card">' +
      '<label>Tema</label><select id="p-topic">' + topicOptions(p.topic, true) + '</select>' +
      '<label>Número de preguntas</label><select id="p-n">' + [5, 10, 20, 40].map(function (n) { return '<option' + (p.n === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select>' +
      '<label>Dificultad</label><select id="p-dif"><option value="all">Todas</option><option value="1"' + (p.dif === '1' ? ' selected' : '') + '>Fácil</option><option value="2"' + (p.dif === '2' ? ' selected' : '') + '>Media</option><option value="3"' + (p.dif === '3' ? ' selected' : '') + '>Difícil</option></select>' +
      '<label>Preguntas</label><select id="p-filtro"><option value="todas">Todas</option><option value="nuevas"' + (p.filtro === 'nuevas' ? ' selected' : '') + '>Solo nuevas</option><option value="falladas"' + (p.filtro === 'falladas' ? ' selected' : '') + '>Solo las que fallé la última vez</option></select>' +
      '<p><button class="btn" data-act="prac-start">Empezar</button></p></div>';
  }
  function optsHtml(q, picked, reveal, disabled) {
    return '<div class="opts">' + q.o.map(function (o, i) {
      var cls = 'opt';
      if (reveal) { if (i === q.c) cls += ' ok'; else if (i === picked) cls += ' no'; }
      else if (i === picked) cls += ' sel';
      return '<button class="' + cls + '" data-act="' + (disabled ? 'noop' : 'opt') + '" data-i="' + i + '"' + (disabled ? ' disabled' : '') + '><span class="l">' + 'ABC'[i] + '</span><span>' + esc(o) + '</span></button>';
    }).join('') + '</div>';
  }
  function viewPractice() {
    var pr = ui.prac;
    if (pr.i >= pr.qs.length) {
      var ok = pr.results.filter(Boolean).length;
      return '<h1>Práctica</h1><div class="card"><h2 style="margin-top:0">Resultado: ' + ok + ' de ' + pr.qs.length + ' (' + pct(ok, pr.qs.length) + ' %)</h2>' +
        '<div class="row"><button class="btn" data-act="prac-end">Nueva sesión</button></div></div>';
    }
    var q = pr.qs[pr.i], t = topicMeta(q.topic);
    return '<h1>Práctica</h1><div class="card"><div class="row small muted"><span class="pill">' + esc(t.es) + '</span><span class="pill">' + esc(q.tag || '') + '</span><span>' + (pr.i + 1) + ' de ' + pr.qs.length + '</span></div>' +
      '<div class="qtext">' + esc(q.q) + '</div>' + optsHtml(q, pr.picked, pr.picked != null, pr.picked != null) +
      (pr.picked != null
        ? '<div class="expl"><b>' + (pr.picked === q.c ? 'Correcto.' : 'Incorrecto. La respuesta es ' + 'ABC'[q.c] + '.') + '</b><div>' + esc(q.e) + '</div></div>' +
        '<p><button class="btn" data-act="prac-next">' + (pr.i + 1 >= pr.qs.length ? 'Ver resultado' : 'Siguiente') + '</button></p>'
        : '<p><button class="btn ghost" data-act="prac-end">Salir</button></p>') + '</div>';
  }

  /* Simulador */
  function allocate(n, items) {
    var res = {}, remaining = n, pool = items.map(function (i) { return { id: i.id, w: i.w, max: i.max }; });
    while (remaining > 0 && pool.length) {
      var totalW = pool.reduce(function (a, i) { return a + i.w; }, 0), assigned = 0;
      var parts = pool.map(function (i) { var x = remaining * i.w / totalW; return { i: i, fl: Math.floor(x), fr: x - Math.floor(x) }; });
      parts.forEach(function (p) {
        var room = p.i.max - (res[p.i.id] || 0), a = Math.min(p.fl, room);
        res[p.i.id] = (res[p.i.id] || 0) + a; assigned += a;
      });
      var left = remaining - assigned;
      parts.sort(function (a, b) { return b.fr - a.fr; });
      for (var k = 0; k < parts.length && left > 0; k++) {
        var p = parts[k];
        if ((res[p.i.id] || 0) < p.i.max) { res[p.i.id] = (res[p.i.id] || 0) + 1; left--; assigned++; }
      }
      remaining -= assigned;
      pool = pool.filter(function (i) { return (res[i.id] || 0) < i.max; });
      if (assigned === 0) break;
    }
    return res;
  }
  function buildSession(n, sesion) {
    var items = META.filter(function (t) { return (sesion ? t.sesion === sesion : true) && contentOf(t.id).preguntas.length; })
      .map(function (t) { return { id: t.id, w: mid(t), max: contentOf(t.id).preguntas.length }; });
    var alloc = allocate(n, items), qs = [];
    Object.keys(alloc).forEach(function (id) {
      qs = qs.concat(shuffle(ALLQ.filter(function (q) { return q.topic === id; })).slice(0, alloc[id]));
    });
    return shuffle(qs);
  }
  function viewSimSetup() {
    var m = ui.simSetup.mode;
    var maxS1 = META.filter(function (t) { return t.sesion === 1; }).reduce(function (a, t) { return a + contentOf(t.id).preguntas.length; }, 0);
    var maxS2 = META.filter(function (t) { return t.sesion === 2; }).reduce(function (a, t) { return a + contentOf(t.id).preguntas.length; }, 0);
    return '<h1>Simulador de examen</h1><div class="card">' +
      '<p>Reproduce el formato del Nivel I: preguntas de tres opciones, sin retroalimentación durante el examen, cronómetro por sesión y selección de preguntas según los pesos del examen.</p>' +
      '<label>Modo</label><select id="s-mode">' +
      '<option value="mini"' + (m === 'mini' ? ' selected' : '') + '>Mini: 30 preguntas, 45 minutos</option>' +
      '<option value="session"' + (m === 'session' ? ' selected' : '') + '>Una sesión: hasta 90 preguntas, 135 minutos</option>' +
      '<option value="full"' + (m === 'full' ? ' selected' : '') + '>Examen completo: dos sesiones de 135 minutos</option></select>' +
      '<p class="small muted">Banco actual: ' + maxS1 + ' preguntas de temas de la sesión 1 y ' + maxS2 + ' de la sesión 2. El examen real tiene 90 por sesión (180 en total), y 160 puntúan.</p>' +
      '<p><button class="btn" data-act="exam-start">Comenzar</button></p></div>';
  }
  function startExam(mode) {
    var sessions = [];
    if (mode === 'mini') sessions.push({ qs: buildSession(30, 0), limit: 45 * 60 });
    else if (mode === 'session') sessions.push({ qs: buildSession(FORMATO.preguntasPorSesion, 1), limit: FORMATO.minutosPorSesion * 60 });
    else {
      sessions.push({ qs: buildSession(FORMATO.preguntasPorSesion, 1), limit: FORMATO.minutosPorSesion * 60 });
      sessions.push({ qs: buildSession(FORMATO.preguntasPorSesion, 2), limit: FORMATO.minutosPorSesion * 60 });
    }
    sessions = sessions.filter(function (s) { return s.qs.length; });
    if (!sessions.length) { toast('No hay preguntas cargadas.'); return; }
    ui.exam = { mode: mode, sessions: sessions, s: 0, i: 0, answers: {}, flags: {}, endsAt: Date.now() + sessions[0].limit * 1000, started: Date.now(), done: false, between: false };
    render(); startTicker();
  }
  var ticker = null;
  function startTicker() {
    clearInterval(ticker);
    ticker = setInterval(function () {
      var ex = ui.exam;
      if (!ex || ex.done || ex.between) { clearInterval(ticker); return; }
      var left = Math.round((ex.endsAt - Date.now()) / 1000), el = $('#timer');
      if (el) { el.textContent = mmss(left); el.classList.toggle('low', left < 600); }
      if (left <= 0) { toast('Se acabó el tiempo de la sesión.'); finishSession(); }
    }, 1000);
  }
  function viewExam() {
    var ex = ui.exam;
    if (ex.between) {
      return '<h1>Simulador</h1><div class="card"><h2 style="margin-top:0">Sesión ' + (ex.s + 1) + ' terminada</h2><p>El examen real incluye un descanso opcional entre sesiones. Cuando estés listo, empieza la sesión ' + (ex.s + 2) + '.</p>' +
        '<button class="btn" data-act="exam-next-session">Empezar sesión ' + (ex.s + 2) + '</button></div>';
    }
    var ses = ex.sessions[ex.s], q = ses.qs[ex.i], key = ex.s + ':' + ex.i, picked = ex.answers[key];
    var grid = ses.qs.map(function (_, i) {
      var k = ex.s + ':' + i, cls = (ex.answers[k] != null ? 'done ' : '') + (ex.flags[k] ? 'flag ' : '') + (i === ex.i ? 'cur' : '');
      return '<button class="' + cls + '" data-act="exam-goto" data-i="' + i + '">' + (i + 1) + '</button>';
    }).join('');
    var left = Math.round((ex.endsAt - Date.now()) / 1000);
    return '<h1>Simulador · sesión ' + (ex.s + 1) + ' de ' + ex.sessions.length + '</h1><div class="card">' +
      '<div class="row" style="justify-content:space-between"><span class="small muted">Pregunta ' + (ex.i + 1) + ' de ' + ses.qs.length + ' · respondidas ' + ses.qs.filter(function (_, i) { return ex.answers[ex.s + ':' + i] != null; }).length + '</span>' +
      '<span class="timer' + (left < 600 ? ' low' : '') + '" id="timer">' + mmss(left) + '</span></div>' +
      '<div class="qtext">' + esc(q.q) + '</div>' + optsHtml(q, picked, false, false) +
      '<div class="row" style="margin-top:12px"><button class="btn ghost" data-act="exam-prev"' + (ex.i === 0 ? ' disabled' : '') + '>Anterior</button>' +
      '<button class="btn ghost" data-act="exam-next"' + (ex.i + 1 >= ses.qs.length ? ' disabled' : '') + '>Siguiente</button>' +
      '<button class="btn ghost" data-act="exam-flag">' + (ex.flags[key] ? 'Quitar marca' : 'Marcar para revisar') + '</button>' +
      '<button class="btn danger" data-act="exam-finish">Terminar sesión</button></div>' +
      '<div class="navgrid">' + grid + '</div></div>';
  }
  function finishSession() {
    var ex = ui.exam; if (!ex || ex.done) return;
    if (ex.s + 1 < ex.sessions.length) {
      ex.between = true; clearInterval(ticker); render();
    } else finishExam();
  }
  function finishExam() {
    var ex = ui.exam; clearInterval(ticker);
    var items = [], byTopic = {};
    ex.sessions.forEach(function (ses, si) {
      ses.qs.forEach(function (q, i) {
        var picked = ex.answers[si + ':' + i], ok = picked === q.c;
        items.push({ q: q, picked: picked, ok: ok });
        byTopic[q.topic] = byTopic[q.topic] || { n: 0, c: 0 };
        byTopic[q.topic].n++; if (ok) byTopic[q.topic].c++;
        record(q.id, ok);
      });
    });
    var correct = items.filter(function (x) { return x.ok; }).length;
    ex.items = items; ex.byTopic = byTopic; ex.correct = correct; ex.total = items.length; ex.done = true;
    S.exams.push({ date: todayISO(), mode: ex.mode, total: items.length, correct: correct, byTopic: byTopic, minutes: Math.round((Date.now() - ex.started) / 60000) });
    save(); render();
  }
  function viewExamResult() {
    var ex = ui.exam, p = pct(ex.correct, ex.total), filt = ui.review || 'wrong';
    var rows = META.filter(function (t) { return ex.byTopic[t.id]; }).map(function (t) {
      var b = ex.byTopic[t.id], a = pct(b.c, b.n);
      return '<tr><td>' + esc(t.es) + '</td><td>' + b.c + ' / ' + b.n + '</td><td style="min-width:120px">' + a + ' %' + bar(a, a >= REFERENCIA_APROBACION ? 'good' : (a < 55 ? 'bad' : '')) + '</td></tr>';
    }).join('');
    var list = ex.items.filter(function (x) { return filt === 'all' ? true : !x.ok; }).map(function (x, i) {
      var t = topicMeta(x.q.topic);
      return '<div class="card"><div class="row small muted"><span class="pill">' + esc(t.es) + '</span><span class="pill">' + (x.ok ? 'Correcta' : (x.picked == null ? 'Sin responder' : 'Incorrecta')) + '</span></div>' +
        '<div class="qtext">' + esc(x.q.q) + '</div>' + optsHtml(x.q, x.picked, true, true) + '<div class="expl">' + esc(x.q.e) + '</div></div>';
    }).join('') || '<p class="muted">No hay preguntas para mostrar.</p>';
    return '<h1>Resultado del simulador</h1><div class="grid">' +
      '<div class="stat"><b>' + p + ' %</b><span>' + ex.correct + ' de ' + ex.total + ' correctas</span></div>' +
      '<div class="stat"><b>' + (p >= REFERENCIA_APROBACION ? 'Sobre' : 'Bajo') + ' ' + REFERENCIA_APROBACION + ' %</b><span>Referencia orientativa, no oficial</span></div></div>' +
      '<div class="card" style="margin-top:14px"><table><tr><th>Tema</th><th>Correctas</th><th>Aciertos</th></tr>' + rows + '</table></div>' +
      '<div class="row"><button class="btn' + (filt === 'wrong' ? '' : ' ghost') + '" data-act="exam-review" data-f="wrong">Revisar falladas</button><button class="btn' + (filt === 'all' ? '' : ' ghost') + '" data-act="exam-review" data-f="all">Revisar todas</button><button class="btn ghost" data-act="exam-close">Cerrar</button></div>' +
      '<div style="margin-top:12px">' + list + '</div>';
  }

  /* Historial */
  function viewHistory() {
    if (!S.exams.length) return '<h1>Historial</h1><div class="card"><p class="muted">Todavía no has terminado ningún simulador.</p></div>';
    var modes = { mini: 'Mini', session: 'Una sesión', full: 'Completo' };
    var rows = S.exams.slice().reverse().map(function (e) {
      return '<tr><td>' + e.date + '</td><td>' + (modes[e.mode] || e.mode) + '</td><td>' + e.correct + ' / ' + e.total + '</td><td>' + pct(e.correct, e.total) + ' %' + bar(pct(e.correct, e.total)) + '</td><td>' + e.minutes + ' min</td></tr>';
    }).join('');
    return '<h1>Historial</h1><div class="card" style="overflow-x:auto"><table><tr><th>Fecha</th><th>Modo</th><th>Correctas</th><th>Aciertos</th><th>Duración</th></tr>' + rows + '</table></div>';
  }

  /* Ajustes */
  function viewSettings() {
    return '<h1>Ajustes</h1><div class="card"><h2 style="margin-top:0">Fecha de tu examen</h2>' +
      '<div class="row"><input type="date" id="exam-date" value="' + esc(S.settings.examDate) + '"><button class="btn" data-act="save-date">Guardar</button></div></div>' +
      '<div class="card"><h2 style="margin-top:0">Tu progreso</h2><p class="small muted">Se guarda en este navegador. Exporta una copia de vez en cuando.</p>' +
      '<div class="row"><button class="btn" data-act="export">Exportar</button><input type="file" id="import-file" accept="application/json"></div>' +
      '<p><button class="btn danger" data-act="reset">Borrar todo el progreso</button></p></div>' +
      '<div class="card note"><b>Sobre el contenido.</b> Los resúmenes, tarjetas y preguntas son material original escrito para esta app y siguen la estructura pública del examen (temas, pesos y formato). No son material oficial del CFA Institute y pueden contener errores. Contrasta lo importante con tu currículo oficial.</div>';
  }

  /* ---------- Acciones ---------- */
  var actions = {
    tab: function (el) { ui.tab = el.dataset.tab; if (ui.tab !== 'tarjetas') ui.cards = null; render(); window.scrollTo(0, 0); },
    noop: function () {},
    'study-topic': function (el) { ui.studyTopic = el.dataset.topic; render(); },
    'practice-topic': function (el) { ui.pracSetup.topic = el.dataset.topic; ui.prac = null; ui.tab = 'practica'; render(); },
    'cards-start': function (el) {
      var t = el.dataset.topic === 'all' ? null : el.dataset.topic, q = dueCards(t);
      if (!q.length) return;
      ui.cards = { queue: shuffle(q), i: 0, show: false }; render();
    },
    'cards-show': function () { ui.cards.show = true; render(); },
    'cards-grade': function (el) {
      var cs = ui.cards, cur = cs.queue[cs.i], g = Number(el.dataset.g);
      var box = g === 0 ? 1 : Math.min(5, cur.box + (g === 2 ? 2 : 1));
      S.cards[cur.key] = { box: box, due: addDays(todayISO(), INTERVALS[box]) };
      if (g === 0) cs.queue.push({ key: cur.key, topic: cur.topic, card: cur.card, box: 1 });
      markDay(); save(); cs.i++; cs.show = false; render();
    },
    'cards-end': function () { ui.cards = null; render(); },
    'prac-start': function () {
      var topic = $('#p-topic').value, n = Number($('#p-n').value), dif = $('#p-dif').value, filtro = $('#p-filtro').value;
      ui.pracSetup = { topic: topic, n: n, dif: dif, filtro: filtro };
      var pool = ALLQ.filter(function (q) {
        if (topic !== 'all' && q.topic !== topic) return false;
        if (dif !== 'all' && String(q.d) !== dif) return false;
        var a = S.answers[q.id];
        if (filtro === 'nuevas' && a) return false;
        if (filtro === 'falladas' && !(a && a.last === 0)) return false;
        return true;
      });
      if (!pool.length) { toast('No hay preguntas con esos filtros.'); return; }
      ui.prac = { qs: shuffle(pool).slice(0, n), i: 0, picked: null, results: [] }; render();
    },
    opt: function (el) {
      var i = Number(el.dataset.i);
      if (ui.tab === 'practica' && ui.prac) {
        var pr = ui.prac;
        if (pr.picked != null) return;
        var q = pr.qs[pr.i]; pr.picked = i; var ok = i === q.c;
        pr.results.push(ok); record(q.id, ok); save(); render();
      } else if (ui.exam && !ui.exam.done) {
        ui.exam.answers[ui.exam.s + ':' + ui.exam.i] = i; render();
      }
    },
    'prac-next': function () { ui.prac.i++; ui.prac.picked = null; render(); },
    'prac-end': function () { ui.prac = null; render(); },
    'exam-start': function () { var m = $('#s-mode').value; ui.simSetup.mode = m; startExam(m); },
    'exam-goto': function (el) { ui.exam.i = Number(el.dataset.i); render(); },
    'exam-prev': function () { if (ui.exam.i > 0) { ui.exam.i--; render(); } },
    'exam-next': function () { var ses = ui.exam.sessions[ui.exam.s]; if (ui.exam.i + 1 < ses.qs.length) { ui.exam.i++; render(); } },
    'exam-flag': function () { var k = ui.exam.s + ':' + ui.exam.i; ui.exam.flags[k] = !ui.exam.flags[k]; render(); },
    'exam-finish': function () {
      var ses = ui.exam.sessions[ui.exam.s];
      var n = ses.qs.filter(function (_, i) { return ui.exam.answers[ui.exam.s + ':' + i] == null; }).length;
      if (n && !window.confirm('Te faltan ' + n + ' preguntas sin responder. ¿Terminar la sesión?')) return;
      finishSession();
    },
    'exam-next-session': function () {
      var ex = ui.exam; ex.s++; ex.i = 0; ex.between = false; ex.endsAt = Date.now() + ex.sessions[ex.s].limit * 1000; render(); startTicker();
    },
    'exam-review': function (el) { ui.review = el.dataset.f; render(); },
    'exam-close': function () { ui.exam = null; ui.review = null; render(); },
    'save-date': function () { S.settings.examDate = $('#exam-date').value; save(); toast('Fecha guardada'); },
    export: function () {
      var blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cfa-progreso-' + todayISO() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
    },
    reset: function () {
      if (window.confirm('Esto borra todo tu progreso en este navegador. ¿Seguro?')) { S = defaults(); save(); render(); toast('Progreso borrado'); }
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    var fn = actions[el.dataset.act];
    if (fn) fn(el, e);
  });
  document.addEventListener('change', function (e) {
    if (e.target.id !== 'import-file') return;
    var f = e.target.files && e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || typeof o !== 'object' || !o.answers) throw new Error('formato');
        S = Object.assign(defaults(), o); save(); render(); toast('Progreso importado');
      } catch (err) { toast('El archivo no tiene el formato esperado.'); }
    };
    r.readAsText(f);
  });

  render();
})();
