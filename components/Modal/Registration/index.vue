<script setup>

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import { useMediaQuery } from '@vueuse/core'


const isLargeScreen = useMediaQuery('(min-width: 768px)')

const formData = reactive({
  userName: '',
  userContact: '',
  userContactWay: 'telegram',
  email: '',
  password: '',
  confirmPassword: null,
});

const Data = reactive({
  showPasswordConfirm: false,
  userContactPlaceholders: {
    'skype' : '@скайп_адреса',
    'telegram' : '@телеграм_адреса',
  }
});

const contactType = (contactWay) => {
  return Data.userContactPlaceholders[contactWay];
};

const rules = computed(() => {
  return {
    userContact: {
      required: helpers.withMessage("Обов'язкове поле ", required)
    },
    userName: {
      required: helpers.withMessage("Обов'язкове поле", required)
    },
    email: {
      required: helpers.withMessage("Обов'язкове поле", required),
      email: helpers.withMessage('Адреса електронної пошти не валідна', email),
    },
    password: {
      required: helpers.withMessage("Обов'язкове поле", required),
      minLength: helpers.withMessage(
        ({ $params }) => `Пароль повинен містити не менше ${$params.min} символів`,
        minLength(6)
      )
    },
    confirmPassword: {
      required: helpers.withMessage("Підтвердження пароля є обов'язковим", required),
      sameAs: helpers.withMessage("Паролі не співпадають", sameAs(formData.password)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    // send data
    console.log(formData);
  }
};

</script>

<template>
 
  <div class="modal-registration-wrap">

    <div v-if="isLargeScreen" class="modal-registration-column left">
      <div class="modal-registration-content">
        <p class="registration-title">Зможеш обрати <br> свій варіант</p>
        <ModalRegistrationSlider/>
        
      </div>
    </div> <!-- end left column -->

    <div class="modal-registration-column right">
      <div class="modal-registration-content">

        <div class="title">
          <div class="title-icon">
            <svg class="icon">
              <use xlink:href="~assets/img/sprite.svg#user"></use>
            </svg>
          </div>
          Реєстрація
        </div>

        <form @submit.prevent="submitForm">
          <div class="inputs-group">

            <!-- Input name  -->
            <div class="input-wrap">
              <div class="input-field">
                <input
                  v-model="formData.userName"
                  type="text"
                  name="userName"
                  placeholder="Ваше імʼя"
                  :class="{
                    'error': v$.userName.$error,
                    'valid': !v$.userName.$invalid,
                  }"
                >
                <template v-if="v$.userName.$error">
                  <svg class="icon-validation error"><use xlink:href="~assets/img/sprite.svg#close"></use></svg>
                </template>
                <template v-if="!v$.userName.$invalid">
                  <svg class="icon-validation valid"><use xlink:href="~assets/img/sprite.svg#check"></use></svg>
                </template>
              </div>
        
              <span class="error-message" v-if="v$.userName.$error">{{v$.userName.$errors[0].$message}}</span>
            </div>

            <!-- Input email -->
            <div class="input-wrap">
              <div class="input-field">
                <input
                  v-model="formData.email"
                  type="text"
                  name="email"
                  placeholder="Ваш email"
                  :class="{
                    'error': v$.email.$error,
                    'valid': !v$.email.$invalid,
                  }"
                >
                <template v-if="v$.email.$error">
                  <svg class="icon-validation error"><use xlink:href="~assets/img/sprite.svg#close"></use></svg>
                </template>
                <template v-if="!v$.email.$invalid">
                  <svg class="icon-validation valid"><use xlink:href="~assets/img/sprite.svg#check"></use></svg>
                </template>
              </div>
        
              <span class="error-message" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</span>
            </div>
          
            <!-- Input password -->
            <div class="input-wrap">
              <div class="input-field">
                <input
                  v-model="formData.password"
                  :type="Data.show_password ? 'text' : 'password'"
                  name="password"
                  placeholder="Ваш пароль"
                  :class="{
                    'error': v$.password.$error,
                    'valid': !v$.password.$invalid,
                  }"
                >
                <div 
                  @click="Data.show_password = !Data.show_password" 
                  class="input-field-show-pass"
                  :class="Data.show_password ? 'active' : ''"
                  >
                  <svg class="icon"><use xlink:href="~assets/img/sprite.svg#eye"></use></svg>
                </div>
              </div>
              <span class="error-message" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
            </div>
            
            <!-- Input confirm password -->
            <div class="input-wrap">
              <div class="input-field">
                <input
                  v-model="formData.confirmPassword"
                  :type="Data.showPasswordConfirm ? 'text' : 'password'"
                  name="confirmPassword"
                  placeholder="Повторіть пароль"
                  :class="{
                    'error': v$.confirmPassword.$error,
                    'valid': !v$.confirmPassword.$invalid,
                  }"
                >
                <div 
                  @click="Data.showPasswordConfirm = !Data.showPasswordConfirm" 
                  class="input-field-show-pass"
                  :class="Data.showPasswordConfirm ? 'active' : ''"
                  >
                  <svg class="icon"><use xlink:href="~assets/img/sprite.svg#eye"></use></svg>
                </div>
              </div>
              <span class="error-message" v-if="v$.confirmPassword.$error">{{v$.confirmPassword.$errors[0].$message}}</span>
            </div>

            <!-- Input contact way  -->
            <div class="input-wrap input-contact-way">
              <label for="contactWay">Оберіть спосіб звязку</label>
              <div class="input-group">
                <!-- Radio  -->
                <div class="input-wrap-radio">

                  <label :class="formData.userContactWay == 'telegram' ? 'active' : ''">
                    <input type="radio" name="userContactWay" value="telegram" checked v-model="formData.userContactWay">
                    <img src="~assets/img/icons/telegram.svg" alt="Telegram">
                  </label>

                  <label :class="formData.userContactWay == 'skype' ? 'active' : ''">
                    <input type="radio" name="userContactWay" value="skype" v-model="formData.userContactWay">
                    <img src="~assets/img/icons/skype.svg" alt="Skype">
                  </label>

                </div>

                <!-- Input  -->
                <div class="input-wrap">
                  <div class="input-field">
                    <input
                      v-model="formData.userContact"
                      type="text"
                      name="userContact"
                      :placeholder="contactType(formData.userContactWay)"
                      id="contactWay"
                      :class="{
                        'error': v$.userContact.$error,
                        'valid': !v$.userContact.$invalid,
                      }"
                    >
                    <template v-if="v$.userContact.$error">
                      <svg class="icon-validation error"><use xlink:href="~assets/img/sprite.svg#close"></use></svg>
                    </template>
                    <template v-if="!v$.userContact.$invalid">
                      <svg class="icon-validation valid"><use xlink:href="~assets/img/sprite.svg#check"></use></svg>
                    </template>
                  </div>
                  <span class="error-message" v-if="v$.userContact.$error">{{v$.userContact.$errors[0].$message}}</span>
                </div>
              
              </div>
            </div>

            <button type="submit" class="button button-medium">Реєстрація</button>
          </div>    
        </form>
      </div> <!-- end modal-registration-content -->
    </div> <!-- end right column -->
  </div>  <!-- end modal-registration-wrap -->
  
</template>