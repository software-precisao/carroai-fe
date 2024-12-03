import { createApp } from "vue";
import "../src/assets/css/reset.css";
import "../src/assets/css/style.css";
import App from "./App.vue";
import router from "./router"; // Importa o Vue Router
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);

app.use(router); // Registra o Vue Router na aplicação
app.mount("#app");
