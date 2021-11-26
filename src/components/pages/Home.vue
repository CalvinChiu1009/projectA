<template>
  <div class="wrap">
    <div class="banner">
      <div class="b-textarea">
        <h3 class="b-title">Not all heroes wear capes.</h3>
        <p class="b-content">They probably wear our shirts</p>
        <router-link to="/product_list">
            <button class="btn" type="button">Check them out</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.wrap {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  animation-name: fade-in;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
}

@keyframes fade-in {
  0% {
    transform: translate(-30px);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

.banner {
  background-image: url(https://imgur.com/Fj5FEe7.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 60%;
  width: 100%;
  height: auto;
  z-index: 0;
}

.b-textarea {
  background: rgba(0, 0, 0, 0.6); 
  max-width: 330px;
  position: absolute;
  margin: 0 auto;
  /* width: 400px;
  height: 200px; */
  z-index: 1;
  top: 100px;
  left: 30px;
  padding: 30px;
}

.b-title {
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
  color: white;
}

.b-content {
  color: white;
  font-size: 20px;
}

.btn{
  color: black;
  padding:0.5em 1em;
  border:#fff 2px solid;
  font-size:1.5em;
  cursor:pointer;
  border-radius:4px;
  background:linear-gradient(45deg,black 50%, white 50%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  position:relative;
}

.btn:after{
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:linear-gradient(45deg,white 50%,transparent 50%);
  z-index:-1;
}

.btn,.btn:after{
  background-size:300%;
  background-position:100%;
  transition:1s;
}

.btn:hover,.btn:hover:after{
  background-position:0;
  font-size:1.6em;
}

@media (max-width: 768px) {
  .b-textarea {
    max-width: 300px;
    top: 50px;
    left: 30px;
  }
  .b-title {
    font-size: 28px;
  }
  .b-content {
    font-size: 16px;
  }
}
@media (max-width: 700px) {
  .banner {
    position: static;
    padding: 100px 0px;
  }
  .b-textarea{
    position: static;
    /* top: 50%;
    left: 50%; */
  }
}

</style>