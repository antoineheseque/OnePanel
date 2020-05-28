<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <!--TODO: Optimiser avec v-if et v-else-->
                <!-- Utilisateur connecté -->
                <sidebar-link to="/dashboard" v-if="isConnected" name="Dashboard" icon="tim-icons icon-chart-pie-36"/>
                <sidebar-link to="/add-widget" v-if="isConnected" name="Ajouter un widget" icon="tim-icons icon-simple-add"/>
                <sidebar-link to="/profile" v-if="isConnected" name="Profil" icon="tim-icons icon-single-02"/>
                <sidebar-link to="/logout" v-if="isConnected" name="Déconnexion" icon="tim-icons icon-button-power"/>

                <!-- Utilisateur non connecté -->
                <sidebar-link to="/login" v-if="!isConnected" name="Connexion" icon="tim-icons icon-badge"/>
                <sidebar-link to="/sign-in" v-if="!isConnected" name="Inscription" icon="tim-icons icon-badge"/>

                <!--<sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom"/>
                <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin"/>
                <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55"/>
                <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/>
                <<sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/>-->
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
            }
        },
        computed: {
            isConnected: function(){
                return User.isConnected();
            }
        }
    };
</script>