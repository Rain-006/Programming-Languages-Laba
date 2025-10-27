const phoneRuInput = document.getElementById('phone_ru_input');
const phoneRuButton = document.getElementById('phone_ru_button');
const phoneRuResult = document.getElementById('phone_ru_result');

// Формат: +7 (XXX) XXX-XX-XX
const ruPhoneRegExp = /^\+7\s?\(?[489]\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

phoneRuButton.addEventListener('click', () => {
    const value = phoneRuInput.value.trim();
    if (ruPhoneRegExp.test(value)) {
        phoneRuResult.textContent = 'Номер корректен ✅';
        phoneRuResult.style.color = 'green';
    } else {
        phoneRuResult.textContent = 'Некорректный номер ❌';
        phoneRuResult.style.color = 'red';
    }
});






// TAB SLIDER LOGIC
const tabItems = document.querySelectorAll('.tab_content_item');
const tabBlocks = document.querySelectorAll('.tab_content_block');

let currentIndex = 0;
let autoSlider;

// Функция переключения таба
function showTab(index) {
    // Убираем активность у всех
    tabItems.forEach((item, i) => {
        item.classList.toggle('tab_content_item_active', i === index);
    });
    tabBlocks.forEach((block, i) => {
        block.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

// Клик по табам
tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        showTab(index);
        resetAutoSlider(); // Сбрасываем таймер при клике
    });
});

// Автослайдер
function startAutoSlider() {
    autoSlider = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabBlocks.length;
        showTab(currentIndex);
    }, 3000); // каждые 3 секунды
}

function resetAutoSlider() {
    clearInterval(autoSlider);
    startAutoSlider();
}

// Запуск автослайдера при загрузке
document.addEventListener('DOMContentLoaded', () => {
    showTab(0); // Показать первый таб
    startAutoSlider();
});