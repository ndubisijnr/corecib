<template>
    <span>
        <b-button v-if="loading === true" disabled class="button shadow-lg--hover small">
            <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </b-button>
      <b-button v-else :style="styles" :disabled="disabled" class="button shadow-lg--hover small"> <i :class="iconClass" /> {{title}}</b-button>
    </span>
</template>
<script>
    export default {
        props:['loading','title','loader','styles', 'iconClass','disabled'],
        name: "BaseButton"
    }
</script>

<style scoped>

</style>