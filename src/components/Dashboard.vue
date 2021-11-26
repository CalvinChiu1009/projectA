<template>
  <div class="wrap">
    <Navbar class="navbar"></Navbar>
    <Alert />
    <!-- 針對router頁面元件，也可直接寫成<name/>，單獨寫一個，不用像傳統html標籤 -->
    <div class="content">
        <main id="main" role="main" class="text-center mx-auto">
          <router-view></router-view>
          <!-- 製作一個巢狀的router -->
        </main>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Alert from "./AlertMessage";
import Footer from "./Footer";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Sidebar,
    Alert,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  margin: 0 auto;
  position: relative;
  max-width: 100%;
  /* padding-bottom: 100px; */
  box-sizing: border-box;
}

.navbar {
  margin: 0 auto;
  /* width: 100%; */
}

.content{
  margin: 0 auto;
  width: 90%;
  min-height: 1080px;
  padding-top: 120px;
  padding-bottom: 50px;
} 

Footer {
  margin: 0 auto;
  bottom: 0;
  position: absolute;
  width: 100%;
} 

</style>