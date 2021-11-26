<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>訂單時間</th>
          <th>購買人姓名</th>
          <th>聯絡電話</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key" :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.tel }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, i) in item.products"
                :key="i"
              >{{ product.product.title }} 數量：{{ product.qty }}{{ product.product.unit }}</li>
            </ul>
          </td>
          <td class="text-center">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="getOrder(item.id)">內容</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 打開訂單內容的modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-width-ctrl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">訂單內容</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12"></div>
              <div class="form-group col-sm-6">
                <div class="h5 text-dark">訂單資訊</div>
                <div class="h6 text-dark">
                  訂單日期：
                  <span class="text-grey">{{ order.create_at | date }}</span>
                </div>
                <div class="h6 text-dark">
                  訂單編號：
                  <span class="text-grey">{{ order.id }}</span>
                </div>
                <hr />

                <div class="h5 text-dark">購買產品</div>
                <ul class="list-unstyling">
                  <li
                    v-for="(product, i) in order.products"
                    :key="i"
                  >{{ product.product.title }} 數量：{{ product.qty }}{{ product.unit }}</li>
                </ul>
                <hr />
                <div class="h6 text-dark">
                  總金額：
                  <span class="text-grey">{{ order.total | currency }}</span>
                </div>
                <div class="h6 text-dark">
                  付款狀態：
                  <span class="text-success" v-if="order.is_paid">已完成付款</span>
                  <span class="text-danger" v-else>尚未付款</span>
                </div>
              </div>

              <div class="form-group col-sm-6">
                <div class="h5 text-dark">購買人資訊</div>
                <div class="h6 text-dark">
                  姓名：
                  <span class="text-grey">{{ order.user.name }}</span>
                </div>
                <div class="h6 text-dark">
                  電話：
                  <span class="text-grey">{{ order.user.tel }}</span>
                </div>
                <div class="h6 text-dark">
                  信箱：
                  <span class="text-grey">{{ order.user.email }}</span>
                </div>
                <div class="h6 text-dark">
                  地址：
                  <span class="text-grey">{{ order.user.address }}</span>
                </div>
                <hr />
                <div class="h5 text-dark">購買人留言</div>
                <div class="text-grey" v-if="order.message">{{ order.message }}</div>
                <div class="text-muted" v-else>-無客戶留言-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Pagination :pagination="pagination" @emitPages="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      order: {
        user: {
          name: "",
          tel: "",
          email: "",
          address: "",
        },
      },
      isNew: false,
      pagination: {
        total_page: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
        category: null,
      },
      // isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(currentPage = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${currentPage}`;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(url, vm.tempProduct).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch("updateLoading", false);
        console.log("getOrders", response);
      });
    },
    getOrder(id) {
      // 在點選查看商品的按鈕上，賦予一個顯示單一產品完整內容的功能，因此getProduct(id)跟上面不同，沒有加s
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      // vm.isLoading = true; // 這邊因為是要在點擊個別的『查看商品』或『加入購物車』按鈕載入中時才要使用到fontawesome效果，不是整體頁面載入，因此這邊不用isLoading作為判斷
      // vm.status.loadingItem = id; // 當點選以後，status.loadingItem = id，作為html中i標籤的v-if判斷式來用
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        $("#orderModal").modal("show"); // 在ajax行為結束並取得產品資料以後才可打開modal
        console.log("getOrder", response);
        // vm.isLoading = false; // 同上，因為不是要整體頁面載入時出現效果，因此棄用
        // vm.status.loadingItem = ""; // 讀取完成以後，將loadingItem賦予空值，以達到取消讀取動畫效果的作用
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; // 讀取store/index.js裡的vuex管理中的isLoading
    },
  },
  created() {
    this.getOrders();
    console.log(process.env.VUE_APP_APIPATH);
  },
};
</script>


<style scoped>
th,
td {
  vertical-align: middle;
  text-align: center;
}

.list-unstyled {
  margin-bottom: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.modal-width-ctrl {
  max-width: 800px;
}
</style>
