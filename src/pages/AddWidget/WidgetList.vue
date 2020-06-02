<template>
  ` <div class="col-md-4">
  <p class="jumbotorn">{{nom}} <br>
    <button v-on:click="valider(nom)" v-if="role=='sélection'">Sélectionner</button>
  </p>
</div>
  `
  ,
    <base-table :data="tableData"
                thead-classes="text-primary">
      <template slot-scope="{row}">
        <td>
          <base-checkbox v-model="row.done">
          </base-checkbox>
        </td>
        <td>
          <p class="title">{{row.title}}</p>
          <p class="text-muted">{{row.description}}</p>
        </td>
        <td class="td-actions text-right">
          <base-button type="link" aria-label="edit button">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </td>
      </template>
    </base-table>
</template>
<script>
  import {BaseTable} from '@/components'
  export default {
    components: {
      BaseTable
    },
    computed: {
      tableData() {
        return this.$t('dashboard.taskList');
      }
    }
  }
  Vue.component('fiche-produit',{
    props:['nom','role'],
    methods:{
      valider: function (produit) {
        this.$emit('validation',produit)
      }
    }
  })
  var app = new Vue({
    el: "#app",

    data:  {
      user: "sheila",
      produits: ["horoscope","Météo","DayStreak"],
      interfaces: [],
      affichage:"display-1"
    },
    methods:{
      sélectionner: function (produit) {
        this.interfaces.push(produit);
      }
    }
  })
</script>
<style>
</style>
