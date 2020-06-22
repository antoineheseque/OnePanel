import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import User from '@/user';

// GeneralViews
const NotFound = () => import(/* webpackChunkName: "dashboard" */"@/pages/NotFoundPage.vue");

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const AddWidget = () => import(/* webpackChunkName: "common" */ "@/pages/AddWidget.vue");
const LogIn = () => import(/* webpackChunkName: "common" */"@/pages/Login.vue");
const LogOut = () => import(/* webpackChunkName: "common" */"@/pages/Logout.vue");
const Register = () => import(/* webpackChunkName: "common" */"@/pages/Register.vue");

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        children: [
            {
                path: "",
                name: "login",
                redirect: !User.isConnected() ? "/login" : "/dashboard"
            },
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "profile",
                name: "profile",
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "add-widget",
                name: "add-widget",
                component: AddWidget,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "login",
                name: "login",
                component: LogIn,
                meta: {
                    requiresNotAuth: true
                }
            },
            {
                path: "register",
                name: "register",
                component: Register,
                meta: {
                    requiresNotAuth: true
                }
            },
            {
                path: "logout",
                name: "logout",
                component: LogOut,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "*",
                name: "Error",
                component: NotFound
            }
        ]
    }
];

export default routes;