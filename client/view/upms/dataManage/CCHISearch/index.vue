<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" label-position="right" label-width="110px" @keyup.enter.native="get" :model="form" ref="form" inline>
        <el-form-item label="CCHI：">
          <el-input v-model.trim="form.cchi" placeholder="请输入名称或编码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button @click="get" type="primary" icon="el-icon-search">查 询</el-button>
      </div>
    </kindo-box>
    <kindo-box>
      <kindo-table :url="url" :queryParam="form" ref="table">
        <el-table-column min-width="80px" label="cchi编码" prop="cchiCode" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column min-width="120px" label="cchi名称" prop="cchiName" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="160px" label="基本人力消耗及耗时" prop="rlhs" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="100px" label="技术难度" prop="jsnd" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="100px" label="风险程度" prop="fxcd" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="100px" label="一次性耗材" prop="ycxhc" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="100px" label="除外内容" prop="cwnr" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column min-width="80px" label="低值耗材" prop="dzhc" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column width="100px" label="计价单位" prop="jjdw" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
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
        cchi: ''
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