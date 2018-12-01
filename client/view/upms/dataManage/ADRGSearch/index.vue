<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" label-position="right" label-width="110px" @keyup.enter.native="get" :model="form" ref="form"
        inline>
        <el-form-item label="基本组：">
          <el-input v-model.trim="form.ADRG" placeholder="请输入名称或编码"></el-input>
        </el-form-item>
        <el-form-item label="MDC：">
          <el-input v-model.trim="form.MDC" placeholder="请输入名称或编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" @click="get" icon="el-icon-search">查 询</el-button>
      </div>
    </kindo-box>
    <kindo-box>
      <kindo-table :url="url" :queryParam="form" ref="table">
        <el-table-column label="MDC编码" prop="mdcCode" width="120px" header-align="center" align="center"> </el-table-column>
        <el-table-column label="MDC名称" prop="mdcName" width="220px" header-align="center" align="left"> </el-table-column>
        <el-table-column label="基本组编码" prop="adrgCode" width="120px" header-align="center" align="center"> </el-table-column>
        <el-table-column label="基本组名称" prop="adrgName" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      form: {
        ADRG: '',
        MDC: ''
      },

      url: config.api.get
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.reloadData()
    }
  }
}
</script>

<style>

</style>