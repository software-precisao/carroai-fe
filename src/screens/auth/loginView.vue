<template>
    <div class="min-vh-100 d-flex justify-content-center align-items-center " style="background-color: #0068c1;">

        <div class="row w-100 d-flex justify-content-center">
            <div class="col-4 bg-white rounded shadow-lg py-4 px-4">
                <div class="text-center mb-4">
                    <img src="../../assets/icons/Logo.svg" alt="Logo" class="mb-3" />
                    <h4 class="h5 text-dark mb-2">Login</h4>
                </div>

                <!-- Alertas -->
                <AlertComponent v-if="msgErroCadastro" :showAlert="true" alertType="danger" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Houve uma falha ao tentar realizar o login" />

                <AlertComponent v-if="msgErroNull" :showAlert="true" alertType="warning" alertIcon=""
                    alertTitle="Erro!..." alertMessage="Preencha os campos corretamente!" />

                <AlertComponent v-if="msgSuccess" :showAlert="true" alertType="success" alertIcon=""
                    alertMessage="Login realizado com sucesso" />

                <!-- Formulário -->
                <div class="">
                    <div class="">
                        <InputComp type="email" inputId="emailInput" :placeholder="'email@gmail.com'" name="email"
                            v-model="email" :invalid="emailInvalid" :invalidFeedback="'Digite um email válido'"
                            :feedbackTitle="'Email inválido'" />
                    </div>

                    <div class="mb-3">
                        <InputComp type="password" inputId="passwordInput" :placeholder="'********'" name="password"
                            v-model="password" :invalid="passwordInvalid" :invalidFeedback="'Senha inválida'"
                            :feedbackTitle="'Senha inválida'" />
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <a href="/recovery" class="text-primary text-decoration-none small">Esqueceu a senha?</a>
                    </div>

                    <div>
                        <PrimaryComp text="Login" buttonClass="bg-primary w-100 py-3 text-white fw-bold"
                            :disabled="autenticado" :loading="autenticado" @click="handleLogin()" />
                    </div>
                </div>
            </div>

        </div>
        <!-- Formulário de Login -->
    </div>
</template>

<script lang="ts">
import PrimaryComp from '@/components/buttons/primaryComp.vue';
import InputComp from '@/components/inputs/inputComp.vue';
import AlertComponent from '@/components/alerts/AlertComponent.vue';
import api from '../../services/api/auth/index'
import { jwtDecode } from 'jwt-decode';

export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
            rememberMe: false,
            autenticado: false,

            msgSuccess: false,
            msgErroCadastro: false,
            passwordInvalid: false,
            emailInvalid: false,
            msgErroNull: false,

            token: localStorage.getItem("token")
        };
    },
    mounted() {
        interface CustomJwtPayload {
            id: string;
            email: string | null;
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

            const data = { id: decode.id }

            api.verificarToken(data).then((res) => {
                if (typeof res !== "string" && res.status === 200) {
                    window.location.href = "/dashboard"
                } else {
                    return
                }
            })
        }
    },
    components: {
        InputComp,
        PrimaryComp,
        AlertComponent,
    },
    methods: {
        handleLogin(): void {
            this.autenticado = true;

            const email: string = this.email;
            const password: string = this.password;

            if (
                email !== "" &&
                password !== ""
            ) {
                const data = {
                    email,
                    password,
                };

                api.login(data).then((res) => {
                    if (typeof res !== "string" && res.status === 200) {
                        if (res.data.user.role == "admin") {
                            this.msgSuccess = true;
                            console.log(res.data)

                            localStorage.setItem("token", res.data.token)

                            setTimeout(() => {
                                window.location.href = "/dashboard";
                                this.msgSuccess = false;
                            }, 3000);
                        } else {
                            this.msgErroCadastro = true;
                            this.autenticado = false;

                            setTimeout(() => {
                                this.msgErroCadastro = false;
                            }, 3000);
                        }
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
        }
    },
};
</script>

<style scoped>
/* Você pode adicionar qualquer estilo específico aqui se necessário */
</style>