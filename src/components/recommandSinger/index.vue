<template>
  <div class="wrapper">
    <div class="main">
      <div class="item"
           v-for="item in singers"
           :key="item.id"
           @click="singerInfo(item.id)">
        <el-avatar :size="100"
                   :src="item.picUrl"
                   style="cursor:pointer"></el-avatar>
        <p>{{ item.name }}</p>
        <p>单曲数 {{ item.musicSize }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singers: {
      type: Array,
      require: true
    }
  },
  methods: {
    singerInfo(id) {
      this.$router.push({ name: 'singerInfo', params: {
        id: id
      }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100% !important;
  margin: 10px 0;
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
    margin-bottom: 15px;
    text-align: center;
    p:first-of-type {
      font-weight: 800;
      margin: 12px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p:last-of-type {
      color: rgb(41, 163, 163);
    }
  }
}
</style>