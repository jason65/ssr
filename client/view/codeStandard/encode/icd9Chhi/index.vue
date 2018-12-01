<template>
  <div>
    <kindo-box title="查询条件" icon="fa fa-search">
      <el-form :model="search" @submit.native.prevent inline @keyup.enter.native="getListData" label-width="110px">
        <el-form-item label="院内码：">
          <el-input v-model.trim="search.icdNine" placeholder="输入医院操作编码和名称"></el-input>
        </el-form-item>
        <el-form-item label="标准码：">
          <el-input v-model.trim="search.cchi" placeholder="输入标准操作编码和名称"></el-input>
        </el-form-item>
        <el-form-item label="对接状态：">
          <el-radio-group v-model.trim="search.djState">
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
        <el-table-column label="医院操作编码" prop="icdNineCode" width="190px" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="医院操作名称" prop="icdNineName" min-width="240px" align="left" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="标准操作编码" prop="cchiCode" width="180px" sortable="custom" show-overflow-tooltip></el-table-column>
        <el-table-column label="标准操作名称" prop="cchiName" min-width="240px" align="left"></el-table-column>
        <el-table-column label="操作" width="100px" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.djState==='10'">
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
      <el-form :model="form" label-width="160px" ref="formRef" :rules="formRules">
        <el-form-item label="标准操作名称：" prop="cchiCode">
          <el-select v-model="form.cchiCode" filterable remote style="width:300px;" reserve-keyword placeholder="请输入名称或编码" :remote-method="(query)=>{remoteMethod(query,loading,'bzczList',{rows:200})}" :loading="loading">
            <el-option v-for="item in list.bzczList" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; ">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准操作编码：">
          <el-input placeholder="" v-model="form.cchiCode" :disabled="true" style="width:300px;">
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
      search: {
        icdNine: '', // 院肉码
        cchi: '', // 国标码
        djState: '10' // 对接状态
      },
      list: { bzczList: [] },
      form: {
        id: '',
        cchiCode: ''
      },
      formRules: {
        cchiCode: [
          { required: true, message: '请选择输入', trigger: 'blur' }
        ]
      },
      editForm: {
        id: '',
        sid: '',
        cchiCode: '',
        cchiName: ''
      },
      addForm: {
        sid: '',
        cchiCode: '',
        cchiName: '',
        hid: '',
        icdNineCode: '',
        icdNineName: ''
      },
      loading: false,
      editTile: '',
      dialogVisible: false,
      source: {
        // 查询条件中的“对接状态”字段
        djState: [
          {
            label: '人工已对接',
            value: '10'
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
      this.editTile = '院内操作：' + row.icdNineName + '(' + row.icdNineCode + ')'
      this.dialogVisible = true
      this.list.bzczList = [{ label: row.cchiName, value: row.cchiCode }]
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
        this.form.cchiCode = row.cchiCode
        this.form.id = row.id
        this.editForm.id = row.id
      })
    },
    add(row) {
      this.editTile = '院内操作：' + row.icdNineName + '(' + row.icdNineCode + ')'
      this.dialogVisible = true
      this.list.bzczList = []
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
        this.addForm.hid = row.hid
        this.form.id = undefined
        this.addForm.icdNineCode = row.icdNineCode
        this.addForm.icdNineName = row.icdNineName
      })
    },
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          let url = ''
          let params = {}
          let operate = 'put'
          this.list.bzczList.map(item => {
            if (item.value === this.form.cchiCode) {
              if (this.form.id) {
                url = config.api.edit + '/' + this.editForm.id
                this.editForm.cchiCode = item.value
                this.editForm.cchiName = item.label
                this.editForm.sid = item.id
                params = Object.assign({}, this.editForm)
              } else {
                operate = 'post'
                url = config.api.add
                this.addForm.cchiCode = item.value
                this.addForm.cchiName = item.label
                this.addForm.sid = item.id
                params = Object.assign({}, this.addForm)
              }
            }
          })
          this.$http[operate](url, params).then(res => {
            kindo.util.alert(res.message, '提示', 'success')
            this.dialogVisible = false
            this.$refs.table.loadData()
          })
        }
      })
    },
    deleteRelation(row) {
      kindo.util.confirm('确定删除该术语关系吗? ', undefined, undefined, () => {
        this.$http.delete(config.api.delete + '/' + row.id).then(res => {
          kindo.util.alert(res.data.message)
          this.getListData()
        })
      })
    }
  }
}
</script>
