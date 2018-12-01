<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="search" ref="searchForm" :inline="true" label-width="110px" label-position="right" @keyup.enter.native="get">
        <el-form-item label="病种名称：">
          <el-input v-model.trim="search.bzmc"></el-input>
        </el-form-item>
        <el-form-item label="主要诊断：">
          <el-input v-model.trim="search.icd10Code" placeholder="输入ICD10编码或主要诊断名称"></el-input>
        </el-form-item>
        <el-form-item label="ICD9：">
          <el-input v-model.trim="search.searchCode" placeholder="输入ICD9编码或名称"></el-input>
        </el-form-item>
      </el-form>
      <el-form slot="more" onsubmit="return false;" :model="search" ref="searchForm" :inline="true" label-width="110px" label-position="right" @keyup.enter.native="get">
        <el-form-item label="麻醉方式：">
          <el-select v-model.trim="search.mzlx" filterable clearable placeholder="" class="searchInput">
            <el-option v-for="(item, index) in dictRemote.MXFS" :key="index" :label="item.MZLX" :value="item.MZLX"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title=" " icon=" ">
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable">导出</el-button>
      </div>
      <kindo-table :url="tableUrl" :queryParam="search" ref="table" width="100%" :pageSize="15">
        <el-table-column prop="bzmc" label="病种名称" min-width="170px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="icd10Code" label="ICD10编码" sortable='custom' width="120px" header-align="center"></el-table-column>
        <el-table-column prop="icd10Name" label="主要诊断" width="150px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="zcz" label="主要操作" width="170px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="mzlx" label="麻醉方式" width="120px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="icd9Code" label="ICD9编码" sortable='custom' width="120px" header-align="center"></el-table-column>
        <el-table-column prop="icd9Name" label="对应的ICD9名称" width="160px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="cwnr" label="除外内容" width="120px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bzfy" label="标准价格" sortable='custom' width="120px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="zgdj" label="市最高定价" sortable='custom' width="120px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>
<script>
import config from './config'
export default {
  data() {
    return {
      search: {
        bzmc: '',
        icd10Code: '',
        searchCode: '',
        mzlx: ''
      },
      dict: {
      },
      dictRemote: {
        MXFS: []
      },
      tableUrl: config.api.table
    }
  },
  created() {
    // this.getDictionary('dict')
    this.getDictRemote()
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  methods: {
    getDictionary(obj) {
      for (let k in this[obj]) {
        if (this[obj].hasOwnProperty(k)) {
          kindo.dictionary.getDictionary(k).then(res => {
            this.dict[k] = res || []
          })
        }
      }
    },
    getDictRemote() {
      this.$http.get(config.api.queryMz).then(res => {
        this.dictRemote.MXFS = res.data
      })
    },
    get() {
      this.$refs['table'].reloadData()
    },
    exportTable() {
      kindo.util.downloadFile(config.api.export, this.search)
    }
  }
}
</script>
<style lang="scss" scoped >
.el-form-item__content {
  .el-date-editor--daterange.el-input__inner,
  .el-input,
  .el-select {
    width: 200px;
  }
}

.mark {
  cursor: pointer;
}

.errorClass {
  color: red;
}

.searchHalf {
  width: 95px !important;
}
</style>