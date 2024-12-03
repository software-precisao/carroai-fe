<template>
    <div class="min-vh-100 d-flex justify-content-center align-items-center " style="background-color: #0068c1;">
        <!-- Formulário de Login -->
        <div class="row w-100 d-flex justify-content-center">

            <div class="col-4 bg-white rounded shadow-lg py-4 px-4">
                <div class="text-center mb-8">
                    <img src="../../assets/icons/Logo.svg" alt="Logo" class="mx-auto mb-4" />
                    <h4 class="text-xl font-semibold text-gray-800 mb-2">Recuperar senha</h4>
                </div>

                <AlertComponent v-if="msgErroVerificarEmail" :showAlert="true" alertType="DANGER" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Não encontramos o email informado!" />

                <AlertComponent v-if="msgErroNullEmail" :showAlert="true" alertType="WARNING" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Preencha o campo de email corretamente!" />

                <AlertComponent v-if="msgErroNullCode" :showAlert="true" alertType="WARNING" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Preencha o campo de código corretamente!" />

                <AlertComponent v-if="msgErroNullPassword" :showAlert="true" alertType="WARNING" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Preencha o campo de senha e confimar senha corretamente!" />

                <AlertComponent v-if="msgErroApiSenha" :showAlert="true" alertType="WARNING" alertIcon=""
                    alertTitle="Erro!..."
                    alertMessage="Houve um erro ao tentar atualizar a senha tente novamente mais tarde!" />

                <AlertComponent v-if="msgSuccess" :showAlert="true" alertType="SUCCESS" alertIcon=""
                    alertMessage="login realizado com sucesso" />

                <AlertComponent v-if="msgSuccessSenha" :showAlert="true" alertType="SUCCESS" alertIcon=""
                    alertMessage="Senha atualizada com sucesso" />

                <!-- Formulário -->
                <div class="px-4 pt-1" v-if="step1">
                    <div class="mb-5">
                        <InputComp type="email" label="Email" inputId="emailInput" :placeholder="'email@gmail.com'"
                            name="email" v-model="email" :invalid="emailInvalid"
                            :invalidFeedback="'Digite um email válido'" :feedbackTitle="'Email inválido'" />
                    </div>

                    <div class="row mb-4">
                        <div class="col-12">
                            <PrimaryComp text="Continuar"
                                buttonClass="fw-bold w-full bg-primary text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                :disabled="autenticado" :loading="autenticado" @click="handleVerificarEmail()" />
                        </div>

                        <div class="col-12">
                            <PrimaryComp text="Voltar"
                                buttonClass="fw-bold w-full bg-secondary text-white py-3 rounded-md"
                                :disabled="autenticado" @click="handleVoltar()" />

                        </div>
                    </div>
                </div>

                <div class="px-4 pt-1" v-if="step2">
                    <div class="mb-4">
                        <InputCodeComp type="text" label="code" inputId="codeInput" :placeholder="'323423'" name="code"
                            v-model="code" :invalid="codeInvalid" :invalidFeedback="'digite um código válido'"
                            :feedbackTitle="'Código inválido'" />
                    </div>

                    <!-- <div class="mb-4">
                        <InputComp type="password" inputId="passwordInput" :placeholder="'********'" name="email"
                            v-model="password" :invalid="passwordInvalid" :invalidFeedback="'Senha inválida'"
                            :feedbackTitle="'Senha inválido'" />
                    </div> -->

                    <div class="d-flex justify-content-center align-items-center">
                        <!-- Link para reenviar -->
                        <h4 class="text-center m-0 p-0" v-if="time">
                            <a class="text-primary text-lg me-2 text-decoration-none"
                                @click="handleVerificarEmail">Reenviar</a>
                        </h4>
                        <h4 class="text-center m-0 p-0" v-else>
                            <a class="text-muted text-lg me-2 text-decoration-none">Reenviar</a>
                        </h4>

                        <!-- Temporizador -->
                        <h4 class="text-secondary text-lg" style="margin-bottom: -5px !important;">{{
                            reenviarTime }} segundos</h4>
                    </div>


                    <div class="mb-4 mt-4">
                        <!-- <button type="button"
                            class="w-full bg-primary-blue text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Login
                        </button> -->

                        <PrimaryComp text="Continuar"
                            buttonClass="w-full fw-bold bg-primary text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            :disabled="autenticado" :loading="autenticado" @click="handleVerificarCode()" />
                    </div>
                </div>

                <div class="px-4 pt-1" v-if="step3">
                    <div class="mb-4">
                        <InputComp label="Senha" type="password" inputId="passInput" placeholder="*********"
                            name="password" v-model="password" :invalid="password != '' ? passwordInvalid : false"
                            invalidFeedback="Senha inválida" :mask="validarSenha()" />

                    </div>

                    <div class="mb-4">
                        <InputComp label="Confirmar senha" type="password" inputId="confpassInput"
                            placeholder="*********" name="password" v-model="confPassword"
                            :invalid="confPassword != '' && !passwordsMatch" invalidFeedback="Campos diferentes" />

                    </div>

                    <div class="mb-4">
                        <!-- <button type="button"
                            class="w-full bg-primary-blue text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Login
                        </button> -->

                        <PrimaryComp text="Continuar"
                            buttonClass="w-full fw-bold bg-primary text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            :disabled="autenticado" :loading="autenticado" @click="handleEditarSenha()" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PrimaryComp from '@/components/buttons/primaryComp.vue';
