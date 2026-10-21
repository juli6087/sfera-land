// Sfera Interactive Experience Logic (Official Sfera Branding)

let currentCartTotal = 5490;

function showToast(message) {
  const toast = document.getElementById('toastNotify');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// 1. Hero Cart Button Simulation
function triggerHeroCart(title, price) {
  currentCartTotal += price;
  const sumLabel = document.getElementById('cartSumLabel');
  const economyLabel = document.getElementById('economyLabel');

  if (sumLabel) sumLabel.textContent = `${currentCartTotal.toLocaleString('ru-RU')} ₽`;
  if (economyLabel) {
    const saved = Math.round(currentCartTotal * 0.2);
    economyLabel.textContent = `~ ${saved.toLocaleString('ru-RU')} ₽`;
  }

  showToast(`«${title}» добавлен в корзину: +${price.toLocaleString('ru-RU')} ₽`);
}

// 2. Marketplace & Booking buttons simulation
function simulateMpClick(platform) {
  showToast(`Переход в канал: ${platform}. Покупатель оформляет заказ в привычном сервисе.`);
}

// 3. WB API Sync Simulation
function runWbSyncSimulation() {
  const syncBtn = document.getElementById('syncBtn');
  const btnText = document.getElementById('syncBtnText');
  const dot = document.getElementById('syncDot');
  const status = document.getElementById('syncStatusText');
  const list = document.getElementById('wbItemsList');

  btnText.textContent = 'Синхронизация по API...';
  syncBtn.disabled = true;
  dot.classList.add('syncing');
  status.textContent = 'Получение остатков и фото с Wildberries...';

  setTimeout(() => {
    const newItem = document.createElement('div');
    newItem.className = 'stream-item';
    newItem.innerHTML = `
      <div class="stream-item-thumb wb-thumb">WB</div>
      <div class="stream-item-info">
        <strong>Куртка демисезонная оверсайз</strong>
        <span>Артикул: 29014812 • Остаток: 19 шт.</span>
      </div>
      <div class="stream-item-price">6 800 ₽</div>
    `;
    list.prepend(newItem);

    btnText.textContent = 'Импортировано еще +1 позиция';
    status.textContent = 'Каталог синхронизирован с WB (125 товаров)';
    dot.classList.remove('syncing');
    syncBtn.disabled = false;

    showToast('Каталог Wildberries успешно перенесен: фото, артикулы и цены обновлены');
  }, 1200);
}

// 4. Интерактивное демо AI-копирайтера: Генерация SEO-новостей с анимацией печати
const aiNewsDatabase = {
  dentistry: {
    title: 'Как безболезненно восстановить зубной ряд: современные протоколы имплантации',
    keywords: ['имплантация зубов', 'лечение под микроскопом', 'стоматология москва', 'восстановление эмали'],
    text: 'Современная стоматология сделала качественный скачок: инновационные протоколы дентальной имплантации позволяют полностью восстановить жевательную функцию и естественную эстетику улыбки всего за один визит. Применение 3D-моделирования челюсти и компьютерных хирургических шаблонов исключает человеческий фактор и сводит период реабилитации к минимуму. Пациенты возвращаются к привычному образу жизни уже на следующий день без боли и отёков.'
  },
  machinery: {
    title: 'Как оптимизировать смету на нулевом цикле строительства: аренда экскаватора-погрузчика с экипажем',
    keywords: ['аренда спецтехники', 'экскаватор погрузчик jcb', 'земляные работы', 'доставка на объект'],
    text: 'При реализации масштабных строительных проектов покупка тяжелой спецтехники замораживает до 40% оборотного капитала. Аренда проверенных экскаваторов-погрузчиков и автокранов с аттестованными машинистами позволяет закрыть земляные работы строго в график. Подача исправной техники на объект осуществляется в течение 2 часов с полным пакетом закрывающих документов и круглосуточным сервисным сопровождением.'
  },
  'wb-clothing': {
    title: 'Тренды базового гардероба 2026: почему оверсайз-худи из плотного футера бьют рекорды заказов на Wildberries',
    keywords: ['магазин одежды wb', 'худи оверсайз', 'базовый гардероб', 'вайлдберриз тренды'],
    text: 'Аналитика поисковых запросов на маркетплейсах фиксирует устойчивый рост спроса на минималистичный оверсайз и премиальный хлопок качества пенье. Покупатели все чаще выбирают универсальные капсульные вещи, которые держат форму после десятков стирок. Наша новая коллекция худи и джоггеров уже доступна к заказу с оперативной примеркой в удобном для вас пункте выдачи заказов.'
  }
};

let currentAiNicheKey = 'dentistry';
let typingIntervalTimer = null;

function selectNicheDemo(nicheKey) {
  if (!aiNewsDatabase[nicheKey]) return;
  currentAiNicheKey = nicheKey;

  // Обновляем активную вкладку
  const tabs = document.querySelectorAll('.btn-niche-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-niche') === nicheKey) {
      tab.classList.add('active-niche');
    } else {
      tab.classList.remove('active-niche');
    }
  });

  // Запуск генерации с анимацией печати
  startTypewriterAnimation(nicheKey);
}

