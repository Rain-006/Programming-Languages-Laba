/**
 * Генерирует массив чисел в диапазоне [start, end] с шагом step (по умолчанию 1).
 */
function getRange(start, end, step = 1) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step)) {
    throw new TypeError('Аргументы должны быть числами');
  }
  if (step === 0) throw new Error('Шаг не может быть 0');

  if (start === end) return [start];

  if (start < end && step < 0) step = -step;
  if (start > end && step > 0) step = -step;

  const result = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) result.push(i);
  } else {
    for (let i = start; i >= end; i += step) result.push(i);
  }
  return result;
}

/**
 * Переворот строки (без reverse).
 */
function myReverse(str) {
  if (typeof str !== 'string') throw new TypeError('Ожидается строка');
  let res = '';
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}

/**
 * Маскирует номер карты: первые 6 и последние 4 символа оставляет видимыми.
 * Остальное заменяет maskChar (по умолчанию "X").
 */
function maskCard(card, maskChar = 'X') {
  if (typeof card !== 'string') card = String(card);
  if (typeof maskChar !== 'string' || maskChar.length === 0) {
    throw new TypeError('maskChar должен быть ненулевой строкой');
  }

  const len = card.length;
  if (len <= 10) return card;

  const first = card.slice(0, 6);
  const last = card.slice(-4);
  const middleLen = len - 10;
  const middle = maskChar.repeat(middleLen);

  return first + middle + last;
}

// --- Примеры использования ---

console.log(getRange(1, 10));           // [1,2,3,4,5,6,7,8,9,10]
console.log(getRange(10, 30, 5));       // [10,15,20,25,30]
console.log(getRange(10, 1, 3));        // [10,7,4,1]
console.log(getRange(1, 10, -2));       // [1,3,5,7,9]

console.log(myReverse("123456789"));    // "987654321"
console.log(myReverse("hello"));        // "olleh"

console.log(maskCard("4815154823541789"));        // "481515XXXXXX1789"
console.log(maskCard("4815154823541789", "*"));   // "481515******1789"
console.log(maskCard("1234567890"));              // "1234567890"