<template>
    <nav class="pc-sidebar mt-3" :class="{ 'collapsed': isCollapsed }" id="sidebar">
        <div class="navbar-wrapper">
            <div class="m-header">
                <a href="../dashboard" class="b-brand text-primary">
                    <!-- ========   Change your logo from here   ============ -->
                    <img src="../assets/images/logo-white.svg" alt="logo image" class="logo-lg">
                </a>
            </div>
            <div class="navbar-content">
                <ul class="pc-navbar">
                    <li class="pc-item pc-caption">
                        <label>Admin</label>
                    </li>
                    <li class="pc-item">
                        <a href="/dashboard" class="pc-link"><span class="pc-micon">
                                <i class="ph ph-compass-tool"></i></span><span class="pc-mtext">Dashboard
                                Admin</span></a>
                    </li>
                    <li class="pc-item">
                        <a href="/motoristas" class="pc-link"><span class="pc-micon">
                                <i class="ph ph-gauge"></i></span><span class="pc-mtext">Motoristas</span></a>
                    </li>
                    <li class="pc-item">
                        <a href="/financeiro" class="pc-link"><span class="pc-micon">
                                <i class="ph ph-currency-dollar"></i></span><span class="pc-mtext">Financeiro</span></a>
                    </li>


                    <!-- <li class="pc-item pc-caption">
                        <label>UI Components</label>
                        <i class="ph ph-compass-tool"></i>
                    </li>
                    <li class="pc-item">
                        <a href="../elements/bc_typography.html" class="pc-link">
                            <span class="pc-micon"><i class="ph ph-text-aa"></i></span>
                            <span class="pc-mtext">Typography</span>
                        </a>
                    </li>
                    <li class="pc-item">
                        <a href="../elements/bc_color.html" class="pc-link">
                            <span class="pc-micon"><i class="ph ph-palette"></i></span>
                            <span class="pc-mtext">Color</span>
                        </a>
                    </li>
                    <li class="pc-item">
                        <a href="../elements/icon-feather.html" class="pc-link">
                            <span class="pc-micon"><i class="ph ph-flower-lotus"></i></span>
                            <span class="pc-mtext">Icons</span>
                        </a>
                    </li>


                    <li class="pc-item pc-caption">
                        <label>Pages</label>
                        <i class="ph ph-devices"></i>
                    </li>
                    <li class="pc-item">
                        <a href="../pages/login-v1.html" class="pc-link">
                            <span class="pc-micon"><i class="ph ph-lock"></i></span>
                            <span class="pc-mtext">Login</span>
                        </a>
                    </li>
                    <li class="pc-item">
                        <a href="../pages/register-v1.html" class="pc-link">
                            <span class="pc-micon"><i class="ph ph-user-circle-plus"></i></span>
                            <span class="pc-mtext">Register</span>
                        </a>
                    </li>
                    <li class="pc-item pc-caption">
                        <label>Other</label>
                        <i class="ph ph-suitcase"></i>
                    </li>
                    <li class="pc-item pc-hasmenu">
                        <a href="#!" class="pc-link"><span class="pc-micon">
                                <i class="ph ph-tree-structure"></i> </span><span class="pc-mtext">Menu
                                levels</span><span class="pc-arrow"><i data-feather="chevron-right"></i></span></a>
                        <ul class="pc-submenu">
                            <li class="pc-item"><a class="pc-link" href="#!">Level 2.1</a></li>
                            <li class="pc-item pc-hasmenu">
                                <a href="#!" class="pc-link">Level 2.2<span class="pc-arrow"><i
                                            data-feather="chevron-right"></i></span></a>
                                <ul class="pc-submenu">
                                    <li class="pc-item"><a class="pc-link" href="#!">Level 3.1</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#!">Level 3.2</a></li>
                                    <li class="pc-item pc-hasmenu">
                                        <a href="#!" class="pc-link">Level 3.3<span class="pc-arrow"><i
                                                    data-feather="chevron-right"></i></span></a>
                                        <ul class="pc-submenu">
                                            <li class="pc-item"><a class="pc-link" href="#!">Level 4.1</a></li>
                                            <li class="pc-item"><a class="pc-link" href="#!">Level 4.2</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="pc-item pc-hasmenu">
                                <a href="#!" class="pc-link">Level 2.3<span class="pc-arrow"><i
                                            data-feather="chevron-right"></i></span></a>
                                <ul class="pc-submenu">
                                    <li class="pc-item"><a class="pc-link" href="#!">Level 3.1</a></li>
                                    <li class="pc-item"><a class="pc-link" href="#!">Level 3.2</a></li>
                                    <li class="pc-item pc-hasmenu">
                                        <a href="#!" class="pc-link">Level 3.3<span class="pc-arrow"><i
                                                    data-feather="chevron-right"></i></span></a>
                                        <ul class="pc-submenu">
                                            <li class="pc-item"><a class="pc-link" href="#!">Level 4.1</a></li>
                                            <li class="pc-item"><a class="pc-link" href="#!">Level 4.2</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="pc-item"><a href="../other/sample-page.html" class="pc-link">
                            <span class="pc-micon">
                                <i class="ph ph-desktop"></i>
                            </span>
                            <span class="pc-mtext">Sample page</span></a></li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
export default {
    name: "Sidebar",
    props: {
        isCollapsed: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            token: localStorage.getItem("token")
        }
    },
    mounted() {
        if (!this.token) {
            window.location.href = "/"
        }
    },
}
</script>

<style scoped>
.pc-sidebar {
    width: 250px;
    transition: width 0.3s ease;
}

.pc-sidebar.collapsed {
    width: 0;
    overflow: hidden;
}

a {
    text-decoration: none;
}
</style>