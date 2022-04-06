<template>
  <el-carousel :interval="3000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
      <h3 class="medium"><img :src="item.imageUrl"></h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      imgList: [],
    }
  },
  computed: {
    ...mapState({
      bannerList: state => state.music.bannerList
    })
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>