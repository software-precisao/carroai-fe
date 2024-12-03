<template>
    <button @click="onClick" :disabled="disabled" :class="[
        'btn d-flex align-items-center justify-content-center w-100',
        buttonClass,
        // customClass,
        // {
        //     'btn-primary': !disabled && !loading,
        //     'btn-secondary text-muted': disabled,
        //     'btn-primary disabled': loading,
        // },
    ]" :type="type">
        <!-- Spinner de carregamento -->
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>

        <!-- Ícone do botão -->
        <i v-if="iconClass && !loading" :class="iconClass" class="me-2"></i>

        <!-- Texto do botão -->
        <span class="text-lg">{{ loading ? loadingText : text }}</span>
    </button>
</template>


<script>
export default {
    name: 'ButtonComponent',
    props: {
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'button',
        },
        buttonClass: {
            type: String,
            default: '',
        },
        customClass: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        loadingText: {
            type: String,
            default: 'Carregando...',
        },
        iconClass: {
            type: String,
            default: '',
        },
    },
    emits: ['click'],
    methods: {
        onClick(event) {
            this.$emit('click', event);
        },
    },
};
</script>


<style scoped>
.spinner-border {
    width: 1rem;
    height: 1rem;
    border-width: 0.2em;
}
</style>