<template>
  <router-view></router-view>
</template>

<script>
export default {
mounted() {
  const userToken = localStorage.getItem('token')
  this.$store.dispatch('revalidateUser',userToken, {root:false})
}
}
</script>

<style>


</style>

