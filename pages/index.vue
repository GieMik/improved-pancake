<template>
  <div>
    <table class="table table--hoverable">
      <thead>
        <tr>
          <td width="30px" class="ms_t-center">
            <a href="#" @click="sort('id')">
              #
              <icon v-if="$route.query.attr === 'id'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </a>
          </td>
          <td>
            <a href="#" @click="sort('name')">
              Name
              <icon v-if="$route.query.attr === 'name'" :icon="$route.query.sort === 'asc' ? 'sortA-Z': 'sortZ-A'"></icon>  
            </a>
          </td>
          <td class="ms_t-center ms_hidden ">
            <a href="#" @click="sort('color')">
              Color
              <icon v-if="$route.query.attr === 'color'" :icon="$route.query.sort === 'asc' ? 'sortA-Z': 'sortZ-A'"></icon>  
            </a>
          </td>
          <td width="120px" class="ms_t-center ms_hidden">
            <a href="#" @click="sort('bitterness')">
              Bitterners
              <icon v-if="$route.query.attr === 'bitterness'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </a>
          </td>
          <td width="120px" class="ms_t-center ms_hidden">
            <a href="#" @click="sort('alc')">
              Alc
              <icon v-if="$route.query.attr === 'alc'" :icon="$route.query.sort === 'asc' ? 'sort1-9': 'sort9-1'"></icon>  
            </a>
          </td>
          <td width="20px" class="ms_t-center"></td>
        </tr>
        <tr>
          <td></td>
          <td><input @keyup.enter="go" @blur="go" v-model="name" type="text" placeholder="Filter by Name"></td>
          <td class="ms_t-center ms_hidden ">
            <select @change="go" v-model="color">
              <option value="">Select color</option>
              <option :key="value" v-for="value in colorValues">{{ value }}</option>
            </select>
          </td>
          <td class="ms_hidden">
            <no-ssr>
              <vue-slider 
              ref="slider"
              :min="0"
              tooltip="hover"
              :max="10"
              @drag-end="go"
              @click.native="go"
              v-model="bitterness"></vue-slider>
            </no-ssr>
          </td>
          <td class="ms_hidden">
            <no-ssr>
              <vue-slider 
              ref="slider"
              :min="0"
              tooltip="hover"
              :max="10"
              @drag-end="go"
              @click.native="go"
              v-model="alc"></vue-slider>
            </no-ssr>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody v-if="!data.errors">
        <nuxt-link tag="tr" :to="{ name: 'beers-id', params: { id: beer.id } }" :key="index" v-for="(beer, index) in data.data.items">
          <td class="ms_t-center">{{ beer.id }}</td>
          <td>{{ beer.name }}</td>
          <td class="ms_t-center ms_hidden">{{ beer.color }}</td>
          <td class="ms_t-center ms_hidden">{{ beer.bitterness }}</td>
          <td class="ms_t-center ms_hidden">{{ beer.alc }}</td>
          <td class="ms_t-center"><icon icon="link"></icon></td>
        </nuxt-link>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6">
            <h3 class="notification ms_t-center">{{ data.message }}</h3>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="!data.errors">
        <tr>
          <td class="ms_t-right" colspan="6">
            Items count: {{ data.data.items.length }}
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
      console.warn(err)
    })
    return { data }
  },
  components,
  data() {
    return {
      name: '',
      color: '',
      bitterness: [0,10],
      alc: [0,10],
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
    sort(attr) {
      let query = { attr, sort: this.$route.query.sort === 'asc' ? 'desc': 'asc', ...this.searchQuery }
      this.$router.push({ name: 'index', query})
    },
    go() {
      this.$router.push({name: 'index', query: {
        ...this.$route.query, ...this.searchQuery
      }})
    }
  },
  computed: {
    searchQuery() {
      return {
        name: this.name !== '' ? this.name : null, 
        color: this.color !== '' ? this.color : null, 
        bitterness: JSON.stringify(this.bitterness) !== '[0,10]' ? this.bitterness : null, 
        alc: JSON.stringify(this.alc) !== '[0,10]' ? this.alc : null, 
      }
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