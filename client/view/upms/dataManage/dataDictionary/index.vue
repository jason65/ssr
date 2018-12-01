<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form v-model.trim="cateSearch" label-position="right" label-width="110px" inline @submit.native.prevent @keyup.enter.native="getCate">
        <el-form-item label="字典类型：">
          <el-input v-model.trim="cateSearch.catalog" placeholder="请输入字典类型"></el-input>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" v-disabled="'search'" @click="getCate">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="基础字典" icon="fa-area-chart" class="cateTable">
      <div slot="control">
        <el-button icon="el-icon-plus" @click="addCate" v-disabled="'add'">新增</el-button>
      </div>
      <kindo-table ref="table" :url="url" :queryParam="cateSearch" @row-click="tableClick" :page-size="5">
        <el-table-column label="字典类型" prop="catalog" width="200" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="catalogDesc" min-width="240" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="刷新" type="text" icon="fa-refresh" v-disabled="'other'" @click="reset(scope.$index, scope.row)"></el-button>
            <el-button title="编辑" type="text" icon="el-icon-edit" v-disabled="'edit'" @click="editCate(scope.$index, scope.row)"></el-button>
            <el-button title="删除" type="text" icon="el-icon-delete" v-disabled="'deleteData'" @click="deleteCate(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </kindo-table>

      <br>
      <br>
      <el-button icon="el-icon-plus" @click="addData" v-disabled="'add'" style="float:right;">新增</el-button>
      <kindo-table ref="dataTable" :url="url2" :queryParam="dataSearch" :page-size="5">
        <el-table-column label="key" prop="label" width="200" sortable show-overflow-tooltip></el-table-column>
        <el-table-column label="value" prop="value" min-width="240" sortable show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="删除" type="text" icon="el-icon-delete" v-disabled="'deleteData'" @click="deleteData(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <el-dialog v-drag :title="(cateModel.id === ''? '新增':'编辑') + '字典类型'" :visible.sync="cateVisible">
      <el-form :model="cateModel" :rules="cateRules" ref="cateModel" label-width="110px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="字典类型：" prop="catalog">
              <el-input v-model.trim="cateModel.catalog" label-width="200px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="备注：" prop="catalogDesc">
              <el-input type="textarea" :rows="2" v-model.trim="cateModel.catalogDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cateVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-drag title="字典数据新增" :visible.sync="dataVisible">
      <el-form :model="dataModel" :rules="dataRules" ref="dataModel" label-width="110px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="字典键：" prop="label" label-width="150px">
              <el-input v-model.trim="dataModel.label"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="字典值：" prop="value" label-width="150px">
              <el-input v-model.trim="dataModel.value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      url: config.api.getCate,
      url2: config.api.getData,

      // 字典类型查询实体
      cateSearch: {
        catalog: ''
      },

      // 字典类型实体
      cateModel: {
        id: '',
        catalog: '',
        catalogDesc: ''
      },

      // 字典数据实体
      dataModel: {
        id: '',
        label: '',
        value: '',
        catalog: ''
      },

      // 字典数据查询实体
      dataSearch: {
        label: '',
        catalog: ''
      },

      // 字典类型实体验证
      cateRules: {
        catalog: [
          { required: true, message: '请输入字典类型', trigger: 'change' },
          { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }
        ],
        catalogDesc: [{ min: 0, max: 255, message: '请输入最多255个字', trigger: 'change' }]
      },

      // 字典数据实体验证
      dataRules: {
        label: [
          { required: true, message: '请输入字典键', trigger: 'change' },
          { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请输入字典值', trigger: 'change' },
          { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }
        ]
      },

      // 字典类型编辑状态
      cateVisible: false,

      // 字典数据新增状态
      dataVisible: false
    }
  },

  created() {
    this._cateModel = Object.assign({}, this.cateModel)
    this._dataModel = Object.assign({}, this.dataModel)
  },

  mounted() {
    this.$nextTick(() => {
      this.getCate()
    })
  },

  methods: {
    // 查询数据字典类型
    getCate() {
      this.$refs.table.loadData().then(res => {
        this.$refs.table.setCurrentRowIndex(0)
        this.tableClick(res.data.rows[0])
      })
    },

    // 重新加载某字典类型数据字典缓存
    reset(index, row) {
      this.$http.get(config.api.reset, { params: { catalog: row.catalog } }).then(() => {
        kindo.util.alert('重新加载(' + row.catalog + ')数据字典缓存成功', '提示', 'success')
      })
    },

    // 当点击选中数据字典类型某一行时
    tableClick(row) {
      this.dataSearch.catalog = row.catalog
      this.dataModel.catalog = row.catalog
      this.dataModel.id = row.id
      this.getData()
    },

    // 新增数据字典类型
    addCate() {
      kindo.util
        .promise(() => {
          this.cateVisible = true
        })
        .then(() => {
          this.$refs.cateModel.resetFields()
        })
        .then(() => {
          this.cateModel = Object.assign(this.cateModel, this._cateModel)
        })
    },

    // 编辑数据字典类型
    editCate(index, row) {
      kindo.util
        .promise(() => {
          this.cateVisible = true
        })
        .then(() => {
          this.$refs.cateModel.resetFields()
        })
        .then(() => {
          this.$http.get(config.api.getDetail, { params: { id: row.id } }).then(res => {
            this.cateModel = Object.assign({}, row, res.data)
          })
        })
    },

    // 删除数据字典类型
    deleteCate(index, row) {
      kindo.util
        .promise(() => {
          this.cateModel = Object.assign({}, row)
        })
        .then(() => {
          kindo.util.confirm('确定删除吗?', undefined, undefined, () => {
            this.$http.post(config.api.deleteCate, { id: this.cateModel.id }).then(res => {
              kindo.util.alert('删除成功', '提示', 'success')
              this.getCate()
            })
          })
        })
    },

    // 保存数据字典类型(新增 / 修改)
    saveCate() {
      this.$refs.cateModel.validate(valid => {
        if (valid) {
          if (this.cateModel.id) {
            this.$http.post(config.api.editCate, this.cateModel).then(res => {
              kindo.util.alert('修改数据字典类型成功', '提示', 'success')
              this.cateVisible = false
              this.getCate()
            })
          } else {
            this.$http.post(config.api.addCate, this.cateModel).then(res => {
              kindo.util.alert('新增数据字典类型成功', '提示', 'success')
              this.cateVisible = false
              this.getCate()
            })
          }
        }
      })
    },

    // 查询数据字典
    getData() {
      this.$refs.dataTable.loadData()
    },

    // 新增数据字典名称
    addData() {
      kindo.util
        .promise(() => {
          this.dataVisible = true
        })
        .then(() => {
          this.$refs.dataModel.resetFields()
        })
    },

    // 删除数据字典名称
    deleteData(index, row) {
      kindo.util.confirm('确定删除吗?', undefined, undefined, () => {
        this.$http.post(config.api.deleteData, { id: row.id }).then(res => {
          kindo.util.alert('删除字典数据成功', '提示', 'success')
          this.getData()
        })
      })
    },

    // 保存字典数据(新增)
    saveData() {
      this.$refs.dataModel.validate(valid => {
        if (valid) {
          this.$http.post(config.api.insertData, this.dataModel).then(res => {
            kindo.util.alert('新增字典数据成功', '提示', 'success')
            this.dataVisible = false
            this.getData()
          })
        }
      })
    }
  },

  computed: {}
}
</script>

<style scoped>

</style>