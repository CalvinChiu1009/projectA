<template>
      <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
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
  <!-- </div> -->
</template>


<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      product: {},
      // isLoading: false,
    };
  },
  methods: {
    getProduct(id) {
      // 在點選查看商品的按鈕上，賦予一個顯示單一產品完整內容的功能，因此getProduct(id)跟上面不同，沒有加s
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      // vm.isLoading = true; // 這邊因為是要在點擊個別的『查看商品』或『加入購物車』按鈕載入中時才要使用到fontawesome效果，不是整體頁面載入，因此這邊不用isLoading作為判斷
      // vm.status.loadingItem = id; // 當點選以後，status.loadingItem = id，作為html中i標籤的v-if判斷式來用
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show"); // 在ajax行為結束並取得產品資料以後才可打開modal
        console.log("getProduct", response);
        // vm.isLoading = false; // 同上，因為不是要整體頁面載入時出現效果，因此棄用
        // vm.status.loadingItem = ""; // 讀取完成以後，將loadingItem賦予空值，以達到取消讀取動畫效果的作用
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getProduct(id);
    console.log(this.$route.params.id);
    this.$route.params.id;
  },
};
</script>