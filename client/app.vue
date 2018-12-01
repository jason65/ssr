<template>
  <div class="app">
    app
  </div>
</template>

<script>


export default {
  name: 'App',

  data() {
    return {
      fullscreenLoading: false
    }
  },

  created() {
  },

  methods: {

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.app {
  height: 100%;
}

.loading {
  position: fixed;
  top: 20px;
  right: 10px;
  z-index: 10;
  color: #409eff;
  font-size: 16px;
}
</style>
