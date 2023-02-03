import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/GenPassword/dist/',
        component: Main
    },
    {
        path: '/GenPassword/dist/:pathMatch(.*)*',
        component: Main
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
    }
)

export default router;