<template>
<div class="notfound-page">
  <div>
    <lottie-player src="https://assets8.lottiefiles.com/temp/lf20_USCruP.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>  </div>
  <div class="notice">
    <a href="https://bizgem.io"><h6>www.corestepbank.com</h6></a>
    <h3>Hmm, Sorry</h3>
    <span>I could not find that page on our route list</span>
<!--    <div class="mt-2">-->
<!--      <button class="btn-login" @click="$router.back() ? $router.go(-1) : $router.push({name:'Logon'})">Go back</button>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.notfound-page{
  background-color: white !important;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-login {
  width: 132px;
  background-color:#3F88C5;
  border-radius: 5px;
  border: none;
  color: white;
}
.notice{
  line-height: 2rem;
}

.notice > span {
  font-size: 28px;
  font-weight: 900;
}

@media (max-width: 500px) {
  .notfound-page{
    background-color: white !important;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5%;
  }

  .notice{
    text-align: center
  }

}
</style>