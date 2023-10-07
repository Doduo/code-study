import { createApp } from "vue";
import App from './App';
import router  from "./router";


createApp(App).use(router).mount(document.getElementById("app"));

// 全局注册
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'

// createApp(App).use(router).use(ElementPlus).mount(document.getElementById("app"));