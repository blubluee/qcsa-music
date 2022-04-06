<template>
  <div>
    <Carousel></Carousel>
    <div>
      <p style="margin:15px 0;font-size:20px; user-select:none;">推荐歌单</p>
      <SongSheet :recommandList='recommandList'></SongSheet>
    </div>
    <RecommandSong></RecommandSong>
    <div>
      <p style="margin:15px 0;font-size:20px; user-select:none;">推荐歌手</p>
      <RecommandSinger :singers='singers'></RecommandSinger>
    </div>

  </div>
</template>

<script>
import Carousel from '@/components/carousel'
import SongSheet from '@/components/songsheet'
import RecommandSong from '@/components/recommandSong'
import RecommandSinger from '@/components/recommandSinger'
import Search from '@/components/Search'

export default {
  data () {
    return {
      recommandList: [],
      singers: [],
    }
  },
  mounted () {
    try {
      this.$store.dispatch('music/getBannerList')
      this.getRecommandList()
      this.getSingerList()
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    Carousel,
    SongSheet,
    RecommandSong,
    RecommandSinger,
    Search,
  },
  methods: {
    async getRecommandList () {
      const result = await this.$API.music.reqRecommandList()
      if (result.code === 200) {
        let list = result.result
        this.recommandList = list.filter((currentValue, index, arr) => currentValue.picUrl !== '')
      }
    },
    // 获取歌手列表
    async getSingerList () {
      try {
        const result = await this.$API.music.reqRecommandSinger()
        if (result.code === 200) {
          this.singers = result.artists
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>