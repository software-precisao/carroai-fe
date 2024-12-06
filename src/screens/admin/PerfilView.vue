<template>
    <NavBarComponent :isCollapsed="isSidebarCollapsed" />
    <HeaderComponent @toggleSidebar="toggleSidebar" />


    <main class="pc-container" :class="{ 'with-sidebar': !isSidebarCollapsed }">
        <div class="pc-content">
            <h1 class="h3 mb-3"><strong>Seu perfil |</strong> dados</h1>
            <div class="row">
                <div class="col-md-12 col-xl-5">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fa fa-user"></i> Detalhes do perfil
                                <span style="float: inline-end">
                                    <a data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        class="btn btn-info btn-sm text-white" style="margin-right: 3px" href="#"><i
                                            class="fa fa-refresh"></i> Trocar
                                        senha</a>
                                </span>
                                <span style="float: inline-end">
                                    <a data-bs-toggle="modal" data-bs-target="#editModal"
                                        class="btn btn-warning btn-sm me-2 text-white" style="margin-right: 3px"
                                        href="#"><i class="fa-regular fa-pen-to-square"></i> Editar
                                        dados</a>
                                </span>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="container">
                                <div class="row mt-4 mb-1">
                                    <div class="col-md-4">
                                        <div class="bg-primary text-white rounded me-1 mb-4" style="
                                            width: 128px;
                                            height: 128px;
                                            font-size: 40px;
                                            justify-content: center;
                                            align-items: center;
                                            display: flex;
                                        ">
                                            {{ iniciais }}
                                        </div>
                                    </div>

                                    <div class="col-md-8 text-left">
                                        <label for=""><small><strong>Nome de usuário</strong></small></label>
                                        <h5 class="text-muted mb-0">
                                            {{ nome }} {{ sobrenome }}
                                        </h5>

                                        <label for="" class="mt-2"><small><strong>E-mail</strong></small></label>
                                        <h5 class="text-muted mb-0">{{ email }}</h5>

                                        <label for="" class="mt-2"><small><strong>Nivel</strong></small></label>
                                        <h5 v-if="nivel == 'admin'" class="text-muted mb-0">
                                            <span class="badge text-bg-primary">Administrador</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- <div class="col-md-12 col-xl-7" v-if="card">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="fa fa-building"></i> Detalhes da empresa
                                <span style="float: inline-end"></span>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div v-if="
                                            image == null ||
                                            image == '/avatar/default-avatar.png'
                                        " class="avatar-null rounded me-1 mb-4" style="
                                            width: 128px;
                                            height: 128px;
                                            font-size: 40px;
                                            justify-content: center;
                                            align-items: center;
                                            display: flex;
                                            ">
                                            <i class="fa fa-building fa-2x"></i>
                                        </div>
                                    </div>

                                    <div class="col-md-8 text-left">
                                        <label for=""><small><strong>Razão Social</strong></small></label>
                                        <h5 class="text-muted mb-0">{{ razaoSocial }}</h5>

                                        <label for="" class="mt-2"><small><strong>CNPJ</strong></small></label>
                                        <h5 class="text-muted mb-0">{{ cnpj }}</h5>

                                        <label for="" class="mt-2"><small><strong>Endereço</strong></small></label>
                                        <h5 class="text-muted mb-0">{{ endereco }}</h5>
                                    </div>

                                    <div class="col-md-12 text-left">
                                        <label for=""><small><strong><i class="fa fa-link"></i> Token
                                                    único</strong></small></label>
                                        <h5 class="text-muted mb-0">{{ myToken }}</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="text-muted mb-2"></div>
                        </div>

                        <hr class="my-0" />
                        <div class="card-body">
                            <h5 class="h6 card-title">
                                <i class="fa fa-qrcode"></i> Seu Qr-code
                            </h5>
                            <img :src="qrcode" width="200" alt="" />
                        </div>
                    </div>
                </div> -->

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                    <i class="fa fa-edit"></i> Edite sua senha
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <div v-if="mostrarSkeleton" class="skeleton-label"></div>
                                                <div v-if="mostrarSkeleton" class="skeleton-input"></div>
                                                <label v-if="!mostrarSkeleton" for="exampleInputEmail1"
                                                    class="form-label">Crie uma senha
                                                </label>
                                                <input type="password" required v-if="!mostrarSkeleton"
                                                    class="form-control" v-model="senha"
                                                    :class="{ 'is-invalid': isEmailInvalid }"
                                                    placeholder="Digite sua senha" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <div v-if="mostrarSkeleton" class="skeleton-label"></div>
                                                <div v-if="mostrarSkeleton" class="skeleton-input"></div>
                                                <label v-if="!mostrarSkeleton" for="exampleInputEmail1"
                                                    class="form-label">Confirme a senha
                                                </label>
                                                <input type="password" required v-if="!mostrarSkeleton"
                                                    class="form-control" v-model="confimSenha"
                                                    placeholder="Digite a senha novamente" />

                                                <p class="text-danger mt-2" v-if="confimSenha && !passwordsMatch">
                                                    <i class="fa fa-ban"></i> As senhas não conferem!
                                                </p>
                                                <p class="text-success mt-2" v-if="confimSenha && passwordsMatch">
                                                    <i class="fa fa-check"></i> As senhas conferem
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button type="button" :disabled="autenticando" @click="handledEdit()"
                                    class="btn btn-success">
                                    {{ textoBotao }}
                                    <span v-if="autenticando" class="spinner-border spinner-border-sm"
                                        aria-hidden="true"></span>
                                    <span v-if="autenticando" class="visually-hidden">Aguarde...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="editModal">
                                    <i class="fa fa-edit"></i> Edite seus dados
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <div v-if="mostrarSkeleton" class="skeleton-label"></div>
                                                <div v-if="mostrarSkeleton" class="skeleton-input"></div>
                                                <label v-if="!mostrarSkeleton" for="exampleInputEmail1"
                                                    class="form-label">Nome
                                                </label>
                                                <input type="password" required v-if="!mostrarSkeleton"
                                                    class="form-control" v-model="senha"
                                                    :class="{ 'is-invalid': isEmailInvalid }"
                                                    placeholder="Digite o seu nome" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-3">
                                                <div v-if="mostrarSkeleton" class="skeleton-label"></div>
                                                <div v-if="mostrarSkeleton" class="skeleton-input"></div>
                                                <label v-if="!mostrarSkeleton" for="exampleInputEmail1"
                                                    class="form-label">Sobrenome
                                                </label>
                                                <input type="password" required v-if="!mostrarSkeleton"
                                                    class="form-control" v-model="confimSenha"
                                                    placeholder="Digite o seu sobrenome" />

                                                <p class="text-danger mt-2" v-if="confimSenha && !passwordsMatch">
                                                    <i class="fa fa-ban"></i> As senhas não conferem!
                                                </p>
                                                <p class="text-success mt-2" v-if="confimSenha && passwordsMatch">
                                                    <i class="fa fa-check"></i> As senhas conferem
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button type="button" :disabled="autenticando" @click="handledEdit()"
                                    class="btn btn-success">
                                    {{ textoBotaoEdit }}
                                    <span v-if="autenticando" class="spinner-border spinner-border-sm"
                                        aria-hidden="true"></span>
                                    <span v-if="autenticando" class="visually-hidden">Aguarde...</span>
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
import { jwtDecode } from "jwt-decode";

