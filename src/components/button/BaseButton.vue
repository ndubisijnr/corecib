<template>
    <span>
        <button v-if="loading === true" disabled :style="styles" class="btn">
            <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          {{(loader)?'':'loading' }}...
        </button>
      <button v-else :style="styles" class="btn" :disabled="disabled">{{title}} <component :is="icon" style="height: 15px;"/></button>
    </span>
</template>
<script>
    export default {
        props:['loading','title','loader','styles', 'icon','disabled'],
        name: "BaseButton"
    }
</script>

<style scoped>
  button{
    background-color: #3F88C5;
    color: white;
  }
  button:hover{
    color: white;
  }
</style>