import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boxHeight: null

  },
  mutations: {
    boxHeightFn (state, playload) {
      state.boxHeight = playload
    }

  },
  actions: {

  }
})
