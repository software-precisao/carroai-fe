<template>
    <div class="col-md-12">
        <div class="card ">
            <div class="card-body bg-grd-warning">
                <h4 class="text-white">Tarifas</h4>
                <div class="mt-4 mb-2 row">
                    <div class="col-6 mb-3">
                        <h6 class="mb-1 text-white">Período da tarifa</h6>
                        <span class="text-white">{{ mostRecentTarifa != null ? mostRecentTarifa.day_type == "WEEKEND" ?
                            "Fim de semana" : "Dia de semana" : "" }}</span>
                    </div>
                    <div class="col-6 mb-3 ">
                        <h6 class="mb-1 text-white">Tarifa básica</h6>
                        <span class="text-white">R$ {{ mostRecentTarifa != null ?
                            formatCurrency(mostRecentTarifa.base_fare) : ""
                            }}</span>
                    </div>
                    <div class="col-6 mb-3">
                        <h6 class="mb-1 text-white">Taxa quilômetro</h6>
                        <span class="text-white">R$ {{ mostRecentTarifa != null ?
                            formatCurrency(mostRecentTarifa.kilometer_rate) : ""
                            }}</span>
                    </div>
                    <div class="col-6 mb-3">
                        <h6 class="mb-1 text-white">Taxa por tempo</h6>
                        <span class="text-white">R$ {{ mostRecentTarifa != null ?
                            formatCurrency(mostRecentTarifa.time_rate) : ""
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="col-md-12">
        <div class="card bg-grd-warning order-card">
            <div class="card-body">
                <h6 class="text-white">Tarifa Inativa</h6>
                <h2 class="text-end text-white"><span>{{ MotoristasInativos }}</span>
                </h2>
                <p class="m-b-0">Esse mês<span class="float-end">{{ MotoristasInativosMes }}</span></p>
            </div>
        </div>
    </div> -->

</template>

<script lang="ts">
import api from "../../services/api/tariff/index"

interface Tarifa {
    id: string;
    day_type: string;
    base_fare: number;
    kilometer_rate: number;
    time_rate: number;
    updatedAt: string; // Certifique-se de que o formato de `updatedAt` é uma string de data válida.
}

export default {
    name: "CardTarifasComp",
    data() {
        return {
            allTarifas: [] as Tarifa[], // Lista de todas as tarifas
            mostRecentTarifa: null as Tarifa | null, // Tarifa mais recente
            tarifa: null,

            TarifaAtual: '2,93',
            TarifaAnterior: '1,95',
        }
    },

    mounted() {
        this.getTarifas()
    },

    methods: {
        getTarifas(): void {
            api.getAllTarifas().then((res) => {
                if (typeof res !== "string" && res.status === 200) {
                    const tarifas: Tarifa[] = res.data.tariffs;

                    console.log(tarifas);

                    // Armazena todas as tarifas
                    this.allTarifas = tarifas;

                    // Encontra a tarifa com o updatedAt mais recente
                    if (tarifas.length > 0) {
                        this.mostRecentTarifa = tarifas.reduce((latest, current) => {
                            return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest;
                        });
                    }
                } else {
                    console.error("Erro ao buscar tarifas ou resposta inválida.");
                }
            }).catch((err) => {
                console.error("Erro na requisição:", err);
            });
        },

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
    },
}
</script>