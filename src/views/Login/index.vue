<template>
  <el-form id="wrapper"
           :model="userInfo_login"
           :rules="loginRules"
           auto-complete="on"
           ref="form">
    <div id="top">
      <img src="@/assets/images/logo-a.png">
      <p>青菜所爱</p>
    </div>
    <div id="middle">
      <el-form-item ref="phone"
                    prop="phone">
        <el-input placeholder="phone"
                  v-model="userInfo_login.phone"
                  prefix-icon="el-icon-mobile-phone"
                  style="margin-bottom:20px"
                  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item ref="pwd"
                    prop="pwd">
        <el-input placeholder="password"
                  v-model="userInfo_login.pwd"
                  prefix-icon="el-icon-lock"
                  show-password
                  style="margin-bottom:20px"></el-input>
      </el-form-item>
    </div>
    <el-button type="primary"
               style="width:100%"
               :loading="loading"
               @click="login('form')">登录</el-button>
  </el-form>
</template>

<script>
import { valiPhone } from '@/util/validator'
import { mapState } from 'vuex'
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!valiPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      userInfo_login: {
        phone: '13119525236',
        pwd: 'Ares1012'
      },
      loginRules: {
        phone: [{ type: 'string', required: true, len: 11, trigger: 'blur', message: '请输入正确的手机号', validator: validatePhone }],
        pwd: [{ type: 'string', required: true, min: 6, trigger: 'blur', message: '请输入正确的密码' }]
      },
      loading: false
    }
  },
  methods: {
    async login (formName) {
      try {
        this.loading = false
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true
            let user = { phone: this.userInfo_login.phone, password: this.userInfo_login.pwd }
            await this.$store.dispatch('user/login', user)
            this.loading = false
            this.$router.replace({ name: "music" })
            this.getUserInfo()
          }
        })
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfo() {
      try {
        await this.$store.dispatch('user/getUserInfo', this.id)
      } catch(err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapState({
      id: (state) => state.user.id
    })
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 350px;
  height: 350px;
  box-shadow: 1px 2px 15px rgba(112, 111, 111, 0.3);
  margin: 200px auto 0;
  padding: 30px 50px 50px;
  background-image: url(/img/logbg.22efe9c0.jpg);
  background-position: bottom;
  #top {
    width: 70px;
    margin: 0 auto 10px;
    font-size: 16px;
    text-align: center;
    color: rgb(151, 144, 144);
    img {
      width: 50px;
      margin-left: 5px;
    }
  }
}
</style>