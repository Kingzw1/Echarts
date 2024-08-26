import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/tolerant.scss";
import "../public/static/theme/chalk";
// 引入字体文件
import "./assets/font/iconfont.css";
createApp(App).use(store).use(router).mount("#app");
