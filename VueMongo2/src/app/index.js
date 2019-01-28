import Vue from 'vue';
import App from './components/App.vue';
import Diccionario from './components/Diccionario.vue'

new Vue({
    render: h => h(App)
}).$mount('#app');

new Vue({
    render: h => h(Diccionario)
}).$mount('#diccionario');