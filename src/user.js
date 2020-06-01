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
    isConnected: function(){ //TODO: VERIFIER SI UTILISATEUR TJR CONNECTE: TOKEN VALIDE?
        return this.user.isConnected;
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

                    //TODO: AJOUTER LE TOKEN AUX COOKIES (cookie.add(data.token))
                }

                r(data)
            }.bind(this))
        });
    },

    // LOG OUT FUNCTION
    logout: function(logoutData){
        //TODO: Virer le token?
        this.user.isConnected = false // temporaire
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