function triggerCurrentNicheTypewriter() {
  startTypewriterAnimation(currentAiNicheKey);
}

function startTypewriterAnimation(nicheKey) {
  const data = aiNewsDatabase[nicheKey];
  if (!data) return;

  const titleEl = document.getElementById('aiArticleTitle');
  const textEl = document.getElementById('aiOutputText');
  const keywordsContainer = document.getElementById('aiKeywordsContainer');
  const statusPill = document.getElementById('aiStatusPill');
  const cursorEl = document.getElementById('typingCursor');
  const btn = document.getElementById('aiGenerateBtn');

  if (typingIntervalTimer) {
    clearInterval(typingIntervalTimer);
    typingIntervalTimer = null;
  }

  // Обновляем заголовок
  if (titleEl) {
    titleEl.textContent = data.title;
  }

  // Обновляем ключевые слова
  if (keywordsContainer) {
    keywordsContainer.innerHTML = '';
    data.keywords.forEach(kw => {
      const tag = document.createElement('span');
      tag.className = 'keyword-tag';
      tag.textContent = kw;
      keywordsContainer.appendChild(tag);
    });
  }

  // Индикация процесса
  if (statusPill) {
    statusPill.textContent = 'Нейросеть печатает...';
    statusPill.classList.add('generating');
  }

  if (cursorEl) cursorEl.style.display = 'inline-block';
  if (btn) btn.disabled = true;

  if (textEl) {
    textEl.textContent = '';
  }

  const fullText = data.text;
  let charIndex = 0;
  const speed = 14; // миллисекунды на символ для приятного гладкого темпа

  typingIntervalTimer = setInterval(() => {
    if (charIndex < fullText.length) {
      // Печатаем порциями по 2-3 символа для естественной скорости
      const chunk = fullText.slice(charIndex, charIndex + 2);
      if (textEl) textEl.textContent += chunk;
      charIndex += 2;
    } else {
      clearInterval(typingIntervalTimer);
      typingIntervalTimer = null;

      if (statusPill) {
        statusPill.textContent = 'Готово (0.38 сек)';
        statusPill.classList.remove('generating');
      }
      if (btn) btn.disabled = false;
      showToast(`SEO-новость для ниши успешно сгенерирована`);
    }
  }, speed);
}

