<template>
  <div>
    <kindo-box title="查询条件" icon="fa fa-search">
      <el-form :model="search" @submit.native.prevent inline @keyup.enter.native="getListData" label-width="110px">
        <el-form-item label="院内码：">
          <el-input v-model.trim="search.haCode" placeholder="输入医院诊断编码和名称"></el-input>
        </el-form-item>
        <el-form-item label="标准码：">
          <el-input v-model.trim="search.saCode" placeholder="输入标准诊断编码和名称"></el-input>
        </el-form-item>
        <el-form-item label="对接状态：">
          <el-radio-group v-model.trim="search.djSate">
            <el-radio v-for="item in source.djState" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="getListData">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="对接详情" icon="fa fa-list">
      <kindo-table :url="config.api.get" :queryParam="search" ref="table">
        <el-table-column label="医院诊断编码" prop="haCode" width="190px" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="医院诊断名称" prop="haName" min-width="240px" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="标准诊断编码" prop="saCode" width="180px" sortable="custom" show-overflow-tooltip></el-table-column>
        <el-table-column label="标准诊断名称" prop="saName" min-width="240px" align="left"></el-table-column>
        <el-table-column label="操作" width="100px" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.djState==='11'">
              <el-tooltip class="item" effect="dark" :open-delay="300" content="删除对接关系" placement="top-start">
                <el-button icon="el-icon-delete" @click="deleteRelation( scope.row)" type="text" size="small"> </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :open-delay="300" content="编辑对接关系" placement="top-start">
                <el-button icon="el-icon-edit" @click="edit( scope.row)" type="text" size="small"></el-button>
              </el-tooltip>
            </div>
            <div v-else>
              <el-tooltip class="item" effect="dark" :open-delay="300" content="开始对接" placement="top-start">
                <el-button icon="el-icon-refresh" @click="add( scope.row)" type="text" size="small"></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>
    <el-dialog v-drag :title="editTile" :visible.sync="dialogVisible" top="50px" width="500px">
      <el-form :model="form" label-width="120px" ref="formRef" :rules="formRules">
        <el-form-item label="标准诊断名称：" prop="saCode">
          <el-select style="width:300px;" v-model="form.saCode" filterable remote reserve-keyword placeholder="请输入名称或编码" :remote-method="(query)=>{remoteMethod(query,loading,'bzzdList',{rows:200})}" :loading="loading">
            <el-option v-for="item in list.bzzdList" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; ">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准诊断编码：">
          <el-input placeholder="" v-model="form.saCode" :disabled="true" style="width:300px;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import config from './config'
import mixin from '@src/utils/helper/mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
      config,
      operate: '',
      search: {
        haCode: '', // 院肉码
        saCode: '', // 国标码
        djSate: '11' // 对接状态
      },
      form: {
        id: '',
        saCode: ''
      },
      formRules: {
        saCode: [
          { required: true, message: '请选择输入', trigger: 'blur' }
        ]
      },
      list: {
        bzzdList: []
      },
      editForm: {
        id: '',
        sid: '',
        saCode: '',
        saName: ''
      },
      addForm: {
        sid: '',
        saCode: '',
        saName: '',
        hid: '',
        haCode: '',
        haName: ''
      },
      loading: false,
      editTile: '',
      dialogVisible: false,
      source: {
        // 查询条件中的“对接状态”字段
        djState: [
          {
            label: '人工已对接',
            value: '11'
          },
          {
            label: '未对接',
            value: '999'
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getListData()
    })
  },
  methods: {
    // 获取表格数据
    getListData() {
      this.$refs.table.reloadData()
    },
    // 编辑
    edit(row, operate) {
      this.editTile = '院内诊断：' + row.haName + '(' + row.haCode + ')'
      this.dialogVisible = true
      this.list.bzzdList = [{ label: row.saName, value: row.saCode }]
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
        this.form.saCode = row.saCode
        this.form.id = row.id
        this.editForm.id = row.id
      })
    },
    add(row) {
      this.editTile = '院内诊断：' + row.haName + '(' + row.haCode + ')'
      this.dialogVisible = true
      this.list.bzzdList = []
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
        this.form.id = undefined
        this.addForm.hid = row.hid
        this.addForm.haCode = row.haCode
        this.addForm.haName = row.haName
      })
    },
    save() {
      let self = this
      this.$refs.formRef.validate(valid => {
        if (valid) {
          let url = ''
          let params = {}
          let operate = 'put'
          this.list.bzzdList.map(item => {
            if (item.value === self.form.saCode) {
              if (self.form.id) {
                url = config.api.edit + '/' + item.id
                self.editForm.saCode = item.value
                self.editForm.saName = item.label
                self.editForm.sid = item.id
                params = Object.assign({}, self.editForm)
              } else {
                operate = 'post'
                url = config.api.add
                self.addForm.saCode = item.value
                self.addForm.saName = item.label
                self.addForm.sid = item.id
                params = Object.assign({}, self.addForm)
              }
            }
          })
          self.$http[operate](url, params).then(res => {
            kindo.util.alert(res.message, '提示', 'success')
            self.dialogVisible = false
            self.$refs.table.loadData()
          })
        }
      })
    },
    deleteRelation(row) {
      kindo.util.confirm('确定删除该术语关系吗? ', undefined, undefined, () => {
        this.$http.delete(config.api.delete + '/' + row.id).then(res => {
          kindo.util.alert('删除成功')
          this.getListData()
        })
      })
    }
  }
}
</script>
