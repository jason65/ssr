<!--  -->
<template>
  <div>
    <p>
      <router-link to="/todo">Go to todo</router-link>
      <router-link to="/login">Go to login</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() { },
  methods: {}
}

</script>