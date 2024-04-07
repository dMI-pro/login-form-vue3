<template>
    <div class="base-input" >
        <div class="base-input__label">
            {{ props.label }}
        </div>
        <input
            :placeholder="props.placeholder"
            :value="props.modelValue"
            class="base-input__input"
            @input="handlerInput" />
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: 'Label input'
        },
        placeholder: {
            type: String,
            default: 'Input placeholder'
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 16px;

        &__label {
            margin-bottom: 4px;
            padding: 4px 0;
            font-size: 14px;
            line-height: 16px;
        }
        &__input {
            background-color: $primaryColor;
            border: 1px solid $borderColorDefault;
            border-radius: $borderRadius;
            margin-bottom: 4px;
            padding: 12px 16px;
            width: 100%;
            box-sizing: border-box;

            &::placeholder {
                font-family: 'Rubik';
                font-size: 16px;
                color: $placeholderColor;
            }
        }
    }
</style>