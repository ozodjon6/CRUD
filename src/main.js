import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select,Form } from 'element-ui';


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Button,Select,Form)
locale.use(lang)

new Vue({
  render: h => h(App),
}).$mount('#app')
