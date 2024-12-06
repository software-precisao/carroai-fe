<template>
    <div class="">
        <header class="pc-header py-2">
            <div class="m-header">
                <a href="../dashboard/index.html" class="b-brand text-primary">
                    <!-- ========   Change your logo from here   ============ -->
                    <img src="../../assets/icons/Logo.svg" alt="logo image" class="" style="width: 40px; height: 40px;">
                </a>
            </div>
            <div class="header-wrapper">
                <!-- [Mobile Media Block] start -->
                <div class="me-auto pc-mob-drp">
                    <ul class="list-unstyled">
                        <!-- ======= Menu collapse Icon ===== -->
                        <li class="pc-h-item pc-sidebar-collapse">
                            <button class="bg-transparent  border-0 pc-head-link ms-0" id="sidebar-hide"
                                @click="$emit('toggleSidebar')">
                                <i class="ph ph-list"></i>
                            </button>
                        </li>
                        <li class="pc-h-item pc-sidebar-popup">
                            <button class="bg-transparent  border-0 pc-head-link ms-0" id="sidebar-hide"
                                @click="$emit('toggleSidebar')">
                                <i class="ph ph-list"></i>
                            </button>
                        </li>
                        <!-- <li class="dropdown pc-h-item">
                            <a class="pc-head-link dropdown-toggle arrow-none m-0" data-bs-toggle="dropdown" href="#"
                                role="button" aria-haspopup="false" aria-expanded="false">
                                <i class="ph ph-magnifying-glass"></i>
                            </a>
                            <div class="dropdown-menu pc-h-dropdown drp-search">
                                <form class="px-3">
                                    <div class="form-group mb-0 d-flex align-items-center">
                                        <input type="search" class="form-control border-0 shadow-none"
                                            placeholder="Search here. . .">
                                        <button class="btn btn-light-secondary btn-search">Search</button>
                                    </div>
                                </form>
                            </div>
                        </li> -->
                    </ul>
                </div>
                <!-- [Mobile Media Block end] -->
                <div class="ms-auto">
                    <ul class="list-unstyled">
                        <li class="dropdown pc-h-item header-user-profile">
                            <!-- <a class="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                role="button" aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false">
                                <img src="../assets/images/user/avatar-2.jpg" alt="user-image" class="user-avtar">
                            </a> -->
                            <a class="nav-link" style="display: flex; align-items: center;" id="UserDropdown" href="#"
                                data-bs-toggle="dropdown" aria-expanded="false" @click="toggleDropdown">
                                <div class="bg-primary rounded me-2" style="padding: 3px 6px;">
                                    <div class="avatar-null img-fluid rounded me-1 ms-1">
                                        <span v-if="!isLoading" class="" style="font-size: 22px; font-weight: 400;">{{
                                            iniciais }}</span>
                                        <span v-else>
                                            <div class="spinner-border small-spinner" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <span style="font-weight: 500;" class="me-2 text-dark">{{ nome }} {{
                                    sobrenome
                                    }}</span>
                                <i class="fa fa-angle-down text-dark" style="margin-bottom: -5px;"></i>
                            </a>
                            <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown"
                                aria-labelledby="UserDropdown">
                                <div class="dropdown-body">
                                    <div class="profile-notification-scroll position-relative"
                                        style="max-height: calc(100vh - 225px)">
                                        <ul class="list-group list-group-flush w-100">
                                            <li class="list-group-item">
                                                <a href="/perfil" class="dropdown-item">
                                                    <span class="d-flex align-items-center">
                                                        <i class="ph ph-user-circle"></i>
                                                        <span>Perfil</span>
                                                    </span>
                                                </a>
                                                <a href="#" class="dropdown-item">
                                                    <span class="d-flex align-items-center">
                                                        <i class="ph ph-bell"></i>
                                                        <span>Notificações ({{ notification }})</span>
                                                    </span>
                                                </a>
                                                <!-- <a href="#" class="dropdown-item">
                                                    <span class="d-flex align-items-center">
                                                        <i class="ph ph-gear-six"></i>
                                                        <span>Settings</span>
                                                    </span>
                                                </a> -->
                                            </li>
                                            <li class="list-group-item">
                                                <!-- <a href="#" class="dropdown-item">
                                                    <span class="d-flex align-items-center">
                                                        <i class="ph ph-plus-circle"></i>
                                                        <span>Add account</span>
                                                    </span>
                                                </a> -->
                                                <button class="dropdown-item" @click="handleLogout">
                                                    <span class="d-flex align-items-center">
                                                        <i class="ph ph-power"></i>

                                                        <span v-if="!loadingLogout">
                                                            Logout
                                                        </span>

                                                        <span v-if="loadingLogout"
                                                            class="spinner-border spinner-border-sm"
                                                            aria-hidden="true"></span>
                                                    </span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
</template>

<script lang="ts">

import { jwtDecode } from "jwt-decode";
import NavBarComponent from "../../components/navbar/navbarComp.vue";
import api from "../../services/api/auth/index"

export default {
    name: "HeaderComponent",
    components: {
        NavBarComponent
    },
    data() {
        return {
            iniciais: "",
            nome: "",
            id: "",
            sobrenome: "",
            token: localStorage.getItem("token"),
            isLoading: true,

            isDropdownOpen: false,

            notification: 0,

            loadingLogout: false,
        }
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

            this.nome = decode.first_name
            this.sobrenome = decode.last_name
            this.id = decode.id
            this.iniciais = `${decode.first_name.charAt(0)}${decode.last_name.charAt(0)}`;
            this.isLoading = false
        }
    },
    methods: {
        // toggleSidebar() {
        //     const body = document.body;
        //     body.classList.toggle('sidebar-icon-only');
        // },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        handleLogout() {
            event?.preventDefault()

            this.loadingLogout = true

            let id = this.id

            const data = {
                user_id: id,
                provider: "local"
            }

            api.logout(data).then((res) => {
                console.log(res)
                if (typeof res != "string" && res.status === 200) {
                    this.loadingLogout = false
                    localStorage.removeItem("token")

                    setTimeout(() => {
                        window.location.href = "/"
                    }, 3000);
                } else {
                    this.loadingLogout = false
                }
            })
        },
    },
}
</script>