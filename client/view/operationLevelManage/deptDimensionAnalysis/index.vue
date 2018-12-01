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
          <el-select v-model.trim="search.ksCode" placeholder="" filterable style="width:180px;" :clearable="true">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in dict.DICT_DYN_KESHI" :key="index" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="query">查询</el-button>
    </kindo-box>

    <kindo-box title="手术分布统计" icon="fa fa-bar-chart">
      <kindo-echart :options="stackbar" ref="distributeRef" autoResize></kindo-echart>
    </kindo-box>

    <kindo-box title="手术分布详情" icon="fa fa-list">
      <kindo-table :url="config.api.tablelist" :queryParam="search" ref="tableListRef" :default-sort="{prop:'deptName',order:'ascending'}">
        <el-table-column prop="deptName" label="出院科室" min-width="140px" header-align="center" sortable='custom' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.deptName===null?'-':scope.row.deptName}}
          </template>
        </el-table-column>
        <el-table-column prop="sscs" label="手术病例总数" width="130px" header-align="center" align="right" sortable='custom' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope) "> {{scope.row.sscs===null?'-':scope.row.sscs}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cyrs" label="出院人数" width="120px" header-align="center" sortable='custom' align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.cyrs===null?'-':scope.row.cyrs}}
          </template>
        </el-table-column>
        <el-table-column prop="sscs1" label="一级" width="80px" header-align="center" sortable='custom' align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope,'A') ">{{scope.row.sscs1===null?'-':scope.row.sscs1}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sscs2" label="二级" width="80px" sortable='custom' header-align="center" align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope,'B') ">{{scope.row.sscs2===null?'-':scope.row.sscs2}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sscs3" label="三级" width="80px" sortable='custom' header-align="center" align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope,'C') ">{{scope.row.sscs3===null?'-':scope.row.sscs3}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sscs4" label="四级" width="80px" sortable='custom' header-align="center" align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope,'D') ">{{scope.row.sscs4===null?'-':scope.row.sscs4}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sscstot" label="三四级手术数量" width="150px" sortable='custom' header-align="center" align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button type="text" @click="goSubstandardPage(scope,'E') ">{{scope.row.sscstot===null?'-':scope.row.sscstot}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sszb" label="三四级手术占比(%)" width="170px" sortable='custom' header-align="center" align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.sszb===null?'-':scope.row.sszb}}
          </template>
        </el-table-column>
        <el-table-column prop="zhjf" label="综合积分" width="120px" header-align="center" align="right" sortable='custom' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.zhjf===null?'-':scope.row.zhjf}}
          </template>
        </el-table-column>
        <el-table-column prop="sqpjzyr" label="术前平均住院天数" width="160px" header-align="center" sortable='custom' align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{kindo.util.formatNum(scope.row.sqpjzyr)}}
          </template>
        </el-table-column>
        <el-table-column prop="pjzyfy" label="平均住院费用(元)" width="160px" header-align="center" sortable='custom' align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{kindo.util.formatNum(scope.row.pjzyfy)}}
          </template>
        </el-table-column>
        <el-table-column prop="pjssfy" label="平均手术费用(元)" width="160px" header-align="center" sortable='custom' align="right" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{kindo.util.formatNum(scope.row.pjssfy)}}
          </template>
        </el-table-column>
      </kindo-table>
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable">导出</el-button>
      </div>
    </kindo-box>
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
        year: '',
        month: '',
        quarter: '',
        ksCode: ''
      },
      dateComb: {
        dateType: '3',
        visibleQuarter: false,
        visibleMonth: true,
        year: '',
        quarter: '',
        month: ''
      },
      dict: {
        DATE_TYPE: [],
        QUARTER: [],
        MONTH: [],
        DICT_DYN_KESHI: []
      },
      filtersDict: {},
      stackbar: {
        title: {
          // text: '手术分布统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
            // shadowStyle: { color: 'rgba(230, 221, 221, 0.12)' }
          }
          // formatter:
          // '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">{b0}</div>2<=RW<5：{c0}<br />5<=RW<10：{c1}<br />10<=RW：{c2}'
        },
        color: ['#A8C072', '#D7797F', '#FEB77F', '#5AAEEB', '#E3CD0D'],
        grid: {
          top: '10%',
          left: '3%',
          right: '3%',
          bottom: '15%',
          containLabel: true
        },
        legend: {
          data: ['一级手术', '二级手术', '三级手术', '四级手术', '出院人数']
        },
        yAxis: [
          {
            type: 'value',
            name: '手术次数',
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '出院人数',
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100
          }],
        xAxis: [
          {
            name: '科室名称',
            nameLocation: 'start',
            nameGap: 6,
            nameTextStyle: {
              verticalAlign: 'bottom',
              padding: [33, 4, 5, 6]
            },
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        series: [
          {
            name: '一级手术',
            type: 'bar',
            stack: '总量',
            barMaxWidth: '40',
            data: []
          },
          {
            name: '二级手术',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '三级手术',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '四级手术',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '出院人数',
            yAxisIndex: 1,
            type: 'line',
            data: [],
            smooth: true,
            showAllSymbol: true
          }
        ]
      },
      rowDetail: {},
      dialogVisible: false
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.search.ksCode = this.$route.query.ksCode
      this.dateComb.dateType = this.$route.query.dateType
      this.dateComb.year = this.$route.query.year
      this.dateComb.month = this.$route.query.month
      this.dateComb.quarter = this.$route.query.quarter
      this.dateComb.visibleQuarter = this.$route.query.visibleQuarter
      this.dateComb.visibleMonth = this.$route.query.visibleMonth
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.initTime()
    }
    this.getDictionary('dict')
  },
  mounted() {
    this.$nextTick(() => {
      this.query()
    })
  },
  methods: {
    query() {
      this.setSearchDate()
      this.queryBarChart()
      this.queryTableList()
    },
    queryBarChart() {
      let params = Object.assign({}, this.search)
      delete params.ksCode
      this.$http.get(config.api.chart, { params: params }).then(res => {
        let xAsisArr = []
        let tempArr1 = []
        let tempArr2 = []
        let tempArr3 = []
        let tempArr4 = []
        let tempArr5 = []
        if (res.data && res.data.length > 0) {
          // 这里做排序
          let sourceArr = res.data.map(item => {
            let tempItem = Object.assign({}, item, { itemSort: item.sscs1 + item.sscs2 + item.sscs3 + item.sscs4 })
            return tempItem
          })
          sourceArr.sort((itemA, itemB) => {
            return itemB.itemSort - itemA.itemSort
          })
          // 这里做所选科室排列第一
          if (this.search.ksCode !== '') {
            let indexObj = { index: 0, obj: {} }
            sourceArr.map((item, index) => {
              if (item.deptCode === this.search.ksCode) {
                indexObj.index = index
                indexObj.obj = item
              }
            })
            if (JSON.stringify(indexObj.obj) !== '{}') {
              sourceArr.splice(indexObj.index, 1)
              sourceArr.unshift(indexObj.obj)
              sourceArr.forEach((o, i) => {
                xAsisArr.push(o.deptName)
                tempArr1.push({ name: o.deptCode, value: o.sscs1 })
                tempArr2.push({ name: o.deptCode, value: o.sscs2 })
                tempArr3.push({ name: o.deptCode, value: o.sscs3 })
                tempArr4.push({ name: o.deptCode, value: o.sscs4 })
                tempArr5.push({ name: o.deptCode, value: o.cyrs })
              })
            }
          } else {
            sourceArr.forEach((o, i) => {
              xAsisArr.push(o.deptName)
              tempArr1.push({ name: o.deptCode, value: o.sscs1 })
              tempArr2.push({ name: o.deptCode, value: o.sscs2 })
              tempArr3.push({ name: o.deptCode, value: o.sscs3 })
              tempArr4.push({ name: o.deptCode, value: o.sscs4 })
              tempArr5.push({ name: o.deptCode, value: o.cyrs })
            })
          }
        }
        let tempObj = { show: true, end: 100 }
        // 标准为25个
        if (tempArr5.length < 25) {
          tempObj.show = false
          tempObj.end = 100
        } else {
          tempObj.show = true
          tempObj.end = parseInt(25 / tempArr5.length * 100)
        }
        if (this.$refs.distributeRef) {
          this.$refs.distributeRef.mergeOptions({ xAxis: { data: xAsisArr }, dataZoom: [tempObj], series: [{ data: tempArr1 }, { data: tempArr2 }, { data: tempArr3 }, { data: tempArr4 }, { data: tempArr5 }] })
        }
      })
    },
    queryTableList() {
      this.$refs.tableListRef.reloadData()
    },
    goSubstandardPage(scope, level) {
      let params = {}
      let year = ''
      if (typeof this.dateComb.year === 'object') {
        year = this.dateComb.year.getFullYear()
      } else {
        year = this.dateComb.year
      }
      if (this.dateComb.visibleMonth) {
        params = {
          // fromOneStart: year + '-' + this.dateComb.month + '-01',
          // fromOneEnd: this.getLastDay(year, this.dateComb.month)
          month: this.dateComb.month,
          quarter: ''
        }
      } else if (this.dateComb.visibleQuarter) {
        params = {
          // fromOneStart: year + '-' + this.dateComb.month + '-01',
          // fromOneEnd: this.getLastDay(year, this.dateComb.month)
          month: '',
          quarter: this.dateComb.quarter
        }
        // switch (this.dateComb.quarter) {
        //   case '1':
        //     // params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-01-01', fromOneEnd: this.getLastDay(year, '3') }
        //     params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-01-01', fromOneEnd: this.getLastDay(year, '3') }
        //     break
        //   case '2':
        //     params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-04-01', fromOneEnd: this.getLastDay(year, '6') }
        //     break
        //   case '3':
        //     params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-07-01', fromOneEnd: this.getLastDay(year, '9') }
        //     break
        //   case '4':
        //     params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-10-01', fromOneEnd: this.getLastDay(year, '12') }
        //     break
        // }
      }
      // else {
      //   params = { cykbbm: scope.row.deptCode, fromOneStart: year + '-01-01', fromOneEnd: this.getLastDay(year, '12') }
      // }
      if (!kindo.validate.isEmpty(level)) {
        params.ssfj = level
      }
      params.cykbbm = scope.row.deptCode
      this.$router.push({
        path: '/6945d60d-9868-4d76-a4b0-f1d3a5a63423/96c73d20-680b-4e14-bf2e-0eed4497f632',
        query: Object.assign(params, { dateType: this.dateComb.dateType, year: year, visibleQuarter: this.dateComb.visibleQuarter, visibleMonth: this.dateComb.visibleMonth })
      })
      kindo.cache.set('goBack', { from: '/6945d60d-9868-4d76-a4b0-f1d3a5a63423/303e5d0f-c3cb-42a9-b593-3feda770bbcc', params: Object.assign({}, this.search, this.dateComb) }, 'session')
    },
    exportTable() {
      this.setSearchDate()
      kindo.util.downloadFile(config.api.export, this.search)
    }
  }
}
</script>
