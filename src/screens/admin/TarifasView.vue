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
                    <!-- Aba Cadastro de Tarifas -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="tarifas-tab" data-bs-toggle="tab" data-bs-target="#tarifas"
                            type="button" role="tab" aria-controls="tarifas" aria-selected="false">
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

                    <!-- Conteúdo da Aba Cadastro de Tarifas -->
                    <div class="tab-pane fade" id="tarifas" role="tabpanel" aria-labelledby="tarifas-tab">
                        <div class="p-3">
                            <h3>Cadastro de Tarifas</h3>
                            <p>Aqui vai o conteúdo relacionado ao cadastro de tarifas.</p>
                            <!-- Exemplo de formulário para cadastro de tarifas -->
                            <form @submit.prevent="submitTarifa">
                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descrição</label>
                                    <input type="text" class="form-control" id="descricao"
                                        v-model="novaTarifa.descricao" required />
                                </div>
                                <div class="mb-3">
                                    <label for="valor" class="form-label">Valor</label>
                                    <input type="number" class="form-control" id="valor" v-model="novaTarifa.valor"
                                        required />
                                </div>
                                <button type="submit" class="btn btn-primary">Cadastrar Tarifa</button>
                            </form>
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

export default {
    name: "TarifasView",
    components: {
        HeaderComponent,
        FooterComponent,
        NavBarComponent
    },
    data() {
        return {
            isSidebarCollapsed: false,

            novaTarifa: {
                descricao: "",
                valor: null,
            },
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },

        submitTarifa() {
            // Lógica para salvar a tarifa
            console.log("Tarifa cadastrada:", this.novaTarifa);
            alert("Tarifa cadastrada com sucesso!");
            // Limpar os campos
            this.novaTarifa.descricao = "";
            this.novaTarifa.valor = null;
        },
    },
}
</script>

<style scoped></style>