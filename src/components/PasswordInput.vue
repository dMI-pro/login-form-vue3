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
                    'successful': state.steps === 5 && !state.few_letter,
                    'error': state.steps >= 3 && state.few_letter && state.error_few_letters,
                    'accent': state.steps > 0 && state.steps !== 5 && !state.few_letter && !state.error_few_letters,
                    'focus': state.is_input_focus,
                }]"
            @input="handlerInput"
            @focus="handlerFocus"
            @blur="handlerBlur" />
        <div
            for="base-input"
            class="base-input__message">
            <span v-if="state.loading" class="base-input__message__icon">
                <img src="@image/loading.svg" />
            </span>
            <span v-else-if="state.steps === 5 && !state.few_letter" class="base-input__message__icon">
                <img src="@image/tick-square.svg" />
            </span>
            <span v-else-if="state.steps >= 3 && state.few_letter && state.error_few_letters" class="base-input__message__icon">
                <img src="@image/warning-2.svg" />
            </span>
            <span v-else class="base-input__message__icon">
                <img src="@image/info-circle.svg" />
            </span>
            <span class="base-input__message__txt">
                {{state.steps}}/5{{ message }}
            </span>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
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

    const state = reactive({
        steps: 0,
        is_input_focus: false,
        successful: false,
        error: false,
        confirm_pass: undefined,
        loading: false,
        few_letter: false,
        error_few_letters: false,
    })

    let message = ` - At least one uppercase letter`;

    let count_letters = 0;
    let count_uppercase_letters = 0;
    let count_spec_character = 0;

    const validatePassword = (value) => {
        state.steps = 0;

        count_letters = hasLetters(value);
        count_uppercase_letters = hasUppercaseLetters(value);
        count_spec_character = hasSpecCharacter(value);

        if (count_letters >= 1) {
            state.steps = count_letters;
            if (count_letters > 3) {
                state.steps = 3;
            }

            message = ` - At least one uppercase letter`;
        }

        if (count_uppercase_letters >= 1) {
            if ((+count_letters + +count_uppercase_letters) <= 4) {
                state.steps = +count_letters + +count_uppercase_letters;
            } else {
                state.steps = 4;
            }

            message = ` - At least one digit`;
        }

        if (count_spec_character >= 1) {
            if (count_uppercase_letters >= 1) {
                if ((+count_letters + +count_uppercase_letters + +count_spec_character) <= 5) {
                    state.steps = +count_letters + +count_uppercase_letters + +count_spec_character;
                } else {
                    state.steps = 5;
                }

                message = ` - Requirements followed`;
            } else {
                if ((+count_letters + +count_uppercase_letters + +count_spec_character) <= 4) {
                    state.steps += count_spec_character;
                    message = ` - At least one uppercase letter`;
                } else {
                    state.steps = 4;
                }
            }
        }

        if (state.steps === 0) message = ` - At least one uppercase letter`;

        state.few_letter = count_uppercase_letters >= 1 && count_spec_character >= 1 && count_letters + count_uppercase_letters + count_spec_character < 8;
        if ((state.steps === 5 && state.few_letter) || (count_uppercase_letters >= 1 && count_uppercase_letters >= 1 && count_spec_character >= 1)) {
            state.error_few_letters = true;
            message = ` - At least 8 characters`;
        }

        state.loading = false;
    };

    const handlerInput = useDebounceFn((event) => {
        state.loading = true;

        validatePassword(event.target.value);

        emit('update:modelValue', event.target.value);
    }, 700);


    const handlerFocus = function() {
        state.is_input_focus = true;
    };

    const handlerBlur = function() {
        state.is_input_focus = false;
    };
</script>

<style lang="scss" scoped>
    @import '@scss/_variables.scss';

    .accent {
        & + .base-input__message {
            color: $subtextColor;
            opacity: 1;
        }
    }
</style>