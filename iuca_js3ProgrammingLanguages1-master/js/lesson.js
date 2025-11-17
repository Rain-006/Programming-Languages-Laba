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








const cardsData = [
    { title: "Карточка 1", text: "Привет! Это первая карточка в нашем слайдере." },
    { title: "Карточка 2", text: "Вторая карточка с другим содержимым и цветом." },
    { title: "Карточка 3", text: "Третья — с красивым градиентом и анимацией." },
    { title: "Карточка 4", text: "Четвёртая карточка. Можно добавить сколько угодно!" },
    { title: "Карточка 5", text: "Пятая и последняя в этом примере." }
];

let activeIndex = 0;                                    // ← изменено здесь

const cardElement = document.querySelector('.card');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function updateCard() {
    // Анимация исчезновения
    cardElement.style.opacity = 0;
    cardElement.style.transform = 'translateX(-50px)';

    setTimeout(() => {
        const data = cardsData[activeIndex];            // ← изменено
        cardElement.innerHTML = `
            <div class="card-title">${data.title}</div>
            <div class="card-text">${data.text}</div>
        `;

        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        cardElement.style.background = gradients[activeIndex % gradients.length]; // ← изменено

        // Анимация появления
        cardElement.style.opacity = 1;
        cardElement.style.transform = 'translateX(0)';
    }, 300);

    // Управление кнопками
    btnPrev.disabled = activeIndex === 0;                         // ← изменено
    btnNext.disabled = activeIndex === cardsData.length - 1;      // ← изменено
}

btnPrev.addEventListener('click', () => {
    if (activeIndex > 0) {                                        // ← изменено
        activeIndex--;                                            // ← изменено
        updateCard();
    }
});

btnNext.addEventListener('click', () => {
    if (activeIndex < cardsData.length - 1) {                     // ← изменено
        activeIndex++;                                            // ← изменено
        updateCard();
    }
});

// Инициализация
updateCard();









const apiKey = "c15c9be6990e4f01a3f50216251711"; // Бесплатный ключ для WeatherAPI
        const input = document.querySelector('.cityName');
        const btn = document.querySelector('.search-btn');
        const cityEl = document.querySelector('.city');
        const tempEl = document.querySelector('.temp');
        const descEl = document.querySelector('.description');
        const errorEl = document.querySelector('.error');

        function getWeather(city) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error('Город не найден');
                    }
                    // Обновляем данные
                    cityEl.textContent = data.location.name;
                    tempEl.textContent = `${Math.round(data.current.temp_c)}°C`;
                    descEl.textContent = data.current.condition.text.toLowerCase();

                    errorEl.style.display = 'none';
                })
                .catch(() => {
                    cityEl.textContent = 'Ошибка';
                    tempEl.textContent = '--°C';
                    descEl.textContent = '';
                    errorEl.style.display = 'block';
                });
        }

        // Поиск по кнопке
        btn.addEventListener('click', () => {
            const city = input.value.trim();
            if (city) getWeather(city);
        });

        // Поиск по Enter
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const city = input.value.trim();
                if (city) getWeather(city);
            }
        });

        // Инициализация: погода в Бишкеке (по умолчанию)
        getWeather('Bishkek');