<template>
  <div>
    <h1>Nuxt works</h1>
    <!-- <pre>{{ beers }}</pre> -->
    <h2
      :key="index" 
      v-for="(beer, index) in beers.items">
      <nuxt-link 
      :to="{ name: 'beers-id', params: { id: beer.id } }">
        To beer {{ beer.name }}
      </nuxt-link>
    </h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`/api/beers`, { headers: {
      'Authorization': 'VerySecretToken'
    } })
    return { beers: data }
  }
}
</script>