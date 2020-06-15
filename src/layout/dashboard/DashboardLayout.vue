<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <!-- Utilisateur connecté -->
                <div v-if="isConnected">
                    <sidebar-link to="/dashboard" name="Dashboard" icon="tim-icons icon-chart-pie-36"/>
                    <sidebar-link to="/add-widget" name="Ajouter un widget" icon="tim-icons icon-simple-add"/>
                    <sidebar-link to="/profile" name="Profil" icon="tim-icons icon-single-02"/>
                    <sidebar-link to="/logout" name="Déconnexion" icon="tim-icons icon-button-power"/>
                </div>
                <!-- Utilisateur non connecté -->
                <div v-else>
                    <sidebar-link to="/login" name="Connexion" icon="tim-icons icon-badge"/>
                    <sidebar-link to="/register" name="Inscription" icon="tim-icons icon-badge"/>
                </div>
            </template>
        </side-bar>
        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content @click.native="toggleSidebar">

            </dashboard-content>

            <content-footer></content-footer>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
    import TopNavbar from "./TopNavbar.vue";
    import ContentFooter from "./ContentFooter.vue";
    import DashboardContent from "./Content.vue";
    import MobileMenu from "./MobileMenu";
    import User from '@/user';

    export default {
        data(){
            return{
                isConnected:User.user.tempConnected
            }
        },
        components: {
            TopNavbar,
            ContentFooter,
            DashboardContent,
            MobileMenu
        },
        methods: {
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            },
            checkConnected: function () {
                User.isConnected().then((result) => {
                    this.isConnected = result
                })
            }
        },
        mounted(){
            this.checkConnected()
        }
    };
</script>