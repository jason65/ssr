<template>
  <div>
    <el-tabs v-model.trim="activeName" type="card" style="background: #fff" @tab-click="tabClick">
      <el-tab-pane label="省100个单病种统计" name="first" style="padding: 0 10px;">
        <todo-diseaseEmphasis></todo-diseaseEmphasis>
      </el-tab-pane>
      <el-tab-pane label="国家320个单病种统计" name="second" style="padding: 0 10px;">
        <todo-disease></todo-disease>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import todoDisease from './todoDisease'
import todoDiseaseEmphasis from './todoDiseaseEmphasis'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.activeName = kindo.cache.get('goBack').tab
    }
  },
  mounted() {
  },
  methods: {
    tabClick() {
      this.$nextTick(function () {
        // javascript 触发 window.onresize
        if (Event.prototype.initEvent) {
          const evt = window.document.createEvent('UIEvents')
          evt.initUIEvent('resize', true, false, window, 0)
          window.dispatchEvent(evt)
        } else {
          window.dispatchEvent(new Event('resize'))
        }
      })
    }
  },
  components: {
    'todo-disease': todoDisease,
    'todo-diseaseEmphasis': todoDiseaseEmphasis
  }
}
</script>