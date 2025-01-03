import { createRouter, createWebHistory } from "vue-router";
import Login from "../screens/auth/loginView.vue";
import RegisterView from "@/screens/auth/registerView.vue";
import RecoveryView from "@/screens/auth/recoveryView.vue";
import MainView from "@/screens/admin/mainView.vue";
import DriverView from "@/screens/admin/DriverView.vue";
import TarifasView from "@/screens/admin/TarifasView.vue";
import PerfilView from "@/screens/admin/PerfilView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: RegisterView,
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: RecoveryView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: MainView,
  },
  {
    path: "/motoristas",
    name: "Motoristas",
    component: DriverView,
  },
  {
    path: "/financeiro",
    name: "financeiro",
    component: TarifasView,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: PerfilView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
