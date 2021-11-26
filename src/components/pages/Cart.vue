<template>
  <div class="justify-content-center wrap">
    <loading loader="bars" :active.sync="isLoading">
      <div class="loadingio-spinner-ripple-wvqltc293nb"><div class="ldio-4066br826ni">
      <div></div><div></div>
      </div></div>
    </loading>
    <!-- 結帳確認頁面 -->
    <div class="checkOut">
      <h4>結帳確認</h4>
    </div>
    <div class="d-flex">
      <div class="col-md-12 col-sm-12">
        <h6>購物車內容</h6>
        <table class="table mt-4">
          <thead>
            <tr>
              <th colspan="2" width="50%">品名</th>
              <th width="25%">數量</th>
              <th width="25%">小記</th>
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
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="3" class="text-right txt-total">總計</td>
              <td class="text-center txt-total">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <!-- 假設總計價格不等於折扣價時，才會將折扣價格顯示出來 -->
              <td colspan="3" class="text-right text-success txt-total">折扣價</td>
              <td class="text-center text-success txt-total">{{ cart.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>

        <!-- 輸入消費者資訊 -->
        <!-- 這裡v-if是當購物車沒有任何總金額的時候，就不顯示 -->
        <div class="justify-content-center customer-info">
          <form @submit.prevent="createOrder">
            <h6>請輸入您的資料</h6>
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-validate="'required|email'"
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email"
                placeholder="請輸入 Email"
              />
              <!-- Vee-validate帶有內建的驗證功能，這邊寫入 v-validate="'required|email'"會直接去驗證email的輸入是否正確 -->
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
              <!-- Vee-validate帶有內建的驗證功能，因此span中寫入{{ errors.first('email') }}會自動帶出相對應的錯誤訊息，比如說沒填寫或格式錯誤 -->
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                :class="{'is-invalid': errors.has('name')}"
                v-model="form.user.name"
                v-validate="'required'"
                placeholder="輸入姓名"
              />
              <!-- ⬆️ 在標籤中加入v-validate="'required'"，因為名字比較不限格式，因此後面先不加格式-->
              <!-- <span class="text-danger">{{ error.has('name') }}</span> -->
              <!-- ⬆️ 將{{ error.has('name') }}寫在span的內容會有程序上的錯誤，因此須改寫到span的標籤中，並使用v-if來觸發-->
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                name="tel"
                :class="{'is-invalid': errors.has('tel')}"
                id="usertel"
                v-model="form.user.tel"
                v-validate="'required'"
                placeholder="請輸入電話"
              />
              <span class="text-danger" v-if="errors.has('tel')">須輸入電話號碼</span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="address"
                class="form-control"
                name="address"
                :class="{'is-invalid': errors.has('address')}"
                id="useraddress"
                v-model="form.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-left">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
        },
      },
      // isLoading: false,
    };
  },

  methods: {
    getCart() {
      // 取得購物車資料
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data; // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
        // ！這邊注意！：因為是要加入到購物車，因此上面data物件中新增了一個cart物件，這邊也要將傳入的資料改儲存到cart中，而不是products中
        console.log("getCart", response);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      // 刪除購物車品項，因為是要刪除特定項目，因此要帶入id作為參數
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.dispatch("updateLoading", true);
      this.$http.delete(url).then((response) => {
        // vm.cart = response.data.data; // 因為是要刪除，因此沒必要再存資料進cart{}
        vm.getCart(); // 在刪除以後，重新跑一次getCart來更新及顯示購物車列表
        console.log("Cart Item removed", response);
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
    removeItem(id) {
      this.$emit("cartid", id);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; // 讀取store/index.js裡的vuex管理中的isLoading
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped>
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.checkOut {
  max-width: 1200px;
  border-bottom: 0.5px grey dotted;
  text-align: center;
  margin: 10px 0 20px 0;
}

.table {
  margin: 0 auto;
  width: 70%;
  justify-content: center;
  align-items: center;
}

tbody {
  height: 50px;
}

td {
  align-items: center;
  justify-content: center;
}

.product-img {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.form-group {
  text-align: left;
}

.customer-info {
  margin: 20px auto 0 auto;
  width: 60%;
  justify-content: center;
  align-items: center;
}

@media(max-width: 767px){
  .table{
    width: 100%;
  }

  .customer-info{
    width: 100%;
  }
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