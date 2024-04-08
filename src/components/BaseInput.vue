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