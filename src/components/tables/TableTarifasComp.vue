<template>
    <tr>
        <td>{{ item.day_type == 'WEEKDAY' ? "Dia de semana" : "Fim de semana" }}</td>
        <td>R$ {{ formatCurrency(item.base_fare) }}</td>
        <td>R$ {{ formatCurrency(item.kilometer_rate) }}</td>
        <td>R$ {{ formatCurrency(item.time_rate) }}</td>

        <td class="row m-0 p-0" style="justify-content: center;">
            <div class="">
                <button type="button" @click="handleOpenModalEdit(item.id)" class="btn btn-warning px-2 py-1 mt-2 mb-2">
                    <i class="fa-regular fa-pen-to-square" style="color: #fff"></i>
                </button>
            </div>
        </td>
    </tr>

    <ModalEditTarifaComp :item="item" :id="item.id" :funcEdit="funcEdit" :successEdit="successEdit"
        :errorEdit="errorEdit" :autenticandoEdit="autenticandoEdit" />
</template>

<script lang="ts">
import * as bootstrap from 'bootstrap';
import ModalEditTarifaComp from '../modals/ModalEditTarifaComp.vue';

export default {
    name: "TableDriverComp",
    props: {
        item: {
            type: Object,
            required: true
        },
        funcEdit: {
            type: Function,
            required: true
        },
        successEdit: {
            type: Boolean,
            default: false
        },
        errorEdit: {
            type: Boolean,
            default: false
        },
        autenticandoEdit: {
            type: Boolean,
            default: false
        },
    },
    components: {
        ModalEditTarifaComp,
    },
    methods: {
        formatCurrency(value: number) {
            if (typeof value !== 'number') {
                value = parseFloat(value); // Converte string para número, se necessário
            }
            return new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        },
        handleOpenModalEdit(id: string) {
            const modalElement = document.getElementById(`modalTarifa${id}`);
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();  // Abre o modal
            } else {
                console.error(`Modal com ID modalDriver${id} não encontrado.`);
            }
        },
    }
}
</script>