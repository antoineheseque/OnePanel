<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <widget-list :widgetList="widgetList"></widget-list>
      </div>
    </div>
  </div>

</template>
<script>
  import widgetsList from '../widgetsList.json';
  import WidgetList from './AddWidget/WidgetList';

  export default {
    components: {
      WidgetList,
    },
    data() {
      return {
        widgetList:widgetsList.widgets
      }
    },
    methods: {
        /*onClickSupprime: function () {
            this.isLogging = true

            //this.notify('info', 'Connexion en cours.')
            User.login(this.login).then((result) => {
                console.log(result)

                if(result.logged === true){ // Si l'utilisateur à pu être connecté
                    this.notify('info', `Widget ajouté avec succès.`)
                    router.push('dashboard')
                }
                else{
                    this.login.password = ""
                    this.notify('danger', result.reason)
                }
                this.isLogging = false
            });
        },
        notify: function(info,message){
            this.$notify({
                component: NotificationTemplate,
                icon: "tim-icons icon-bell-55",
                horizontalAlign: "right",
                verticalAlign: "top",
                type: info,
                timeout: 2000,
                message: message
            })
        },
        onClickAjout: function () {
            this.isLogging = true

            //this.notify('info', 'Connexion en cours.')
            User.login(this.login).then((result) => {
                console.log(result)

                if(result.logged === true){ // Si l'utilisateur à pu être connecté
                    this.notify('info', `Widget ajouté avec succès.`)
                    router.push('dashboard')
                }
                else{
                    this.login.password = ""
                    this.notify('danger', result.reason)
                }
                this.isLogging = false
            });
        }*/
    }
  }
</script>
<style>
</style>
