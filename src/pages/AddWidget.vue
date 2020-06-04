<template>
  <div>
  <div class="row">
    <div class="col-md-2">
      <add-widget-list :widgetList="widgetList">
      </add-widget-list>
    </div>

      <div class="col-lg-6 col-md-1">
        <card type="tasks">

            <h1 v-bind:class="display-3">Widgets</h1>
            <div class="row">
          <div class="col-md-3" v-for="produit in produits">
            <p class="jumbotorn">{{produit}} <br>
              <base-dropdown menu-on-right=""
                             tag="div"
                             title-classes="btn btn-link btn-icon"
                             aria-label="Settings menu">
                <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                <a class="dropdown-item" href="http://localhost:8081/dashboard">Ajouter</a>
              </base-dropdown>
            </p>
          </div>
            </div>
        </card>
      </div>
  </div>

  </div>

</template>
<script>
  import WidgetList from './AddWidget/WidgetList';
  import WidgetPreview from './Profile/UserCard';

  export default {
    components: {
      WidgetList,
      WidgetPreview
    },
    data() {
      return {
        widgetList: {},
        produits: ["Horoscope", "Météo","Transports","Bitcoin","Pokémon","Suivi de colis","Gif du jour","Day streak","classement de foot","Horloge Mondiale","citation du jour"],
        widgetPreview: {}
      }
    },
    props: ['nom'],
    methods: {
      sélectionner: function (produit) {
        this.produits.push(produit);
      }
    }
  }
</script>
<style>
</style>