import InputComp from '@/components/inputs/inputComp.vue';
import AlertComponent from '@/components/alerts/AlertComponent.vue';
import api from '../../services/api/auth/index'
import InputCodeComp from '@/components/inputs/inputCodeComp.vue';

export default {
    name: "RecoveryView",
    data() {
        return {
            email: "",
            password: "",
            confPassword: "",
            code: "",
            id: "",
            rememberMe: false,
            autenticado: false,

            step1: true,
            step2: false,
            step3: false,

            msgErroApiSenha: false,
            passwordInvalid: false,
            msgErroNullPassword: false,
            emailInvalid: false,
            msgSuccess: false,
            msgSuccessSenha: false,
            msgErroVerificarEmail: false,
            msgErroNullEmail: false,

            codeInvalid: false,
            msgErroNullCode: false,

            reenviarTime: 20,
            time: false,
        };
    },
    components: {
        InputComp,
        PrimaryComp,
        AlertComponent,
        InputCodeComp
    },
    computed: {
        passwordsMatch() {
            return this.password === this.confPassword;
        },
    },
    methods: {
        validarSenha() {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{6,}$/;
            this.passwordInvalid = !(regex.test(this.password));
        },

        startCountdown() {
            const countdown = setInterval(() => {
                if (this.reenviarTime > 0) {
                    this.reenviarTime--;
                } else {
                    clearInterval(countdown);
                    this.time = true;
                }
            }, 1000); // Decrementa a cada 1 segundo (1000ms)
        },

        handleVerificarEmail(): void {
            this.autenticado = true;

            const email: string = this.email;

            if (
                email !== ""
            ) {
                const data = {
                    email
                };

                api.verificarEmail(data).then((res) => {
                    if (typeof res !== "string" && res.status === 200) {
                        this.step1 = false
                        this.step2 = true
                        this.id = res.data.id_user

                        this.time = false
                        this.reenviarTime = 20
                        this.autenticado = false;

                        setTimeout(() => {
                            this.startCountdown()
                        }, 1000);
                    } else {
                        this.msgErroVerificarEmail = true;
                        this.autenticado = false;

                        this.time = false
                        this.reenviarTime = 20

                        setTimeout(() => {
                            this.startCountdown()
                        }, 1000);

                        setTimeout(() => {
                            this.msgErroVerificarEmail = false;
                        }, 3000);
                    }
                });
            } else {
                this.msgErroNullEmail = true;
                this.autenticado = false;

                setTimeout(() => {
                    this.msgErroNullEmail = false;
                }, 3000);
            }
        },

        handleVerificarCode(): void {
            this.autenticado = true;

            const code: string = this.code;
            const user_id: string | number = this.id

            if (
                code !== "" &&
                user_id != ""
            ) {
                const data = {
                    code,
                    user_id
                };

                api.verificarCode(data).then((res) => {
                    if (typeof res !== "string" && res.status === 200) {
                        this.step2 = false
                        this.step3 = true
                        this.autenticado = false;
                    } else {
                        this.codeInvalid = true;
                        this.autenticado = false;

                        setTimeout(() => {
                            this.codeInvalid = false;
                        }, 3000);
                    }
                });
            } else {
                this.msgErroNullCode = true;
                this.autenticado = false;

                setTimeout(() => {
                    this.msgErroNullCode = false;
                }, 3000);
            }
        },

        handleEditarSenha(): void {
            this.autenticado = true;

            const user_id: string | number = this.id
            const password: string = this.password;
            const confPassword: string = this.confPassword;

            if (
                password !== "" &&
                confPassword !== "" &&
                user_id != "" &&
                (password == confPassword)
            ) {
                const data = {
                    password
                };

                api.editSenha(data, user_id).then((res) => {
                    if (typeof res !== "string" && res.status === 200) {
                        this.msgSuccessSenha = true

                        setTimeout(() => {
                            this.msgSuccessSenha = false
                            window.location.href = "/"
                        }, 3000);
                    } else {
                        this.msgErroApiSenha = true;
                        this.autenticado = false;

                        setTimeout(() => {
                            this.msgErroApiSenha = false;
                        }, 3000);
                    }
                });
            } else {
                this.msgErroNullPassword = true;
                this.autenticado = false;

                setTimeout(() => {
                    this.msgErroNullPassword = false;
                }, 3000);
            }
        },

        handleVoltar(): void {
            window.location.href = "/"
        },
    },
};
</script>

<style scoped>
/* Você pode adicionar qualquer estilo específico aqui se necessário */
</style>