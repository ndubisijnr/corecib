<template>
    <div class="loader" :style="{background:Background, position:Position, zIndex:Zindex}">
        <div class="inner-loading">
            <div class="text-center">
              <span class="spinner-border"></span>
            </div>
            <p class="h5 mt-2 text-dark">{{message}}</p>
        </div>
    </div>

</template>
<script>
export default {
    name:"BlockerLoader",
    props:{
        message:{
            type:String
        },
        Zindex:{
          type:String
        },
        Position:{
          type:String
        },
        Background:{
          type:String
        }
  }

}
</script>
<style scoped>
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;
}
.loader {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
     align-items: center;
    width: 100%;
    height: 100%;
    /*background-color: transparent;*/
    /*position: fixed;*/
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    /*z-index: 99999999999999;*/
}

</style>