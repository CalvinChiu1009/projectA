<template>
  <div>
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
        <tr v-for="item in wishList.wishes" :key="item.id">
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
            <button type="button" class="btn btn-danger btn-sm" @click="removeWishItem()">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Wish",
  data() {
    return {
      wishList: {},
    };
  },
  methods: {
    getWishList() {
      const vm = this;
      const getStorage = JSON.parse(localStorage.getItem('wishes'));
      vm.wishList = getStorage;
    },
  },
  created(){
      this.getWishList();
  }
};
</script>