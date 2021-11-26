import axios from 'axios';

export default {
    state: {
        cart: {
            carts: {},
        },
    },
    actions: {
        getCart(context) {
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
            axios.get(url).then((response) => {
                context.commit('CART', response.data.data); // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
                console.log("getCart", response);
                // vm.isLoading = false;
                context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
                // vm.$store.state.isLoading = false;
            });
        },
        // addtoCart(context, { id, qty = 1 }) {
        //     const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        //     context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
        //     const cart = {
        //       product_id: id,
        //       qty, // 上面addtoCart裡面帶的qty參數已經預設為1，因此這邊可以直接帶入qty，也等於是預設值1
        //     };
        //     context.commit('LOADING', true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
        //     axios.post(url, { data: cart }).then((response) => {
        //         context.commit('LOADING', false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
        //         console.log("addtoCart", response);
        //         $("#productModal").modal("hide");
        //         context.dispatch('getCart');
        //       });
        //     },
        removeCartItem(context, id) {
            // 刪除購物車品項，因為是要刪除特定項目，因此要帶入id作為參數
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true);
            axios.delete(url).then((response) => {
                // vm.cart = response.data.data; // 因為是要刪除，因此沒必要再存資料進cart{}
                context.dispatch('getCart');
                console.log("Cart Item removed", response);
                context.commit('LOADING', false);
            });
        },
    },
    mutations: {
        // 3. mutation中可用常數命名，也就是全大寫以區分與一般function做區分
        // 接下來在參數中帶入兩個參數: (state, status)
        // 第一個state為最上方的state中的資料，也就是state.isLoading 
        // 第二個status，status是從actions裡的updateLoading裡的status傳參考過來
        CART(state, payload) {
            state.cart = payload;
        },
    },
    getters: {
        cart(state) {
            return state.cart;
        },
    },
}