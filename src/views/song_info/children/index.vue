<template>
  <div class="childeren-wra">
    <div class="children-head">
      <p>{{ title }}</p>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.childeren-wra {
  height: auto;
  padding: .8em 1em;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  .children-head {
    width: auto;
    border-left: 2px red solid;
    height: 20px;
    line-height: 20px;
    margin-bottom: 1em;
    padding-left: 1em;
    p { 
      font-weight: bold;
    }
  }
}

</style>