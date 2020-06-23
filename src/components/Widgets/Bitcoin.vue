<template>
    <div class="locked">
        <div class="btn-group btn-group-toggle float-right"
             data-toggle="buttons">
            <label v-for="(option, index) in categories"
                   :key="option"
                   class="btn btn-sm btn-primary btn-simple"
                   :class="{active: chart.activeIndex === index}"
                   :id="index">
                <input type="radio"
                       @click="initData(index)"
                       name="options" autocomplete="off"
                       :checked="chart.activeIndex === index">
                {{option}}
            </label>
        </div>
        <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="chart.chartData"
                        :gradient-colors="chart.gradientColors"
                        :gradient-stops="chart.gradientStops"
                        :extra-options="chart.extraOptions">
            </line-chart>
        </div>
    </div>
</template>

<script>
    var bitcoin = require('../../assets/json/bitcoin.json')

    import LineChart from '../Charts/LineChart.js'
    import * as chartConfigs from "@/components/Charts/config";
    import config from "@/config";

    export default {
        name: "bitcoin",
        components:{
            LineChart,
        },
        data(){
            return{
                chart: {
                    activeIndex: 0,
                    chartData: null,
                    extraOptions: chartConfigs.purpleChartOptions,
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.4, 0],
                    categories: []
                },
                categories:["7 jours", "1 mois", "3 mois"]
            }
        },
        methods:{
            getChartOptions(index){ //Change les options
                let options = chartConfigs.purpleChartOptions
                options.scales.yAxes[0].ticks.suggestedMin = bitcoin.content[index].min
                options.scales.yAxes[0].ticks.suggestedMax = bitcoin.content[index].max
                return options
            },
            initData(index) { //Initialise les valeurs
                let chartData = {
                    datasets: [{
                        fill: true,
                        borderColor: config.colors.primary,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: config.colors.primary,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: config.colors.primary,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 3,
                        data: bitcoin.content[index].data
                    }],
                    labels:bitcoin.content[index].labels,
                }
                this.$refs.bigChart.updateGradients(chartData);
                this.chart.chartData = chartData;
                this.chart.extraOptions = this.getChartOptions(index)
                this.chart.activeIndex = index;
            }
        },
        mounted(){
            fetch('/api/widget/bitcoin/getData', { //Récupère les données
                method: 'POST'
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                bitcoin.content = JSON.parse(data.values)
                this.initData(0);
            }.bind(this))
        },
        updated(){
            this.$redrawVueMasonry()
        }
    }
</script>
<style scoped>
    .chart-area{
        height: 20em;
        padding-bottom: 1.5em;
    }
</style>