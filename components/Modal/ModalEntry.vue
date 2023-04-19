<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

const formData = reactive({
  email: '',
  password: ''
});

const Data = reactive({
  showPassword: false
});

const rules = computed(() => {
  return {
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
    }
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log(formData);
  }
};

</script>

<template>
  <div class="title">
    <div class="title-icon">
      <svg class="icon">
        <use xlink:href="~assets/img/sprite.svg#lock"></use>
      </svg>
    </div>
    Вхід
  </div>

  <form @submit.prevent="submitForm">
    <div class="inputs-group">

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
    
      <div class="input-wrap">
        <div class="input-field">
          <input
            v-model="formData.password"
            :type="Data.showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Ваш пароль"
            :class="{
              'error': v$.password.$error,
              'valid': !v$.password.$invalid,
            }"
          >
          <div 
            @click="Data.showPassword = !Data.showPassword" 
            class="input-field-show-pass"
            :class="Data.showPassword ? 'active' : ''"
            >
            <svg class="icon"><use xlink:href="~assets/img/sprite.svg#eye"></use></svg>
          </div>
        </div>
        <span class="error-message" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
      </div>

      <button type="submit" class="button button-medium">Війти</button>
    </div>
    
  </form>
</template>
