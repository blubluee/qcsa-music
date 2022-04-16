<template>
  <div class="wrapper">
    <div class="main" v-show="!loading">
      <div class="item"
           v-for="item in singers"
           :key="item.id"
           @click="singerInfo(item.id)">
        <el-avatar :size="100"
                   :src="item.picUrl"
                   style="cursor:pointer"></el-avatar>
        <p class="name">{{ item.name }}</p>
        <p class="song">单曲数 {{ item.musicSize }}</p>
      </div>
    </div>
    <div class="main loading" v-show="loading">
      <div class="item"
           v-for="item in 30"
           :key="item"
           >
        <div class="avatar"></div>
        <!-- <el-avatar :size="100"
                   :src="item.picUrl"
                   style="cursor:pointer"></el-avatar> -->
        <p class="name"></p>
        <p class="song"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  props: {
    singers: {
      type: Array,
      require: true,
      default: []
    }
  },
  methods: {
    singerInfo(id) {
      this.$router.push({ name: 'singerInfo', params: {
        id: id
      }
      })
    }
  },
  watch: {
    singers(newValue) {
      if (newValue != []) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$loading-gray: #ededed;
.wrapper {
  width: 100% !important;
  margin: 10px 0;
  // box-sizing: border-box;
  user-select: none;
  .title {
    font-size: 20px;
    margin-bottom: 30px;
  }
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .item {
    width: 16%;
    height: 166px;
    margin-bottom: 15px;
    text-align: center;
    .name {
      font-weight: 800;
      margin: 12px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .song {
      color: rgb(41, 163, 163);
    }
  }
}

.avatar:empty,
.name:empty,
.song:empty {
  background-color: $loading-gray;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    $loading-gray;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.avatar:empty {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  animation-delay: 0.11s;
  
}

.name:empty {
  height: 1em;
  line-height: 1em;
  width: 3em;
  margin-left: calc((100px - 3em)/2) !important;
  animation-delay: .2s;

}

.song:empty {
  height: 1em;
  line-height: 1em;
  width: 4.5em;
  margin-left: calc((100px - 4.5em)/2) !important;
  animation-delay: .3s;

}



</style>