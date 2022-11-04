import Swiper, { Navigation } from 'swiper';

const initCertificatesSlider = () => new Swiper('.certificates__slider', {
  modules: [Navigation],
  direction: 'horizontal',
  loop: true,
  watchSlidesProgress: true,
  speed: 500,
  slideToClickedSlide: true,
  grabCursor: true,
  watchOverflow: false,

  breakpoints: {
    1000 : {
      slidesPerView: 4,
    },
    800: {
      slidesPerView: 3,

    },
    480: {
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

export {initCertificatesSlider};
