<template>
  <div>
    <loading loader="bars" :active.sync="isLoading">
      <div class="loadingio-spinner-ripple-wvqltc293nb"><div class="ldio-4066br826ni">
      <div></div><div></div>
      </div></div>
    </loading>
    <!-- 購物車 -->
    <!-- 這裡v-if是當購物車沒有任何物件的時候，就不顯示 -->
    <div class="my-5 row table" v-if="cart.carts.length">
      <table class="table mt-4">
        <thead>
          <tr>
            <th colspan="2" width="45%">品名</th>
            <th width="25%">數量</th>
            <th width="25%">小記</th>
            <th width="5%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td
              class="img-fluid product-img"
              :style="{backgroundImage: `url(${item.product.imageUrl})`}"
              
            ></td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="align-middle">{{ item.qty }}</td>
            <td class="align-middle">{{ item.qty * item.final_total | currency }}</td>

            <td class="align-middle">
              <button type="button" class="btn btn-danger btn-sm" @click="removeCartItem(item.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="4" class="text-right txt-total">總計</td>
            <td class="text-center txt-total">{{ cart.total | currency }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <!-- 假設總計價格不等於折扣價時，才會將折扣價格顯示出來 -->
            <td colspan="4" class="text-right text-success txt-total">折扣價</td>
            <td class="text-center text-success txt-total">{{ cart.final_total | currency }}</td>
          </tr>
        </tfoot>
      </table>

      <!-- 優惠碼及最終訂單價格 -->
      <!-- 解法一： Bootstrap -->
      <!-- <div class="final-confirm d-flex w-100">
        <div class="final-coupon col-md-6">
          <div class="text-left">
            <label for="coupon" class="text-black h4">優惠券</label>
            <p class="text-grey">若您有優惠券，請於下方輸入優惠碼</p>
          </div>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control mr-3"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
              id="coupon"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>

        <div class="final-price col-md-6">
          <h4 class="border-bottom text-right mb-6">付款資訊</h4>
          <div class="col-6">
            <span class="text-black text-left">訂單金額</span>
            <span class="text-right">{{ cart.final_total | currency }}</span>
          </div>
          <div class="col-6 text-right">
            <strong class="text-black">{{ cart.final_total | currency }}</strong>
          </div>
          <router-link class="input-group-append" to="/cart">
            <button class="btn btn-secondary text-center" type="button">前 往 結 帳</button>
          </router-link>
        </div>
      </div>-->

      <!-- 解法二： CSS樣式設定 -->
      <div class="final-confirm">
        <!-- <div class="final-coupon final-half">
          <div class="text-left">
            <label for="coupon" class="text-black h4">優惠券</label>
            <p class="text-grey">若您有優惠券，請於下方輸入優惠碼</p>
          </div>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control mr-3"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
              id="coupon"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>-->

        <div class="final-price final-half">
          <div class="final-coupon">
            <div class="text-right">
              <label for="coupon" class="text-black h4">優惠券</label>
              <br />
              <label for="coupon">若您有優惠券，請於下方輸入優惠碼</label>
            </div>
            <div class="input-group mb-3 input-group-sm">
              <input
                type="text"
                class="form-control mr-3"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
                id="coupon"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
              </div>
            </div>
          </div>

          <h4 class="text-right mb-6">付款資訊</h4>
          <hr />
          <div class="d-flex justify-content-between">
            <span class="text-black text-left">訂單金額</span>
            <strong class="text-black text-right">{{ cart.final_total | currency }}</strong>
          </div>
          <router-link class="input-group-append go-checkout" to="/cart">
            <button class="btn btn-secondary text-center" type="button">前 往 結 帳</button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else-if="cart.carts.length === 0" class="empty-cart">
      <div class="h4 text-muted">哎呀！這裡沒有東西呢</div>
      <i class="fas fa-grin-beam-sweat text-muted"></i>
      <div class="h4 text-muted">趕快去看看我們精美的商場～</div>
      <router-link to="product_list">
        <button class="btn btn-secondary btn-lg">看看去</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapActions } from 'vuex'; // 帶入vuex裡的getters

