<template>
  <div>
    <kindo-box icon="el-icon-search" title="条件筛选">
      <el-form inline label-position="right" label-width="100px" :model="form" @submit.native.prevent @keyup.enter.native="get">
        <el-form-item label="发布时间：">
          <el-date-picker v-model.trim="form.date" type="year" placeholder=""></el-date-picker>
        </el-form-item>

        <el-form-item label="发布版本：">
          <el-select v-model.trim="form.version" placeholder="">
            <el-option v-for="version in source.version" :key="version.version" :label="version.label" :value="version.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="版本详情" icon="el-icon-document">
      <kindo-table ref="table" :data="data" :url="this.api.get" :queryParam="form">
        <el-table-column label="版本号" prop="版本号" width="90" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="发布时间" prop="发布时间" width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="基础版本" prop="基础版本" width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="备注" min-width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="状态" width="80" align="left" sortable='custom'>
          <template slot-scope="scope">
            <span v-if="scope.row.状态 === '正常'" v-text="scope.row.状态" style="color: #67C23A"></span>
            <span v-else-if="scope.row.状态 === '待发布'" v-text="scope.row.状态" style="color: #409EFF"></span>
            <span v-else-if="scope.row.状态 === '已封存'" v-text="scope.row.状态" style="color: #878D99"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.状态 === '待发布'">
              <el-button title="发布" type="text" icon="el-icon-printer" @click="showPublish(scope.$index, scope.row)">发布</el-button>
              <el-button title="删除" type="text" icon="el-icon-delete">删除</el-button>
              <el-button title="详情" type="text" icon="el-icon-document" @click="showDetail(scope.$index, scope.row)">详情</el-button>
            </div>
            <div v-if="scope.row.状态 === '正常'">
              <el-button title="封存" style="color: #EB9E05" type="text" icon="fa-ban">封存</el-button>
              <el-button title="详情" type="text" icon="el-icon-document" @click="showDetail(scope.$index, scope.row)">详情</el-button>
            </div>
            <div v-if="scope.row.状态 === '已封存'">
              <el-button title="恢复" style="color: #878D99" type="text" icon="fa-repeat">恢复</el-button>
              <el-button title="详情" type="text" icon="el-icon-document" @click="showDetail(scope.$index, scope.row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </kindo-table>

      <div slot="control">
        <el-button type="primary" icon="el-icon-upload" @click="upload = true">上传</el-button>
      </div>
    </kindo-box>

    <el-dialog title="上传新版本" :visible.sync="upload">
      <el-alert style="margin-bottom: 24px;" title="您即将上传编码，完成上传后，系统生成v1.7版本" type="success" :closable="false"></el-alert>

      <el-form :model="uploadForm" label-width="120px">
        <el-form-item label="选择基础版本：">
          <el-select v-model.trim="uploadForm.version" placeholder="">
            <el-option v-for="version in source.diagnosisVersion" :key="version.id" :label="version.name" :value="version.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传新版本：">
          <el-upload ref="upload" drag style="text-align: center" action="">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em @click.stop="download">下载导入模版</em>
              <br> 将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过20000kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="upload = false">取消</el-button>
        <el-button @click="() => { kindo.util.alert('操作成功') }">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="版本发布" :visible.sync="publish">
      <el-form inline :model="publishForm">
        <el-form-item label="">
          <el-switch v-model.trim="publishForm.type" active-text="定时发布" inactive-text="即时发布"></el-switch>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-if="publishForm.type" v-model.trim="publishForm.date" placeholder=""></el-date-picker>
        </el-form-item>
      </el-form>

      <el-alert title="您即将发布 v1.6 版本, 相对于上一版本, 此次发布将影响 1162 条术语。" type="success" :closable="false"></el-alert>
      <el-alert style="margin-bottom: 24px;" title="完成发布，上一版本将被封存。" type="success" :closable="false"></el-alert>

      <kindo-table ref="table" :data="data" :url="this.api.get" :queryParam="form">
        <el-table-column label="术语编码" prop="术语编码" min-width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="术语名称" prop="术语名称" min-width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
      </kindo-table>

      <div slot="footer">
        <el-button @click="publish = false">取消</el-button>
        <el-button @click="() => { kindo.util.alert('操作成功') }">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编码详情" :visible.sync="detail">
      <el-alert title="当前版本为：v1.5, 基础版本为：2016版国标ICD10" type="success" :closable="false"></el-alert>
      <el-alert style="margin-bottom: 24px;" title="上一版本为：v1.4, 基础版本为：2014版国标ICD10" type="success" :closable="false"></el-alert>

      <div style="margin-bottom: 24px;">
        <el-button type="success" round>查看当前版本
          <i class="fa-compress"></i>
        </el-button>
        <el-button type="success" round>查看上一版本
          <i class="fa-compress"></i>
        </el-button>
        <el-button type="primary">与当前版本对比
          <i class="fa-compress"></i>
        </el-button>
        <el-button type="primary">与上一版本对比
          <i class="fa-compress"></i>
        </el-button>
      </div>

      <kindo-table ref="table" :data="data" :url="this.api.get" :queryParam="form">
        <el-table-column label="术语编码" prop="术语编码" min-width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="术语名称" prop="术语名称" min-width="120" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
      </kindo-table>
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
        date: '',
        version: ''
      },

      publishForm: {
        type: 0,
        date: new Date().proDate('{%d+1}')
      },

      uploadForm: {
        version: ''
      },

      source: {
        version: [
          { label: 'v1.0', value: 'v1.0' },
          { label: 'v1.1', value: 'v1.1' },
          { label: 'v1.2', value: 'v1.2' },
          { label: 'v1.3', value: 'v1.3' },
          { label: 'v1.4', value: 'v1.4' },
          { label: 'v1.5', value: 'v1.5' },
          { label: 'v1.6', value: 'v1.6' }
        ],
        diagnosisVersion: []
      },

      detail: false,
      publish: false,
      upload: false,

      data: [
        { 版本号: 'v1.6', 发布时间: '2017/01/02', 基础版本: '2016版国标ICD10', 状态: '待发布', 备注: '2016版国标湖北省修订版' },
        { 版本号: 'v1.5', 发布时间: '2017/01/02', 基础版本: '2016版国标ICD10', 状态: '正常', 备注: '正式启用2016版国标' },
        { 版本号: 'v1.4', 发布时间: '2013/08/11', 基础版本: '2014版国标ICD10', 状态: '已封存', 备注: '正式启用2014版国标' },
        { 版本号: 'v1.3', 发布时间: '2011/01/22', 基础版本: '2012版国标ICD10', 状态: '已封存', 备注: '正式启用2012版国标' },
        { 版本号: 'v1.2', 发布时间: '2009/01/01', 基础版本: '2008版协和ICD10', 状态: '已封存', 备注: '正式启用2008版协和' },
        { 版本号: 'v1.1', 发布时间: '2002/11/28', 基础版本: '2001版国标ICD10', 状态: '已封存', 备注: '2001版国标湖北省修订版' },
        { 版本号: 'v1.0', 发布时间: '2001/08/12', 基础版本: '2001版国标ICD10', 状态: '已封存', 备注: '正式启用2001版国标' }
      ]
    }
  },

  created() {
    this.$http.get(config.api.queryVersion).then(res => {
      this.source.diagnosisVersion = res.data
    })
  },

  methods: {
    get() {},

    showDetail() {
      this.detail = true
    },

    showPublish() {
      this.publish = true
    }
  }
}
</script>

<style>

</style>
