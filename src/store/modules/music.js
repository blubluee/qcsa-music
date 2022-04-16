import { reqBannerList } from '@/api/service/music'

const state = {
  bannerList: [],
  keywordList: []
}

const mutations = {
  GETBANNERLIST(state, list) {
    state.bannerList = list
  },
  // 保存搜索历史
  SAVESEARCHHIS(state, keyword) {
    state.keywordList.push(keyword)
  },
  // 删除关键字
  DELETEKEYWORD(state, index) {
    state.keywordList.splice(index, 1)
  }
}

const actions = {
  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.banners)
    }
  },
  saveSearchList({ commit, state }, keyword) {
    const result = state.keywordList.includes(keyword)
    if (!result) {
      commit('SAVESEARCHHIS', keyword)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


