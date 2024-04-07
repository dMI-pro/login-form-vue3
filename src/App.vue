<template>
  <BaseInput
    v-model="parentModelPassword"
    label="Enter password" 
    placeholder="Placeholder"
    :classList="['']"
    hint="Pleaes enter wathout mistakes" />
</template>

<script setup>
import BaseInput from '@components/BaseInput.vue'
import { ref } from 'vue'

const parentModelPassword = ref('');

</script>

