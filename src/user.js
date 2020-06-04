const axios = require('axios');

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (minutes*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function removeCookie(cname){
    document.cookie = cname + "=" + getCookie(cname) + ";expires=" + "18 Dec 1950 12:00:00 UTC";
}

export default {
    user:{
        tempConnected:false
    },
    profile: {
            id: '',
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            birthdayDate: '',
            registerDate: '',
            address: '',
            city: '',
            country: ''
    },
    isConnected: async function(){
        const token = getCookie('token');

        if(token === ""){
            return false
        } else {
            const res = await fetch('api/user/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"token":token}),
                credentials: 'include'
            })
            let result = await res.json()

            if(result.isVerified == "true") {
                this.user.tempConnected = true
                return true
            }
            else{
                this.user.tempConnected = false
                removeCookie("token");
                return false
            }
        }
    },
    onClickEditProfile: function (data) {
        return new Promise((r) => {
            fetch('/api/user/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                return res.json();
            }).then(function (result) {
                if(result.updated){ // Si données envoyées on enregistre en local
                    this.profile = result
                }
                r(result)
            }.bind(this))
        });
    },

    // LOGIN FUNCTION
    login: function(loginData){
        return new Promise((r) => {
            fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if(data.logged){
                    // Enregistrer les données reçues via la BDD
                    setCookie("token", data.token, 5);
                    data.token = ""
                    data.password = ""
                    this.profile = data

                    console.log("\ncookie ajouté")
                }

                r(data)
            }.bind(this))
        });
    },

    // LOG OUT FUNCTION
    logout: function(){
        removeCookie("token");
    },

    // SIGN IN FUNCTION
    signIn: function(signInData){
        return new Promise((r) => {
            fetch('/api/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signInData)
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                r(data)
            })
        });
    }
}


