import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap' // 『Vue中運用Bootstrap及jQuery』課程
// Import component
// Fontawesome component
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'
// Loading overlay component
import Loading from 'vue-loading-overlay'; // 讀取中畫面
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'; // 讀取中畫面的css
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

import App from './App.vue'
import router from './router'
import store from './store'
import './bus';
import currencyFilter from './filters/currency'
import orderDate from './filters/date'

// 導入Fontawesome套件
library.add(faSpinner, fas, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch()

Vue.use(VueAxios, axios) // 導入VueAxios以及Axios
Vue.config.productionTip = false
Vue.use(VueI18n) // 導入中文化vee-validate

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.component('Loading', Loading); // 因為Loading是一個元件，因此要用Vue.component(要呈現的元件名稱, 元件)的方式來載入
Vue.filter('currency', currencyFilter); // 全域導入千分號以及錢字號的filter
Vue.filter('date', orderDate);

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  // 到這邊為止，如果切換頁面的第一次會被導航守衛給擋下來，要再連結一次才可正確切換頁面
  // 因此，為避免上述情況，先寫上一段next()，就可正常切換
  // next();
  // 但這邊因為會有需要驗證後才能切換頁面的需求，因此需要針對條件進行設定
  // 這邊是透過HelloWorld頁面元件下的meta屬性-requireAuth = true來做判斷，如果true的話才允許切換頁面
  if (to.meta.requiresAuth) { 
    // 將登入的路徑：/admin/signin 改成驗證用的api路徑：/api/user/check
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    // 這邊如果使用this.$http會跳錯且無法正常運作，是因為目前的運作都是在router下，而不是使用vue的元件
    // 因此需要將原先在Vue元件下使用的this.$http改成axios即可
    // this.$http.post(api).then((response) => {
    axios.post(api).then((response) => {
      console.log(response.data);
      // 下面的if必須要寫，因為如果沒寫的情況下，從login切換到首頁時第一次雖然會被擋下來，但是路由路徑會停留在首頁，因此第二次在切換的話就沒有路由守衛的阻擋了
      if (response.data.success) {
        next(); // 若有登入成功，跳轉到首頁
      } else {
        next('/login'); // 若沒有驗證成功，則會被路由守衛擋下，並且路徑會回到登入頁面
      }
    })
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
