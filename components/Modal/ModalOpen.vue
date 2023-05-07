<template>
  <button :class="classes" @click="openModal(modalType)">{{ label }}</button>

  <Teleport to="body">

    <Transition name="fade">
      <Modal :classes="`modal-entry`" v-if="stateModals.showModalEntry"
        @close-modal="stateModals.showModalEntry = !stateModals.showModalEntry">
        <template v-slot:content>
          <ModalEntry />
        </template>
      </Modal>
    </Transition>

    <Transition name="fade">
      <Modal :classes="`modal-registration`" v-if="stateModals.showModalRegistration"
        @close-modal="stateModals.showModalRegistration = !stateModals.showModalRegistration">
        <template v-slot:content>
          <ModalRegistration />
        </template>
      </Modal>
    </Transition>

  </Teleport>
  
</template>

<script>

export default {
  data() {
    return {
      stateModals: {
        showModalEntry: false,
        showModalRegistration: false,
      }
    }
  },
  props: {
    label: {
      type: String,
      default: 'Open'
    },
    classes: {
      type: String,
      default: 'button'
    },
    modalType: {
      type: String,
      default: null
    }
  },
  methods: {
    openModal(modalType) {
      console.log(modalType);
      switch (modalType) {
        case "entry":
          this.stateModals.showModalEntry = true;
          break;
        case "registration":
          this.stateModals.showModalRegistration = true;
          break;
        default:
          console.log("Sorry, we are out of " + modalType + ".");
      }
    },
  }
}
</script>