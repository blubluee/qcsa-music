import { Message } from "element-ui";
import { reqPhoneLogin, reqUserInfo } from "@/api/service/user";

const state = {
  // 用户ID
  id: '',
  // 用户信息
  profile: {}
};

const mutations = {
  LOGIN(state, account) {
    state.id = account.id 
  },
  GETUSERINFO(state, profile) {
    state.profile = profile
  }
};

const actions = {
  async login({ commit }, user) {
    try {
      const res = await reqPhoneLogin(user);
      if (res.code === 200) {
        Message({
          message: "登录成功",
          type: "success",
          duration: 3 * 1000,
        });
        window.localStorage.setItem("cookie", res.cookie);
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem('id', res.account.id)
        window.localStorage.setItem("loginStatu", true);
        commit('LOGIN', res.account)
      }
    } catch (err) {
      Message({
        message: '连接超时',
        type: 'error',
        duration: 3 * 1000
      })
      console.log(err);
    }
  },
  async getUserInfo({ commit }, uid) {
    try { 
      const result = await reqUserInfo(uid)
      if (result.code === 200) {
        commit("GETUSERINFO", result.profile)
      }
    } catch(err) {
      Message({
        message: '连接超时',
        type: 'error',
        duration: 3 * 1000
      })
      console.log(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
