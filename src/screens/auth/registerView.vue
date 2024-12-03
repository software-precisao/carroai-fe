<template>
    <div class="min-vh-100 d-flex justify-content-center align-items-center " style="background-color: #0068c1;">
        <!-- Formulário de Login -->
        <div class="row w-100 d-flex justify-content-center">
            <div class="col-4 bg-white rounded shadow-lg py-4 px-4">
                <div class="text-center mb-8">
                    <img src="../../assets/icons/Logo.svg" alt="Logo" class="mx-auto mb-4" />
                    <h4 class="text-xl font-semibold text-gray-800 mb-2">Registrar</h4>
                </div>

                <AlertComponent v-if="msgErroCadastro" :showAlert="true" alertType="DANGER" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Houve uma falha ao tentar cadastrar o Adimistrador" />

                <AlertComponent v-if="msgErroNull" :showAlert="true" alertType="WARNING" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Preencha os campos corretamente!" />

                <AlertComponent v-if="msgSuccess" :showAlert="true" alertType="SUCCESS" alertIcon=""
                    alertMessage="Adimistrador cadastrado com sucesso" />
                <div class="px-4">

                    <div class=" row mb-4">
                        <div class="col-6">
                            <InputComp type="text" label="Nome" inputId="nomeInput" :placeholder="'Nome'" name="nome"
                                v-model="nome" />
                        </div>
                        <div class="col-6">
                            <InputComp type="text" label="Sobrenome" inputId="sobrenomeInput" :placeholder="'Sobrenome'"
                                name="sobrenome" v-model="sobrenome" />
                        </div>
                    </div>
                    <div class="mb-4">

                        <InputComp type="email" label="Email" inputId="emailInput" :placeholder="'email@gmail.com'"
                            name="email" v-model="email" :invalid="email != '' ? invalidEmail : false"
                            :invalidFeedback="'digite um email válido'" :feedbackTitle="'Email inválido'"
                            :mask="validateEmail()" />
                    </div>

                    <div class="mb-4 row">
                        <div class="col-6">
                            <InputComp type="password" label="Senha" inputId="passwordInput" :placeholder="'********'"
                                name="password" v-model="password" :invalid="password != '' ? invalidPassword : false"
                                :invalidFeedback="'Senha inválida'" :mask="validarSenha()" />
                        </div>

                        <div class="mb-4 col-6">
                            <InputComp type="password" label="Confirmar senha" inputId="confPasswordInput"
                                :placeholder="'********'" name="confPassword" v-model="confPassword"
                                :invalid="confPasswordInvalid" />

                            <p class="text-red-500" v-if="confPassword && !passwordsMatch">
                                <i class="fa fa-ban"></i> Senhas não conferem!
                            </p>
                            <p class="text-green-500" v-if="confPassword && passwordsMatch">
                                <i class="fa fa-check"></i> Senhas conferem!
                            </p>
                        </div>
                    </div>

                    <div class="mb-2">

                        <PrimaryComp text="Registrar" @click="handleRegister()" :loading="autenticado"
                            class="fw-bold w-full bg-primary text-white py-3 rounded-md focus:outline-none"
                            type="button" :disabled="autenticado" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import InputComp from '@/components/inputs/inputComp.vue';
import api from '../../services/api/auth/index';
import PrimaryComp from '@/components/buttons/primaryComp.vue';
import AlertComponent from '@/components/alerts/AlertComponent.vue';

export default {
    name: "RegisterView",
    data() {
        return {
            nome: "",
            sobrenome: "",
            email: "",
            password: "",
            confPassword: "",
            invalidPassword: true,
            invalidEmail: true,
            rememberMe: false,
            autenticado: false,
            confPasswordInvalid: false,

            msgErroNull: false,
            msgErroCadastro: false,
            msgSuccess: false,
        };
    },
    components: {
        InputComp,
        PrimaryComp,
        AlertComponent
    },
    computed: {
        passwordsMatch() {
            return this.password === this.confPassword;
        },
    },
    methods: {
        validarSenha() {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{6,}$/;
            this.invalidPassword = !(regex.test(this.password));
        },

        validateEmail() {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            this.invalidEmail = !(emailRegex.test(this.email))
        },

        handleRegister(): void {
            this.autenticado = true;

            const first_name: string = this.nome;
            const last_name: string = this.sobrenome;
            const email: string = this.email;
            const password: string = this.password;
            const confPassword: string = this.confPassword;
            const role: string = "admin";
            const invalidPassword: boolean = this.invalidPassword;
            const invalidEmail: boolean = this.invalidEmail;

            if (!invalidPassword && !invalidEmail) {
                if (
                    first_name !== "" &&
                    last_name !== "" &&
                    email !== "" &&
                    password !== "" &&
                    password === confPassword
                ) {
                    const data = {
                        first_name,
                        last_name,
                        email,
                        password,
                        role,
                    };

                    api.cadastroAdmin(data).then((res) => {
                        if (typeof res !== "string" && res.status === 201) {
                            this.msgSuccess = true;

                            setTimeout(() => {
                                window.location.href = "/";
                                this.msgSuccess = false;
                            }, 3000);
                        } else {
                            this.msgErroCadastro = true;
                            this.autenticado = false;

                            setTimeout(() => {
                                this.msgErroCadastro = false;
                            }, 3000);
                        }
                    });
                } else {
                    this.msgErroNull = true;
                    this.autenticado = false;

                    setTimeout(() => {
                        this.msgErroNull = false;
                    }, 3000);
                }
            } else {
                this.autenticado = false;
                this.msgErroNull = true;

                setTimeout(() => {
                    this.msgErroNull = false;
                }, 3000);
            }
        }

    },
};
</script>

<style scoped>
/* Você pode adicionar qualquer estilo específico aqui se necessário */
</style>