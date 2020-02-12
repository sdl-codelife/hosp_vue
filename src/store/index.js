import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    avatar: 'sdl',
    userinfo: {
      username: '',
      userid: '',
    }
  },
  mutations: {
    updateAvatar(state,url) {
      state.avatar = url
    }
  },
  actions: {},
  modules: {}
})