<template>
  <div class="footer">
    <div class="copyright">
      <div class="container flex-column">
        <p>
          <span class="mr5">create at 2022-3-5</span>
          <span>qcsa-music. Designed by</span>
          <a href="https://github.com/love-of-vegetables/music-player" target="_blank">青菜所爱</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.footer {
  width: 100%;
  .copyright {
    max-width: 65%;
    margin: 0 auto;
    padding: 1.3rem 0;
    .container {
      padding: 0;
      color: #6D7685;
      font-size: 0.8125rem;
      a {
        color: #6D7685;
        margin-left: 5px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
