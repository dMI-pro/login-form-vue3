<template>
    <div class="base-input">
        <div class="base-input__label">
            {{ props.label }}
        </div>
        <input
            :placeholder="props.placeholder"
            :value="props.modelValue"
            :class="['base-input__input', ...props.classList] "
            @input="handlerInput" />
        <div class="base-input__hint">
            {{ props.hint }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    classList: {
        type: Array,
        default: [],
    },
    label: {
        type: String,
        default: 'Label input'
    },
    placeholder: {
        type: String,
        default: 'Input placeholder'
    },
    hint: {
        type: String,
        default: 'Hint'
    },
})

const emit = defineEmits(['update:modelValue']);

const handlerInput = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" scoped>
     @import '@scss/_variables.scss';
    
    .base-input {
        &__label {
            color: #838A98;
            font-family: 'Rubik';
            font-size: 14px;
            line-height: 16px;
        }
        &__input {
            border: 2px solid $borderColor;
        }
        &__hint {
            border: 2px solid $borderColor;
        }
    }
    
</style>