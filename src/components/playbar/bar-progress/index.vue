<template>
  <div class="bar-wrapper">
    <div class="bar" ref="bar"></div>
    <span class="circle" ref="circle"></span>
  </div>
</template>
·
<script>
export default {
  mounted() {
    // 操作dom，添加触摸事件
    const bar = this.$refs.bar
    const circle = this.$refs.circle
  }
}
</script>

<style lang="scss" scoped>
.bar-wrapper {
  position: relative;
  margin-top: .8em;
  .bar {
    width: 100%;
    height: 3px;
    background-color: #eee;
  }
  .circle {
    position: absolute;
    display: inline-block;
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    border: 2px solid red;
    background-color: #fff;
    transform: translateY(calc(-0.55em - 1.5px));
    &::before {
      content: "";
      position: absolute;
      top: -.3em;
      bottom: -.3em;
      left: -.3em;
      right: -.3em;
    }
  }
}
</style>