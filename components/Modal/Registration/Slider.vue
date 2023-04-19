<template>
  <swiper 
  class="swiper-custom" 
  :pagination="{
    clickable: true,
    el: paginationCustom
  }" 
  :autoplay="{ delay: 5000, pauseOnMouseEnter: true}"
  :modules="modules" :navigation="{
  prevEl: prev,
  nextEl: next,
  }">
    <swiper-slide v-for="index in 3" :key="index">
      <div class="reg-info-items">

        <div class="reg-info">
          <div class="reg-info-icon">
            <svg class="icon">
              <use xlink:href="~assets/img/sprite.svg#check"></use>
            </svg>
          </div>

          <div class="reg-info-content">
            <div class="reg-info-title">CPA</div>
            <div class="reg-info-subtitle">$25 і вище</div>
          </div>
        </div>

        <div class="reg-info">
          <div class="reg-info-icon">
            <svg class="icon">
              <use xlink:href="~assets/img/sprite.svg#check"></use>
            </svg>
          </div>

          <div class="reg-info-content">
            <div class="reg-info-title">REVSHARE</div>
            <div class="reg-info-subtitle">Піднімай до 60%</div>
          </div>
        </div>

        <div class="reg-info">
          <div class="reg-info-icon">
            <svg class="icon">
              <use xlink:href="~assets/img/sprite.svg#check"></use>
            </svg>
          </div>

          <div class="reg-info-content">
            <div class="reg-info-title">Гібрід</div>
            <div class="reg-info-subtitle">Зробимо як скажеш</div>
          </div>
        </div>

      </div>

    </swiper-slide>
 
    <div class="swiper-custom-controls">

      <div ref="prev" class="swiper-custom-prev">
        <svg class="icon">
          <use xlink:href="~assets/img/sprite.svg#arrow_left_light"></use>
        </svg>
      </div>

      <div class="swiper-custom-pagination" ref="paginationCustom"></div>
      <div ref="next" class="swiper-custom-next">
        <svg class="icon">
          <use xlink:href="~assets/img/sprite.svg#arrow_right_light"></use>
        </svg>
      </div>

    </div>

  </swiper>
</template>

<script>
import { Pagination, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {

    }
  },
  setup() {
    const prev = ref(null);
    const next = ref(null);
    const paginationCustom = ref(null);
    return {
      modules: [Navigation, Pagination, Autoplay],
      prev,
      next,
      paginationCustom,
    };
  },
}
</script>