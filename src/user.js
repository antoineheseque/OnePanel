export default {
    user: {
        isConnected: false
    },
    profile: {
        company: 'Creative Code Inc.',
        email: 'mike@email.com',
        username: 'mickael',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'Melbourne',
        country: 'Australia',
        description: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
    },
    isConnected: function(){ //TODO: RETOURNER LA VARIABLE SI UTILISATEUR CONNECTE
        return this.user.isConnected;
    },
    setConnected: function(value){
        this.user.isConnected = value;
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
    }
}
