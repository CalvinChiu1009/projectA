<template>
  <div class="wrap">
    <div class="header">
      <h1>最新優惠</h1>
      <hr />
    </div>
    <div class="discount shadow-lg">
      <h2>父親節優惠</h2>
      <hr />
      <h5>輸入以下代碼：</h5>
      <h1>happy88</h1>
      <h5>即可享商品88折優惠！</h5>
      <p>活動只到2020.10.31，敬請把握</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Campaign",
};
</script>

<style scoped>
.wrap {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 45px;
  margin: 0 auto;
}

.header {
  margin-bottom: 50px;
}

.header h1 {
  animation-name: fade-down;
  animation-duration: 1s;
  animation-iteration-count: 1;
}

@keyframes fade-down {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

.discount {
  width: 400px;
  background-color: #4f9d9d;
  margin: 0 auto;
  border-radius: 5px;
  padding: 30px;
  color: white;
  animation-name: fade-in;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
}

@keyframes fade-in {
  0% {
    transform: translate(-150px);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

.discount h1 {
  color: #ff9d6f;
  font-size: 60px;
  margin: 30px 0;
}

@media (max-width: 768px) {
  .discount {
    max-width: 300px;
  }
  .header h1 {
    font-size: 28px;
  }
}
@media (max-width: 330px){
  .discount {
    width: 95%;
  }
  .discount h2 {
    font-size: 24px;
  }
  .discount h1{
    font-size: 26px;
  }
  .discount h5{
    font-size: 18px;
  }
}
</style>