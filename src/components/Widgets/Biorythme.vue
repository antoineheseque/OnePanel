<template>
    <div>
        <div v-if="haveBirthdayDate">
            <line-chart ref="bigChart"
                        chart-id="big-line-chart"
                    :chart-data="chart.chartData"
                    :gradient-color="chart.gradientColors"
                    :gradient-stops="chart.gradientStops"
                        :extra-options="chart.extraOptions"
                    height="160%">
            </line-chart>
            <p class="text-center"> Vous vivez depuis {{getYearsInDays()}} jours</p>
        </div>
        <p v-else>Vous devez entrer votre date de naissance dans la page Profil.</p>

    </div>
</template>

<script>
    import LineChart from '../Charts/LineChart.js'
    import User from '@/user';
    import config from "@/config";
    import * as chartConfigs from "@/components/Charts/config";

    export default {
        name: "Biorythme",
        components: {
            LineChart
        },
        data(){
            return {
                birthdayDate: new Date(User.profile.birthdayDate),
                haveBirthdayDate:true,
                dateArray:[],
                physicalDataArray:[],
                emotionalDataArray:[],
                intellectualDataArray:[],
                chart: {
                    gradientStops:[ 1, 0.4, 0 ],
                    gradientColors:	config.colors.primaryGradient,
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: [],
                        datasets: [{
                            label: "Forme physique",
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
                            data: [],
                        }]
                    }
                }
            }
        },
        methods:{
            getData(){ //Modifie le graphique
                this.haveBirthdayDate = !(User.profile.birthdayDate == null || User.profile.birthdayDate == undefined)

                if (this.haveBirthdayDate) {
                    var date = new Date()
                    for(var i = -15; i <= 15;i++){
                        this.physicalDataArray.push((this.getPhysicalState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.emotionalDataArray.push((this.getEmotionalState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.intellectualDataArray.push((this.getIntellectualState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.dateArray.push(this.getDateWithDays(date.getTime()+i*86400000))
                    }
                    this.chart.chartData = {
                        labels: this.dateArray,
                        datasets: [{
                            label: "Forme physique",
                            fill: true,
                            borderColor: '#d048b6',
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: '#d048b6',
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: '#d048b6',
                            pointBorderWidth: 6,
                            pointHoverRadius: 8,
                            pointHoverBorderWidth: 6,
                            pointRadius: 4,
                            data: this.physicalDataArray,
                        },
                            {
                                label: "Forme émotionnelle",
                                fill: true,
                                borderColor: '#f8ec15',
                                borderWidth: 2,
                                borderDash: [],
                                borderDashOffset: 0.0,
                                pointBackgroundColor: '#f8ec15',
                                pointBorderColor: 'rgba(255,255,255,0)',
                                pointHoverBackgroundColor: '#f8ec15',
                                pointBorderWidth: 6,
                                pointHoverRadius: 8,
                                pointHoverBorderWidth: 6,
                                pointRadius: 4,
                                data: this.emotionalDataArray,
                            },
                            {
                                label: "Forme intellectuelle",
                                fill: true,
                                borderColor: '#26c151',
                                borderWidth: 2,
                                borderDash: [],
                                borderDashOffset: 0.0,
                                pointBackgroundColor: '#26c151',
                                pointBorderColor: 'rgba(57,177,31,0)',
                                pointHoverBackgroundColor: '#26c151',
                                pointBorderWidth: 6,
                                pointHoverRadius: 8,
                                pointHoverBorderWidth: 6,
                                pointRadius: 4,
                                data: this.intellectualDataArray,
                            }]
                    }
                }
            },
            getDateWithDays: function(time){ //Recupère la date sous forme day/month pour le graphique
                var date = new Date()
                date.setTime(time)
                return date.getDate() + '/' + (date.getMonth()+1)
            },
            getYearsInDays: function () { //Recupère le nombre de jour depuis la naissance de l'utilisateur
                var date = new Date()
                return Math.round((date.getTime()-this.birthdayDate.getTime())/86400000)
            },
            getPhysicalState: function (t) { //Calcul l'état Physique
                return Math.sin((2*Math.PI*parseInt(t, 10))/23)
            },
            getEmotionalState: function (t) { //Calcul l'état Emotionnel
                return Math.sin((2*Math.PI*parseInt(t,10))/28)
            },
            getIntellectualState: function (t) { //Calcul l'état Intellectuel
                return Math.sin((2*Math.PI*parseInt(t,10))/32)
            }
        },
        mounted() {
            this.getData()
        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>

<style scoped>

</style>