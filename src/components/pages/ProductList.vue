<template>
  <div>
    <loading loader="bars" :active.sync="isLoading">
      <div class="loadingio-spinner-ripple-wvqltc293nb"><div class="ldio-4066br826ni">
      <div></div><div></div>
      </div></div>
    </loading>
    <!-- 商品卡片列表 -->

    <div class="wrap">
      <div class="list-group col-md-4 col-sm-12 category">
        <p class="text-center text-muted">商品分類</p>
        <a
          href="#"
          class="tab list-group-item tab-bubble"
          :class="{'active btn-light': classification =='全部'}"
          @click.prevent="classification = '全部'"
        >全部</a>
        <a
          href="#"
          class="tab list-group-item tab-bubble"
          :class="{'active btn-light': classification =='服飾'}"
          @click.prevent="classification = '服飾'"
        >服飾</a>
        <a
          href="#"
          class="tab list-group-item tab-bubble"
          :class="{'active btn-light': classification =='玩具'}"
          @click.prevent="classification = '玩具'"
        >玩具</a>
        <a
          href="#"
          class="tab list-group-item tab-bubble"
          :class="{'active btn-light': classification =='配件'}"
          @click.prevent="classification = '配件'"
        >配件</a>
      </div>

      <!-- 產品列表 -->
      <div class="row mt-4 cardlist">
        <div class="rwd-category col-sm-12">
          <ul>
            <li>
              <a
                href="#"
                class="tab list-group-item col-sm-12 col-12"
                :class="{'active btn-light': classification =='全部'}"
                @click.prevent="classification = '全部'"
              >全部</a>
            </li>
            <li>
              <a
                href="#"
                class="tab list-group-item col-sm-12 col-12"
                :class="{'active btn-light': classification =='服飾'}"
                @click.prevent="classification = '服飾'"
              >服飾</a>
            </li>
            <li>
              <a
                href="#"
                class="tab list-group-item col-sm-12 col-12"
                :class="{'active btn-light': classification =='玩具'}"
                @click.prevent="classification = '玩具'"
              >玩具</a>
            </li>
            <li>
              <a
                href="#"
                class="tab list-group-item col-sm-12 col-12"
                :class="{'active btn-light': classification =='配件'}"
                @click.prevent="classification = '配件'"
              >配件</a>
            </li>
          </ul>
        </div>
        <div
          class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4 col-12"
          v-for="item in productFilter"
          :key="item.id"
        >
          <div class="card border-0 shadow-sm">
            <figure>
            <div
              class="card-img"
              style="height: 200px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              @click="getProduct(item.id)"
            >
            <div class="mask">
              <p>See more</p>
            </div>
            </div>
            </figure>
            <div class="card-body flex-row">
              <span class="badge badge-secondary text-white float-right ml-2">{{ item.category }}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark">
                  <span class="card-title">{{ item.title }}</span>
                </a>
              </h5>
              <p class="card-text card-content">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">NT:${{ item.origin_price }} 元</div>
                <del class="h6 text-secondary" v-if="item.price">NT:${{ item.origin_price }} 元</del>
                <p></p>
                <div class="h5 font-bold" v-if="item.price">NT:${{ item.price }} 元</div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-info card-btn"
                  @click="getProduct(item.id)"
                >
                  <!-- <i v-if="status.loadingItem === item.id" class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> -->
                  <i class="fas fa-search"></i>
                </button>

                <!-- 加入願望清單 -->
                <!-- <button
                  type="button"
                  class="btn btn-outline-danger card-btn"
                  @click="addtoWish(item)"
                >
                  <i class="fas fa-heart"></i>
                </button> -->

                <!-- 加入購物車 -->
                <button
                  type="button"
                  class="btn btn-outline-primary card-btn"
                  @click="addtoCart(item.id)"
                >
                  <!-- addtoCart要帶入item的id，數量已經預設是1所以這邊不用再帶入 -->
                  <!-- <i v-if="status.loadingItem === item.id" class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> -->
                  <i class="fas fa-shopping-cart text-center"></i>
                  <span>立即選購</span>
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="card-footer"> -->
          <!-- <button
                type="button"
                class="btn btn-outline-secondary card-btn"
                @click="getProduct(item.id)"
          >-->
          <!-- 這邊帶入的item.id是來自data中的products[]裡的item -->
          <!-- <i
                  class="fas fa-spinner fa-pulse fa-3x fa-fw"
                  v-if="status.loadingItem === item.id"
                ></i>
                <i class="fas fa-search"></i>
          </button>-->
          <!-- <button
                type="button"
                class="btn btn-outline-danger btn-sm card-btn"
                @click="addtowishList(item.id)"
          >-->
          <!-- 這邊帶入的item.id是來自data中的products[]裡的item -->
          <!--<i
                  class="fas fa-spinner fa-pulse fa-3x fa-fw"
                  v-if="status.loadingItem === item.id"
                ></i>
                <i class="fas fa-heart"></i>
          </button>-->
          <!-- <button
                type="button"
                class="card-btn"
                @click="addtoCart(item.id)"
          >-->
          <!-- addtoCart要帶入item的id，數量已經預設是1所以這邊不用再帶入 -->
          <!-- <i
                  class="fas fa-spinner fa-pulse fa-3x fa-fw"
                  v-if="status.loadingItem === item.id"
                ></i>
                <i class="fas fa-shopping-cart text-center"></i><span>立即選購</span> 
          </button>-->
          <!-- </div> -->
        </div>
      </div>
    </div>

    <!-- 點擊查看更多的按鈕後打開的Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt=""/>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">NT:$ {{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">NT:$ {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">NT:$ {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <!-- 在下拉式選單中，寫入v-for="num in 10"，就可將選單數量增加到10，以此類推 -->
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <!-- 這邊帶入的product.id是來自data中的product{}裡的product -->
              <!-- <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";

export default {
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
      wishes: {},
      storageArray: {},
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
      classification: "全部",
    };
  },
  methods: {
    ...mapActions(['getProducts', 'getCart', 'removeCartItem']),
    // 將vuex裡的actions
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
      // vm.$store.dispatch("updateLoading", true); // 這邊因為是要在點擊個別的『查看商品』或『加入購物車』按鈕載入中時才要使用到fontawesome效果，不是整體頁面載入，因此這邊不用isLoading作為判斷
      vm.status.loadingItem = id; // 當點選以後，status.loadingItem = id，作為html中i標籤的v-if判斷式來用
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show"); // 在ajax行為結束並取得產品資料以後才可打開modal
        console.log("getProduct", response);
        // vm.$store.dispatch("updateLoading", false); // 同上，因為不是要整體頁面載入時出現效果，因此棄用
        vm.status.loadingItem = ""; // 讀取完成以後，將loadingItem賦予空值，以達到取消讀取動畫效果的作用
      });
    },
    // addtoWish(data) {
    //   let wishList = [];
    //   const wishes = "wishes";
    //   // 先確認wishList在localStorage裡面有沒有資料
    //   if (localStorage.getItem(wishes)) {
    //     // console.log('if');
    //     // JSON將資料字串轉為物件
    //     let retrieveStorage = JSON.parse(localStorage.getItem(wishes));
    //     // 防呆機制：若同樣的商品已經加入願望清單，則不再加入一次
    //     if (retrieveStorage.findIndex((item) => item.id === data.id) !== -1) {
    //       return console.log("已經有這一項了");
    //     }
    //     // 將data推入陣列中
    //     retrieveStorage.push("data");
    //     // 將資料存進localStorage，key為wishes
    //     localStorage.setItem(wishes, JSON.stringify(retrieveStorage));
    //     // 帶入vuex
    //     this.$store.dispatch('getWishNum');
    //   } else {
    //     console.log("else");
    //     wishList.push(data);
    //     localStorage.setItem(wishes, JSON.stringify(wishList));
    //     this.$store.dispatch('getWishNum');
    //   }
    // },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
      // // 將選購商品加入購物車
      // const vm = this;
      // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // vm.status.loadingItem = id;
      // const cart = {
      //   // 因為api指定的參數為id以及數量，這邊先將cart宣告為帶入這兩個參數的物件
      //   product_id: id,
      //   qty, // 上面addtoCart裡面帶的qty參數已經預設為1，因此這邊可以直接帶入qty，也等於是預設值1
      // };
      // this.$http.post(url, { data: cart }).then((response) => {
      //   vm.status.loadingItem = "";
      //   console.log("Loading spin", vm.status.loadingItem);
      //   console.log("addtoCart", response);
      //   $("#productModal").modal("hide");
      //   // this.$router.go(this.$router.currentRoute);
      //   this.getCart();
    },
    // getCart() {
    //   this.$store.dispatch('getCart');
    //   // // 取得購物車資料
    //   // const vm = this;
    //   // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    //   // // vm.$store.dispatch("updateLoading", true);
    //   // vm.$store.dispatch("updateLoading", true); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   // // vm.$store.state.isLoading = true;
    //   // this.$http.get(url).then((response) => {
    //   //   vm.cart = response.data.data; // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
    //   //   // ！這邊注意！：因為是要加入到購物車，因此上面data物件中新增了一個cart物件，這邊也要將傳入的資料改儲存到cart中，而不是products中
    //   //   console.log("getCart", response);
    //   //   // vm.$store.dispatch("updateLoading", false);
    //   //   vm.$store.dispatch("updateLoading", false); // 以vuex管理isLoading效果，讀取store/index.js裡的undateLoading來觸發loading效果
    //   //   // vm.$store.state.isLoading = false;
    //   // });
    // },
  },
  computed: {
    productFilter() {
      const vm = this;
      if (vm.classification == "全部") {
        return vm.products;
      } else {
        return vm.products.filter((item) => {
          console.log("test", item.category == vm.classification);
          return item.category == vm.classification;
        });
      }
    },
    ...mapGetters(['isLoading', 'products', 'cart']),
    // isLoading() {
    //   return this.$store.state.isLoading; // 讀取store/index.js裡的vuex管理中的isLoading
    // },
    // products() {
    //   return this.$store.state.products;
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
.wrap {
  margin: 0 auto;
  width: 100%;
  display: flex;
  animation-name: fade-down;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}

.list-group-item {
  transition: all 0.5s;
}
.list-group-item:hover {
  background-color: #f0f0f0;
}

@keyframes fade-down {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

.fa-spinner {
  font-size: 8px;
}

.category {
  /* display: block; */
  /* float: left; */
  margin: 0 auto;
  width: 200px;
  align-items: center;
  /* padding-left: 40px; */
}

.category > a,
.category > p {
  width: 200px;
  border-radius: 10px;
  margin: 2px 0;
}

.cardlist {
  /* width: calc(100% - 200px); */
  flex: 1 1 auto;
  width: 95%;
}

.rwd-category {
  display: none;
}
.rwd-category ul {
  list-style: none;
  padding-left: 0;
}
.rwd-category li a {
  display: block;
}

@media (max-width: 768px) {
  .category {
    display: none;
  }
  .rwd-category {
    display: block;
    float: none;
  }
  .rwd-category li {
    display: inline-block;
    width: 50%;
  }
}

.card-body {
  min-height: 280px;
}
figure {
	height: 200px;
	margin: 0;
	padding: 0;
	background: #fff;
	overflow: hidden;
}
figure:hover+span {
	bottom: -36px;
	opacity: 1;
}

.card-img {
  position: relative;
  cursor: pointer;
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: 0.5s ease-in-out;
	transition: 0.5s ease-in-out;
}
.card-img:hover{
	-webkit-transform: scale(1.2);
	transform: scale(1.2);
  /* -webkit-filter: brightness(.6); */
}

.mask {
  position:absolute;
  text-align:center;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: #9D9D9D	;
  }
.mask:hover {
    opacity: .8;
  }

.mask p {
  color: white;
  border: 2px solid white;
  background-color: black;
  margin:0 auto; 
  /* position:absolute; */
  width: 40%;
  transform:translatey(-50px);
  padding: 10px;
  transition: all .5s ease-in-out;
  opacity: 1;
}

.card-img:hover .mask p{
    transform:translatey(80px);
    opacity: 1;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #004b97;
}

.card-content {
  height: 80px;
}

.card-footer {
  display: flex;
  justify-content: space-around;
}

.card-btn {
  width: 95%;
  font-size: 14px;
  border-radius: 3px;
  padding: 5px;
  transition: all 0.1s;
  margin: 2px 0;
}

.card-btn:hover {
  width: 95%;
}

.fa-shopping-cart {
  margin-right: 5px;
}

a:link,
a:visited {
  text-decoration: none;
  color: black;
}

a:hover {
  font-weight: bold;
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