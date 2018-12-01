<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form v-model.trim="form" label-position="right" label-width="110px" inline @submit.native.prevent @keyup.enter.native="get">
        <el-form-item label="参数名称：">
          <el-input v-model.trim="form.paramCode" placeholder="请输入系统参数名称"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model.trim="form.paramDesc" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" v-disabled="'search'" @click="get">查询</el-button>
        <el-button type="success" style="padding: 10px 20px" v-disabled="'other'" @click="refresh">刷新缓存</el-button>
      </div>
    </kindo-box>

    <kindo-box title="参数信息" icon="fa-area-chart">
      <kindo-table ref="table" :url="url" :queryParam="form">
        <el-table-column label="系统参数" prop="paramCode" width="140" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="参数值" prop="value" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="描述" prop="paramDesc" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="修改" type="text" icon="el-icon-edit" v-disabled="'edit'" @click="update(scope.$index, scope.row)"></el-button>
            <el-button title="重置" type="text" icon="el-icon-minus" v-disabled="'search'" @click="revert(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <el-dialog v-drag :visible.sync="visible1" title="修改系统参数">
      <el-form :model="model1" :rules="rules" ref="model1" label-width="150px">
        <el-form-item label="系统参数：" prop="paramCode">
          <el-input v-model.trim="model1.paramCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="paramDesc">
          <el-input v-model.trim="model1.paramDesc" disabled></el-input>
        </el-form-item>
        <el-form-item label="参数值：" prop="value">
          <el-input v-model.trim="model1.value"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible1 = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      // 用户表查询
      url: config.api.get,

      // 是否修改密码状态
      visible1: false,

      // 查询实体
      form: {
        paramCode: '',
        paramDesc: ''
      },

      rules: {
        value: [{ required: true, message: '请输入参数值', trigger: 'change' }, { min: 0, max: 16, message: '请输入最多16个字', trigger: 'change' }]
      },

      // 编辑实体
      model1: {
        id: '',
        value: ''
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    // 刷新缓存
    refresh() {
      this.$http.get(config.api.refresh).then(res => {
        kindo.util.alert(res.message)
      })
    },

    // 查询系统参数
    get() {
      this.$refs.table.loadData()
    },

    // 修改系统参数
    update(index, row) {
      kindo.util
        .promise(() => {
          this.visible1 = true
        })
        .then(() => {
          this.$refs.model1.resetFields()
        })
        .then(() => {
          this.model1 = Object.assign({}, row)
        })
    },

    // 重置系统参数
    revert(index, row) {
      kindo.util.confirm('确定重置系统参数吗?', undefined, undefined, () => {
        this.$http.post(config.api.revert, { id: row.id }).then(res => {
          kindo.util.alert('重置系统参数成功', '提示', 'success')
          this.get()
        })
      })
    },

    // 修改系统参数保存
    save() {
      this.$refs.model1.validate(valid => {
        if (valid) {
          let params = {}
          params = {
            id: this.model1.id,
            value: this.model1.value
          }
          this.$http.post(config.api.update, params).then(res => {
            kindo.util.alert('修改系统参数成功', '提示', 'success')
            this.visible1 = false
            this.get()
          })
        }
      })
    }
  }
}
</script>