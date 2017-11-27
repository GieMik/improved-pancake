<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" class="icon">
    <use :xlink:href="iconFixedName" />
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: { icon: { type: String, required: true }, svgClass: String, svgId: String },
  computed: {
    iconFixedName() {
      let icon = '#' + this.icon[0] + this.icon.slice(1)
      return icon
    }
  }
}
</script>
