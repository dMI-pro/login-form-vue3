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
            <span v-if="loading" class="base-input__message__icon">
                <img src="@image/loading.svg" />
            </span>
            <span v-else-if="steps === 5 && !is_min_characters" class="base-input__message__icon">
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
        steps = 0;
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
        is_input_focus = true;
    };

    const handlerBlur = function() {
        is_input_focus = false;
    };
</script>

<style lang="scss" scoped>
    @import '@scss/_variables.scss';

    .accent {
        outline-width: 1px;
        outline-style: solid;
        outline-color: $borderColorAccent;

        & + .base-input__message {
            color: $subtextColor;
            opacity: 1;
        }
    }
</style>