<template>
  <div>
    <!-- 以下form的內容為bootstrap樣板，內容為登入畫面 -->
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">後台管理系統</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus> <!-- 加入v-model，帶入username資訊 -->
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password" required> <!-- 加入v-model，帶入username資訊 -->
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-dark btn-block" type="submit" @enter="signin" @click.prevent="signin">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
    </form>
        <!-- 以上form的內容為bootstrap樣板，內容為登入畫面 -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
        // 加入登入資訊
      user: {
          username: 'cc.paparun@gmail.com',
          password: '',
      }
    };
  },
  methods: {
    signin (){
        const vm = this; // 因為要帶入user的資料，為了要指定，因此宣告一個vm = this，以避免指向全域
        const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; 
        // 使用登入功能，因此正確網址應該為'https://vue-course-api.hexschool.io/signin'
        // 在/signin前再加上/admin，變成/admin/signin，目的是為了讓cookies存在Vue的伺服器裡
        // this.$http.get -> 將get改成post，因為這邊是要將資料傳進去(post進資料庫)，而不是取得資料(get from database/api)
        this.$http.post(api, vm.user).then((response) => { 
            console.log(response.data);
            if (response.data.success){ 
                // vm.$router.push('/')  // 如果登入成功，則畫面回到首頁
                // 但我們希望的是登入成功以後可以直接跳轉到產品頁面，因此修改路徑到產品頁面('/admin/products')
                vm.$router.push('/admin/products')
            }
    })
  },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

input {
  width: 300px;
}
</style>