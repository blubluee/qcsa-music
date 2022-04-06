<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'music' }"
                     custom>发现音乐</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'rank' }"
                     custom>排行榜</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'songList' }"
                     custom>歌单</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'singer' }"
                     custom>歌手</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'video' }"
                     custom>视频</router-link>
      </li>
      <li>
        <a href="https://github.com/love-of-vegetables/music-player" target="_blank">Github</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goto (event, pName) {
      console.log(event);
      if (!pName === 'music') {
        this.$router.push('/' + pName)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  height: 50px;
  margin: 0;
  li {
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    float: left;
    cursor: pointer;
    a {
      text-decoration: none;
      color: black;
      user-select: none;
      &:hover {
        color: rgb(235, 37, 37);
      }
      &.router-link-active {
        color: rgb(235, 37, 37);
      }
    }
  }
}
</style>