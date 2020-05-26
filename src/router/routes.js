import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import User from '@/user';

// GeneralViews
const NotFound = () => import(/* webpackChunkName: "dashboard" */"@/pages/NotFoundPage.vue");

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const AddWidget = () => import(/* webpackChunkName: "common" */ "@/pages/AddWidget.vue");
const LogIn = () => import(/* webpackChunkName: "dashboard" */"@/pages/Login.vue");
const LogOut = () => import(/* webpackChunkName: "dashboard" */"@/pages/Logout.vue");
const SignIn = () => import(/* webpackChunkName: "dashboard" */"@/pages/SignIn.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        redirect: User.isConnected() ? "/dashboard" : "/login",
        children: [
            {
                path: "",
                name: "dashboard",
                component: Dashboard
            },
            {
                path: "dashboard",
                name: "dashboard",
                get redirect() { if(!User.isConnected()) return "login"; },
                get component() { if(User.isConnected()) return Dashboard; }
            },
            {
                path: "profile",
                name: "profile",
                get redirect() { if(!User.isConnected()) return "login"; },
                get component() { if(User.isConnected()) return Profile; }
            },
            {
                path: "add-widget",
                name: "add-widget",
                get redirect() { if(!User.isConnected()) return "login"; },
                get component() { if(User.isConnected()) return AddWidget; }
            },
            {
                path: "login",
                name: "login",
                get redirect() { if(User.isConnected()) return "dashboard"; },
                get component() { if(!User.isConnected()) return LogIn; }
            },
            {
                path: "sign-in",
                name: "sign-in",
                get redirect() { if(User.isConnected()) return "dashboard"; },
                get component() { if(!User.isConnected()) return SignIn; }
            },
            {
                path: "logout",
                name: "logout",
                get redirect() { if(!User.isConnected()) return "login"; },
                get component() { if(User.isConnected()) return LogOut; }
            },
            {
                path: "notifications",
                name: "notifications",
                component: Notifications
            },
            {
                path: "icons",
                name: "icons",
                component: Icons
            },
            {
                path: "maps",
                name: "maps",
                component: Maps
            },
            {
                path: "typography",
                name: "typography",
                component: Typography
            },
            {
                path: "table-list",
                name: "table-list",
                component: TableList
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