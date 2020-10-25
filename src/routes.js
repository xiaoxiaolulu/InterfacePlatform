import VueRouter from "vue-router"
import Vue from "vue"
import Login from "./components/Login"
import Frame from "./components/Frame"
import Index from "./components/Index"
import auth from "./utils/auth"
import ProjectList from "./components/Project/ProjectList"
import ProjectDetail from "./components/Project/ProjectDetail"
import Settings from "./components/Settings"


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: "/",
        component: Frame,
        children: [
            {
                path: "",
                component: Index,
                name: "index"
            },
            {
                path: "project",
                component: ProjectList,
                name: "project_list"
            },
            {
                path: "project/:project_id",
                component: ProjectDetail,
                name: "project_detail"
            },
            {
                path: "/settings",
                component: Settings,
                name: "settings"
            }
        ]
    }, {
        path: "/login",
        component: Login,
        name: "login"
    }]
})

router.beforeEach((to, from, next) => {
    if (to.name != 'login' && !auth.is_authed) {
        next({
            name: "login"
        })
    } else {
        next()
    }
})

export default router