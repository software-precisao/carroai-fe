<template>
    <NavBarComponent :isCollapsed="isSidebarCollapsed" />
    <HeaderComponent @toggleSidebar="toggleSidebar" />


    <main class="pc-container" :class="{ 'with-sidebar': !isSidebarCollapsed }">
        <div class="pc-content p-5">

            <h1 class="h3 mb-4 pt-3"><strong>Motoristas |</strong> lista de motoristas</h1>

            <div class="col-md-12 pt-3">
                <div class="card">
                    <div class="card-header">
                        <h5>Motoristas cadastrados</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <table class="table">
                                <thead>
                                    <tr class="text-center">
                                        <th scope="col">Nome</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Telefone</th>
                                        <th scope="col">Placa</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ação</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <TableDriverComp v-for="item in clientesOnCurrentPage" :key="item.id" :item="item"
                                        :handleEditStatusAtivate="handleEditStatusAtivate"
                                        :handleEditStatusBlock="handleEditStatusBlock" />
                                </tbody>
                            </table>

                            <div class="d-grid mt-3 mb-3 gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-dark btn-sm" @click="previousPageCliente()"
                                    :disabled="currentPageCliente <= 1">
                                    Anterior
                                </button>
                                <button class="btn btn-dark btn-sm" style="margin-right: 3% !important"
                                    @click="nextPageCliente()" :disabled="currentPageCliente >= totalPagesClientes
                                        ">
                                    Proximo
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>

    <FooterComponent :isSidebarCollapsed="isSidebarCollapsed" />
</template>

<script lang="ts">
import HeaderComponent from "../../components/header/HeaderComp.vue";
import NavBarComponent from "../../components/navbar/navbarComp.vue";
import FooterComponent from "../../components/footer/FooterComp.vue";
import TableDriverComp from "@/components/tables/TableDriverComp.vue";
import api from "../../services/api/driver/index"

interface Driver {
    first_name: string;
    id: string
}

export default {
    name: "DriverView",
    components: {
        HeaderComponent,
        FooterComponent,
        NavBarComponent,
        TableDriverComp
    },
    data() {
        return {
            isSidebarCollapsed: false,

            perPageCliente: 5,
            currentPageCliente: 1,
            searchCliente: "",

            allDrivers: [],
        };
    },
    mounted() {
        this.getDrivers()
    },
    computed: {
        clientesOnCurrentPage(): Driver[] {
            const startIndex = (this.currentPageCliente - 1) * this.perPageCliente;
            const endIndex = startIndex + this.perPageCliente;
            return this.allDrivers
                .filter((usuario: Driver) => {
                    return usuario.first_name
                        .toLowerCase()
                        .includes(this.searchCliente.toLowerCase());
                })
                .slice(startIndex, endIndex);
        },

        totalPagesClientes() {
            return Math.ceil(
                this.allDrivers.filter((usuario: Driver) => {
                    this.currentPageCliente = 1;
                    return usuario.first_name
                        .toLowerCase()
                        .includes(this.searchCliente.toLowerCase());
                }).length / this.perPageCliente
            );
        },
    },
    methods: {
        previousPageCliente() {
            if (this.currentPageCliente > 1) {
                this.currentPageCliente--;
            }
        },
        nextPageCliente() {
            if (this.currentPageCliente < this.totalPagesClientes) {
                this.currentPageCliente++;
            }
        },
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },

        handleEditStatusAtivate(id: string) {
            api.updateActiveatdUser(id, { activated: true }).then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    this.getDrivers()
                }
            })
        },
        handleEditStatusBlock(id: string) {
            api.updateActiveatdUser(id, { activated: false }).then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    this.getDrivers()
                }
            })
        },

        getDrivers() {
            api.getAllDrivers().then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    const motoristas = res.data.drivers

                    console.log(motoristas)

                    this.allDrivers = motoristas

                } else {
                    return
                }
            })
        },
    },
}
</script>

<style scoped></style>