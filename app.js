(() => {
  'use strict';
  const data = window.UNIVERSE_DATA;
  const ui = data.ui;
  const app = document.getElementById('app');
  const localCovers = new Map();
  let tag = '', emotion = '', jungTheme = 'pink';
  const el = (name, cls, text) => {
    const node = document.createElement(name);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const button = (text, cls, action) => {
    const node = el('button', cls, text);
    node.type = 'button'; node.addEventListener('click', action); return node;
  };
  // Only local paths and HTTP(S) URLs are accepted; text is always rendered as text.
  function safePath(value) {
    if (!value || typeof value !== 'string') return '';
    if (/^(?:https?:\/\/|(?:\.\.?\/)?assets\/)/i.test(value)) return value;
    return '';
  }
  function image(path, name, cls) {
    const src = safePath(path);
    if (!src) return null;
    const img = el('img', cls); img.src = src; img.alt = name; img.loading = 'lazy';
    img.addEventListener('error', () => img.remove()); return img;
  }
  document.title = data.title;
  document.getElementById('brand').textContent = data.title;
  document.getElementById('header-note').textContent = ui.headerNote;
  document.getElementById('footer').append(el('p', '', ui.footer), el('small', '', ui.footerNote));
  // One decorative layer, no timers per particle; CSS handles entrance and drift.
  let popcornCleanup = () => {};
  function mountPopcorn() {
    popcornCleanup();
    const config = data.popcorn;
    if (!config) return;
    const layer = el('div', 'popcorn-scene');
    layer.setAttribute('aria-hidden', 'true');
    const bucket = el('div', 'popcorn-bucket');
    bucket.append(el('span', 'bucket-rim'), el('span', 'bucket-body'), el('span', 'bucket-star', '✦'));
    layer.append(bucket); document.body.append(layer);
    let frame = 0, dimensions = '';
    const random = (min, max) => min + Math.random() * (max - min);
    function layout() {
      if (document.body.dataset.theme !== 'home') return;
      const width = document.documentElement.clientWidth;
      const height = Math.max(document.body.scrollHeight, window.innerHeight);
      if (`${width}:${height}` === dimensions) return;
      dimensions = `${width}:${height}`;
      layer.style.height = `${height}px`;
      layer.querySelectorAll('.popcorn-layer').forEach(node => node.remove());
      const mobile = width <= config.mobileBreakpoint;
      const rects = [...document.querySelectorAll('.site-header, .home-hero h1, .home-hero p, .collection-heading, .room-card, .screening-prompt, .room-ledger, .screening-closing, .upload-note, footer p, footer small')].map(node => {
        let rect = node.getBoundingClientRect();
        if (node.matches('h1, p, small')) {
          const range = document.createRange(); range.selectNodeContents(node);
          rect = range.getBoundingClientRect();
        }
        const padding = node.classList.contains('room-card') ? 3 : config.exclusionPadding;
        return { card: node.classList.contains('room-card'), left: rect.left - padding, right: rect.right + padding,
          top: rect.top + window.scrollY - padding, bottom: rect.bottom + window.scrollY + padding };
      });
      // A cut-out mask protects text and cards even while grains travel from the bucket.
      const rectangle = (l, t, r, b) => `M${l},${t}H${r}V${b}H${l}Z`;
      // Union exclusion rectangles first: overlapping text blocks must never reopen holes.
      const boundaries = [...new Set([0, height, ...rects.flatMap(r => [Math.max(0, r.top), Math.min(height, r.bottom)])])].sort((a, b) => a - b);
      let mask = rectangle(0, 0, width, height);
      for (let i = 0; i < boundaries.length - 1; i++) {
        const top = boundaries[i], bottom = boundaries[i + 1], center = (top + bottom) / 2;
        const intervals = rects.filter(r => r.top < center && r.bottom > center).map(r => [Math.max(0, r.left), Math.min(width, r.right)]).sort((a, b) => a[0] - b[0]);
        const merged = [];
        intervals.forEach(([left, right]) => {
          const last = merged[merged.length - 1];
          if (last && left <= last[1]) last[1] = Math.max(last[1], right);
          else merged.push([left, right]);
        });
        merged.forEach(([left, right]) => { mask += rectangle(left, top, right, bottom); });
      }
      const rim = bucket.querySelector('.bucket-rim').getBoundingClientRect();
      const source = { x: rim.left + rim.width * 0.8, y: rim.top + window.scrollY + rim.height * 0.75 };
      const used = [];
      Object.entries(config.layers).forEach(([depth, settings]) => {
        const plane = el('div', `popcorn-layer popcorn-${depth}`);
        plane.style.clipPath = `path(evenodd, "${mask}")`;
        layer.append(plane);
        const count = mobile ? settings.mobileCount : settings.desktopCount;
        const sizes = mobile ? settings.mobileSizeRange : settings.sizeRange;
        const foreground = depth === 'foreground';
        const points = [];
        const edge = foreground ? sizes[1] / 2 + settings.driftDistance : sizes[0] / 2;
        const step = foreground ? 26 : 19;
        const top = Math.min(height * config.spreadArea.top, 115);
        const columns = [];
        for (let x = Math.max(edge, width * config.spreadArea.left); x < width - edge; x += step) columns.push(x);
        columns.push(width - edge);
        for (let y = Math.max(top, 95); y < height * config.spreadArea.bottom - edge; y += step) {
          for (const x of columns) {
            const point = { x: Math.max(edge, Math.min(width - edge, x + random(-4, 4))), y: y + random(-4, 4) };
            const clearance = foreground ? edge : 0;
            if (rects.some(r => { const gap = r.card ? 0 : clearance; return point.x > r.left - gap && point.x < r.right + gap && point.y > r.top - gap && point.y < r.bottom + gap; })) continue;
            // Confine memories to a pouring ribbon, never a uniformly scattered wall.
            const ribbonY = (mobile ? 105 : 130) + point.x * (mobile ? 0.52 : 0.48);
            const nearBucket = point.x < (mobile ? 105 : 270) && point.y < (mobile ? 170 : 230);
            if (!nearBucket && Math.abs(point.y - ribbonY) > (mobile ? 65 : 78)) continue;
            points.push(point);
          }
        }
        for (let i = points.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [points[i], points[j]] = [points[j], points[i]];
        }
        const chosen = [];
        const accept = point => {
          if (chosen.every(p => Math.hypot(p.x - point.x, p.y - point.y) >= settings.spacing) && used.every(p => Math.hypot(p.x - point.x, p.y - point.y) >= 19)) {
            chosen.push(point); used.push(point); return true;
          }
          return false;
        };
        // A few large grains make the pouring direction explicit, before the wider spread.
        if (foreground) {
          const near = points.filter(p => p.x > source.x && p.x < source.x + (mobile ? 170 : 270) && p.y > source.y && p.y < source.y + 210);
          near.sort((a, b) => Math.hypot(a.x-source.x,a.y-source.y)-Math.hypot(b.x-source.x,b.y-source.y));
          for (const point of near) { accept(point); if (chosen.length >= 3) break; }
        }
        const bands = Array.from({ length: 4 }, () => []);
        points.forEach(point => bands[Math.min(3, Math.floor(point.x / width * 4))].push(point));
        while (chosen.length < count && bands.some(band => band.length)) {
          for (const band of bands) { if (band.length) accept(band.pop()); if (chosen.length >= count) break; }
        }
        chosen.forEach((point, index) => {
          const flight = el('span', 'popcorn-flight');
          const grain = el('span', 'popcorn-grain');
          const delay = settings.delayRange[0] + (settings.delayRange[1] - settings.delayRange[0]) * index / Math.max(1, chosen.length - 1);
          flight.style.cssText = `left:${point.x}px;top:${point.y}px;--from-x:${source.x - point.x}px;--from-y:${source.y - point.y}px;--size:${random(...sizes)}px;--opacity:${random(...settings.opacityRange)};--delay:${delay}s;--entrance:${settings.entranceDuration}s;--duration:${random(...settings.animationDurationRange)}s;--turn:${random(-45,45)}deg;--drift:${settings.driftDistance}px;--blur:${depth === 'background' ? 0.3 : 0}px;`;
          grain.append(el('i', 'popcorn-lobe lobe-one'), el('i', 'popcorn-lobe lobe-two'), el('i', 'popcorn-lobe lobe-three'), el('i', 'popcorn-heart'));
          flight.append(grain); plane.append(flight);
        });
      });
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(layout); }
    const observer = new ResizeObserver(schedule); observer.observe(app);
    window.addEventListener('resize', schedule);
    popcornCleanup = () => { observer.disconnect(); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); layer.remove(); popcornCleanup = () => {}; };
    schedule();
  }
  function home() {
    document.body.dataset.theme = 'home';
    const hero = el('section', 'home-hero');
    const title = el('h1'); title.setAttribute('aria-label', data.homeTitle);
    data.homeTitleLines.forEach(line => title.append(el('span', '', line)));
    const prompt = el('a', 'screening-prompt', `${ui.screeningPrompt} ↗`); prompt.href = '#exhibition';
    hero.append(el('p', 'eyebrow', ui.eyebrow), title, el('p', 'subtitle', data.subtitle), el('p', 'intro', ui.intro), prompt);
    const ledger = el('div', 'room-ledger'); ledger.append(el('span', 'ledger-light'), el('p', '', ui.screeningLabel), el('small', '', ui.roomLedger));
    hero.append(ledger);
    const heading = el('div', 'collection-heading');
    heading.append(el('h2', '', ui.collection), el('p', '', ui.collectionNote));
    const grid = el('div', 'room-grid');
    data.people.forEach((person, index) => {
      const card = el('article', `room-card theme-${person.theme}`);
      card.addEventListener('click', event => {
        if (!event.target.closest('a, button, input, label')) location.hash = person.id;
      });
      const art = el('div', 'room-art');
      const img = localCovers.has(person.id) ? el('img', 'cover-image') : image(person.cover, person.name, 'cover-image');
      if (img) {
        if (localCovers.has(person.id)) { img.src = localCovers.get(person.id); img.alt = person.name; }
        img.style.objectPosition = person.coverPosition || '50% 40%';
        img.addEventListener('load', () => art.classList.add('has-photo'));
        img.addEventListener('error', () => { img.remove(); art.classList.remove('has-photo'); });
      }
      if (img) art.append(img);
      art.append(el('span', 'orbit orbit-one'), el('span', 'orbit orbit-two'), el('span', 'room-symbol', person.symbol), el('span', 'room-number', `0${index + 1}`));
      const hint = el('span', 'cover-hint', ui.coverHint); art.append(hint);
      const picker = el('input', 'cover-input'); picker.type = 'file'; picker.accept = 'image/*';
      picker.id = `cover-${person.id}`;
      const uploadText = localCovers.has(person.id) ? ui.replaceCover : ui.upload;
      const controls = el('div', 'cover-controls');
      const trigger = button(uploadText, 'upload-button', () => picker.click());
      trigger.setAttribute('aria-label', `${person.name}：${uploadText}`);
      controls.append(picker, trigger);
      if (localCovers.has(person.id)) controls.append(button(ui.removeCover, 'remove-cover', () => {
        URL.revokeObjectURL(localCovers.get(person.id)); localCovers.delete(person.id); home();
      }));
      picker.addEventListener('change', () => {
        const file = picker.files[0]; if (!file) return;
        if (!file.type.startsWith('image/')) { alert(ui.uploadError); return; }
        const url = URL.createObjectURL(file);
        const probe = new Image();
        probe.onload = () => {
          if (localCovers.has(person.id)) URL.revokeObjectURL(localCovers.get(person.id));
          localCovers.set(person.id, url); home();
        };
        probe.onerror = () => { URL.revokeObjectURL(url); alert(ui.uploadError); };
        probe.src = url;
      });
      art.append(controls);
      const content = el('div', 'room-content');
      content.append(el('p', 'english', person.english), el('h3', '', person.name));
      const keywords = el('div', 'keywords'); person.keywords.forEach(word => keywords.append(el('span', '', word)));
      const link = el('a', 'enter-link', `${ui.enter} ↗`); link.href = `#${person.id}`;
      content.append(keywords, el('p', 'description', person.description), link);
      const spine = el('div', 'archive-spine'); spine.append(el('span', '', `${ui.archiveLabel} / 0${index + 1}`), el('span', '', ui.archiveType));
      card.append(spine, art, content); grid.append(card);
    });
    const exhibition = el('section', 'exhibition'); exhibition.id = 'exhibition';
    exhibition.append(heading, grid, el('p', 'upload-note', ui.uploadNote));
    const room = el('div', 'screening-room'); room.append(hero, exhibition);
    const closing = el('div', 'screening-closing'); closing.append(el('span', '', ui.archiveCount), el('p', '', ui.roomLedger));
    app.replaceChildren(room, closing);
    mountPopcorn();
  }
  function filterGroup(label, values, selected, choose) {
    const group = el('div', 'filter-group'); group.append(el('p', 'filter-label', label));
    const list = el('div', 'filter-buttons');
    ['', ...values].forEach(value => {
      const node = button(value || ui.all, `chip${selected === value ? ' active' : ''}`, () => choose(value));
      node.setAttribute('aria-pressed', String(selected === value)); list.append(node);
    }); group.append(list); return group;
  }
  function detail(person) {
    popcornCleanup();
    const theme = person.id === 'jung' ? jungTheme : person.theme;
    document.body.dataset.theme = theme;
    const back = el('a', 'back-link', `← ${ui.back}`); back.href = '#';
    const hero = el('section', 'detail-hero');
    const cover = image(person.cover, person.name, 'detail-cover'); if (cover) hero.append(cover);
    const info = el('div', 'detail-info');
    info.append(el('p', 'eyebrow', ui.room), el('p', 'english', person.english), el('h1', '', person.name), el('p', 'subtitle', person.roomDescription));
    hero.append(info, el('span', 'detail-symbol', person.symbol));
    if (person.id === 'jung') {
      const themes = el('div', 'theme-switch'); themes.append(el('span', '', ui.theme));
      [['pink', ui.pink], ['blue', ui.blue]].forEach(([key, title]) => {
        const btn = button(title, `theme-button ${key}${theme === key ? ' selected' : ''}`, () => { jungTheme = key; detail(person); });
        btn.setAttribute('aria-pressed', String(theme === key)); themes.append(btn);
      }); info.append(themes);
    }
    const nav = el('nav', 'section-nav'); nav.setAttribute('aria-label', ui.room);
    ui.sections.forEach((section, index) => { const link = el('a', '', section); link.href = `#${person.id}/${index}`; nav.append(link); });
    const filters = el('section', 'filters');
    filters.append(filterGroup(ui.tags, person.tags, tag, value => { tag = value; detail(person); }), filterGroup(ui.emotions, person.emotions, emotion, value => { emotion = value; detail(person); }));
    const matches = person.memories.filter(item => (!tag || item.tags.includes(tag)) && (!emotion || item.emotions.includes(emotion)));
    const status = el('div', 'filter-status'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    status.append(el('span', '', `${ui.filtered} · ${matches.length} ${ui.count}`));
    if (tag || emotion) status.append(button(ui.reset, 'reset-button', () => { tag = ''; emotion = ''; detail(person); }));
    const archive = el('div', 'archive');
    ui.sections.forEach((section, index) => {
      const entries = matches.filter(item => item.section === section); if (!entries.length) return;
      const block = el('section', 'archive-section'); block.id = `section-${index}`;
      const heading = el('div', 'section-heading'); heading.append(el('span', '', String(index + 1).padStart(2, '0')), el('h2', '', section));
      block.append(heading);
      const cards = el('div', 'memory-grid');
      entries.forEach(item => {
        const card = el('article', 'memory-card');
        const img = image(item.image, item.title, 'memory-image');
        if (img || item.visual) {
          const visual = el('div', 'visual-placeholder'); visual.append(el('span', '', '✧'), el('small', '', ui.placeholder));
          if (img) visual.append(img); card.append(visual);
        }
        const body = el('div', 'memory-body');
        const tags = el('div', 'memory-tags'); item.tags.forEach(word => tags.append(el('span', '', word)));
        body.append(tags, el('h3', '', item.title), el('p', '', item.text));
        const url = typeof item.url === 'string' && /^https?:\/\//i.test(item.url) ? item.url : '';
        if (url) { const link = el('a', 'memory-link', `${ui.open} ↗`); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; body.append(link); }
        else body.append(el('span', 'pending-link', `${ui.pending} ↗`));
        card.append(body); cards.append(card);
      }); block.append(cards); archive.append(block);
    });
    if (!matches.length) archive.append(el('p', 'empty-state', ui.empty));
    app.replaceChildren(back, hero, nav, filters, status, archive, el('p', 'archive-note', ui.note));
  }
  let currentId = '';
  function route() {
    const [id, section] = location.hash.slice(1).split('/');
    const person = data.people.find(item => item.id === id);
    if (id !== currentId) { tag = ''; emotion = ''; }
    currentId = id;
    if (person) detail(person); else home();
    if (id === 'exhibition') document.getElementById('exhibition')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (section !== undefined) document.getElementById(`section-${section}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route); route();
})();
