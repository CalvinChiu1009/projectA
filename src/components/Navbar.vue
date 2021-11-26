 <template>
  <div class="topbar">
    <nav class="navbar shadow-sm navbar-expand-lg bg-light navbar-light navbar-fixed-top">
      <div class="menu">
        <router-link class="logo-img" to="/">
          <img class="logo" src="https://imgur.com/rJw4OTk.jpg" />
        </router-link>

        <ul class="navbar-nav ul-l">
          <li class="nav-item">
            <router-link class="nav-link li-l" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link li-l" to="/about">關於</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link li-l" to="/campaign">活動</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link li-l" to="/product_list">商品</router-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center ul-r">
          <li class="nav-item li-item li-r">
            <router-link class="nav-link" to="/customer_order">
              <i class="fas fa-shopping-cart h4" title="購物車"></i>
              <span class="cartQty" v-if="cart.carts.length != 0">{{ cart.carts.length }}</span>
            </router-link>
          </li>
          <!-- <li class="nav-item li-item li-r">
            <router-link class="nav-link" to="/wishlist">
              <i class="fas fa-heart h4" title="願望清單"></i>
              <span class="wishQty">{{ wishNum }}</span>
            </router-link>
          </li> -->
          <li class="nav-item li-item li-r">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-user-circle h4" title="管理員登入"></i>
            </router-link>
          </li>
        </ul>

        <a href="#" class="showmenu" @click="showMenu">
          <i class="fas fa-bars"></i>
        </a>
        <ul class="rwd-menu" :class="{'show-rwd': menuPop}">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/campaign">促銷活動</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product_list">商品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order">
              <span>購物車({{ cart.carts.length }})</span>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/wishlist">
              <span class>願望清單</span>
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <span>管理員登入</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "Navbar",
  data() {
    return {
      // cart: {
      //   carts: {},
      // },
      menuPop: false,
    };
  },
  methods: {
    ...mapActions(['getWishNum', 'getCart']),
    showMenu: function () {
      this.menuPop = !this.menuPop;
    },
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
  //   getFavorite() {
  //     const vm = this;
  //     const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
  //     vm.$store.dispatch("updateLoading", true);
  //     this.$http.get(url).then((response) => {
  //       vm.cart = response.data.data; // 為了將cart元件帶入，這邊先不將資料帶入cart而是改帶入到cartItem
  //       // ！這邊注意！：因為是要加入到購物車，因此上面data物件中新增了一個cart物件，這邊也要將傳入的資料改儲存到cart中，而不是products中
  //       console.log("getCart", response);
  //       vm.$store.dispatch("updateLoading", false);
  //     });
  //   },
  },
  computed: {
    ...mapGetters(['wishNum', 'cart']),
  },
  created() {
    this.getCart();
  //   this.getWishNum();
  //   // 如果localStorage裡有東西的話，就取出裡面的字串轉成物件，並且利用物件長度來判斷願望清單數量
  //   if(localStorage.getItem('wishes')){
  //     let retrieveStorage = JSON.parse(localStorage.getItem('wishes'));
  //     // 從localStorage裡取出的陣列長度，就會等於願望清單的數量
  //     this.getWishNum(retrieveStorage.length);
  //   }
  },
};
</script> 

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 0 0;
  /* background-color: #E8E8D0	; */
}

.navbar {
  justify-content: center;
  width: 100%;
}

.menu {
  margin: 0 atuo;
  width: 960px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.showmenu,
.rwd-menu {
  display: none;
}

.ul-r {
  display: flex;
  justify-content: space-around;
}

.li-l {
  text-align: center;
  margin: 0 15px;
  font-size: 15px;
  width: 80px; 
  /* height: 50px;  */
  position: relative;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  transition: all 0.5s;
}

.li-l:hover {
  font-size: 17px;
}

.li-l:after{
 content: ""; 
 width: 0; 
 height: 2px; 
 background: #5B5B5B; 
 position: absolute; 
 top: 100%; 
 left: 50%; 
 transition: all .3s; 
}

.li-l:hover:after {
  left: 0%; 
  width: 100%;
}

.li-item {
  margin: 0 10px;
  box-sizing: border-box;
}

.li-r {
  position: relative;
  z-index: 0;
}

.cartQty {
  text-align: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  position: absolute;
  bottom: 8px;
  right: -2px;
  background: #e0e0e0;
  z-index: 1;
  border-radius: 50% 0.5px solid;
  border: rgb(127, 127, 127);
  border-radius: 50%;
}

.wishQty {
  text-align: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  position: absolute;
  bottom: 8px;
  right: -2px;
  background: #e0e0e0;
  z-index: 1;
  border-radius: 50% 0.5px solid;
  border: rgb(127, 127, 127);
  border-radius: 50%;
}

.fa-shopping-cart:hover {
  color: #0080ff;
  transition: color 0.3s;
}

.fa-heart:hover {
  color: red;
  transition: color 0.3s;
}

.fa-user-circle:hover {
  color: #02f78e;
  transition: color 0.3s;
}

@media (max-width: 991px) and (min-width: 768px) {
  .ul-l,
  .ul-r {
    flex-direction: row;
  }
}

@media (max-width: 767px) {
  .menu{
    width: 80%;
    justify-content: space-between;
  }
  .ul-l,
  .ul-r {
    flex-direction: row;
  }
  .ul-l,
  .ul-r {
    display: none;
  }
  .showmenu {
    display: block;
    float: right;
}
  .fa-bars {
    font-size: 40px;
    padding: 5px;
    color: #5B5B5B;
  }
  .rwd-menu {
    display: block;
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.8s;
    position: absolute;
    z-index: 100;
    top: 103px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.9);
    padding-inline-start: 0;
  }
  .nav-link {
    color: white;
  }
  .nav-item {
    list-style: none;
    text-align: center;
    border-top: 1px dashed white;
    width: 100%;
  }

  .rwd-menu.show-rwd {
    max-height: 267px;
  }
}
</style>