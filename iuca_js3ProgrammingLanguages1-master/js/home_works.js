const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

// Проверка Gmail
document.getElementById('gmail_button').addEventListener('click', function() {
        const input = document.getElementById('gmail_input').value.trim().toLowerCase();
        const resultSpan = document.getElementById('gmail_result');

        // Регулярное выражение для проверки Gmail
        const gmailRegex = /^[a-z0-9](\.?[a-z0-9]){0,}@gmail\.com$/;

        if (input === '') {
            resultSpan.textContent = 'Введите email';
            resultSpan.style.color = 'red';
        } else if (gmailRegex.test(input)) {
            resultSpan.textContent = 'Валидный Gmail!';
            resultSpan.style.color = 'green';
        } else {
            resultSpan.textContent = 'Невалидный Gmail. Используйте формат: example@gmail.com';
            resultSpan.style.color = 'red';
        }
    });

    // Дополнительно: проверка при нажатии Enter
    document.getElementById('gmail_input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('gmail_button').click();
        }
    });

    
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


//движение квадрата по квадрату
const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let x = 0
let y = 0

let directionX = 1;
let directionY = 0;

const speed = 3;


function move(){
    const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth
    const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight

    x+= directionX*speed
    y+= directionY*speed

    childBlock.style.left = x + 'px'
    childBlock.style.top = y + 'px'

    if (x>maxWidth && directionX === 1){
        directionX = 0
        directionY = 1
    }else if (y>=maxHeight && directionY===1){
        directionX = -1
        directionY = 0
    }else if (x<=0 && directionX === -1){
        directionX = 0;
        directionY = -1
    }else if (y<=0 && directionY === -1){
        directionX = 1
        directionY = 0
    }
    setTimeout(move, 10)
}
move()


//Секундомер
let milliseconds = 0;
let intervalId;
let running = false;

function updateTimer() {
    milliseconds++;
    
    // Рассчитываем минуты, секунды и миллисекунды
    const minutes = Math.floor(milliseconds / 6000); // 6000 = 60 сек * 100 десятых долей
    const seconds = Math.floor((milliseconds % 6000) / 100);
    const tenths = milliseconds % 100;
    
    // Обновляем все элементы
    document.getElementById('minutesS').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('secondsS').innerText = seconds.toString().padStart(2, '0');
    document.getElementById('ml-secondsS').innerText = tenths.toString().padStart(2, '0');
}

// Функция сброса таймера
function resetTimer() {
    milliseconds = 0;
    document.getElementById('minutesS').innerText = '00';
    document.getElementById('secondsS').innerText = '00';
    document.getElementById('ml-secondsS').innerText = '00';
    
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
}

// Обработчики событий
document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        intervalId = setInterval(updateTimer, 10); // 10ms = 0.01 секунды
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);









