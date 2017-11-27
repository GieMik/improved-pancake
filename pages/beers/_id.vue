<template>
  <div>
    <h2>This is beer: {{ id }}</h2>
    <nuxt-link to="/">Back to list</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData ({ params }) {
    return { id: params.id }
  },
  created() {
    this.$store.commit('SET_PAGE_TITLE', `Beer ${this.id}`)
  }
}
</script>
