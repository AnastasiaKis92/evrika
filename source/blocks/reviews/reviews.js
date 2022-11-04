import Swiper, { Navigation } from 'swiper';

const initReviewsSlider = () => new Swiper('.reviews__slider', {
  modules: [Navigation],
  direction: 'horizontal',
  loop: true,
  watchSlidesProgress: true,
  speed: 500,
  slideToClickedSlide: true,
  grabCursor: true,
  watchOverflow: false,
  spaceBetween: 30,
  breakpoints: {
    800 : {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export {initReviewsSlider};
