<template>
    <div :class="[...classList, 'base-input']" >
        <div class="base-input__label">
            {{ props.label }}
        </div>
        <input
            id="base-input"
            autocomplete="off"
            :placeholder="props.placeholder"
            :value="state.confirm_pass"
            :class="['base-input__input',
                icon,
                {
                    'successful': state.successful && state.confirm_pass,
                    'error': state.error && state.confirm_pass,
                    'accent': state.is_input_focus && !state.successful && !state.error,
                    'focus': state.is_input_focus, // dMI: ## не работает...
                }]"
            @input="handlerInput"
            @focus="handlerFocus"
            @blur="handlerBlur" />
        <div
            for="base-input"
            class="base-input__message">
            <span v-if="state.successful && state.confirm_pass" class="base-input__message__icon">
                <img src="@image/tick-square.svg" />
            </span>
            <span v-else-if="state.error && state.confirm_pass" class="base-input__message__icon">
                <img src="@image/warning-2.svg" />
            </span>

            <span class="base-input__message__txt">
                {{ message }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
    import { useDebounceFn } from "@vueuse/core"

    const props = defineProps({
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
        password: {
            type: String,
            default: undefined,
        },
    });

    const state = reactive({
        is_input_focus: false,
        successful: false,
        error: false,
        confirm_pass: undefined,
    })

    let message = `Password does not match`;

    const debouncedRequest = useDebounceFn(() => {
        console.log('props.password', props.password)
        if (!props.password) return;

        if (props.password === state.confirm_pass) {
            state.successful = true;
            state.error = false;
            message = `Password matches`;
        } else {
            state.successful = false;
            state.error = true;
        }
        if (state.confirm_pass === '') {
            state.successful = false;
            state.error = false;
        }
    }, 700);

    const handlerInput = (event) => {
        state.confirm_pass = event.target.value;

        debouncedRequest();
    };

    const handlerFocus = function() {
        state.is_input_focus = true;
    };

    const handlerBlur = function() {
        state.is_input_focus = false;
    };
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

            &::placeholder {
                color: $placeholderColor;
            }
        }

        &__message {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 0;
            color: $subtextColor;
            font-size: 14px;
            line-height: 16px;
            opacity: 0;

            &__icon {
                width: 16px;
            }
        }
    }

    .focus.accent,
    .focus.successful,
    .focus.error {
        outline-width: 2px;
    }

    .error {
        outline-width: 1px;
        outline-style: solid;
        outline-color: $borderColorError;

        & + .base-input__message{
            color: $borderColorError;
            opacity: 1;
        }
    }

    .accent {
        outline-width: 1px;
        outline-style: solid;
        outline-color: $borderColorAccent;
    }

    .successful {
        outline-width: 1px;
        outline-style: solid;
        outline-color: $borderColorsuccessful;

        & + .base-input__message{
            color: $borderColorsuccessful;
            opacity: 1;
        }
    }
</style>