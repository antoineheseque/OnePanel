import router from "@/router";

export default {
    user: {
        isConnected: false
    },
    profile: {
        company: '',
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        description: ''
    },
    isConnected: function(){ //TODO: RETOURNER LA VARIABLE SI UTILISATEUR CONNECTE
        return this.user.isConnected;
    },
    onClickEditProfile: function () {
        fetch('/api/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.profile)
        }).then(function(res){
            return res.json();
        }).then(function(data){
            console.log(data);
        })
    },

    // LOG IN FUNCTION
    login: function(loginData){
        return new Promise((r) => {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                //TODO: Convertir les données reçues pour les enregistrer dans user.js
                if(data.logged){
                    this.user.isConnected = data.logged
                    // Enregistrer les données reçues via la BDD
                    this.profile.username = data.ID_LOGINS;
                }

                r(data)
            }.bind(this))
        });
    },

    // LOG OUT FUNCTION
    logout: function(logoutData){
        return new Promise((r) => {
            fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logoutData)
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                this.user.isConnected = data.logged
                r(data)
            }.bind(this))
        });
    },

    // SIGN IN FUNCTION
    signIn: function(signInData){
        return new Promise((r) => {
            fetch('/api/signIn', {
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
