import noUiSlider from 'nouislider';

const rangeElement = document.querySelector('.delivery__range');
const rangeInput = document.getElementById('range');

// Инициализация слайдера
noUiSlider.create(rangeElement, {
  range: {
    min: 0,
    max: 5000,
  },
  connect: true,
  start: [1670, 5000],
  step: 1,
  format: {
    to: function (value) { // форматирование значения из слайдера и вывода его где-либо
      return value.toFixed(0); // вернет запись без цифр после запятой
    },
    from: function (value) { // форматирование значения для слайдера. Этот метод должен строго возвращать число, поэтому используем parseFloat()
      return parseFloat(value);
    },
  }
});

// Функция склонения слов
function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}


// Получение данных слайдера
const initRange = () => rangeElement.noUiSlider.on('update', () => {
  const rangeValues = rangeElement.noUiSlider.get();
  rangeInput.value = rangeValues[0] + getNoun(rangeValues[0], ' литр', ' литра', ' литров');
});

// Изменение слайдера при вводе значения в input
rangeInput.addEventListener('change', () => {
  if (rangeInput.value === '') {
    rangeElement.noUiSlider.updateOptions({
      start: [0, 5000]
    });
  } else {
    rangeElement.noUiSlider.updateOptions({
      start: [rangeInput.value, 5000]
    });
  }
});

export {initRange};
