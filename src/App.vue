<template>
<form class="login-form">
  <BaseInput
    v-model="form_state.parent_model_email"
    label="Enter your email"
    placeholder="Placeholder" />

  <div class="login-form__social">
    <BaseInput
      v-model="form_state.parent_model_messenger"
      label="Messenger" 
      placeholder="Placeholder"
      class="login-form__messanger" />

      <BaseInput
      v-model="form_state.parent_model_nickname"
      label="Nickname"
      placeholder="Placeholder"
      class="login-form__nickname" />
  </div>

  <PasswordInput
    v-model="form_state.parent_model_password"
    icon="icon-show_pass"
    label="Enter password"
    placeholder="Placeholder" />

  <ConfirmPasswordInput
    :password="form_state.parent_model_password"
    icon="icon-show_pass"
    label="Confirm the password"
    placeholder="Placeholder" />
</form>
</template>

<script setup>
  import BaseInput from '@components/BaseInput.vue'
  import PasswordInput from '@components/PasswordInput.vue'
  import ConfirmPasswordInput from './components/ConfirmPasswordInput.vue';

  import { reactive } from 'vue'

  const form_state = reactive({
    parent_model_email: '',
    parent_model_messenger: '',
    parent_model_nickname: '',
    parent_model_password: '',
    parent_model_confirm_password: '',
  });
</script>

<style lang="scss">
  @import '@scss/_variables.scss';

  body {
    background-color: #f5f5f5;
    color: $accentColor;
  }
  #app {
    font-family: 'Rubik';
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .login-form {
    max-width: 343px;
    color: $mainColor;

    &__social {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    &__messanger {
      flex: 0 0 20%;
    }
    &__nickname {
      flex: 0 0 75%;
    }
  }

  .icon-show_pass {
    background-image: url("@image/show_pass.svg");
    background-repeat: no-repeat;
    background-position: right 8px top 50%;
  }
</style>
