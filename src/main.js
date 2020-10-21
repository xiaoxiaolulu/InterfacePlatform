import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from "./utils/http"
import auth from "./utils/auth"
import router from "./routes"
import message from "./utils/message"
import filters from "./utils/filters"
import messagebox from "./utils/messagebox"
import loading from "./utils/loading"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$auth = auth;
Vue.prototype.$http = http;
Vue.prototype.$message = message;
Vue.prototype.$messagebox = messagebox;
Vue.prototype.$loading = loading

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
