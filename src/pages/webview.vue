<template>
  <div>
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        url: ''
      }
    },
    components: {
    },
    methods: {
    },
    created () {
    },
    onLoad () {
    },
    onShow () {
      this.url = this.$root.$mp.query.url
    }
  }
</script>

<style scoped>
</style>
