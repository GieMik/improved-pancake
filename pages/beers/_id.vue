<template>
  <h2>This is beer: {{ id }}</h2>
</template>

<script>
export default {
  async asyncData ({ params }) {
    return { id: params.id }
  }
}
</script>
