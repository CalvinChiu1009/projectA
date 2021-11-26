<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !pagination.has_pre }">
        <!-- 讓往前一頁的功能在如果當前頁面為第一頁時失效-->
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getOrders(pagination.current_page - 1)"
        >
          <!-- 前往上一頁的功能就是目前的頁數減一，因此為pagination.current_page - 1 -->
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 使用v-for，來選擇要呈現的頁面，並綁定key使用page作為索引 -->
      <!-- 動態綁定class來使當前頁面具有背景色 -->
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{'active': pagination.current_page === page, }"
      >
        <a class="page-link" href="#" @click.prevent="getOrders(page)">{{ page }}</a>
        <!-- 使用點擊功能觸發getProducts功能，並帶到參數指定的page頁面 -->
      </li>
      <li class="page-item" :class="{'disabled': !pagination.has_next }">
        <!-- 讓往下一頁的功能在如果當前頁面為最後一頁時失效 -->
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getOrders(pagination.current_page + 1)"
        >
          <!-- 前往下一頁的功能就是目前的頁數加一，因此為pagination.current_page + 1 -->
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  data () {
    return {}
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
        console.log(response);
      });
    },
    newPage(page){
      this.$emit('emitPage',page)
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
}
</script>