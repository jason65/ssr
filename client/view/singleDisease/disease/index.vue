<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="search" ref="searchForm" :inline="true" label-width="100px" @keyup.enter.native="get">
        <el-form-item label="出院日期：">
          <el-select v-model.trim="dateComb.dateType" placeholder="请选择" style="width:70px" @change="dateCombChange">
            <el-option v-for="item in dict.DATE_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model.trim="dateComb.year" type="year" placeholder="请选择时间" :clearable="false" :editable="false" style="width:80px"></el-date-picker>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleQuarter" label="">
          <el-select v-model.trim="dateComb.quarter" style="width:90px;margin-left:5px;">
            <el-option v-for="item in dict.QUARTER" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleMonth" label="">
          <el-select v-model.trim="dateComb.month" style="width:85px;margin-left:5px;">
            <el-option v-for="item in dict.MONTH" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="search.deptCode" placeholder="" filterable :clearable="true">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in dict.DICT_DYN_KESHI" :key="index" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-input v-model.trim="search.czmcValue" placeholder="按病种名称/主要操作进行查找" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="get">查询</el-button>
    </kindo-box>
    <kindo-box title="单病种科室统计" icon="fa fa-bar-chart">
      <kindo-echart :options="bar" autoResize></kindo-echart>
    </kindo-box>
    <kindo-box title="单病种统计" icon="fas fa-list">
      <kindo-table :url="tableUrl" :queryParam="search" ref="table" width="100%" :pageSize="15" :default-sort="{prop:'blsl',order:'descending'}">
        <el-table-column prop="bzName" label="病种名称" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="zcz" label="主要操作" min-width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="mzlx" label="麻醉类型" width="120px" header-align="center" align="right"></el-table-column> -->
        <el-table-column prop="blsl" label="病例数" sortable='custom' width="120px" header-align="center" align="right">
          <template slot-scope="scope">
            <el-button type="text" @click="goTo(scope.row)">{{scope.row.blsl}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sqddsj" label="平均术前等待时间" width="160px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="zfy" label="总费用" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <!-- <el-table-column label="标准费用" sortable='custom' width="130px" header-align="center" align="right">
          <template slot-scope="scope"></template>
        </el-table-column> -->
        <el-table-column prop="cjfy" label="次均费用" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="cjypf" label="次均药品费" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="yzb" label="药占比（%）" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="cjwsclf" label="次均卫材费" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="wczb" label="卫材占比（%）" sortable='custom' width="150px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
      </kindo-table>
      <div slot="control">
        <el-button icon="iconfont el-icon-download" @click="exportTable">导出</el-button>
      </div>
    </kindo-box>
  </div>
</template>
<script>
import config from './config'
import 'echarts/lib/chart/bar'
import minxin from '@src/utils/helper/mixin.js'
export default {
  mixins: [minxin],
  data() {
    return {
      search: {
        year: '',
        month: '',
        quarter: '',
        deptCode: '',
        czmcValue: '',
        bzlx: 2
      },
      dateComb: {
        dateType: '3',
        visibleQuarter: false,
        visibleMonth: true,
        year: kindo.util.formatDate(new Date().getTime(), 'yyyy'),
        quarter: '',
        month: kindo.util.formatDate(new Date().getTime(), 'MM')
      },
      dict: {
        DATE_TYPE: [],
        MONTH: [],
        QUARTER: [],
        DICT_DYN_KESHI: []
      },
      bar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          },
          formatter: (params, ticket, callback) => {
            let paramsObj = Object.assign({}, this.search, { bzName: params[0].name })
            this.$http.get(config.api.queryZycz, { params: paramsObj }).then(res => {
              let html = `<p style="font-size:16px;color:#3fb1e3;margin-bottom:5px;">${params[0].name}</p>`
              for (let item of res.data) {
                html += `${item.ZCZ}：${item.BLSL}<br/>`
              }
              callback(ticket, html)
            })
            return '加载中...'
          },
          // alwaysShowContent: true,
          extraCssText: 'max-height:200px;overflow-y:auto'
        },
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          }
        }],
        xAxis: [{
          type: 'category',
          data: [],
          splitLine: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          barMaxWidth: '60',
          data: []
        }],
        dataZoom: [{
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 0,
          end: 100
        }]
      },
      tableUrl: config.api.listpage
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // 一定会存在时间和科室的字段
      this.search.deptCode = this.$route.query.deptCode
      this.dateComb.dateType = this.$route.query.dateType
      this.dateComb.year = this.$route.query.year.toString()
      this.dateComb.month = this.$route.query.month
      this.dateComb.quarter = this.$route.query.quarter
      this.dateComb.visibleQuarter = this.$route.query.visibleQuarter
      this.dateComb.visibleMonth = this.$route.query.visibleMonth
      if (this.$route.query.czmcValue && !kindo.validate.isEmpty(this.$route.query.czmcValue)) {
        this.search.czmcValue = this.$route.query.czmcValue
      }
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      let dateDefault = this.returnTime()
      this.dateComb.dateType = dateDefault[0]
      this.dateComb.year = dateDefault[1]
      this.dateComb.month = dateDefault[3]
    }
    this.getDictionary('dict')
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  methods: {
    goBack() {
      console.log(this.condition)
      if (JSON.stringify(this.condition) !== '{}') {
        this.$router.push({
          path: kindo.cache.get('goBack').from,
          query: kindo.cache.get('goBack').params
        })
      }
    },
    get() {
      this.setSearchDate()
      this.getBar()
      this.getTable('table')
    },
    getBar() {
      this.$http.get(config.api.bar, { params: this.search }).then(res => {
        let data = res.data
        this.bar.series[0].data = []
        this.bar.xAxis[0].data = []
        for (let item of data) {
          this.bar.series[0].data.push(item.BLSL)
          this.bar.xAxis[0].data.push(item.BZ_NAME)
        }
        this.setDataZoom(data.length, 'bar')
      })
    },
    exportTable() {
      // kindo.util.alert('功能正在建设中...', '提示')
      this.setSearchDate()
      kindo.util.downloadFile(config.api.export, this.search)
    },
    goTo(row) {
      let params = {}
      let year = ''
      if (typeof this.dateComb.year === 'object') {
        year = this.dateComb.year.getFullYear()
      } else {
        year = this.dateComb.year
      }
      if (this.dateComb.visibleMonth) {
        params = {
          month: this.dateComb.month,
          quarter: ''
        }
      } else if (this.dateComb.visibleQuarter) {
        params = {
          month: '',
          quarter: this.dateComb.quarter
        }
      }
      params.deptCode = this.search.deptCode
      params.bzmc = row.bzName
      params.bzlx = 2
      this.$router.push({
        path: '/9bd2caf7-24ac-423e-8892-f3a316a5abf2/10edf88b-e7b8-449a-a538-9faa3c4ac0a1',
        query: Object.assign({}, this.dateComb, params, { year: year })
      })
      kindo.cache.set('goBack', { from: '/9bd2caf7-24ac-423e-8892-f3a316a5abf2/73af2f65-86ea-4a05-b4a8-175f5ee05294', params: Object.assign({}, this.search, this.dateComb) }, 'session')
    }
  }
}
</script>
<style type="text/css" scoped>
/*.echarts ::-webkit-scrollbar{width:4px;}*/
</style>