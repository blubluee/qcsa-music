<template>
  <div>
    <div class="body">
      <div class="wrapper">
        <div class="item"
             :class="{two:isTwo}"
             v-for="item in recommandList"
             :key="item.id"
             @click="goInfo(item.id)">
          <img :src="item.picUrl || item.coverImgUrl">
          <p class="info">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommandList: {
      type: Array
    },
    isTwo: {
        Boolean,
        default: false
      }
  },
  methods: {
    goInfo(id) {
      this.$router.push({
        name: 'slInfo',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  .wrapper {
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    .item {
      width: 12.5%;
      padding: 0 10px 10px;
      position: relative;
      border-radius: 10px;
      margin-bottom: 7px;
      img {
        position: relative;
        width: 100%;
        padding-right: 10px;
        margin-bottom: 3px;
      }
      .info {
        width: 100%;
        height: auto;
        font-weight: 600;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .two {
      width: 50%;
    }
  }
}
</style>