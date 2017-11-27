<template>
  <div v-if="beers">
    <p>{{ name }} ------- {{ color }} ------- {{ bitterness }} ------- {{ alc }}</p>
    <table class="table table--hoverable">
      <thead>
        <tr>
          <td width="30px" class="ms_t-center">
            <nuxt-link :to="{ name: 'index', query: { attr: 'id', sort: $route.query.sort === 'asc' ? 'desc': 'asc' } }">
              #
              <icon v-if="$route.query.attr === 'id'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </nuxt-link>
          </td>
          <td>
            <nuxt-link :to="{ name: 'index', query: { attr: 'name', sort: $route.query.sort === 'asc' ? 'desc': 'asc' } }">
              Name
              <icon v-if="$route.query.attr === 'name'" :icon="$route.query.sort === 'asc' ? 'sortA-Z': 'sortZ-A'"></icon>  
            </nuxt-link>
          </td>
          <td class="ms_t-center">
            <nuxt-link :to="{ name: 'index', query: { attr: 'color', sort: $route.query.sort === 'asc' ? 'desc': 'asc' } }">
              Color
              <icon v-if="$route.query.attr === 'color'" :icon="$route.query.sort === 'asc' ? 'sortA-Z': 'sortZ-A'"></icon>  
            </nuxt-link>
          </td>
          <td class="ms_t-center">
            <nuxt-link :to="{ name: 'index', query: { attr: 'bitterness', sort: $route.query.sort === 'asc' ? 'desc': 'asc' } }">
              Bitterners
              <icon v-if="$route.query.attr === 'bitterness'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </nuxt-link>
          </td>
          <td width="80px" class="ms_t-center">
            <nuxt-link :to="{ name: 'index', query: { attr: 'alc', sort: $route.query.sort === 'asc' ? 'desc': 'asc' } }">
              Alc
              <icon v-if="$route.query.attr === 'alc'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </nuxt-link>
          </td>
          <td width="20px" class="ms_t-center"></td>
        </tr>
        <tr>
          <td></td>
          <td><input @blur="go" v-model="name" type="text" placeholder="Filter by Name"></td>
          <!-- <td><input @blur="search" v-model="color" type="text" placeholder="Filter by Color"></td> -->
          <td>
            <select @change="go" v-model="color">
              <option value="">Select color</option>
              <option :key="value" v-for="value in colorValues">{{ value }}</option>
            </select>
          </td>
          <td>
            <no-ssr>
              <vue-slider 
              ref="slider"
              :min="0"
              tooltip="hover"
              :max="10"
              @drag-end="go"
              v-model="bitterness"></vue-slider>
            </no-ssr>
          </td>
          <td>
            <no-ssr>
              <vue-slider 
              ref="slider"
              :min="0"
              tooltip="hover"
              :max="10"
              @drag-end="go"
              v-model="alc"></vue-slider>
            </no-ssr>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <nuxt-link tag="tr" :to="{ name: 'beers-id', params: { id: beer.id } }" :key="index" v-for="(beer, index) in beers.items">
          <td class="ms_t-center">{{ beer.id }}</td>
          <td>{{ beer.name }}</td>
          <td class="ms_t-center">{{ beer.color }}</td>
          <td class="ms_t-center">{{ beer.bitterness }}</td>
          <td class="ms_t-center">{{ beer.alc }}</td>
          <td class="ms_t-center"><icon icon="link"></icon></td>
        </nuxt-link>
      </tbody>
      <tfoot>
        <tr>
          <td class="ms_t-right" colspan="6">
            Items count: {{ beers.itemCount }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'

let components= {}
if (process.browser) {
    // in older versions of nuxt, it's process.BROWSER_BUILD
    let VueSlider = require('vue-slider-component')
    components['vue-slider'] = VueSlider
}
components['no-ssr'] = NoSSR

export default {
  async asyncData ({ params, query, req }) {
    let { data }  = await axios.get(`http://localhost:8000/api/beers`, { headers: {
      'Authorization': 'VerySecretToken'
    }, params: query }).catch((err) => {
      // console.log(err)
    })
    return { beers: data  }
  },
  components,
  data() {
    return {
      name: '',
      color: '',
      bitterness: [0, 10],
      alc: [0, 10],
      colorValues: ['Light', 'Dark']
    }
  },
  head() {
    return {
      title: 'Cheers\' - beers list',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  methods: {
    go() {
      let currentQuery = this.$route.query
      this.$router.push({name: 'index', query: { 
        ...currentQuery,
        name: this.name !== '' ? this.name : null, 
        color: this.color !== '' ? this.color : null, 
        bitterness: JSON.stringify(this.bitterness) !== '[0,10]' ? this.bitterness : null, 
        // alc: this.alc[0] !== 0 && this.alc[0] !== 10 ? this.alc : null, 
        alc: JSON.stringify(this.alc) !== '[0,10]' ? this.alc : null, 
      }})
    }
  },
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Beers list')
    this.name = this.$route.query.name || ''
    this.color = this.$route.query.color || ''
    this.bitterness = this.$route.query.bitterness || [0,10]
    this.alc = this.$route.query.alc || [0,10]
  }
}
</script>