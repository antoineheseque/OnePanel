import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: {
      scope: process.env.BASE_URL,
    },
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker actif.')
    },
    cached () {
      console.log('Contenu mis en cache.')
    },
    updatefound () {
      console.log('Nouveau contenu en téléchargement.')
    },
    updated () {
      console.log('Nouveau contenu téléchargé, veuillez recharger la page.')
    },
    offline () {
      console.log('Page hors ligne.')
    },
    error (error) {
      console.error('Erreur:', error)
    }
  })

}