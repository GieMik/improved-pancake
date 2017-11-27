import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      pageTitle: '...'
    },
    mutations: {
      SET_PAGE_TITLE(state, name) {
        state.pageTitle = name
      }
    }
  })
}

export default createStore