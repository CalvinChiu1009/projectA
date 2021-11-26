 <template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Daddies夥伴後台</a>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <!-- 使用@click.prevent="signOut"來將登出功能賦予到此a連結上-->
          <a class="nav-link" href="#" @click.prevent="signOut">登出</a> 
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  methods: {
    signOut(){ // 登出功能：基本上與登入功能差不多，只差在路徑後面改為/logout
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`; 
        this.$http.post(url).then((response) => { 
          console.log(response.data);
          if (response.data.success){
              vm.$router.push('/') // 確定登出成功以後，會把頁面轉到首頁
          }
    })
    }
  }
}

</script>