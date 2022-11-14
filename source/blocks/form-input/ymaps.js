const initMap = () => ymaps.ready(init);

function init() {
  // Создаем выпадающую панель с поисковыми подсказками и прикрепляем ее к HTML-элементу по его id.
  const suggestAddress = new ymaps.SuggestView('address');
}

export {initMap};
