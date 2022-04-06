<template>
  <div class="wrapper">
    <div class="main">
      <div class="item"
           v-for="item in singers"
           :key="item.id">
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
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
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
    width: 10%;
    margin-bottom: 15px;
    text-align: center;
    p:first-of-type {
      font-weight: 800;
      margin: 12px 0;
    }
    p:last-of-type {
      color: rgb(41, 163, 163);
    }
  }
}
</style>