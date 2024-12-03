<template>
    <div v-if="showAlert" :class="['mt-5 p-4 rounded-md', alertTypeClass]" role="alert">
        <span :class="[alertIconClass, 'mr-2']"></span>
        <strong>{{ alertTitle }}</strong> {{ alertMessage }}
    </div>
</template>

<script>
export default {
    name: 'AlertComponent',
    props: {
        showAlert: {
            type: Boolean,
            default: false
        },
        alertType: {
            type: String,
            default: ''
        },
        alertTitle: {
            type: String,
            default: ''
        },
        alertMessage: {
            type: String,
            default: ''
        },
        alertIcon: {
            type: String,
            default: ''
        }
    },
    computed: {
        alertTypeClass() {
            let alertType = this.alertType.toUpperCase()

            switch (alertType) {
                case 'PRIMARY':
                    return 'bg-blue-500 text-white border-blue-600';
                case 'SUCCESS':
                    return 'bg-green-500 text-white border-green-600';
                case 'WARNING':
                    return 'bg-yellow-500 text-white border-yellow-600';
                case 'DANGER':
                    return 'bg-red-500 text-white border-red-600';
                case 'INFO':
                    return 'bg-teal-500 text-white border-teal-600';
                default:
                    return 'bg-gray-300 text-black border-gray-400';
            }
        },
        alertIconClass() {
            // Aqui você pode definir uma classe para o ícone baseado no tipo de alerta.
            switch (this.alertType.toUpperCase()) {
                case 'SUCCESS':
                    return 'text-green-500'; // ícone de sucesso
                case 'WARNING':
                    return 'text-yellow-500'; // ícone de alerta
                case 'DANGER':
                    return 'text-red-500'; // ícone de erro
                case 'INFO':
                    return 'text-teal-500'; // ícone de informação
                default:
                    return 'text-gray-500'; // ícone padrão
            }
        }
    }
}
</script>

<style scoped>
/* Ajuste do ícone com Tailwind CSS */
.alert-icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>