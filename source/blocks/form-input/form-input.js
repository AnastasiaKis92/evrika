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
  step: 10,
  format: {
    to: function (value) { // форматирование значения из слайдера и вывода его где-либо
      return value.toFixed(0); // вернет запись без цифр после запятой
    },
    from: function (value) { // форматирование значения для слайдера. Этот метод должен строго возвращать число, поэтому используем parseFloat()
      return parseFloat(value);
    },
  }
});

// Получение данных слайдера
const initRange = () => rangeElement.noUiSlider.on('update', () => {
  const rangeValues = rangeElement.noUiSlider.get();
  rangeInput.value = `${rangeValues[0]} литров`;
});

export {initRange};
