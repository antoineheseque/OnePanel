<template>
    <div>
        <div v-if="haveBirthdayDate">
            <line-chart
                    :chart-data="purpleLineChart.chartData"
                    :gradient-color="purpleLineChart.gradientColors"
                    :gradient-stops="purpleLineChart.gradientStops"
                    :extra-options="purpleLineChart.extraOptions"
                    :height="150">
            </line-chart>
            <p class="text-center"> Vous vivez depuis {{getYearsInDays()}} jours</p>
        </div>
        <p v-else>Vous devez entrer votre date de naissance dans la page Profil.</p>

    </div>
</template>

<script>
    import LineChart from '../Charts/LineChart.js'
    import User from '@/user';

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
                purpleLineChart: {
                    gradientStops:[ 1, 0.4, 0 ],
                    gradientColors:	[ 'rgba(72,72,176,0.2)', 'rgba(72,72,176,0.0)', 'rgba(119,52,169,0)' ],
                    extraOptions: {
                        maintainAspectRatio: true,
                        legend: {
                            display: false
                        },
                        responsive: true,
                        tooltips: {
                            backgroundColor: '#f5f5f5',
                            titleFontColor: '#333',
                            bodyFontColor: '#666',
                            bodySpacing: 4,
                            xPadding: 12,
                            mode: "nearest",
                            intersect: 0,
                            position: "nearest"
                        },
                        scales: {
                            yAxes: [{
                                barPercentage: 0,
                                gridLines: {
                                    drawBorder: false,
                                    color: 'rgba(29,140,248,0.0)',
                                    zeroLineColor: "transparent",
                                },
                                ticks: {
                                    suggestedMin: 50,
                                    suggestedMax: 110,
                                    padding: 0,
                                    fontColor: "#ff8a76"
                                }
                            }],

                            xAxes: [{
                                barPercentage: 1.6,
                                gridLines: {
                                    drawBorder: false,
                                    color: 'rgba(220,53,69,0.1)',
                                    zeroLineColor: "transparent",
                                },
                                ticks: {
                                    padding: 20,
                                    fontColor: "#ff8a76"
                                }
                            }]
                        }


                    },
                    chartData: {
                        labels: [],
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
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [],
                        }]
                    }
                }
            }
        },
        methods:{
            getData(){
                this.haveBirthdayDate = !(User.profile.birthdayDate == null || User.profile.birthdayDate == undefined)

                if (this.haveBirthdayDate) {
                    var date = new Date()
                    for(var i = -15; i <= 15;i++){
                        this.physicalDataArray.push((this.getPhysicalState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.emotionalDataArray.push((this.getEmotionalState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.intellectualDataArray.push((this.getIntellectualState((this.getYearsInDays()+i))*100).toFixed(2))
                        this.dateArray.push(this.getDateWithDays(date.getTime()+i*86400000))
                    }
                    this.purpleLineChart.chartData = {
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
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
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
                                pointBorderWidth: 20,
                                pointHoverRadius: 4,
                                pointHoverBorderWidth: 15,
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
                                pointBorderWidth: 20,
                                pointHoverRadius: 4,
                                pointHoverBorderWidth: 15,
                                pointRadius: 4,
                                data: this.intellectualDataArray,
                            }]
                    }
                }
            },
            getDateWithDays: function(time){
                var date = new Date()
                date.setTime(time)
                return date.getDate() + '/' + (date.getMonth()+1)
            },
            getYearsInDays: function () {
                var date = new Date()
                return Math.round((date.getTime()-this.birthdayDate.getTime())/86400000)
            },
            getPhysicalState: function (t) {
                return Math.sin((2*Math.PI*parseInt(t, 10))/23)
            },
            getEmotionalState: function (t) {
                return Math.sin((2*Math.PI*parseInt(t,10))/28)
            },
            getIntellectualState: function (t) {
                return Math.sin((2*Math.PI*parseInt(t,10))/32)
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>