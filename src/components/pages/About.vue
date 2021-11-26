<template>
  <div class="wrap">
    <div class="row">
      <div class="intro-text mx-auto col-lg-6">
        <h2 class="title">關於DADDIES</h2>
        <p>你也是一位想陪孩子玩耍，但有時已經變不出花招哄小孩的爸爸嗎？</p>
        <br />
        <p>現代的爸爸們兢兢業業地工作著，下班後回家最開心的事莫過於好好的放鬆，以及陪伴孩子玩樂。</p>
        <br />
        <p>在孩子的眼裡，爸爸就像是一個十項全能的超人，但有時候我們也會有力不從心的時候，無論是體力上或是精神上，這時，就讓我們來幫你吧！</p>
        <br />
        <p>透過我們的一些巧思，讓爸爸可以輕輕鬆鬆的陪伴孩子玩樂，並且我們也提供一些您生活上可能會用得到的小物品，能大大的提升您的生活品質。</p>
        <br />
        <p>身為爸爸，DADDIES懂你。</p>
      </div>
      <div class="intro-img col-lg-6">
        <img class="img-fluid rounded" src="https://imgur.com/wYBZtx7.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.wrap {
  width: 75%;
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  margin: 0 auto;
  animation-name: fade-in;
  animation-duration: 1s;
  animation-iteration-count: 1;
}

@keyframes fade-in{
  0% {
    transform: translate(-30px);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

h2 {
  padding-bottom: 1em;
}
.intro-text {
  width: 40%;
  text-align: left;
}

.intro-img {
  max-width: 360px;
}

@media(max-width: 845px){
  .intro-text{
    width: 100%;
  }
  .intro-img{
    display: none;
  }
}
</style>