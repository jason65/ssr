<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" label-position="right" label-width="110px" @keyup.enter.native="get" :model="form" ref="form" inline>
        <el-form-item label="ICD10：">
          <el-input v-model.trim="form.icdTen" placeholder="请输入编码或名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" @click="get" icon="el-icon-search">查 询</el-button>
      </div>
    </kindo-box>
    <kindo-box>
      <kindo-table :url="url" :queryParam="form" ref="table">
        <el-table-column min-width="100px" label="icd10编码" prop="icdTenCode" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column min-width="150px" label="icd10名称" prop="icdTenName" header-align="center" align="left" :show-overflow-tooltip="true"> </el-table-column>
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
        icdTen: ''
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