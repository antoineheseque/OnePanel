export default {
    user: {
        isConnected: false
    },
    profile: {
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
    isConnected: function(){ //TODO: RETOURNER LA VARIABLE SI UTILISATEUR CONNECTE
        return this.user.isConnected;
    },
    onClickEditProfile: function (password) {
        return new Promise((r) => {
            let data = this.profile
            data.password = password
            fetch('/api/user/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                return res.json();
            }).then(function (result) {
                if(result){

                }
            }.bind(this))
        });
    },

    // LOG IN FUNCTION
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
                //TODO: Convertir les données reçues pour les enregistrer dans user.js
                if(data.logged){
                    this.user.isConnected = data.logged
                    // Enregistrer les données reçues via la BDD
                    this.profile = {
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        birthdayDate: data.birthdayDate,
                        registerDate: data.registerDate
                    }
                }

                r(data)
            }.bind(this))
        });
    },

    // LOG OUT FUNCTION
    logout: function(logoutData){
        return new Promise((r) => {
            fetch('/api/user/logout', {
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
