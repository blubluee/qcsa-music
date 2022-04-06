import { getMusicUrl } from '@/api/service/music'

const state ={
  currentSong: [],  // 当前播放的歌曲的信息
  playing: false,  // 播放状态
  url: '',  // 音乐的url
}

const mutations = {
  CURRENTSONGINFO(state, song) {
    state.currentSong = song
  },
  CHANGEPLAYING(state, type) {
    state.playing = type
  },
  GETMUSICURL(state, url) {
    state.url = url
  }
}

const actions = {
  async getMusicUrl({ commit }, id) {
    const result = await getMusicUrl(id)
    if (result.code === 200) {
      commit("GETMUSICURL", result.data[0].url)
    }
  }
}

const getters = {
  playing(state) {
    return state.playing
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}