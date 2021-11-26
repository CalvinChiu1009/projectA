import axios from 'axios';

export default {
    state: {
        products: [],
    },
    actions: {
        getProducts(context) {
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
            // vm.isLoading = true;
            context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
            axios.get(url).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                console.log("getProducts", response);
                // vm.isLoading = false;
                context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
            });
        },
    },
    mutations: {
        // 3. mutation中可用常數命名，也就是全大寫以區分與一般function做區分
        // 接下來在參數中帶入兩個參數: (state, status)
        // 第一個state為最上方的state中的資料，也就是state.isLoading 
        // 第二個status，status是從actions裡的updateLoading裡的status傳參考過來
      PRODUCTS(state, payload) {
        state.products = payload;
      },
    },
    getters: {
      products(state) {
        return state.products;
      },
    },
}