export default {
  name: "CustomerOrders",
  data() {
    return {
      // products: [],
      product: {}, // 點選查看商品的按鈕後，開啟的modal要暫時放的資料會先存放在這個product物件中
      // isLoading: false,
      status: {
        // 以產品的id來在產品卡片的『查看商品』以及『加到購物車』的按鈕
        loadingItem: "", // 空值
      },
      // cart: {
      //   carts: {},
      // },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "這是留言",
      },
    };
  },
  methods: {
    ...mapActions(['getProducts', 'getCart', 'removeCartItem']),
    // getProducts() {
    //   this.$store.dispatch('getProducts');
    //   // const vm = this;
    //   // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
    //   // vm.$store.dispatch("updateLoading", true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   // this.$http.get(url).then((response) => {
    //   //   vm.products = response.data.products;
    //   //   console.log("getProducts", response);
    //   //   // vm.$store.dispatch("updateLoading", false);
    //   //   vm.$store.dispatch("updateLoading", false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   // });
    // },
    getProduct(id) {
      // 在點選查看商品的按鈕上，賦予一個顯示單一產品完整內容的功能，因此getProduct(id)跟上面不同，沒有加s
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      // vm.isLoading = true; // 這邊因為是要在點擊個別的『查看商品』或『加入購物車』按鈕載入中時才要使用到fontawesome效果，不是整體頁面載入，因此這邊不用isLoading作為判斷
      vm.status.loadingItem = id; // 當點選以後，status.loadingItem = id，作為html中i標籤的v-if判斷式來用
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show"); // 在ajax行為結束並取得產品資料以後才可打開modal
        console.log("getProduct", response);
        // vm.isLoading = false; // 同上，因為不是要整體頁面載入時出現效果，因此棄用
        vm.status.loadingItem = ""; // 讀取完成以後，將loadingItem賦予空值，以達到取消讀取動畫效果的作用
      });
    },
  //   addtoCart(id, qty = 1) {
  //     this.$store.dispatch('addtoCart', { id, qty });
  //     // // 將選購商品加入購物車
  //     // const vm = this;
  //     // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
  //     // vm.status.loadingItem = id;
  //     // const cart = {
  //     //   // 因為api指定的參數為id以及數量，這邊先將cart宣告為帶入這兩個參數的物件
  //     //   product_id: id,
  //     //   qty, // 上面addtoCart裡面帶的qty參數已經預設為1，因此這邊可以直接帶入qty，也等於是預設值1
  //     // };
  //     // this.$http.post(url, { data: cart }).then((response) => {
  //     //   vm.status.loadingItem = "";
  //     //   console.log("Loading spin", vm.status.loadingItem);
  //     //   console.log("addtoCart", response);
  //     //   $("#productModal").modal("hide");
  //     //   // this.$router.go(this.$router.currentRoute);
  //     //   this.getCart();
  //   },
  //   getCart() {
  //     this.$store.dispatch('getCart');
  //     // // 取得購物車資料
  //     // const vm = this;
  //     // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
  //     // // vm.$store.dispatch("updateLoading", true);
  //     // vm.$store.dispatch("updateLoading", true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
  //     // // vm.$store.state.isLoading = true;
  //     // this.$http.get(url).then((response) => {
  //     //   vm.cart = response.data.data; // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
  //     //   // ！這邊注意！：因為是要加入到購物車，因此上面data物件中新增了一個cart物件，這邊也要將傳入的資料改儲存到cart中，而不是products中
  //     //   console.log("getCart", response);
  //     //   // vm.$store.dispatch("updateLoading", false);
  //     //   vm.$store.dispatch("updateLoading", false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
  //     //   // vm.$store.state.isLoading = false;
  //     // });
  // },
  //   removeCartItem(id) {
  //     this.$store.dispatch('removeCartItem', id);
  //     // // 刪除購物車品項，因為是要刪除特定項目，因此要帶入id作為參數
  //     // const vm = this;
  //     // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
  //     // vm.$store.dispatch("updateLoading", true);
  //     // this.$http.delete(url).then((response) => {
  //     //   // vm.cart = response.data.data; // 因為是要刪除，因此沒必要再存資料進cart{}
  //     //   vm.getCart(); // 在刪除以後，重新跑一次getCart來更新及顯示購物車列表
  //     //   console.log("Cart Item removed", response);
  //     //   vm.$store.dispatch("updateLoading", false);
  //     // });
  //   },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch("updateLoading", true);
      this.$http.post(url, { data: coupon }).then((response) => {
        // vm.cart = response.data.data; // 因為是要刪除，因此沒必要再存資料進cart{}
        vm.getCart(); // 在刪除以後，重新跑一次getCart來更新及顯示購物車列表
        console.log("use coupon", response);
        vm.$store.dispatch("updateLoading", false);
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        // 用這段validate功能來防止資料未輸入完成就進行送出訂單的動作
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            // 把ajax行為放入if的成立式
            console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`customer_checkout/${response.data.orderId}`); // 在訂單建立成功以後，跳轉到結帳頁面
            }
            vm.$store.dispatch("updateLoading", false);
          });
        } else {
          console.log("欄位不完整");
          vm.$store.dispatch("updateLoading", false);
        }
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'cart']),
    // isLoading() {
    //   return this.$store.state.isLoading;
    //   // 為了跟Vuex中的資料做同步管理，因此在computed裡寫入此函式
    // },
    // cart() {
    //   return this.$store.state.cart;
    // },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style scoped>
