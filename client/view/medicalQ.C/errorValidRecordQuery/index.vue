<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form inline label-position="right" label-width="110px" :model="search" @submit.native.prevent @keyup.enter.native="get">
        <el-form-item label="病案号：">
          <el-input v-model.trim="search.bah" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="错误名称：">
          <el-input v-model.trim="search.errName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="错误描述：">
          <el-input v-model.trim="search.errMemo" placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="问题病案" icon="fas fa-list">
      <kindo-table ref="table" :url="tableUrl" :queryParam="search" :default-sort="{prop:'bah',order:'ascending'}">
        <el-table-column header-align="center" label="病案号" prop="bah" width="90" show-overflow-tooltip sortable='custom'></el-table-column>
        <el-table-column header-align="center" label="住院次数" prop="zycs" align="right" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" label="错误名称" prop="errName" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" label="错误描述" prop="errMemo" min-width="160px" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" label="校验时间" prop="checkTime" width="120" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" sortable='custom'></el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
import config from './config'

export default {
  name: '',

  data() {
    return {
      tableUrl: config.api.get,

      search: {
        bah: '',
        errName: '',
        errMemo: '',
        errType: '1' // 错误类型，1基础校验，2HQMS，3DRG
      }
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
