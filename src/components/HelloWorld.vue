<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
    <!-- 新增一個登出的按鈕 -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signout() { // 新增一個登出的功能
      const vm = this; // 因為要帶入user的資料，為了要指定，因此宣告一個vm = this，以避免指向全域
        const api = `${process.env.VUE_APP_APIPATH}/logout`; // 使用登出功能，因此正確網址應該為'https://vue-course-api.hexschool.io/logout'
        // this.$http.get -> 將get改成post，因為這邊是要將資料傳進去(post進資料庫)，而不是取得資料(get from database/api)
        this.$http.post(api).then((response) => { // 與登入不同，這邊post裡要帶入的參數只需要放api即可，不需要放vm.user（用戶帳號） 
            console.log(response.data);
            if (response.data.success){ 
                vm.$router.push('/login')  // 如果登入成功，則畫面回到登入畫面
            }
    })
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
