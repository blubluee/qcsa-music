<template>
  <div>
    <div class="body"
         v-show="!loading">
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

    <div class="body loading"
         v-show="loading">
      <div class="wrapper">
        <div class="item"
             :class="{two:isTwo}"
             v-for="n in 30"
             :key="n">
          <div class="img"></div>
          <p class="info"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  props: {
    recommandList: {
      type: Array,
      default: {}
    },
    isTwo: {
      Boolean,
      default: false
    }
  },
  methods: {
    goInfo (id) {
      this.$router.push({
        name: 'slInfo', 
        params: {
          id
        }
      })
    }
  },
  watch: {
    recommandList(newValue, oldValue) {
      if (newValue != {}) {
        setTimeout(() => {
          this.loading = false
        }, 300);
      }
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
      cursor: pointer;
      .img {
        width: 100%;
        height: 8em;
        margin-bottom: .6em;                                   
      }
      img {
          position: relative;
          width: 100%;
          // padding-right: 10px;
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
.img:empty,
.info:empty {
  background-color: #ededed;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, .5) 50%,
    rgba(255, 255, 255, 0) 60%
  ) #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.img:empty {
  animation-delay: .1s;
}

.info:empty {
  width: 100%;
  min-height: 2em;
  border-radius: 4px;
  animation-delay: .15s;
}

</style>