<template>
    <div class="mb-3">
        <label :for="inputId" class="form-label">
            <small>{{ label }}</small>
        </label>
        <div class="input-icon-wrapper">
            <!-- Campo select -->

            <!-- Ícone à direita -->
            <!-- <i :class="[iconClass, 'icon-left']" v-if="!invalid"></i> -->

            <select class="form-control input-auth" :id="inputId" :class="{ 'is-invalid': invalid }" :name="name"
                v-model="internalValue">
                <option value="" hidden>{{ placeholder }}</option>
                <option class="optionClass" v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>

            <!-- Mensagem de feedback inválida -->
            <div v-if="invalidFeedback && invalid" class="invalid-feedback">
                <strong>{{ feedbackTitle }}</strong> {{ invalidFeedback }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectComponent',
    props: {
        label: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
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
            default: 'mdi mdi-arrow-down' // Ícone padrão para select
        },
        options: {
            type: Array,
            required: true
        }
    },
    computed: {
        internalValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>

<style scoped>
.is-invalid {
    border-color: red !important;
    /* Borda vermelha para campos inválidos */
}

.input-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

select {
    width: 100%;
    padding-left: 1.5rem;
    /* Espaço para o ícone à direita */
}

.icon-left {
    position: absolute;
    left: 10px;
    pointer-events: none;
    color: #999;
    /* Cor do ícone */
}

.invalid-feedback {
    display: block;
    color: red;
}
</style>
