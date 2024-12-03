<template>
    <div class="text-center">
        <!-- Label do input -->
        <label :for="inputId" class="block text-lg  font-medium text-gray-700">
            {{ label }}
        </label>

        <!-- Container do input com ícone -->
        <div class="relative mt-1">
            <input :type="type"
                class="block w-100 px-4 py-2 mt-1 text-gray-700 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                :id="inputId" :class="{ 'border-red-500': invalid, 'border-gray-400': !invalid }"
                :placeholder="placeholder" :name="name" :value="modelValue" :disabled="disabled"
                @input="$emit('update:modelValue', $event.target.value)" @change="mask" />

            <!-- Ícone dentro do input -->
            <!-- <i :class="[iconClass, 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500']"></i> -->
        </div>

        <!-- Mensagem de erro -->
        <div v-if="invalidFeedback && invalid" class="text-red-500 text-sm mt-1">
            <strong>{{ feedbackTitle }}</strong> {{ invalidFeedback }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputCodeComponent',
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        invalid: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        invalidFeedback: {
            type: String,
            default: ''
        },
        feedbackTitle: {
            type: String,
            default: ''
        },
        inputId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: ''
        },
        iconClass: {
            type: String,
            default: 'mdi mdi-email'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Function,
            required: false
        },
    }
}
</script>

<style scoped>
/* Estilos adicionais para feedback de erro, caso necessário */
.invalid-feedback {
    margin-top: 5px;
    position: relative;
    display: block;
}
</style>