function copyAiNewsText() {
  const titleEl = document.getElementById('aiArticleTitle');
  const textEl = document.getElementById('aiOutputText');
  const fullContent = `${titleEl ? titleEl.textContent : ''}\n\n${textEl ? textEl.textContent : ''}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fullContent).then(() => {
      showToast('Текст SEO-новости скопирован в буфер обмена');
    }).catch(() => {
      showToast('Текст скопирован');
    });
  } else {
    showToast('Текст скопирован');
  }
}

// 5. Интерактивный виджет кастомизации витрины (Убийца отказов / SEO-магнит)
document.addEventListener('DOMContentLoaded', () => {
  // А) Переключение цветов палитры
  const swatches = document.querySelectorAll('.palette-swatch-btn');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active-swatch'));
      swatch.classList.add('active-swatch');

      const color = swatch.getAttribute('data-color');
      const title = swatch.getAttribute('title');

      // Применяем глобально и в виджете
      document.documentElement.style.setProperty('--sfera-blue', color);
      document.documentElement.style.setProperty('--sfera-blue-hover', color);

      const liveBtn = document.getElementById('liveCartActionBtn');
      const liveBadge = document.getElementById('liveCardBadge');
      const brandLogo = document.querySelector('.sim-brand-logo');

      if (liveBtn) liveBtn.style.backgroundColor = color;
      if (liveBadge) liveBadge.style.backgroundColor = color;
      if (brandLogo) brandLogo.style.color = color;

      showToast(`Цвет витрины изменен на: ${title}`);
    });
  });

  // Б) Переключение шрифтовых пар
  const fontBtns = document.querySelectorAll('.btn-toggle-font');
  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fontBtns.forEach(b => b.classList.remove('active-font-btn'));
      btn.classList.add('active-font-btn');

      const chosenFont = btn.getAttribute('data-font');
      const liveCard = document.getElementById('liveCardElement');
      if (liveCard) {
        liveCard.style.fontFamily = chosenFont;
      }

      showToast(`Шрифт витрины изменен на: ${btn.querySelector('strong').textContent}`);
    });
  });

  // В) Ползунок скругления (Range Slider)
  const radiusSlider = document.getElementById('radiusRangeSlider');
  const radiusDisplay = document.getElementById('radiusValueDisplay');

  if (radiusSlider && radiusDisplay) {
    radiusSlider.addEventListener('input', (e) => {
      const radiusVal = e.target.value + 'px';
      radiusDisplay.textContent = radiusVal;

      const liveCard = document.getElementById('liveCardElement');
      const photoArt = document.querySelector('.live-photo-art');
      const cartBtn = document.getElementById('liveCartActionBtn');
      const mpBtns = document.querySelectorAll('.btn-live-mp');

      if (liveCard) liveCard.style.borderRadius = radiusVal;
      if (photoArt) photoArt.style.borderRadius = radiusVal;
      if (cartBtn) cartBtn.style.borderRadius = radiusVal;
      mpBtns.forEach(b => b.style.borderRadius = radiusVal);
    });
  }
});

function testLiveCartClick() {
  const btn = document.getElementById('liveCartActionBtn');
  const label = document.getElementById('liveCartBtnLabel');
  label.textContent = 'Добавлено в корзину!';
  btn.style.filter = 'brightness(1.15)';

  showToast('Товар из интерактивной витрины добавлен в корзину');

  setTimeout(() => {
    label.textContent = 'В корзину сайта';
    btn.style.filter = '';
  }, 2200);
}

function resetCustomizerPreview() {
  const defaultColor = '#01A0FC';
  document.documentElement.style.setProperty('--sfera-blue', defaultColor);
  document.documentElement.style.setProperty('--sfera-blue-hover', '#008CE0');

  const swatches = document.querySelectorAll('.palette-swatch-btn');
  swatches.forEach(s => s.classList.remove('active-swatch'));
  if (swatches[0]) swatches[0].classList.add('active-swatch');

  const fontBtns = document.querySelectorAll('.btn-toggle-font');
  fontBtns.forEach(b => b.classList.remove('active-font-btn'));
  if (fontBtns[0]) fontBtns[0].classList.add('active-font-btn');

  const liveCard = document.getElementById('liveCardElement');
  if (liveCard) {
    liveCard.style.fontFamily = "'Manrope', sans-serif";
    liveCard.style.borderRadius = '16px';
  }

  const radiusSlider = document.getElementById('radiusRangeSlider');
  const radiusDisplay = document.getElementById('radiusValueDisplay');
  if (radiusSlider) radiusSlider.value = 16;
  if (radiusDisplay) radiusDisplay.textContent = '16 px';

  const liveBtn = document.getElementById('liveCartActionBtn');
  const liveBadge = document.getElementById('liveCardBadge');
  const brandLogo = document.querySelector('.sim-brand-logo');
  if (liveBtn) liveBtn.style.backgroundColor = defaultColor;
  if (liveBadge) liveBadge.style.backgroundColor = defaultColor;
  if (brandLogo) brandLogo.style.color = defaultColor;

  showToast('Параметры витрины сброшены к фирменным по умолчанию');
}

// Modal Logic
function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const demoView = document.getElementById('modalContentDemo');
  const buyView = document.getElementById('modalContentBuy');
  const successView = document.getElementById('modalSuccess');

  successView.style.display = 'none';

  if (type === 'demo') {
    demoView.style.display = 'block';
    buyView.style.display = 'none';
  } else {
    demoView.style.display = 'none';
    buyView.style.display = 'block';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modalOverlay') && !event.target.classList.contains('modal-close')) {
    return;
  }
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleFormSubmit(event, actionName) {
  event.preventDefault();
  const demoView = document.getElementById('modalContentDemo');
  const buyView = document.getElementById('modalContentBuy');
  const successView = document.getElementById('modalSuccess');

  demoView.style.display = 'none';
  buyView.style.display = 'none';
  successView.style.display = 'block';
}
