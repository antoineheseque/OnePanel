const axios = require('axios');

export default {
    user: {
        isConnected: false
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

    isConnected: function(){
        //récupérer le token des cookies

        const recup_token = this.getCookie('cookie_token');
        console.log("\nrecupération du token")
        console.log(recup_token);

        // exemple recup_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTU5MTI3NDA4NCwiZXhwIjoxNTkxMjc0MTE0fQ.sY1vEXRldRrXFj7cFXpQqQJ9VrPyAOgI0QZTW8471So

        if(recup_token === ""){
            return false
        }else{
            fetch('api/user/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recup_token),
                credentials: 'include'
            }).then(function (res) {
                return res.json();
            }).then(function (result) {
                console.log("\nLE RESULT")
                console.log(result)
                return result.isVerified
            });
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
                    this.user.isConnected = data.logged
                    // Enregistrer les données reçues via la BDD
                    this.profile = data

                    //TODO: AJOUTER LE TOKEN AUX COOKIES (cookie.add(data.token)) CLIENT

                    this.setCookie("cookie_token", data.token, 1);
                    console.log("\ncookie ajouté")
                }

                r(data)
            }.bind(this))
        });
    },

    // LOG OUT FUNCTION
    logout: function(){
        //TODO: Virer le token des cookies ? CLIENT

        function removeCookie(cname) {
            document.cookie = cname + "=" + this.getCookie(cname) + ";" + "18 Dec 1950 12:00:00 UTC";
        }
        removeCookie("cookie_token");
        this.user.isConnected = false // temporaire
        console.log("token bien supprimé")
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
    },
    getCookie: function(cname) {
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
    },
    setCookie: function(cname, cvalue, exhours) {
        var d = new Date();
        d.setTime(d.getTime() + (exhours*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    }
}


