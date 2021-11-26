<template>
  <div class="footer">
    <h4>聯絡我們</h4>
    <p class="ft-info">
      <i class="fas fa-phone-volume"></i>  04-1234567
    </p>
    <p class="ft-info">
      <i class="fas fa-envelope"></i>  daddies@ddtalk.com
    </p>
    <p>
      <span>Follow us on</span>
      <br />
      <a href="#" class="fb-link">
        <i class="fab fa-facebook"></i>
        <!-- <font-awesome-icon :icon="['fab', 'facebook-square']" /> -->
      </a>
      <a href="#" class="ig-link">
        <i class="fab fa-instagram"></i>
      </a>
      <br>
      <span class="footnote">｜ 僅作為個人練習用，非商業用途 ｜</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style scoped>
.footer {
  margin-top: 10px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background-color: #F0F0F0;
}

h4 {
  padding: 5px;
}

.fas {
  font-size: 16px;
}

span {
  font-size: 20px;
}

.footnote {
  font-size: 14px;
}

.fb-link, .ig-link {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 20px;
}

.ig-link{
      color: #8F4586;
}

/* @media(max-width: 570px){
  .footer{
    width: 100%;
  }
} */

</style>