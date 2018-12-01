<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="search" ref="searchForm" :inline="true" label-width="110px" label-position="right" @keyup.enter.native="get">
        <el-form-item label="系统类别：">
          <el-select v-model.trim="search.bzmc" filterable clearable placeholder="" class="searchInput">
            <el-option v-for="(item, index) in dictRemote.MXFS" :key="index" :label="item.XTMC" :value="item.XTMC"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主要诊断：">
          <el-input v-model.trim="search.icd10Code" placeholder="输入ICD10编码或主要诊断名称"></el-input>
        </el-form-item>
        <el-form-item label="主要操作：">
          <el-input v-model.trim="search.searchCode" placeholder="请输入主要操作或CCHI编码"></el-input>
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
        <el-table-column prop="xtmc" label="系统类别" min-width="150px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bzbm" label="病种编码" width="130px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="icd10Name" label="主要诊断" sortable='custom' width="130px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="icd10Code" label="ICD10编码" sortable='custom' width="120px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="zcz" label="主要操作" sortable='custom' width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="cchiCode" label="CCHI编码" sortable='custom' width="130px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
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
        searchCode: ''
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
    get() {
      this.$refs['table'].reloadData()
    },
    getDictRemote() {
      this.$http.get(config.api.queryMz).then(res => {
        this.dictRemote.MXFS = res.data
      })
    },
    exportTable() {
      this.search.cysjBegin = this.date ? this.date[0] : null
      this.search.cysjEnd = this.date ? this.date[1] : null
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