<template>
  <div>
    <nuxt-link class="navigate navigate__back" to="/"><icon class="icon--h-reverse" icon="arrow"></icon> Back to list</nuxt-link>
    <div class="beer ms_flex ms_j-between ms_a-center" v-if="!data.errors">
      <div class="beer beer__type ms_t-center">
        <h2 class="beer beer__name">{{ data.data.name }}</h2>
        <p class="beer beer__color">{{ data.data.color }}</p>
      </div>
      <div class="beer beer__info">
        <div class="layout">
          <div class="beer beer__bitterness ms_12 ms_t-center">
            <h5>Bitterness</h5>
            <h2>{{ data.data.bitterness }}</h2>          
          </div> 
          <div class="beer beer__alc ms_12 ms_t-center">
            <h5>Alc</h5>
            <h2>{{ data.data.alc }}</h2>
          </div> 
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="notification ms_t-center">{{ data.message }}</h3>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import axios from '~/plugins/axios'

export default {
  async asyncData ({ params }) {
    let { data }  = await axios.get(`/api/beer/${params.id}`, { headers: {
      'Authorization': 'VerySecretToken'
    }}).catch((err) => {
      console.warn(err)
    })
    return { data }
  },
  created() {
    if (!this.data.errors) {
      this.$store.commit('SET_PAGE_TITLE', `${this.data.data.name}`)
    } else {
      this.$store.commit('SET_PAGE_TITLE', `:(`)
    }
  }
}
</script>
