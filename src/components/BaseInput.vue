<template>
    <div :class="[...classList, 'base-input']" >
        <div class="base-input__label">
            {{ props.label }}
        </div>
        <input
            :placeholder="props.placeholder"
            :value="props.modelValue"
            :class="['base-input__input', icon]"
            @input="handlerInput" />
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
        icon: {
            type: String,
            default: '',
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
            width: 100%;
            margin-bottom: 4px;
            padding: 8px 36px 8px 16px;
            font-family: inherit;
            font-size: 16px;
            line-height: 24px;
            color: $accentColor;
            background-color: $primaryColor;
            border: 1px solid $borderColorDefault;
            border-radius: $borderRadius;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;

            &.error:focus {
                outline: 1px solid $borderColorError;
            }

            &:focus {
                outline: 2px solid $borderColorAccent;
            }

            &::placeholder {
                color: $placeholderColor;
            }
        }
    }
</style>