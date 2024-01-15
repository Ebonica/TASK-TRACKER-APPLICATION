// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Check for JWT token in localStorage
const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  // Set the user as authenticated (you may have a Vuex store for this)
  // For simplicity, let's assume a global variable isAuthenticated
  app.config.globalProperties.isAuthenticated = true;
}

createApp(App).use(router).mount("#app");
