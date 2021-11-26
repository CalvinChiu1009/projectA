<template>
  <div>
    <Topbar/>
    <Alert/>
    <!-- 針對router頁面元件，也可直接寫成<name/>，單獨寫一個，不用像傳統html標籤 -->
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
          <!-- 製作一個巢狀的router -->
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Alert from "./AlertMessage"

export default {
  name: "Management",
  components: {
    Topbar,
    Sidebar,
    Alert,
  }
};
</script>