.table {
  margin: 0 auto;
  max-width: 1000px;
}

tbody {
  height: 50px;
}

td {
  align-items: center;
  justify-content: center;
}

.product-img {
  /* background-color: red; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.txt-total {
  padding: 20px;
}

.discount {
  color: red;
  text-decoration: line-through;
}

.final-confirm {
  width: 100%;
  text-align: right;
  background-color: #d1e9e9;
}

.final-confirm hr {
  background-color: #6c6c6c;
}

.final-confirm > .final-half {
  width: 50%;
  padding: 0 10px 20px 10px;
  display: inline-block;
}

.final-coupon {
  /* margin-bottom: 30px; */
  padding: 15px 0;
}

@media(max-width: 768px){
    .final-confirm > .final-half {
    width: 65%;
  }
}

@media (max-width: 520px) {
  .final-confirm > .final-half {
    width: 100%;
  }
}

.justify-content-between {
  padding: 10px;
}

.go-checkout {
  display: block;
  float: right;
}

.btn-secondary {
  color: white;
}

.empty-cart {
  margin: 0 auto;
  padding: 30px;
}

.empty-cart > .h4 {
  padding: 30px;
}

.fa-grin-beam-sweat {
  font-size: 150px;
}

@keyframes ldio-4066br826ni {
  0% {
    top: 95.88px;
    left: 95.88px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 58.14px;
    left: 58.14px;
    width: 75.48px;
    height: 75.48px;
    opacity: 0;
  }
}

.ldio-4066br826ni div {
  position: absolute;
  border-width: 6.12px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-4066br826ni 1.0416666666666665s cubic-bezier(0,0.2,0.8,1) infinite;
}

.ldio-4066br826ni div:nth-child(1) {
  border-color: #12cfc9
}

.ldio-4066br826ni div:nth-child(2) {
  border-color: #3ea8bc;
  animation-delay: -0.5208333333333333s;
}

.loadingio-spinner-ripple-wvqltc293nb {
  width: 204px;
  height: 204px;
  display: inline-block;
  overflow: hidden;
}
.ldio-4066br826ni {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-4066br826ni div { box-sizing: content-box; }
</style>