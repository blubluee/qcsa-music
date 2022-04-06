<template>
  <div>
    <div class="nav">
      <span v-for="(item, index) in langs"
            :key="index"
            :class="{active:currentIndex1==index}"
            @click="handleTag(item.value, 'area', 'currentIndex1', index)">{{ item.label }}</span>
    </div>
    <div class="nav">
      <span v-for="(item, index) in classifys"
            :key="index"
            :class="{active:currentIndex2==index}"
            @click="handleTag(item.value, 'type', 'currentIndex2', index)">{{ item.label }}</span>
    </div>
    <div class="nav letter">
      <span v-for="(item, index) in letterList"
            :key="index"
            :class="{active:currentIndex3==index}"
            @click="handleTag(item, 'initial', 'currentIndex3', index)">{{ item }}</span>
    </div>
    <RecommandSinger :singers="tagList"></RecommandSinger>
  </div>
</template>

<script>
import RecommandSinger from '@/components/recommandSinger/index.vue'
export default {
  data () {
    return {
      tagList: [],
      limit: '30',
      offset: '0',
      initial: '-1',
      type: -1,
      area: -1,
      // 语种
      lang: -1,
      langs: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 7,
          label: '华语'
        },
        {
          value: 96,
          label: '欧美'
        },
        {
          value: 8,
          label: '日本'
        },
        {
          value: 16,
          label: '韩国'
        },
        {
          value: 0,
          label: '其他'
        }
      ],
      // 分类
      classify: -1,
      classifys: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '男歌手'
        },
        {
          value: 2,
          label: '女歌手'
        },
        {
          value: 3,
          label: '乐队'
        }
      ],
      currentIndex1: 0,
      currentIndex2: 0,
      currentIndex3: 0,
    }
  },
  components: {
    RecommandSinger
  },
  mounted () {
    this.getTag()
  },
  methods: {
    async getTag () {
      let param = {}
      param.limit = this.limit
      param.offset = this.offset
      param.type = this.type
      param.area = this.area
      param.initial = this.initial
      if (param.initial === '热门') {
        param.initial = -1
      }
      const result = await this.$API.singer.reqSingerCatList(param)
      if (result.code === 200) {
        this.tagList = result.artists
      }
    },
    handleTag (value, type, data, index) {
      this[data] = index
      this[type] = value
      this.getTag()
    }
  },
  computed: {
    letterList () {
      let arr = []
      arr.push('热门')
      for (let i = 65; i < 91; i++) {
        let letter = String.fromCharCode(i)
        arr.push(letter)
      }
      arr.push("其他")
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  span {
    display: inline-block;
    padding: 0 15px;
    margin-right: 20px;
    text-align: center;
    border-radius: 16px;
    background-color: rgb(240, 248, 250);
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: rgb(223, 21, 21);
    }
  }
  
  & > span + span:hover {
    color: rgb(19, 176, 248);
  }
}
.nav.letter {
  margin-bottom: 30px;
  span {
    padding: 0 6px;
    margin-right: 10px;
  }
  span:first-child {
    padding: 0 15px;
    margin-right: 20px;
  }
  & > span + span { 
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
  }
}
</style>