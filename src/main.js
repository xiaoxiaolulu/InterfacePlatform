import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from "./utils/http"
import auth from "./utils/auth"
import router from "./routes"


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$auth = auth;
Vue.prototype.$http = http;

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
