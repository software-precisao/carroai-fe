<template>
    <div class="modal fade" :id="`modalTarifa${id}`" tabindex="-1" aria-labelledby="modalTarifa" aria-hidden="true">
        <div class="modal-dialog" style="background-color: transparent;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tarifas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <AlertComponent v-if="errorEdit" :showAlert="true" alertType="danger" alertIcon=""
                        alertTitle="Erro!"
                        alertMessage="Houve um erro ao tentar salvar a tarifa tente novamente mais tarde!"
                        style="margin-top: 0px !important; margin-bottom: 20px;" />

                    <AlertComponent v-if="successEdit" :showAlert="true" alertType="success" alertIcon=""
                        alertTitle="Sucesso!" alertMessage="Tarifas editadas com sucesso!"
                        style="margin-top: 0px !important; margin-bottom: 20px;" />

                    <div class="row">
                        <div class="col-6">
                            <SelectComp label="Período da tarifa" type="text" inputId="periodoInput"
                                placeholder="Período da tarifa" name="periodoInput" v-model="dayType"
                                :options="optionsDayType" />
                        </div>
                        <div class="mb-2 col-6">
                            <InputComp type="text" label="Tarifa básica" inputId="baseFlareInput"
                                placeholder="informe a tarifa básica" name="baseFlare" v-model="baseFlare"
                                :mask="mascaraBase()" />
                        </div>
                        <div class="mb-2 col-6">
                            <InputComp type="text" label="Taxa quilômetro" inputId="kilometerRateInput"
                                placeholder="informe a taxa do quilômetro" name="kilometerRate" v-model="kilometerRate"
                                :mask="mascaraKm()" />
                        </div>
                        <div class="mb-3 col-6">
                            <InputComp type="text" label="Taxa por tempo" inputId="timeRateInput"
                                placeholder="Informe a taxa do tempo" :mask="mascaraTime()" name="timeRate"
                                v-model="timeRate" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-warning text-white"
                        @click="funcEdit(item.id, dayType, baseFlare, kilometerRate, timeRate)">
                        <span v-if="!autenticandoEdit">
                            Salvar
                        </span>

                        <span v-if="autenticandoEdit" class="">Salvando...</span>
                        <span v-if="autenticandoEdit" class="spinner-border spinner-border-sm"
                            aria-hidden="true"></span>

                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AlertComponent from '../alerts/AlertComponent.vue';
import InputComp from '../inputs/inputComp.vue';
import SelectComp from '../inputs/selectComp.vue';

export default {
    name: "ModalTarifaComp",
    props: {
        id: {
            type: String,
            required: true
        },
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
        SelectComp,
        InputComp,
        AlertComponent,
    },
    data() {
        return {
            dayType: "",
            optionsDayType: [
                { text: "Dia de semana", value: "WEEKDAY" },
                { text: "Fim de semana", value: "WEEKEND" },
            ],
            baseFlare: "0",
            kilometerRate: "0",
            timeRate: "0",

        }
    },
    mounted() {
        this.dayType = this.item.day_type
        this.baseFlare = this.item.base_fare.toString()
        this.kilometerRate = this.item.kilometer_rate.toString()
        this.timeRate = this.item.time_rate.toString()
    },
    methods: {
        mascaraTime() {
            let v = this.timeRate;

            if (v == "") {
                v = "0"
            }

            // Remove tudo o que não é dígito
            v = v.replace(/\D/g, "");

            // Divide o número para preparar a adição de vírgula e ponto
            let valorDecimal = parseInt(v) / 100;

            // Formata o número como valor monetário
            v = valorDecimal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            this.timeRate = v
        },

        mascaraKm() {
            let v = this.kilometerRate;

            if (v == "") {
                v = "0"
            }

            // Remove tudo o que não é dígito
            v = v.replace(/\D/g, "");

            // Divide o número para preparar a adição de vírgula e ponto
            let valorDecimal = parseInt(v) / 100;

            // Formata o número como valor monetário
            v = valorDecimal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            this.kilometerRate = v
        },

        mascaraBase() {
            let v = this.baseFlare;

            if (v == "") {
                v = "0"
            }

            // Remove tudo o que não é dígito
            v = v.replace(/\D/g, "");

            // Divide o número para preparar a adição de vírgula e ponto
            let valorDecimal = parseInt(v) / 100;

            // Formata o número como valor monetário
            v = valorDecimal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            this.baseFlare = v
        },
    },
};
</script>

<style scoped>
/* Estilos específicos para o modal, se necessário */
</style>