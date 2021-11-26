import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';

import productsModules from './productsM';
import cartModules from './cartM';

Vue.use(Vuex);

const setWishNum = 'setWishNum';

export default new Vuex.Store({
  state: {
    isLoading: false,   // 1. 先給要操作的資料狀態一個初始值
    // wishNum: 0,
    // products: [],
    cart: {
      carts: [],
    },
  },
  actions: {
    // 2. 給予動作一個名稱，類似於vue中的methods, 參數帶入context(在此固定要帶入的參數)以及status(payload，外部傳進來的，可自定義名稱)
    updateLoading (context, payload){  
      context.commit('LOADING', payload) // 4. 使用context裡的commit將mutation裡的LOADING帶過來，並帶入status
    },
    // context包含以下屬性：
    // {
    //   state,      // 等同于 `store.state`，若在模块中则为局部状态
    //   rootState,  // 等同于 `store.state`，只存在于模块中
    //   commit,     // 等同于 `store.commit`
    //   dispatch,   // 等同于 `store.dispatch`
    //   getters,    // 等同于 `store.getters`
    //   rootGetters // 等同于 `store.getters`，只存在于模块中
    // }

    // getWishNum (context, payload){ // 願望清單數量的同步更新
    //   // 願望清單數量+1
    //   context.state.wishNum = payload || context.state.wishNum + 1;
    //   context.commit('WISH', context.state.wishNum) 
    // },
    // getProducts(context) {
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
    //   // vm.isLoading = true;
    //   context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   axios.get(url).then((response) => {
    //     context.commit('PRODUCTS', response.data.products);
    //     console.log("getProducts", response);
    //     // vm.isLoading = false;
    //     context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   });
    // },
    // getCart(context) {
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    //   context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   axios.get(url).then((response) => {
    //     context.commit('CART', response.data.data); // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
    //     console.log("getCart", response);
    //     // vm.isLoading = false;
    //     context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //     // vm.$store.state.isLoading = false;
    //   });
    // },
    addtoCart(context, { id, qty = 1 }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
      const cart = {
        product_id: id,
        qty, // 上面addtoCart裡面帶的qty參數已經預設為1，因此這邊可以直接帶入qty，也等於是預設值1
      };
      context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
      axios.post(url, { data: cart }).then((response) => {
        context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
        console.log("addtoCart", response);
        $("#productModal").modal("hide");
        context.dispatch('getCart');
      });
    },
    // removeCartItem(context, id) {
    //   // 刪除購物車品項，因為是要刪除特定項目，因此要帶入id作為參數
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
    //   context.commit('LOADING', true);
    //   axios.delete(url).then((response) => {
    //     // vm.cart = response.data.data; // 因為是要刪除，因此沒必要再存資料進cart{}
    //     context.dispatch('getCart');
    //     console.log("Cart Item removed", response);
    //     context.commit('LOADING', false);
    //   });
    // },
  },
  mutations: {
    // 3. mutation中可用常數命名，也就是全大寫以區分與一般function做區分
    // 接下來在參數中帶入兩個參數: (state, status)
    // 第一個state為最上方的state中的資料，也就是state.isLoading 
    // 第二個status，status是從actions裡的updateLoading裡的status傳參考過來
    LOADING (state, payload){
      state.isLoading = payload;
    },
    // WISH(state, payload){
    //   state.wishNum = payload;
    // },
    // PRODUCTS(state, payload) {
    //   state.products = payload;
    // },
    // CART(state, payload) {
    //   state.cart = payload;
    // },
  },
  getters: {
    isLoading(state) {
      return state.isLoading; // 讀取store/index.js裡的vuex管理中的isLoading
    },
    // wish(state) {
    //   return state.wishNum;
    // },
    // products() {
    //   return state.products;
    // },
    // product() {
    //   return state.product;
    // },
    // cart() {
    //   return state.cart;
    // },
  },
  modules: {
    productsModules,
    cartModules,
  },
});
