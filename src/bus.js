import Vue from 'vue';

Vue.prototype.$bus = new Vue(); // 直接將$bus註冊到Vue的元件原型之下