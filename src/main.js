import {createRouter, createWebHistory} from 'vue-router';
import { createApp } from 'vue'
import './assets/Fonts.css';
import App from './App.vue'
import Start from "@/components/Start.vue";
import System from "@/components/System.vue";
import NonlinearMethods from "@/components/NonlinearMethods.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: 'start', component: Start},
        {path: "/system", name: 'system', component: System},
        {path:"/nonlinear", name: "nonlinear-methods", component: NonlinearMethods}
    ]
})

createApp(App).use(router).mount('#app')
