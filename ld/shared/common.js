// Общие кусочки для трёх макетов: кристалл, кучки кристаллов, флаг-логотип,
// окно оформления покупки и всплывашка. Внешний вид окна каждый вариант задаёт сам
// через классы .co-*.

(function () {
  const S = window.SHOP;

  const rub = n => n.toLocaleString('ru-RU').replace(/\s/g, ' ') + ' ₽';
  const num = n => n.toLocaleString('ru-RU').replace(/\s/g, ' ');

  // Спрайт: кристалл, флаг, фильтр «рваной кисти»
  const SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <linearGradient id="gemCore" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#b9fff4"/><stop offset=".45" stop-color="#2fe0c8"/><stop offset="1" stop-color="#0a7bd8"/>
    </linearGradient>
    <linearGradient id="gemBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3fc8ff"/><stop offset="1" stop-color="#0a3fb8"/>
    </linearGradient>
    <radialGradient id="pileGlow"><stop offset="0" stop-color="#5fe8ff" stop-opacity=".55"/><stop offset="1" stop-color="#5fe8ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="clothShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".18" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".35" stop-color="#000" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity=".3"/>
      <stop offset=".65" stop-color="#fff" stop-opacity=".05"/><stop offset=".82" stop-color="#000" stop-opacity=".18"/>
      <stop offset="1" stop-color="#000" stop-opacity=".4"/>
    </linearGradient>
    <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="cloth" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="t"/>
      <feColorMatrix in="t" type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".1"/></feComponentTransfer>
      <feComposite in="g2" in2="SourceGraphic" operator="in" result="tex"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="tex"/></feMerge>
    </filter>
    <clipPath id="flagShape">
      <polygon points="0,0 120,0 120,132 110,141 99,131 86,147 73,134 60,149 47,133 34,146 22,131 10,142 0,130"/>
    </clipPath>
  </defs>
  <symbol id="gem" viewBox="0 0 60 70">
    <polygon points="30,1 58,17.5 58,52.5 30,69 2,52.5 2,17.5" fill="#05205a"/>
    <polygon points="30,4.5 55,19.3 55,50.7 30,65.5 5,50.7 5,19.3" fill="url(#gemBody)"/>
    <polygon points="30,4.5 5,19.3 16,27 30,19" fill="#a8f6ff"/>
    <polygon points="30,4.5 55,19.3 44,27 30,19" fill="#53d6ff"/>
    <polygon points="55,19.3 55,50.7 44,43 44,27" fill="#1c7cf0"/>
    <polygon points="55,50.7 30,65.5 30,51 44,43" fill="#0b44c4"/>
    <polygon points="30,65.5 5,50.7 16,43 30,51" fill="#145fe0"/>
    <polygon points="5,50.7 5,19.3 16,27 16,43" fill="#3cb4ff"/>
    <polygon points="30,19 44,27 44,43 30,51 16,43 16,27" fill="url(#gemCore)"/>
    <polygon points="30,19 37,23 30,35 23,23" fill="#ffffff" opacity=".45"/>
    <path d="M20 22 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" fill="#fff"/>
  </symbol>
  <symbol id="flag2k" viewBox="0 0 120 150">
    <g clip-path="url(#flagShape)" filter="url(#cloth)">
      <rect x="0" y="0" width="60" height="150" fill="#e8231a"/>
      <rect x="60" y="0" width="60" height="150" fill="#1a5ff0"/>
      <rect x="0" y="0" width="120" height="150" fill="url(#clothShade)"/>
    </g>
    <g filter="url(#rough)" fill="#0d0d0d" stroke="#0d0d0d" stroke-linejoin="round" font-family="Caveat, cursive" font-weight="700" text-anchor="middle" style="paint-order:stroke">
      <text x="61" y="84" font-size="88" stroke-width="3.5">LD</text>
      <text x="60" y="126" font-size="34" stroke-width="1.6" letter-spacing="5">LEGION</text>
    </g>
  </symbol>
</svg>`;

  function injectSprite() {
    const wrap = document.createElement('div');
    wrap.innerHTML = SPRITE;
    document.body.prepend(wrap.firstElementChild);
  }

  const gem = (size = 18, cls = 'gem') =>
    `<svg class="${cls}" width="${size}" height="${Math.round(size * 70 / 60)}" viewBox="0 0 60 70" aria-hidden="true"><use href="#gem"/></svg>`;

  const flag = (w = 60, cls = 'flag2k') =>
    `<svg class="${cls}" width="${w}" height="${Math.round(w * 150 / 120)}" viewBox="0 0 120 150" role="img" aria-label="флаг"><use href="#flag2k"/></svg>`;

  // Кучка кристаллов: 1, 3, 5 или 8 штук
  const PILES = {
    1: [[100, 70, 64, 0]],
    3: [[100, 52, 54, 0], [64, 84, 50, -10], [136, 84, 50, 9]],
    5: [[80, 46, 42, -6], [120, 46, 42, 7], [52, 86, 46, -12], [100, 90, 52, 0], [148, 86, 46, 11]],
    8: [[100, 30, 38, 3], [62, 58, 40, -9], [100, 62, 42, 0], [138, 58, 40, 8], [36, 96, 42, -14], [78, 98, 46, -4], [122, 98, 46, 5], [164, 96, 42, 13]],
  };
  function pile(n = 1, cls = 'pile', style = '') {
    const gems = (PILES[n] || PILES[1]).map(([cx, cy, w, r]) => {
      const h = w * 70 / 60;
      return `<use href="#gem" x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" transform="rotate(${r} ${cx} ${cy})"/>`;
    }).join('');
    return `<svg class="${cls}" ${style ? `style="${style}"` : ''} viewBox="0 0 200 140" aria-hidden="true"><ellipse cx="100" cy="112" rx="92" ry="26" fill="url(#pileGlow)"/>${gems}</svg>`;
  }

  const packArt = (p, cls = 'pack-art') => p.img
    ? `<img class="${cls} pack-chest" src="img/${p.img}.png" alt="">`
    : pile(p.pile, cls);

  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // Приводит кристаллы / скин / набор к одному виду для окна покупки
  function describe(kind, id) {
    if (kind === 'crystals') {
      const p = S.crystals.find(x => x.id === id);
      return { title: p.name, sub: num(p.amount) + (p.bonus ? ` + ${num(p.bonus)} в подарок` : '') + ' кристаллов',
        price: p.price, thumb: packArt(p, 'co-art'), crystals: p.amount + p.bonus };
    }
    if (kind === 'skin') {
      const s = S.skins.find(x => x.id === id);
      return { title: `«${s.name}»`, sub: `Скин на юнита ${s.unit} · ${S.rarity[s.rarity].label}`,
        price: s.price, thumb: `<img class="co-art" src="img/${s.img}.png" alt="">` };
    }
    const b = S.bundles.find(x => x.id === id);
    return { title: b.name, sub: b.lines.join(' · '), price: b.price,
      thumb: `<img class="co-art" src="img/${b.items[0]}.png" alt="">` };
  }

  // kind + id — один товар; либо готовый объект { title, sub, price, thumb, crystals } — например, корзина
  function openCheckout(kind, id) {
    const it = typeof kind === 'object' ? kind : describe(kind, id);
    const o = document.createElement('div');
    o.className = 'co-overlay';
    o.innerHTML = `
      <div class="co-modal" role="dialog" aria-modal="true" aria-label="Покупка">
        <button class="co-close" aria-label="Закрыть">×</button>
        <div class="co-title">Покупка</div>
        <div class="co-item">
          <div class="co-thumb">${it.thumb}</div>
          <div class="co-meta"><div class="co-name">${it.title}</div><div class="co-sub">${it.sub}</div></div>
          <div class="co-price">${rub(it.price)}</div>
        </div>
        <label class="co-label">ID игрока
          <input class="co-input" placeholder="Например, 48213977" inputmode="numeric" autocomplete="off">
        </label>
        <div class="co-hint">Найдёшь в игре: Профиль → цифры под ником</div>
        <div class="co-label">Промокод</div>
        <div class="co-row">
          <input class="co-input co-promo" placeholder="${S.promo.code}" autocomplete="off">
          <button class="co-apply" type="button">Применить</button>
        </div>
        <div class="co-promo-msg" aria-live="polite"></div>
        <div class="co-label">Способ оплаты</div>
        <div class="co-pay">${S.payMethods.map((m, i) =>
          `<label class="co-method"><input type="radio" name="pay" ${i ? '' : 'checked'}><span>${m}</span></label>`).join('')}</div>
        <button class="co-buy" type="button">Оплатить ${rub(it.price)}</button>
        <div class="co-fine">Нажимая «Оплатить», ты принимаешь условия оферты. Покупка придёт в игру сразу после оплаты.</div>
      </div>`;
    document.body.appendChild(o);
    requestAnimationFrame(() => o.classList.add('open'));

    const close = () => { o.classList.remove('open'); setTimeout(() => o.remove(), 200); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    o.addEventListener('click', e => { if (e.target === o) close(); });
    o.querySelector('.co-close').onclick = close;
    o.querySelector('.co-apply').onclick = () => {
      const v = o.querySelector('.co-promo').value.trim().toUpperCase();
      const msg = o.querySelector('.co-promo-msg');
      if (!v) { msg.textContent = ''; return; }
      if (v !== S.promo.code) { msg.textContent = 'Такого промокода нет'; msg.dataset.ok = '0'; return; }
      msg.dataset.ok = '1';
      msg.textContent = it.crystals
        ? `+${S.promo.bonus}% кристаллов: придёт ${num(Math.round(it.crystals * (1 + S.promo.bonus / 100)))}`
        : 'Этот промокод работает только на кристаллы';
    };
    o.querySelector('.co-buy').onclick = () => toast('Это макет — оплата пока не подключена');
    setTimeout(() => o.querySelector('.co-input').focus(), 50);
  }

  // Любая кнопка с data-buy="kind:id" открывает окно покупки
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-buy]');
    if (!b) return;
    e.preventDefault();
    const [kind, id] = b.dataset.buy.split(':');
    openCheckout(kind, id);
  });

  window.UI = { rub, num, gem, flag, pile, packArt, toast, describe, openCheckout, injectSprite };
  if (document.body) injectSprite(); else document.addEventListener('DOMContentLoaded', injectSprite);
})();
