<template>
<form class="login-form">
    <BaseInput
      v-model="parentModelEmail"
      label="Enter your email"
      placeholder="Placeholder" />

  <div class="login-form__social">
    <BaseInput
      v-model="parentModelMessenger"
      label="Messenger" 
      placeholder="Placeholder"
      class="login-form__messanger" />

      <BaseInput
      v-model="parentModelNickname"
      label="Nickname" 
      placeholder="Placeholder"
      class="login-form__nickname" />
  </div>

  <BaseInput
    v-model="parentModelPassword"
    label="Enter password"
    placeholder="Placeholder" />

    <BaseInput
    v-model="parentModelConfirmPassword"
    label="Confirm the password"
    placeholder="Placeholder" />
</form>
</template>

<script setup>
import BaseInput from '@components/BaseInput.vue'
import { ref } from 'vue'

const parentModelEmail = ref('');
const parentModelPassword = ref('');

</script>

<style lang="scss">
@import '@scss/_variables.scss';

body {
  background-color: #f5f5f5;
}
#app {
  font-family: 'Rubik';
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.login-form {
  min-width: 343px;
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
</style>
