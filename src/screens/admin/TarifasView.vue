<template>
    <NavBarComponent :isCollapsed="isSidebarCollapsed" />
    <HeaderComponent @toggleSidebar="toggleSidebar" />


    <main class="pc-container" :class="{ 'with-sidebar': !isSidebarCollapsed }">
        <div class="pc-content">
            <div class="container mt-4">
                <ul class="nav nav-tabs" id="financeTabs" role="tablist">
                    <!-- Aba Financeiro -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="financeiro-tab" data-bs-toggle="tab"
                            data-bs-target="#financeiro" type="button" role="tab" aria-controls="financeiro"
                            aria-selected="true">
                            Financeiro
                        </button>
                    </li>
                    <!-- Aba Tarifas -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tarifas-tab" data-bs-toggle="tab" data-bs-target="#tarifas"
                            type="button" role="tab" aria-controls="tarifas" aria-selected="false">
                            Tarifas
                        </button>
                    </li>
                    <!-- Aba Cadastro de Tarifas -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="cadtarifas-tab" data-bs-toggle="tab" data-bs-target="#cadtarifas"
                            type="button" role="tab" aria-controls="ccadtarifas" aria-selected="false">
                            Cadastro de Tarifas
                        </button>
                    </li>
                </ul>

                <!-- Conteúdo das Abas -->
                <div class="tab-content" id="financeTabsContent">
                    <!-- Conteúdo da Aba Financeiro -->
                    <div class="tab-pane fade show active" id="financeiro" role="tabpanel"
                        aria-labelledby="financeiro-tab">
                        <div class="p-3">
                            <h3>Financeiro</h3>
                            <p>Aqui vai o conteúdo relacionado ao financeiro.</p>
                            <!-- Exemplo de tabela para o financeiro -->
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Pagamento A</td>
                                        <td>R$ 1.000,00</td>
                                        <td>01/12/2024</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Pagamento B</td>
                                        <td>R$ 500,00</td>
                                        <td>03/12/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Conteúdo da Aba de Tarifas -->
                    <div class="tab-pane fade" id="tarifas" role="tabpanel" aria-labelledby="tarifas-tab">
                        <div class="p-3 mt-3">
                            <h1 class="h3 mb-4 pt-3"><strong>Tarifas |</strong> lista de Tarifas</h1>

                            <div class="col-md-12 pt-3">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>Tarifas cadastrados</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <table class="table">
                                                <thead>
                                                    <tr class="text-center">
                                                        <th scope="col">Período da tarifa</th>
                                                        <th scope="col">Tarifa básica</th>
                                                        <th scope="col">Taxa quilômetro</th>
                                                        <th scope="col">Taxa por tempo</th>
                                                        <th scope="col">Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-center">
                                                    <TableTarifasComp v-for="item in clientesOnCurrentPage"
                                                        :key="item.id" :item="item" :funcEdit="handleEditTarifa"
                                                        :successEdit="successEdit" :errorEdit="errorEdit"
                                                        :autenticandoEdit="autenticandoEdit" />
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
                    </div>

                    <!-- Conteúdo da Aba Cadastro de Tarifas -->
                    <div class="tab-pane fade" id="cadtarifas" role="tabpanel" aria-labelledby="cadtarifas-tab">

                        <AlertComponent v-if="msgFieldNull" :showAlert="true" alertType="warning" alertIcon=""
                            alertTitle="Ops..." alertMessage="Preencha todos os campos!" />
                        <AlertComponent v-if="msgErrorApi" :showAlert="true" alertType="danger" alertIcon=""
                            alertTitle="Erro!"
                            alertMessage="Houve um erro ao tentar salvar as novas tarifas tente novamente mais tarde!" />

                        <AlertComponent v-if="msgSuccess" :showAlert="true" alertType="success" alertIcon=""
                            alertTitle="Sucesso!" alertMessage="Tarifas cadastradas com sucesso!" />

                        <div class="row">
                            <div class="p-3 mt-3 col-8">
                                <h3>Cadastro de Tarifas</h3>
                                <p>Aqui você vai cadastrar suas tarifas.</p>
                                <!-- Exemplo de formulário para cadastro de tarifas -->
                                <div class="row col-12 mt-4">
                                    <div class="mb-2 col-5">
                                        <SelectComp label="Período da tarifa" type="text" inputId="periodoInput"
                                            placeholder="Período da tarifa" name="periodoInput" v-model="dayType"
                                            :options="optionsDayType" />
                                    </div>
                                    <div class="mb-2 col-5">
                                        <InputComp type="text" label="Tarifa básica" inputId="baseFlareInput"
                                            placeholder="informe a tarifa básica" name="baseFlare" v-model="baseFlare"
                                            :mask="mascaraBase()" />
                                    </div>
                                    <div class="mb-2 col-5">
                                        <InputComp type="text" label="Taxa quilômetro" inputId="kilometerRateInput"
                                            placeholder="informe a taxa do quilômetro" name="kilometerRate"
                                            v-model="kilometerRate" :mask="mascaraKm()" />
                                    </div>
                                    <div class="mb-3 col-5">
                                        <InputComp type="text" label="Taxa por tempo" inputId="timeRateInput"
                                            placeholder="Informe a taxa do tempo" :mask="mascaraTime()" name="timeRate"
                                            v-model="timeRate" />
                                    </div>
                                    <div class="col-12 mt-3">
                                        <button type="button" @click="handleCadastrarTarifa" :disabled="autenticando"
                                            class="btn btn-primary px-4 py-2">
                                            <span v-if="!autenticando">
                                                Cadastrar Tarifa
                                            </span>

                                            <span v-if="autenticando" class="">Cadastrando...</span>
                                            <span v-if="autenticando" class="spinner-border spinner-border-sm"
                                                aria-hidden="true"></span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div class="p-3 mt-3 col-4">
                                <h3>Resumo</h3>
                                <p>Aqui está um resumo das novas tarifas que você vai deseja cadastrar</p>
                                <!-- Exemplo de formulário para cadastro de tarifas -->
                                <div class="row col-12 mt-4">
                                    <div class="mb-2 col-6">
                                        <h6>Perído da tarifa</h6>
                                        <span>{{ dayType == "WEEKEND" ? "Fim de semana" : "Dia de semana" }}</span>
                                    </div>
                                    <div class="mb-2 col-6">
                                        <h6>Tarifa básica</h6>
                                        <span>R$ {{ baseFlare }}</span>
                                    </div>
                                    <div class="mb-2 col-6">
                                        <h6>Taxa quilômetro</h6>
                                        <span>R$ {{ kilometerRate }}</span>
                                    </div>
                                    <div class="mb-3 col-6">
                                        <h6>Taxa por tempo</h6>
                                        <span>R$ {{ timeRate }}</span>
                                    </div>
                                </div>
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
import AlertComponent from "@/components/alerts/AlertComponent.vue";
import SelectComp from "@/components/inputs/selectComp.vue";
import InputComp from "@/components/inputs/inputComp.vue";
import api from "../../services/api/tariff"
import TableTarifasComp from "@/components/tables/TableTarifasComp.vue";
import * as bootstrap from 'bootstrap';

