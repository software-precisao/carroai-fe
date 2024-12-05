<template>
    <div class="col-md-6 col-xl-3">
        <div class="card bg-grd-primary order-card">
            <div class="card-body">
                <h6 class="text-white">Motoristas Ativos</h6>
                <h2 class="text-end text-white"><i class="feather icon-shopping-cart float-start"></i><span>{{
                    MotoristasAtivos }}</span>
                </h2>
                <p class="m-b-0">Esse mês<span class="float-end">{{ MotoristasAtivosMes }}</span></p>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-3">
        <div class="card bg-grd-danger order-card">
            <div class="card-body">
                <h6 class="text-white">Motoristas Inativos</h6>
                <h2 class="text-end text-white"><span>{{ MotoristasInativos }}</span>
                </h2>
                <p class="m-b-0">Esse mês<span class="float-end">{{ MotoristasInativosMes }}</span></p>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-3">
        <div class="card bg-grd-primary order-card">
            <div class="card-body">
                <h6 class="text-white">Passageiros Ativos</h6>
                <h2 class="text-end text-white"><i class="feather icon-repeat float-start"></i><span>{{
                    PassageirosAtivos }}</span></h2>
                <p class="m-b-0">Esse mês<span class="float-end">{{ PassageirosAtivosMes }}</span></p>
            </div>
        </div>
    </div>

    <div class="col-md-6 col-xl-3">
        <div class="card bg-grd-danger order-card">
            <div class="card-body">
                <h6 class="text-white">Passageiros Inativos</h6>
                <h2 class="text-end text-white"><i class="feather icon-award float-start"></i><span>{{
                    PassageirosInativos }}</span>
                </h2>
                <p class="m-b-0">Esse mês<span class="float-end">{{ PassageirosInativosMes }}</span></p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import dayjs from "dayjs";
import api from "../../services/api/driver/index"
import apiPassgenger from "../../services/api/passenger/index"

interface Driver {
    activated: boolean;
    createdAt: Date
}


export default {
    name: "CardDashboardComp",
    data() {
        return {
            allDrivers: [],
            allPassengers: [],

            MotoristasAtivos: 0,
            MotoristasAtivosMes: 0,
            MotoristasInativos: 0,
            MotoristasInativosMes: 0,
            PassageirosAtivos: 0,
            PassageirosAtivosMes: 0,
            PassageirosInativos: 0,
            PassageirosInativosMes: 0,
        }
    },

    mounted() {
        this.getDrivers()
        this.getPassenger()
    },

    methods: {

        getDrivers() {
            api.getAllDrivers().then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    const motoristas = res.data.drivers

                    console.log("Motoristas ===>", motoristas)

                    this.allDrivers = motoristas
                    if (motoristas.length > 0) {
                        const motAtivos = motoristas.filter((driver: Driver) => driver.activated == true)
                        const motInativos = motoristas.filter((driver: Driver) => driver.activated == false)

                        this.MotoristasAtivos = motAtivos.length
                        this.MotoristasInativos = motInativos.length

                        const currentMonth = dayjs().month(); // Mês atual (0-11)
                        const motMesAtualAt = motAtivos.filter((driver: Driver) => {
                            const createdMonth = dayjs(driver.createdAt).month();
                            return createdMonth === currentMonth;
                        })
                        const motMesAtualIna = motInativos.filter((driver: Driver) => {
                            const createdMonth = dayjs(driver.createdAt).month();
                            return createdMonth === currentMonth;
                        })

                        this.MotoristasAtivosMes = motMesAtualAt.length
                        this.MotoristasInativosMes = motMesAtualIna.length
                    }
                } else {
                    return
                }
            })
        },

        getPassenger() {
            apiPassgenger.getAllPassaegers().then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    const passenger = res.data.passengers

                    console.log("Passageiro ===>", passenger)

                    this.allDrivers = passenger
                    if (passenger.length > 0) {
                        const pasAtivos = passenger.filter((driver: Driver) => driver.activated == true)
                        const pasInativos = passenger.filter((driver: Driver) => driver.activated == false)

                        this.PassageirosAtivos = pasAtivos.length
                        this.PassageirosInativos = pasInativos.length

                        const currentMonth = dayjs().month(); // Mês atual (0-11)
                        const pasMesAtualAt = pasAtivos.filter((driver: Driver) => {
                            const createdMonth = dayjs(driver.createdAt).month();
                            return createdMonth === currentMonth;
                        })
                        const pasMesAtualIna = pasInativos.filter((driver: Driver) => {
                            const createdMonth = dayjs(driver.createdAt).month();
                            return createdMonth === currentMonth;
                        })

                        this.PassageirosAtivosMes = pasMesAtualAt.length
                        this.PassageirosInativosMes = pasMesAtualIna.length
                    }
                } else {
                    return
                }
            })
        },
    },
}
</script>