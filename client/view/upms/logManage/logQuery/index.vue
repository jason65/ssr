<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" @keyup.enter.native="get" label-position="right" label-width="110px" :model="search" ref="searchForm" :inline="true">
        <el-form-item label="开始日期：" prop="startDate">
          <el-date-picker v-model.trim="search.startDate" placeholder="请选择时间" :editable="false" :picker-options="{disabledDate:val=>val.getTime() > Date.parse(search.endDate)}"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：" prop="endDate">
          <el-date-picker v-model.trim="search.endDate" placeholder="请选择时间" :editable="false" :picker-options="{disabledDate:val=>val.getTime() < Date.parse(search.startDate)}"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model.trim="search.userName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
      <div slot="more">
        <el-form onsubmit="return false;" @keyup.enter.native="get" label-position="right" label-width="110px" :model="search" ref="searchMoreForm" :inline="true">
          <el-form-item label="API路径：">
            <el-input v-model.trim="search.apiUrl"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </kindo-box>
    <kindo-box>
      <kindo-table ref="table" :url="url" :queryParam="search">
        <!-- <el-table-column label="记录ID" prop="uuid" sortable='custom' width="150" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column label="Token" prop="token" sortable='custom' width="350" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="操作用户" prop="userName" width="150" show-overflow-tooltip></el-table-column>-->
        <el-table-column label="API路径" prop="apiUrl" sortable='custom' width="280" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="请求参数" prop="parameters" sortable='custom' width="150" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="访问IP" prop="remoteAddr" sortable='custom' width="140" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="菜单（功能模块）" prop="menuModel" sortable='custom' width="160" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="请求访问" prop="httpMethod" sortable='custom' width="110" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="请求结果状态码" prop="responseCode" sortable='custom' width="150" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="请求结果消息" prop="responseMessage" sortable='custom' width="150" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作时间" prop="operDate" sortable='custom' width="150" align="left" show-overflow-tooltip :formatter="(row, column) => kindo.util.formatTime(row[column.property])"></el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>
<script>
import config from './config/index'
export default {
  data() {
    return {
      search: {
        startDate: kindo.util.formatDate(new Date().getTime() - 1000 * 60 * 60 * 24 * 31),
        endDate: kindo.util.formatDate(new Date()),
        userName: '',
        apiUrl: ''
      },
      url: config.api.get,

      RES: []
      // searchRules: {
      //   startDate: { required: true, message: '请选择开始日期', trigger: 'change' },
      //   endDate: { required: true, message: '请选择结束日期', trigger: 'change' }
      // },
    }
  },
  create() {},
  mounted() {
    this.get()
  },
  methods: {
    get() {
      this.$refs['searchForm'].validate(valid => {
        if (valid) {
          this.$refs.table.reloadData()
        }
      })
    }
  },
  watch: {
    'search.startDate'(v) {
      this.search.startDate = kindo.util.formatDate(v)
    },
    'search.endDate'(v) {
      this.search.endDate = kindo.util.formatDate(v)
    }
  }
}
</script>
<style scoped>
.iframe {
  width: 100%;
  height: 1000px;
  overflow: hidden;
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}

table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}

table.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}

.el-tab-pane {
  height: 500px;
  overflow-y: auto;
}

dt,
dd {
  font-size: 14px;
  padding: 7px 6px 7px 0;
}

.newtable {
  margin-bottom: 20px;
}

.newtable .el-row {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #d1dbe5;
  background-color: #ffffff;
}

.el-form-item {
  margin-bottom: 5px !important;
}

.newtable .el-row div div label {
  font-weight: bold;
  font-size: 30px;
}
</style>