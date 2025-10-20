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