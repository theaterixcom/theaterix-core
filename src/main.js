import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.config.productionTip = false

// Ready translated locale messages
const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    es: {
        message: {
            hello: 'hola mundo'
        }
    }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'es', // set locale
    messages, // set locale messages
})

new Vue({
    render: h => h(App),
    i18n,
}).$mount('#app')