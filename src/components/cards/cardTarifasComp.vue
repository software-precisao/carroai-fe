<template>
    <div class="col-md-12">
        <div class="card bg-grd-warning order-card">
            <div class="card-body">
                <div style="display: flex; justify-content: space-between;" class="mt-4 mb-4">
                    <h3 class="text-white">Tarifa Ativa</h3>
                    <h2 class="text-end text-white"><span>R$
                            {{
                                TarifaAtual }}</span>
                    </h2>

                </div>
                <p class="m-b-0">Tarifa anterior<span class="ms-2">R$ {{ TarifaAnterior }}</span></p>
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


export default {
    name: "CardTarifasComp",
    data() {
        return {
            allTarifas: [],
            tarifa: null,

            TarifaAtual: '2,93',
            TarifaAnterior: '1,95',
        }
    },

    mounted() {
    },

    methods: {
    },
}
</script>