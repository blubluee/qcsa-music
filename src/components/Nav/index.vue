<template>
  <div class="wrapper">
    <span>{{ subject }}</span>
    <span v-for="(item, index) in tagList"
          :key="index">{{ item }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props: {
    subject: {
      type: String,
      default: '全部'
    },
    tagList: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
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
  }
  span:first-child {
    color: #fff;
    background-color: rgb(223, 21, 21);
  }
  & > span + span:hover {
    color: rgb(75, 167, 209);
  }
}
</style>