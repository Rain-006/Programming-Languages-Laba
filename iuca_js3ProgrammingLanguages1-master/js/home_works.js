const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

// Регулярное выражение для ИИН (12 цифр)
const iinRegExp = /^\d{12}$/;

iinButton.addEventListener('click', () => {
    const value = iinInput.value.trim();
    if (!iinRegExp.test(value)) {
        iinResult.textContent = 'ИИН должен содержать 12 цифр';
        iinResult.style.color = 'red';
        return;
    }

    // Проверка контрольной суммы ИИН (по официальному алгоритму)
    const digits = value.split('').map(Number);
    let controlSum = 0;

    for (let i = 0; i < 11; i++) {
        controlSum += digits[i] * ((i % 11) + 1);
    }
    let controlDigit = controlSum % 11;
    if (controlDigit === 10) {
        controlSum = 0;
        for (let i = 0; i < 11; i++) {
            controlSum += digits[i] * ((i + 3) % 11 + 1);
        }
        controlDigit = controlSum % 11;
    }

    if (controlDigit === digits[11]) {
        iinResult.textContent = 'ИИН корректен ✅';
        iinResult.style.color = 'green';
    } else {
        iinResult.textContent = 'Неверный ИИН ❌';
        iinResult.style.color = 'red';
    }
});
