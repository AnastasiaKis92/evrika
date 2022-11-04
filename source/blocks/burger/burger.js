const navContainer = document.querySelector('.nav');
const burgerButton = document.querySelector('.burger');
const burger = burgerButton.querySelector('.burger__inner');

const onButtonClick = (evt) => {
  evt.preventDefault();
  burger.classList.toggle('active');
  navContainer.classList.toggle('animate');
  document.body.classList.toggle('page-hidden');
};

const addBurger = () => {
  burgerButton.addEventListener('click', onButtonClick);
};

export {addBurger};
