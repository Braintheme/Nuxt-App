<template>
  <div class="modal">
    <div class="modal-content" :class="classes">

      <slot name="content"></slot>

      <div class="close" @click="$emit('close-modal')">
        <svg class="icon">
          <use xlink:href="~assets/img/sprite.svg#close_line"></use>
        </svg>
      </div>
    </div>

    <div class="modal-overlay"></div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    classes: {
      type: String
    }
  },
}
</script>
