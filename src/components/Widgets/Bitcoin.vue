<template>
    <div>
        <line-chart
                :chart-data="purpleLineChart.chartData"
                :gradient-color="purpleLineChart.gradientColors"
                :gradient-stops="purpleLineChart.gradientStops"
                :extra-options="purpleLineChart.extraOptions"
                :height="150">
        </line-chart>
    </div>
</template>

<script>
    import LineChart from '../Charts/LineChart.js' //On laisse ?
    export default {
        name: "bitcoin",
        components:{
            LineChart,
        },
        data(){
            return{
                entiers:[0, 1, 2, 3, 4, 5],
                valeurs:[],
                k:0,
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
                            label: "Cours BTC",
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
            call: function(){
                fetch('/api/widget/bitcoins/getcours', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function(data){
                    this.valeurs.clear();
                    do{
                        this.valeurs.push(data.k);
                        this.k++;
                    }while(k<7);
                    this.k=0;
                })

            this.purpleLineChart.chartData = {labels:[], datasets:[{label: "Cours BTC",
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
                    data: this.valeurs,
                }]}
            },
        },
        mounted(){
            this.call()
        },
    }
</script>

<style scoped>

</style>