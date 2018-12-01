<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" @keyup.enter.native="get" label-position="right" label-width="110px" :model="form" ref="form" inline>
        <el-form-item label="DRG：">
          <el-input v-model.trim="form.drg" placeholder="请输入名称或编码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="MDC：">
                          <el-input v-model.trim="form.MDC" placeholder="请输入名称或编码"></el-input>
                        </el-form-item> -->
      </el-form>
      <div slot="control">
        <el-button @click="get" type="primary" icon="el-icon-search">查 询</el-button>
      </div>
    </kindo-box>
    <kindo-box>
      <kindo-table :url="url" :queryParam="form" ref="table">
        <el-table-column label="DRG编码" width="100px" prop="drgCode" header-align="center" align="center"> </el-table-column>
        <el-table-column label="DRG名称" min-width="120px" prop="drgName" header-align="center" align="center" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column label="adrg编码" width="100px" prop="adrgCode" header-align="center" align="center"> </el-table-column>
        <el-table-column label="adrg名称" min-width="120px" prop="adrgName" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column label="MDC编码" width="100px" prop="mdcCode" header-align="center" align="center"> </el-table-column>
        <el-table-column label="MDC名称" min-width="120px" prop="mdcName" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column label="国家权重" min-width="150px" prop=">relativeWeight" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}">
        </el-table-column>
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
        drg: ''
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