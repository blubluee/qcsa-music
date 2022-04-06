<template>
  <div class="wrapper">
    <button @click="backToTop"
            v-show="isShow">
      <p>▲</p>顶部
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      pageY: 200
    }
  },
  methods: {
    isShowTip () {
      window.pageYOffset > this.pageY
        ? (this.isShow = true)
        : (this.isShow = false)
    },
    backToTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  },
  created () {
    window.addEventListener('scroll', this.isShowTip)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.isShowTip)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  button {
    position: fixed;
    right: 25px;
    bottom: 150px;
    width: 48px;
    height: 54px;
    background-color: #fff;
    border: 2px solid rgb(240, 238, 238);
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(230, 230, 230);
    }
  }
}
</style>