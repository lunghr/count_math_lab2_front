import {createRouter, createWebHistory} from 'vue-router';
import { createApp } from 'vue'
import './assets/Fonts.css';
import App from './App.vue'
import Start from "@/components/Start.vue";
import Next from "@/components/System.vue";
import NonlinearMethods from "@/components/NonlinearMethods.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: 'start', component: Start},
        {path: "/next", name: 'next', component: Next},
        {path:"/nonlinear", name: "nonlinear-methods", component: NonlinearMethods}
    ]
})

createApp(App).use(router).mount('#app')
