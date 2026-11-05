/**
 * СФЕРА. — Интерактивная логика лендинга
 */

// 1. Переключение табов сценариев (Showcase Bento)
function switchScenario(scenarioId) {
  const tabs = document.querySelectorAll('#scenarioTabs .tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));

  const panels = document.querySelectorAll('.scenario-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  const activePanel = document.getElementById('panel-' + scenarioId);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Найти кнопку, вызвавшую событие
  const clickedTab = Array.from(tabs).find(btn => 
    btn.getAttribute('onclick').includes(scenarioId)
  );
  if (clickedTab) {
    clickedTab.classList.add('active');
  }
}

// 2. Живой кастомизатор (Интерактивная карточка товара)
let currentCardColor = '#00A3FF';

function setCardColor(colorHex, btnElement) {
  currentCardColor = colorHex;
  const demoBtn = document.getElementById('demoBtn');
  
  if (demoBtn) {
    demoBtn.style.backgroundColor = colorHex;
    demoBtn.style.boxShadow = `0 4px 14px ${colorHex}55`;
  }
  
  // Обновляем активный класс на кнопках цвета
  const bubbles = document.querySelectorAll('.color-bubble');
  bubbles.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

function setCardFont(fontFamily, btnElement) {
  const demoCard = document.getElementById('demoCard');
  if (demoCard) {
    demoCard.style.fontFamily = `'${fontFamily}', sans-serif`;
  }
  
  const pills = document.querySelectorAll('.font-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

function setCardWeight(fontWeight, btnElement) {
  const demoTitle = document.getElementById('demoTitle');
  const demoPrice = document.getElementById('demoPrice');
  if (demoTitle) demoTitle.style.fontWeight = fontWeight;
  if (demoPrice) demoPrice.style.fontWeight = fontWeight;

  const segBtns = document.querySelectorAll('.seg-btn');
  segBtns.forEach(s => s.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

function triggerCardAdd() {
  const btn = document.getElementById('demoBtn');
  if (!btn) return;
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ Добавлено!';
  btn.style.backgroundColor = '#10B981';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.backgroundColor = currentCardColor;
  }, 1600);
}

// 3. Калькулятор выгоды и экономии
function calculateSavings() {
  const turnoverInput = document.getElementById('turnoverSlider');
  const shareInput = document.getElementById('shareSlider');
  
  const turnoverDisplay = document.getElementById('turnoverDisplay');
  const shareDisplay = document.getElementById('shareDisplay');
  const savingsDisplay = document.getElementById('savingsDisplay');
  const yearSavingsDisplay = document.getElementById('yearSavingsDisplay');

  if (!turnoverInput || !shareInput) return;

  const turnover = parseInt(turnoverInput.value, 10);
  const share = parseInt(shareInput.value, 10) / 100;

  // Форматирование оборота
  turnoverDisplay.innerText = turnover.toLocaleString('ru-RU') + ' ₽';
  shareDisplay.innerText = (share * 100) + '%';

  // Расчет экономии (25% комиссии маркетплейса с перенесенного оборота)
  const transferredVolume = turnover * share;
  const monthlySavings = Math.round(transferredVolume * 0.25);
  const yearSavings = monthlySavings * 12;

  savingsDisplay.innerText = monthlySavings.toLocaleString('ru-RU') + ' ₽';
  yearSavingsDisplay.innerText = yearSavings.toLocaleString('ru-RU') + ' ₽';
}

// 4. Аккордеон FAQ
function toggleFaq(itemElement) {
  const wasActive = itemElement.classList.contains('active');
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => i.classList.remove('active'));

  if (!wasActive) {
    itemElement.classList.add('active');
  }
}

// 5. Модальное окно лидогенерации
function openLeadModal(sourceContext) {
  const modal = document.getElementById('leadModal');
  const title = document.getElementById('modalTitleText');
  if (title && sourceContext) {
    title.innerText = sourceContext.includes('Демо') 
      ? 'Получить демо-доступ к магазину' 
      : 'Запустить магазин «Сфера»';
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLeadModal() {
  const modal = document.getElementById('leadModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'leadModal') {
    closeLeadModal();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  closeLeadModal();

  const toast = document.getElementById('successToast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

// Инициализация калькулятора при старте
document.addEventListener('DOMContentLoaded', () => {
  calculateSavings();

  // Плавное появление фона шапки при скролле
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 25) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
});
