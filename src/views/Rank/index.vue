<template>
  <div class="wrapper">
    <div class="feature">
      <div class="head"></div>
      <span>云音乐特色榜</span>
      <Songsheet :recommandList="featureList"></Songsheet>
    </div>
    <div class="feature">
      <div class="head"></div>
      <span>热门特色榜</span>
      <Songsheet :recommandList="gobalList"></Songsheet>
    </div>
  </div>
</template>

<script>
import Songsheet from '@/components/songsheet'
export default {
  data () {
    return {
      featureList: [],
      gobalList: []
    }
  },
  components: {
    Songsheet
  },
  mounted() {
    this.getTopList()
  },
  methods: {
    async getTopList() {
      const result = await this.$API.rank.reqTopList()
      if (result.code === 200) {
        this.featureList = result.list.slice(0, 4)
        this.gobalList = result.list.slice(4)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  width: 65%;
  margin: 0 auto;
  .feature {
    font-size: 20px;
    padding-bottom: 9px;
    position: relative;
    span {
      position: absolute;
      top: 2px;
      left: 25px;
    }
    .head {
      width: 5px;
      height: 30px;
      margin-right: 10px;
      background: red;
      margin-bottom: 20px;
    }
  }
}
</style>