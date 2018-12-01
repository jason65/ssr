<template>
  <div>
    <kindo-box icon="el-icon-search" title="条件筛选">
      <el-form :model="form" inline label-position="right" label-width="100px" @submit.native.prevent @keyup.enter.native="get">
        <el-form-item label="菜单名称：">
          <el-input v-model.trim.trim="form.name" placeholder=""></el-input>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" v-disabled="'search'" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box icon="el-icon-document" title="菜单列表">
      <kindo-table ref="tree" :url="this.api.get" :queryParam="form" :loadFilter="loadFilter" :height="null" :pagination="false">
        <el-table-column label="-" width="40" align="center">
          <template slot-scope="scope">
            <i :class="scope.row.iconUrl"></i>
          </template>
        </el-table-column>
        <el-table-tree-column fileIcon="fa-file" folderIcon="fa-folder" :remote="remoteData" parentKey="pid" prop="name" label="菜单名称" width="380" :show-overflow-tooltip="true"></el-table-tree-column>
        <el-table-column label="路由路径" prop="routerPath" min-width="380" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="排序" prop="sort" width="60" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="新增" type="text" icon="el-icon-plus" v-disabled="'add'" @click="add(scope.$index, scope.row)"></el-button>
            <el-button v-if="scope.row.pid" title="编辑" type="text" v-disabled="'edit'" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"></el-button>
            <el-button v-if="scope.row.pid" title="删除" type="text" v-disabled="'deleteData'" icon="el-icon-delete" @click="del(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <el-dialog v-drag title="菜单信息" :visible.sync="visible">
      <el-form ref="model" :model="model" :rules="rules" label-width="110px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="菜单名称：" prop="name">
              <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="菜单路径：" prop="routerPath">
              <el-input v-model.trim="model.routerPath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="图标字体：" prop="iconUrl">
              <el-input v-model.trim="model.iconUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="外链链接：" prop="href">
              <el-input v-model.trim="model.href"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="排序标识：" prop="sort">
              <el-input v-model.trim.number="model.sort" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="remark">
            <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" :rows="1" v-model.trim="model.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" icon="check" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      api: config.api,

      form: {
        name: ''
      },

      visible: false,

      model: {
        id: '',
        name: '',
        routerPath: '',
        iconUrl: '',
        sort: 0,
        pid: '',
        href: '',
        show: 1,
        remark: '',
        depth: ''
      },

      rules: {
        name: [{ min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        routerPath: [{ min: 0, max: 120, message: '请输入最多120个字', trigger: 'change' }],
        iconUrl: [{ min: 0, max: 64, message: '请输入最多32个字', trigger: 'change' }],
        href: [{ min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        remark: [{ min: 0, max: 250, message: '请输入最多250个字', trigger: 'change' }]
      },

      loadFilter(res) {
        res.data.sort((a, b) => {
          return a.sort - b.sort
        })

        res.data = kindo.util.toTree(res.data, 'id', 'pid')

        return res
      }
    }
  },

  created() {
    this._model = Object.assign({}, this.model)
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    remoteData(r, c) {
      setTimeout(function() {
        c(r.children)
      }, 1)
    },

    get(row) {
      this.$refs.tree.loadData()
    },

    add(index, row) {
      this.visible = true

      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.model = Object.assign({}, this._model)

        this.model.sort = row.children ? row.children.length : 0
        this.model.pid = row.id
        this.model.depth = row.depth
      })
    },

    edit(index, row) {
      this.visible = true

      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.model = Object.assign({}, this._model, row)
      })
    },

    save() {
      this.$refs.model.validate(valid => {
        if (valid) {
          if (this.model.id) {
            this.$http.post(this.api.update, this.model).then(res => {
              kindo.util.alert(res.message, '提示', 'success')
              this.visible = false
              this.get()
            })
          } else {
            this.$http.post(this.api.insert, this.model).then(res => {
              kindo.util.alert(res.message, '提示', 'success')
              this.visible = false
              this.get()
            })
          }
        }
      })
    },

    del(index, row) {
      kindo.util.confirm('确定删除吗？', undefined, undefined, () => {
        this.$http.post(this.api.delete, { id: row.id }).then(res => {
          kindo.util.alert(res.message, '提示', 'success')
          this.get()
        })
      })
    }
  }
}
</script>

<style >
.el-transfer .el-transfer-panel {
  width: calc(50% - 50px);
}
</style>
