<template>
  <footer class="footer  px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-12">
       <div class="copyright text-center text-lg-center text-muted">
         © BizGem {{year}}
       </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