interface Driver {
    id: string;
    day_type: string;
    base_fare: number;
    kilometer_rate: number;
    time_rate: number;
}

export default {
    name: "TarifasView",
    components: {
        HeaderComponent,
        FooterComponent,
        NavBarComponent,
        AlertComponent,
        SelectComp,
        InputComp,
        TableTarifasComp
    },
    data() {
        return {
            isSidebarCollapsed: false,

            dayType: "",
            optionsDayType: [
                { text: "Dia de semana", value: "WEEKDAY" },
                { text: "Fim de semana", value: "WEEKEND" },
            ],
            baseFlare: "0",
            kilometerRate: "0",
            timeRate: "0",

            autenticando: false,
            msgFieldNull: false,
            msgErrorApi: false,
            msgSuccess: false,

            perPageCliente: 5,
            currentPageCliente: 1,
            searchCliente: "",

            allTarifas: [],

            errorEdit: false,
            successEdit: false,
            autenticandoEdit: false
        };
    },
    computed: {
        clientesOnCurrentPage(): Driver[] {
            const startIndex = (this.currentPageCliente - 1) * this.perPageCliente;
            const endIndex = startIndex + this.perPageCliente;
            return this.allTarifas
                .filter((usuario: Driver) => {
                    return usuario.day_type
                        .toLowerCase()
                        .includes(this.searchCliente.toLowerCase());
                })
                .slice(startIndex, endIndex);
        },

        totalPagesClientes() {
            return Math.ceil(
                this.allTarifas.filter((usuario: Driver) => {
                    this.currentPageCliente = 1;
                    return usuario.day_type
                        .toLowerCase()
                        .includes(this.searchCliente.toLowerCase());
                }).length / this.perPageCliente
            );
        },
    },
    mounted() {
        this.getTarifas()
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

        handleCadastrarTarifa() {
            this.autenticando = true

            const dayType = this.dayType
            const baseFlare = this.baseFlare.replace(',', '.')
            const kilometerRate = this.kilometerRate.replace(',', '.')
            const timeRate = this.timeRate.replace(',', '.')

            if (
                dayType != "" &&
                (baseFlare != "0,00" && baseFlare != "0") &&
                (kilometerRate != "0,00" && kilometerRate != "0") &&
                (timeRate != "0,00" && timeRate != "0")
            ) {

                const data = {
                    day_type: dayType,
                    base_fare: parseFloat(baseFlare),
                    kilometer_rate: parseFloat(kilometerRate),
                    time_rate: parseFloat(timeRate)
                }

                api.cadastrarTarifa(data).then((res) => {
                    if (typeof res !== "string" && res.status === 201) {
                        this.msgSuccess = true

                        setTimeout(() => {
                            this.autenticando = false
                            this.dayType = ""
                            this.baseFlare = "0"
                            this.kilometerRate = "0"
                            this.timeRate = "0"

                            this.msgSuccess = false
                        }, 3000);
                    } else {
                        this.msgErrorApi = true
                        this.autenticando = false

                        setTimeout(() => {
                            this.msgErrorApi = false
                        }, 3000);
                    }
                })

            } else {
                this.msgFieldNull = true
                this.autenticando = false

                setTimeout(() => {
                    this.msgFieldNull = false
                }, 3000);
            }
        },

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

        getTarifas() {
            api.getAllTarifas().then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    const tarifas = res.data.tariffs

                    console.log(tarifas)

                    this.allTarifas = tarifas
                } else {
                    return
                }
            })
        },

        handleEditTarifa(id: string, dayType: string, baseFlare: number, kilometerRate: number, timeRate: number) {
            this.autenticandoEdit = true

            const base_flare = baseFlare.toString().replace(',', '.')
            const kilometer_rate = kilometerRate.toString().replace(',', '.')
            const time_rate = timeRate.toString().replace(',', '.')

            const data = {
                day_type: dayType,
                base_fare: parseFloat(base_flare),
                kilometer_rate: parseFloat(kilometer_rate),
                time_rate: parseFloat(time_rate)
            }

            api.atualizarTarifa(id, data).then((res) => {
                if (typeof res !== "string" && res.status == 200) {
                    this.getTarifas()

                    this.successEdit = true

                    setTimeout(() => {
                        this.autenticandoEdit = false
                        this.successEdit = false
                        this.closeModal(id)
                    }, 3000);
                } else {
                    this.autenticandoEdit = false
                    this.errorEdit = true

                    setTimeout(() => {
                        this.errorEdit = false
                    }, 3000);
                }
            })
        },

        closeModal(id: string) {
            const modalElement = document.getElementById(`modalTarifa${id}`);
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement); // Obtém a instância existente do modal
                if (modal) {
                    modal.hide(); // Fecha o modal
                } else {
                    console.warn(`Instância do modal com ID modalTarifa${id} não encontrada.`);
                }
            } else {
                console.error(`Modal com ID modalTarifa${id} não encontrado.`);
            }
        }
    },
}
</script>

<style scoped>
.nav-link {
    color: gray
}

.nav-link:hover {
    color: #000
}

.nav-link.active {
    color: #000
}
</style>