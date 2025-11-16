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











// === КУРСЫ (1 единица = сколько сомов) ===
    const rates = {
        KGS: 1,
        USD: 85.5,
        EUR: 95.2
    };

    const inputs = {
        som: document.getElementById('som'),
        usd: document.getElementById('usd'),
        eur: document.getElementById('eur')
    };

    let updating = false;

    // === Конвертация ===
    function convert(from, value) {
        if (updating) return;
        updating = true;

        const amount = parseFloat(value) || 0;
        const inKGS = amount * rates[from];

        if (from !== 'KGS') inputs.som.value = inKGS.toFixed(2);
        if (from !== 'USD') inputs.usd.value = (inKGS / rates.USD).toFixed(2);
        if (from !== 'EUR') inputs.eur.value = (inKGS / rates.EUR).toFixed(2);

        updating = false;
    }

    // === Запрет на отрицательные числа ===
    function blockNegative(input) {
        input.addEventListener('input', function() {
            // Убираем всё, что не цифра, точка или минус
            let value = this.value;

            // Если начинается с минуса — очищаем
            if (value.startsWith('-')) {
                this.value = '';
                return;
            }

            // Разрешаем только числа и одну точку
            const clean = value.replace(/[^0-9.]/g, '');
            const parts = clean.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            } else {
                this.value = clean;
            }
        });

        // Дополнительно: блокируем вставку минуса через Ctrl+V
        input.addEventListener('paste', function(e) {
            const pasted = (e.clipboardData || window.clipboardData).getData('text');
            if (pasted.includes('-')) {
                e.preventDefault();
            }
        });
    }

    // Применяем к каждому полю
    Object.values(inputs).forEach(blockNegative);

    // === Слушаем ввод ===
    inputs.som.addEventListener('input', () => convert('KGS', inputs.som.value));
    inputs.usd.addEventListener('input', () => convert('USD', inputs.usd.value));
    inputs.eur.addEventListener('input', () => convert('EUR', inputs.eur.value));

    // Выделение при клике
    Object.values(inputs).forEach(input => {
        input.addEventListener('focus', () => input.select());
    });