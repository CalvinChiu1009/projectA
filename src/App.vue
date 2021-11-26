<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <router-view></router-view>
  
  </div>
</template>

<script>

export default {
  name: "App",
      // 以下這段created()因為已經將整段功能都移到Products.vue中，因此可刪除或註解掉 // 
  // created() {
  //   // 使用Axios，導入一個帶入ajax的語法
  //   // const api = 'https://vue-course-api.hexschool.io/api/localdad/products';  // 宣告一個變數api，將值賦予一個遠端路徑。
  //   // API的路徑由下方兩個元素組成
  //   // API伺服器路徑：路徑是測試API的網址：https://vue-course-api.hexschool.io
  //   // API來自老師提供的git『客戶購物[免驗證]』裡的API：/api/localdad/products
  //   // 但因為在App.vue中設定的API路徑可能會做修改，因此建議的做法是在dev.env.js這個開發環境的文件中直接寫入API路徑
  //   // 使用樣板字面值，帶入寫在dev.env.js裡的API路徑
  //   // console.log(process.env.APIPATH, process.env.VUE_APP_CUSTOMPATH); // 檢查是否有正確帶入變數
  //   const api = `${process.env.APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
  //   this.$http.get(api).then(response => {
  //     console.log(response.data);
  //   });
  // }
};
</script>

<style lang="scss">
// 在style後面加上lang="scss"，使用node_module套用bootstrap
// @import "~bootstrap/scss/bootstrap";
// 這邊載入bootstrap檔案，但如果希望可以針對樣式進行客製化，則新增一個all.scss，並將@import "~bootstrap/scss/bootstrap"寫入all.scss
// 寫入@import "./assets/all";，透過從all.scss載入樣式
@import "./assets/all";
</style>
