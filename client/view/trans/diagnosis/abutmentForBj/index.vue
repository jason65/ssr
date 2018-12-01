<!--
 *      pengzhen on 2017/5/18
 *      peng_zhen@outlook.com
 *
 *      诊断编码转换 - 编码标准对接
 -->

<template>
  <div>
    <el-row>
      <el-col :span="13">
        <el-form inline :model="hosForm" :rules="rules" ref="hosModel" onsubmit="return false;" @keyup.enter.native="getHos">
          <el-form-item prop="name">
            <el-tooltip effect="dark" content="请输入北京版编码或名称" placement="top">
              <el-input v-model="hosForm.name" placeholder="北京版..." style="width:185px;"></el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-button icon="search" @click="getHos">查 询</el-button>
            <el-button v-disabled="'save'" @click="quick">一级对接</el-button>
            <el-button v-disabled="'save'" @click="quick">二级对接</el-button>
          </el-form-item>
        </el-form>
        <kindo-table :url="hosApi" ref="hos" :queryParam="hosForm" :selection-change="hosOnSelect">
          <el-table-column type="selection" width="28"></el-table-column>
          <el-table-column prop="code" label="北京版编码" width="125" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
              <span v-if="scope.row.appendCode" style="color: firebrick">( {{ scope.row.appendCode }} )</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="北京版名称" min-width="125" sortable="custom" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="states" label="状态" width="65" align="center" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.states === '0'">待对接</span>
              <span type="text" v-if="scope.row.states === '1'">已对接</span>
              <el-popover trigger="hover" placement="top" v-if="scope.row.states === '2' || scope.row.states === '3' ">
                <p>理由: {{ scope.row.reason }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text">被驳回</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="130" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button icon="delete" @click="deleteHos(scope.row)">删 除</el-button>
              <el-button icon="arrow-right" type="primary" @click="recommend(scope.row)">推 荐</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-form inline :model="standardForm" :rules="rules" ref="standardModel" onsubmit="return false;" @keyup.enter.native="getStandard">
          <el-form-item prop="name">
            <el-tooltip effect="dark" content="请输入国标版编码或名称" placement="top">
              <el-input v-model="standardForm.name" placeholder="国标版..." style="width:185px;"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button icon="search" @click="getStandard">查 询</el-button>
          </el-form-item>
        </el-form>
        <kindo-table :url="standardApi" ref="standard" :queryParam="standardCondition">
          <el-table-column prop="code" label="国标版编码" width="125" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
              <span v-if="scope.row.appendCode" style="color: firebrick">( {{ scope.row.appendCode }} )</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="国标版名称" min-width="125" sortable="custom" show-overflow-tooltip inline-template>
            <span v-html="row.name"></span>
          </el-table-column>
          <el-table-column label="操作" align="center" width="110">
            <template slot-scope="scope">
              <el-button icon="share" @click="submitForRecommend(scope.row)">确 认 此 关 联 </el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      hosApi: config.api.hosApi,
      hosForm: {
        name: ''
      },

      standardApi: '',
      standardForm: {
        name: ''
      },

      recommendForm: {
        searchValue: '',
        category: ''
      },

      hosSelection: [],

      standardCondition: {},

      uploadVisible: false,
      uploadApi: kindo.util.setUri(config.api.uploadApi),
      uploadHeaders: {
        token: kindo.cache.get(kindo.constant.USER_TOKEN)
      },

      rules: {
        name: [
          { min: 0, max: 64, message: '请最多输入64个数字字母或汉字', trigger: 'blur' }
        ]
      }
    }
  },

  created() { },

  mounted() {
    this.$nextTick(function () {
      this.getHos()
      this.getStandard()
    })
  },

  methods: {
    // 获取院内数据
    getHos() {
      this.$refs.hosModel.validate(valid => {
        if (valid) {
          this.$refs.hos.loadData()
        }
      })
    },

    // 获取标准数据
    getStandard() {
      this.$refs.standardModel.validate(valid => {
        if (valid) {
          kindo.util.promise(() => {
            this.standardApi = config.api.standardApi
            this.standardCondition = this.standardForm
          }).then(() => {
            this.$refs.standard.loadData()
          })
        }
      })
    },

    // 删除北京版
    deleteHos(row) {
      this.$http.get(config.api.deleteHos, { params: { id: row.id } })
        .then(() => {
          kindo.util.alert('删除北京版成功')
          this.getHos()
          this.getStandard()
        })
    },

    // 推荐算法
    recommend(row) {
      kindo.util.promise(() => {
        this.$refs.hos.clearSelection()
        this.$refs.hos.toggleRowSelection(row, true)
        this.standardApi = config.api.recommendApi
        this.standardCondition = Object.assign({}, {
          searchValue: row.name,
          category: row.code
        })
      }).then(() => {
        this.$refs.standard.loadData()
      })
    },

    // 对接操作
    submitForRecommend(row) {
      if (this.hosSelection.length === 0) {
        kindo.util.alert('请至少选择一条北京版', undefined, 'warning')
        return
      }

      let param = {
        hosIds: this.hosSelection.map(item => item.id).toString(),
        standardIds: row.id
      }

      this.$http.post(config.api.submitApi, param).then(res => {
        kindo.util.alert(res.data.message)
        this.getHos()
        this.getStandard()
      })
    },

    hosOnSelect(selection) {
      this.hosSelection = selection
    },

    download() {
      window.open(kindo.util.setUri(config.api.downloadApi))
    },

    beforeAvatarUpload(file) {
      kindo.bus.$emit('loading', true)

      const isAllowSize = file.size / 1024 / 1024 < 20

      if (!isAllowSize) {
        kindo.util.alert('上传文件大小不能超过 20MB!', '提示', 'warning')
        kindo.bus.$emit('loading', false)
      }

      return isAllowSize
    },

    uploadSuccess(res, file, fileList) {
      kindo.bus.$emit('loading', false)

      kindo.util.alert(res.message)
      this.$refs.upload.clearFiles()
      this.uploadVisible = false
      this.getHos()
    },

    // 一级对接 &  二级对接
    quick() {
      this.$http.get(config.api.quick).then((res) => {
        let status = res.data.code
        if (status === '200') {
          this.$message({ message: '对接成功', type: 'success' })
        } else {
          this.$message({ message: '对接失败', type: 'warning' })
        }
      })
    }
  }
}
</script>

<style scope>
.titleBtn {
  width: 200px;
  top: -20px;
  position: absolute;
  left: 40%;
}
</style>
