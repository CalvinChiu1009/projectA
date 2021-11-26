<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table col-sm-12">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table col-sm-12">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    // 定義資料結構
    return {
      order: {
        user: {
          address: "",
          email: "",
          tel: "",
          name: ""
        }
      },
      orderId: "" // 存放訂單號碼
    };
  },
  methods: {
    getOrder() {
      // 取得訂單資料
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`; // 取得訂單資料
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(url).then(response => {
        vm.order = response.data.order;
        console.log(response);
        vm.$store.dispatch("updateLoading", false);
      });
    },
    payOrder() {
      // 確認付款
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`; // 確認付款的api路徑
      vm.$store.dispatch("updateLoading", true);
      this.$http.post(url).then(response => { // 因為是將訂單發送出去，因此ajax行為要改為post
        // vm.order = response.data.order; // 付款行為可以省去這一行
        console.log(response);
        if(response.data.success) {
            alert('付款成功，再去我們的賣場看看吧！')
            vm.getOrder();
            vm.$router.push(`/product_list`);
        }
        vm.$store.dispatch("updateLoading", false);
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    // this.orderId = this.$route.params.orderId; // 這裡$route.params的params是取得路徑上的參數，這邊即是orderId
    console.log(this.orderId); // 檢查訂單號碼是否有符合路徑名稱
    this.getOrder();
  }
};
</script>
