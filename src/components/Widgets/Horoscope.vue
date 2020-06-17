<template>
    <div class="horoscope">
        <div v-if="!haveBirthdayDate">
            <p>Vous devez entrer votre date de naissance dans la page Profil.</p>
        </div>
        <div v-else>
            <p class="m-2 text-justify">
                <i class="tim-icons icon-heart-2"></i><b class="font-weight-bold"> Amour :</b> {{data.message.love}}
            </p>
            <p class="m-2 text-justify">
                <i class="tim-icons icon-sound-wave"></i><b class="font-weight-bold"> Santé :</b> {{data.message.work}}
            </p>
            <p class="m-2 text-justify">
                <i class="tim-icons icon-wallet-43"></i><b class="font-weight-bold"> Travail :</b> {{data.message.health}}
            </p>
        </div>
    </div>
</template>


<script>
    const axios = require('axios');
    import User from '@/user';

    export default {
        name: "Horoscope",
        data(){
            return {
                dateOfToday: new Date(),
                haveBirthdayDate:true,
                data:{
                    astrologicalSign:'',
                    message:{
                        love:'',
                        work:'',
                        health:''
                    }
                }
            }
        },
        mounted() {
            this.haveBirthdayDate = !(User.profile.birthdayDate == null || User.profile.birthdayDate == undefined)

            if (this.haveBirthdayDate) {
                this.data.astrologicalSign = getAstrologicalSign()
                getSentences(this.data.astrologicalSign).then((res) => {
                    this.data.message = JSON.parse(res)
                    this.$emit('setHoroscope', this.data.astrologicalSign + " du " + this.dateOfToday.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }))
                })
            }
        }
    }

    function getSentences(sign){
        return new Promise((r) => {
            axios.post('/api/widget/horoscope/getHoroscope',{
                data:sign
            }).then(function(res) {
                r(res.data.horoscope)
            })
        });
    }

    function getAstrologicalSign() {
        let birthDate = new Date(User.profile.birthdayDate)
        var month = birthDate.getMonth()+1;
        var day = birthDate.getDate()+1;
        let sign = ''

        if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) { //30
            sign = 'Verseau'
        } else if ((month == 2 && day >= 20) || (month == 3 && day <= 20)) { //30
            sign = 'Poissons'
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) { //31
            sign = 'Bélier'
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 21)) { //
            sign = 'Taureau'
        } else if ((month == 5 && day >= 22) || (month == 6 && day <= 21)) {
            sign = 'Gémeaux'
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            sign = 'Cancer'
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            sign = 'Lion'
        } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            sign = 'Vierge'
        } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            sign = 'Balance'
        } else if ((month == 10 && day >= 23) || (month == 11 && day <= 22)) {
            sign = 'Scorpion'
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            sign = 'Sagittaire'
        } else if ((month == 12 && day >= 22) || (month == 1 && day <= 20)) {
            sign = 'Capricorne'
        }

        getSentences(sign);
        return sign
    }
</script>