import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import User from '@/user';

// GeneralViews
const NotFound = () => import(/* webpackChunkName: "dashboard" */"@/pages/NotFoundPage.vue");

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Dashboard2 = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard-old.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const AddWidget = () => import(/* webpackChunkName: "common" */ "@/pages/AddWidget.vue");
const LogIn = () => import(/* webpackChunkName: "common" */"@/pages/Login.vue");
const LogOut = () => import(/* webpackChunkName: "common" */"@/pages/Logout.vue");
const SignIn = () => import(/* webpackChunkName: "common" */"@/pages/SignIn.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const WidgetTest = () => import(/* webpackChunkName: "common" */ "@/pages/WidgetTest.vue");

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
                path: "dashboard2",
                name: "dashboard2",
                component: Dashboard2,
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
                path: "sign-in",
                name: "sign-in",
                component: SignIn,
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
                path: "notifications",
                name: "notifications",
                component: Notifications
            },
            {
                path: "widgettest",
                name: "widgettest",
                component: WidgetTest
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