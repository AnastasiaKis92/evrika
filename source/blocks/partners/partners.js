import Swiper, { Pagination } from 'swiper';

const initPartnersSlider = () => new Swiper('.partners__slider', {
  modules: [Pagination],
  direction: 'horizontal',
  loop: true,
  watchSlidesProgress: true,
  speed: 500,
  slideToClickedSlide: true,
  grabCursor: true,
  watchOverflow: false,

  breakpoints: {
    1200 : {
      slidesPerView: 4,
      spaceBetween: 100,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    320: {
      slidesPerView: 1,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,

    renderBullet: function () {
      return '<button class="partners__pagination-bullet swiper-pagination-bullet"><span class="hidden">Пролистать слайдер</span></button>';
    },
  },
});

export {initPartnersSlider};
