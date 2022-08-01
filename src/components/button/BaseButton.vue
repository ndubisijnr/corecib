<template>
    <span>
        <b-button v-if="loading === true" disabled class="btn">
            <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </b-button>
      <b-button v-else :style="styles" :disabled="disabled" class="btn" type="submit"> <i :class="iconClass" /> {{title}}</b-button>
    </span>
</template>
<script>
    export default {
        props:['loading','title','loader','styles', 'iconClass','disabled'],
        name: "BaseButton"
    }
</script>

<style scoped>
button{
  background-color: #3F88C5;
  color: white;
  width: 100%;
}
button:hover{
  color: black;
}
</style>