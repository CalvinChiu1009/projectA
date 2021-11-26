<template>
  <div>
    <!-- 啟用loading-overlay的元件，貼在第一層div之內，不可貼到最外層的div -->
    <div class="vld-parent">
      <!-- 當isLoading = true的時候就會啟用，false的時候就會停用，因為isLoading是一個功能，因此要在data()return{}物件中宣告變數 -->
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="text-right mt-4">
      <!-- data-toggle="modal" data-target="#productModal" 為modal（互動視窗畫面）指向 -->
      <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#productModal">建立新的產品</button> -->
      <!-- 因為我們希望modal視窗可以在資料庫取得資料以後才觸發，因此新增按鈕觸發功能'openModal()' -->
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price | currency }}</td>
          <td>{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <button
            class="btn btn-outline-primary btn-sm mr-1 mt-2"
            @click="openModal(false, item)"
          >編輯</button>
          <button class="btn btn-outline-danger btn-sm mt-2" @click="openDelModal(item)">刪除</button>
        </tr>
      </tbody>
    </table>
    <!-- 為了將資料寫入後端，使用v-model綁定資料 -->

    <!-- 產品列表的分頁製作 -->
     <Pagination :pagination="pagination" @changePage="getProducts"></Pagination> 
    <!-- 以頁面元件的方式插入Pagination， -->
    <!-- :pagination為自定義名稱的功能，綁定data裡的pagination物件 -->
    <!-- @changePage：在觸發任何改變時，觸發Pagination裡newPage(page)裡的this.$emit('changePage',page)，向上觸發getProducts(page)來更新api資料 -->

    <!-- 新增及編輯產品 Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <!-- 在上傳圖片的地方加上轉圈圈的loading效果，如果有在載入狀態就會觸發(true) -->
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <!-- 在input欄位中新增一個@change並帶入一個uploadFile，代表當有任何變更時觸發uploadFile的行為 -->
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除產品 Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            <span>? 商品刪除後將無法恢復。</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; // 因為openModal中有使用到'$'，而'$'是屬於jQuery功能中的變數，因此必須在這邊載入jQuery
import Pagination from '@/components/Pagination'; // 為了將Pagination.vue作為元件插入，需要import

export default {
  name: "Products",
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false, // 判定是要新增還是編輯產品的model判斷式
      // isLoading: false, // 預設先讓loading效果關閉
      status: {
        fileUploading: false
      }
    };
  },
  components: { 
    Pagination, // 為了將Pagination.vue作為元件插入，這邊將上面import Pagination導入後作為元件在Products.vue裡使用
  },
  methods: {
    // 將api中的產品匯入產品頁面中
    getProducts(page = 1) { // 為了讓產品列表可以在一載入時就將第一頁當作預設頁面，參數可以設定為page = 1，此為ES6的方法
      // 取得API資料                                                // 切換頁：在products後面加上?page={page}，可讓切換頁面有實際作用
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this; // 為了待會將API的資料匯入data裡，這邊先將vm宣告起來，避免this指向錯誤
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      vm.$store.dispatch("updateLoading", true); // 讓頁面在載入api中的產品資料時才啟用loading效果
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false; // 然後再載入完成以後關閉loading效果
        vm.products = response.data.products; // 將response.data，也就是從API取得的資料傳入上面data中的products:[]中
        vm.pagination = response.data.pagination; // 將頁面讀取以後的pagination資料帶入此vue中pagination的物件
        console.log('response.data.pagination:', response.data);
      });
    },

    // 打開新增或編輯產品modal
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}; // 如果是新增的時候，this.tempProduct就會是一個空的物件
        this.isNew = true;
      } else {
        // this.tempProduct = item; 這邊如果只有打 = item，那會因為物件傳參考的特性，導致兩邊都一樣（意即修改前後都一樣，互相衝突？）
        this.tempProduct = Object.assign({}, item); // 因此，使用Object.assign({}, item)的方式，將item宣告成另一個新的物件
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },

    // 打開刪除產品的modal
    openDelModal(item) {
      console.log(item);
      this.tempProduct = item;
      $("#delProductModal").modal("show");
    },

    // 刪除產品的功能
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      this.$http.delete(api).then(response => {
        // 刪除api內資料：this.$http.『delete』，其餘語法都一樣
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("刪除失敗");
        }
      });
    },

    // 更新產品列表的功能
    updateProduct() {
      // 將資料新增上傳到API資料庫                                          // 這邊/product不加s
      // 為了使用if新增修改並更新api資料庫的功能原本的const api要改成let api，因為const是唯讀狀態，不可賦予新的值
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`; // /product前要加上admin，這邊是參考課程api內容說的
      let httpMethod = "post";
      const vm = this; // 為了待會將API的資料匯入data裡，這邊先將vm宣告起來，避免this指向錯誤

      //  使用if新增修改並更新api資料庫的功能
      if (!vm.isNew) {
        // 假設isNew的資料不是新的而是要進行修改的時候，就使用修改產品的api
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        // this.$http.後面的get是作為取得資料，這邊因為是要新增資料進資料庫，因此用post
        // 因為也要將vm.tempProduct丟進資料庫，所以這邊也要寫
        // 但是由於要送出的資料是包在物件中的data，因此我們也需要用物件的方式{}，並且指定data以下的資料送出，所以必須寫成{ data: vm.tempProduct }
        console.log(response.data);
        // vm.products = response.data.products;
        // 將response.data，也就是從API取得的資料傳入上面data中的products:[]中
        // vm.products這行也必須要刪除或註解掉，不然會把response.data的資料又再次寫進vm裡面

        // 使用if新增一個功能，如果有成功新增產品的話，就把modal視窗關閉
        if (response.data.success) {
          $("#productModal").modal("hide"); // modal('hide')即關閉modal視窗之功能
          vm.getProducts(); // 並隨後立即再取得一次所有api的資料
        } else {
          // 新增失敗跟新增成功一樣，只是會多出一段訊息
          // 意思就是沒有新增成功，但是也會關掉modal並且重新載入api資料，然後透過console跳出提醒訊息
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    // 上傳圖片
    uploadFile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile); // 將檔案以表單的方式送出，使用'file-to-upload'的欄位，然後將uploadedFile資料送出
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`; // 定義上傳路徑
      vm.status.fileUploading = true; // 讓頁面在上傳產品的照片時才啟用loading效果
      this.$http
        .post(url, formData, {
          // (url=上傳路徑, formData=上傳內容, 做後再帶上一個物件，帶上物件的目的是將格式改為FormData的格式
          headers: {
            "Content-Type": "multipart/form-data" // multipart/form-data就是FormData的格式
          }
        })
        .then(response => {
          // 使用Promise來檢查上傳資料有沒有成功
          console.log(response.data);
          vm.status.fileUploading = false; // 載入產品圖片完成以後就會切換成關閉效果
          // 在將圖片拖拉到上傳圖片區時，成功的話會取得要上傳的圖片網址，這個網址路徑會需要對應到tempProduct的imageUrl路徑
          // 使用if：如果上傳圖片是成功的，那就將圖片的網址帶入tempProduct的網址內
          // if (response.data.success) {
          //   vm.tempProduct.imageUrl = response.data.imageUrl;
          // }
          // 但這樣寫，在上傳產品圖片的時候並不會將網址顯示於網址欄位，因為沒有查看屬性時並沒有getter跟setter，因此沒有雙向綁定
          // 因此要使用set將這個欄位強制寫入
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl); // vm.$set的寫入方式(物件, 寫入的屬性, 值)
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading; // 讀取store/index.js裡的vuex管理中的isLoading
    },
  },
  // 在頁面載入完成後自動掛載getProducts功能，將產品從api導入頁面
  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
  
th, td {
  text-align: center;
}

</style>