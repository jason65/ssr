<!--
 *      pengzhen on 2017/5/18
 *      peng_zhen@outlook.com
 *
 *      诊断编码转换 - 编码对接审核
 -->

<template>
  <div>
    <kindo-box>
      <el-form inline :model="form" :rules="rules" ref="Model" onsubmit="return false;" @keyup.enter.native="get">
        <el-form-item prop="name">
          <el-tooltip effect="dark" content="请输入北京版编码或名称" placement="top">
            <el-input v-model="form.name" placeholder="北京版..." style="width:185px;"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="standardName">
          <el-tooltip effect="dark" content="请输入国标版编码或名称" placement="top">
            <el-input v-model="form.standardName" placeholder="国标版..." style="width:185px;"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button @click="get" icon="search">查 询</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table :url="tableApi" ref="table" :queryParam="form">
        <el-table-column prop="hosCode" label="北京版编码" width="125" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="name" label="北京版名称" min-width="220" align="left" sortable="custom" show-overflow-tooltip></el-table-column>
        <el-table-column prop="standardCode" label="国标版编码" width="125" align="left" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.standardCode }}</span>
            <span v-if="scope.row.appendCode" style="color: firebrick">( {{ scope.row.appendCode }} )</span>
          </template>
        </el-table-column>
        <el-table-column prop="standardName" label="国标版名称" min-width="220" align="left" sortable="custom" show-overflow-tooltip></el-table-column>
        <el-table-column prop="djbs" label="对接标识" width="100" align="left" sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.djbs === '1'">一级对接</span>
            <span v-if="scope.row.djbs === '2'">二级对接</span>
            <span v-if="scope.row.djbs === '3'">三级对接</span>
          </template>
        </el-table-column>
        <el-table-column label="记录" width="70" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>&#8195;对接人: {{ scope.row.createdBy }}</p>
              <p>对接时间: {{ kindo.util.formatTime(scope.row.createdDate) }}</p>
              <br>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" icon="more">详 情</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button icon="d-arrow-left" @click="reject(scope.row)"> 驳 回 </el-button>
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
        standardName: ''
      },

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

  created() { },

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

    //  edit by pengzhen on 2017/7/17
    //  天津暂时去掉审核流程
    // resolve(row) {
    //   kindo.util.confirm('确定通过该术语关系吗? ', undefined, undefined, () => {
    //     this.$http.post(config.api.resolve, {
    //       id: row.id
    //     }).then(res => {
    //       kindo.util.alert(res.data.message)
    //       this.get()
    //     })
    //   })
    // },

    reject(row) {
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$http.get(config.api.reject, {
          params: {
            id: row.id,
            reason: value
          }
        }).then(res => {
          kindo.util.alert(res.data.message)
          this.get()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scope>

</style>