export default {
    name: "PerfilView",
    data() {
        return {
            textoBotao: "Alterar senha",
            textoBotaoEdit: "Salvar",
            autenticando: false,
            image: "",
            nome: "",
            sobrenome: "",
            email: "",
            nivel: "",
            iniciais: "",
            plano: "",
            senha: "",
            confimSenha: "",
            razaoSocial: "",
            cnpj: "",
            endereco: "",
            myToken: "",
            qrcode: "",
            idUser: "",
            card: true,

            isSidebarCollapsed: false,

            token: localStorage.getItem("token")
        };
    },
    components: {
        HeaderComponent,
        FooterComponent,
        NavBarComponent,
    },
    computed: {
        passwordsMatch() {
            return this.senha === this.confimSenha;
        },
    },
    mounted() {
        interface CustomJwtPayload {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            avatar: string | null;
            phone_number: string | null;
            role: string;
            exp: number;
            iat: number;
        }

        if (this.token != null) {
            const decode = jwtDecode<CustomJwtPayload>(this.token)
            console.log(decode)

            this.nome = decode.first_name
            this.sobrenome = decode.last_name
            this.email = decode.email
            this.nivel = decode.role
            this.iniciais = `${decode.first_name.charAt(0)}${decode.last_name.charAt(0)}`;
        }
    },

    methods: {
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
    },
};
</script>

<style scoped>
main {
    transition: margin-left 0.3s ease;
}

main.with-sidebar {
    margin-left: 250px;
}

main {
    margin-left: 0px;
}
</style>