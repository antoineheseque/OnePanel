import VueRouter from "vue-router";
import routes from "./routes";
import User from "@/user";

// configure router
const router = new VueRouter({
    mode: 'history',
    routes, // short for routes: routes
    linkExactActiveClass: "active",
    scrollBehavior: (to) => {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    }
});

router.beforeEach((to, from, next) => {
    console.log("Vérif route")
    // Si la prochaine route nécessite un accès connecté
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("Match RequireAuth")
        User.isConnected().then((isConnected) => {
            if (!isConnected) {
                next({path: 'login'});
            } else {
                next();
            }
        });
    }
    // Si la prochaine route nécessite un accès non connecté
    else if (to.matched.some(record => record.meta.requiresNotAuth)) {
        console.log("Match RequireNotAuth")
        User.isConnected().then((isConnected) => {
            if (isConnected) {
                next({path: 'dashboard'});
            } else {
                next();
            }
        });
    } else {
        console.log("Match None")
        next();
    }
});
export default router;
