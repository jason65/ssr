<template>
  <div>
    <kindo-box title="">
      <el-form :model="searchForm" inline>
        <el-form-item label="选择权重：">
          <el-radio-group v-model.trim="searchForm.weight">
            <el-radio :label="'1'">国家权重</el-radio>
            <el-radio :label="'2'">地区权重</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="" style="float:right;">
          <el-button type="primary" style="width:150px;text-align:center;"> 应用于系统 </el-button>
        </el-form-item>
      </el-form>

      <kindo-table v-if="searchForm.weight==='1'" :url="url" :queryParam="searchForm" ref="table" width="100%">
        <el-table-column prop="a" label="DRG编码" width="90px" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="b" label="DRG名称" min-width="140px" header-align="center" align="left" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="c" label="入组病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="d" label="国家权重" width="90px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="e" label="CMI" width="60px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="f" label="费用消耗指数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="g" label="风险等级" width="90px" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="h" label="死亡人数" width="90px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="i" label="死亡率（%）" width="110px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
      </kindo-table>

      <kindo-table v-else :url="urlDq" :queryParam="searchForm" ref="tableDq" width="100%">
        <el-table-column prop="a" label="DRG编码" width="90px" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="b" label="DRG名称" min-width="140px" header-align="center" align="left" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="c" label="入组病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="d" label="地区权重" width="90px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="e" label="CMI" width="60px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="f" label="费用消耗指数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="g" label="风险等级" width="90px" header-align="center" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="h" label="死亡人数" width="90px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="i" label="死亡率（%）" width="110px" header-align="center" align="right" :show-overflow-tooltip="true"></el-table-column>
      </kindo-table>

    </kindo-box>
  </div>
</template>
<script>
import config from './config'
export default {
  data() {
    return {
      url: config.api.get,
      urlDq: config.api.getDq,
      searchForm: {
        // 权重选择
        weight: '1'
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.$refs.table.reloadData()
    })
  },
  methods: {},
  watch: {
    'searchForm.weight': function(v) {
      let self = this

      if (v === '1') {
        setTimeout(function() {
          self.$refs.table.reloadData()
        }, 100)
      } else {
        setTimeout(function() {
          self.$refs.tableDq.reloadData()
        }, 100)
      }
    }
  }
}
</script>
<style scoped>

</style>
