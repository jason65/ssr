<!--
 *      pengzhen on 2017/5/18
 *      peng_zhen@outlook.com
 *
 *      操作编码转换 - 编码对接一览
 -->

<template>
  <div>
    <kindo-box>
      <el-form inline :model="form" :rules="rules" ref="Model" onsubmit="return false;" @keyup.enter.native="get">
        <el-form-item prop="name">
          <el-tooltip effect="dark" content="请输入医院操作术语编码或名称" placement="top">
            <el-input v-model="form.name" placeholder="医院操作术语..." style="width:185px;"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="standardName">
          <el-tooltip effect="dark" content="请输入标准操作术语编码或名称" placement="top">
            <el-input v-model="form.standardName" placeholder="标准操作术语..." style="width:185px;"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.deptName" clearable filterable placeholder="选择科室...">
            <el-option v-for="item in source.deptName" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="get" icon="search">查 询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="exportData" icon="upload">导 出</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table :url="tableApi" ref="table" :queryParam="form">
        <el-table-column prop="hosCode" label="医院操作术语编码" width="130" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="name" label="医院操作术语名称" width="300" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="standardCode" label="标准操作术语编码" width="130" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="standardName" label="标准操作术语名称" width="300" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="记录" width="70" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>&#8195;对接人: {{ scope.row.createdBy }}</p>
              <p>对接时间: {{ kindo.util.formatTime(scope.row.createdDate) }}</p>
              <br>
              <p>&#8195;审核人: {{ scope.row.updatedBy }}</p>
              <p>审核时间: {{ kindo.util.formatTime(scope.row.updatedDate) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" icon="more">详 情</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button icon="d-arrow-left" @click="reject(scope.row)">驳 回</el-button>
          </template>
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
        name: '',
        standardName: '',
        deptName: ''
      },

      source: {
        deptName: []
      },

      token: kindo.cache.get(kindo.constant.USER_TOKEN),

      tableApi: config.api.query,

      rules: {
        name: [
          { min: 0, max: 64, message: '请最多输入64个数字字母或汉字', trigger: 'blur' }
        ],
        standardName: [
          { min: 0, max: 64, message: '请最多输入64个数字字母或汉字', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.$http.get(config.api.getDeptName).then((res) => {
      if (res.data) {
        this.source.deptName = res.data.map(item => item.deptName)
      }
    })
  },

  mounted() {
    this.$nextTick(function () {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.Model.validate(valid => {
        if (valid) {
          this.$refs.table.loadData()
        }
      })
    },

    reject(row) {
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$http.post(config.api.reject, {
          id: row.id,
          reason: value
        }).then(res => {
          kindo.util.alert(res.data.message)
          this.get()
        })
      })
    },

    exportData() {
      window.open(kindo.util.setUri(config.api.exportApi) + '?token=' + this.token)
    }
  }
}
</script>

<style scope>

</style>
