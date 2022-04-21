<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb"
        :class="[{[`bg-${type}`]: type}, listClasses]">
      <slot></slot>
    </ol>
  </nav>
</template>
<script>
export default {
  name: 'breadcrumb',
  props: {
    type: {
      type: String,
      default: '',
      description: 'breadcrumb background type'
    },
    listClasses: {
      type: [String, Object],
      default: '',
      description: 'breadcrumb list classes'
    }
  }
};
</script>
<style></style>
