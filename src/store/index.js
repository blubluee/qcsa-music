import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import music from './modules/music'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    music,
    player
  }
})

