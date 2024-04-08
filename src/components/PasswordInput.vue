<template>
    <div :class="[...classList, 'base-input']" >
        <div class="base-input__label">
            {{ props.label }}
        </div>
        <input
            id="base-input"
            autocomplete="off"
            :placeholder="props.placeholder"
            :value="props.modelValue"
            :class="['base-input__input',
                icon,
                {
                    'successful': steps === 5 && !is_min_characters,
                    'error': steps !== 0 && !is_min_characters,
                    'accent': steps > 0 && is_min_characters,
                    'focus': is_input_focus, // dMI: ## не работает...
                }]"
            @input="handlerInput"
            @focus="handlerFocus"
            @blur="handlerBlur" />
        <div
            for="base-input"
            class="base-input__message">
            <span v-if="steps === 5 && !is_min_characters" class="base-input__message__icon">
                <img src="@image/tick-square.svg" />
            </span>
            <span v-else-if="steps !== 0 && !is_min_characters" class="base-input__message__icon">
                <img src="@image/warning-2.svg" />
            </span>
            <span v-else class="base-input__message__icon">
                <img src="@image/info-circle.svg" />
            </span>
            
            <span class="base-input__message__txt">
                {{ message }}
            </span>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useDebounceFn } from "@vueuse/core"
    import { hasUppercaseLetters, hasLetters, hasSpecCharacter } from "@js/validators"

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
    });

    const emit = defineEmits(['update:modelValue']);

    let is_input_focus = ref(false);
    let is_min_characters = ref(true);
    let steps = 0;
    let message = `0/5 - At least one uppercase letter`;

    let count_letters = 0;
    let count_uppercase_letters = 0;
    let count_spec_character = 0;

    let loading = ref(false);

    const handlerInput = useDebounceFn((event) => {
        steps = 0
        const value = event.target.value;

        count_letters = hasLetters(value);
        count_uppercase_letters = hasUppercaseLetters(value);
        count_spec_character = hasSpecCharacter(value);

        if (count_letters >= 1) {
            steps = count_letters;
            if (count_letters > 3) {
                steps = 3;
            }

            message = `${steps}/5 - At least one uppercase letter`;
        }

        if (count_uppercase_letters >= 1) {
            if ((+count_letters + +count_uppercase_letters) <= 4) {
                steps = +count_letters + +count_uppercase_letters;
            } else {
                steps = 4;
            }

            message = `${steps}/5 - At least one digit`;
        }

        if (count_spec_character >= 1) {
            if (count_uppercase_letters >= 1) {
                if ((+count_letters + +count_uppercase_letters + +count_spec_character) <= 5) {
                    steps = +count_letters + +count_uppercase_letters + +count_spec_character;
                } else {
                    steps = 5;
                }
            } else {
                steps += 1;
            }

            message = `${steps}/5 - Requirements followed`;
        }

        if (steps === 0) message = `0/5 - At least one uppercase letter`;

        if (steps >= 5) is_min_characters = count_uppercase_letters >= 1 && count_spec_character >= 1 && count_letters + count_uppercase_letters + count_spec_character < 8;

        emit('update:modelValue', event.target.value);
    }, 700);

    const handlerFocus = function() {
        console.log('handlerFocus', is_input_focus)
        is_input_focus = true;
        console.log('handlerFocus', is_input_focus)
    };

    const handlerBlur = function() {
        is_input_focus = false;
        console.log('handlerBlur', is_input_focus)
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

            &:focus + .base-input__message {
                opacity: 1;
            }
        }

        &__message {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 0;
            color: #666666;
            font-size: 14px;
            line-height: 16px;
            opacity: 0;

            &__icon {
                width: 16px;
            }
        }
    }

    .focus.accent,
    .focus.successful {
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

        & + .base-input__message {
            color: #666666;
            opacity: 1;
        }
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