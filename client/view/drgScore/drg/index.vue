<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="searchForm" :rules="searchRules" ref="searchForm" :inline="true" label-width="100px">
        <el-form-item label="出院日期：" prop="dateType">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="MDC：" prop="MDCCode">
          <el-select v-model.trim="searchForm.MDCCode" placeholder="" style="width:180px;" :clearable="true">
            <el-option v-for="item in Deplist" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="get">查询</el-button>
    </kindo-box>
    <kindo-box title="DRG指标分析" icon="fa fa-bar-chart" style="height:500px">
      <el-tabs type="card" v-model.trim="view.tab.activeName" @tab-click="tabClick">
        <el-tab-pane name="效率指标">
          <span slot="label">
            <i class="el-icon-date"></i> 效率指标</span>
          <kindo-echart :options="view.tab.效率指标options" autoResize></kindo-echart>
        </el-tab-pane>

        <el-tab-pane name="CMI">
          <span slot="label">
            <i class="el-icon-date"></i> CMI</span>
          <el-form label="TOP" :model="cmiTop" onsubmit="return false;" :inline="true" align="right" style="margin-right:60px;">
            <el-form-item label="TOP">
              <el-select v-model.trim="cmiTop.top" style="width:80px">
                <el-option label="50" value="50"></el-option>
                <el-option label="40" value="40"></el-option>
                <el-option label="30" value="30"></el-option>
                <el-option label="20" value="20"></el-option>
                <el-option label="10" value="10"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <kindo-echart :options="view.tab.CMIoptions" autoResize></kindo-echart>
        </el-tab-pane>

        <el-tab-pane name="安全指标">
          <span slot="label">
            <i class="el-icon-date"></i> 安全指标</span>
          <el-row>
            <el-col :span="12">
              <kindo-echart :options="view.tab.AQZB1" autoResize></kindo-echart>
            </el-col>
            <el-col :span="12">
              <kindo-echart :options="view.tab.AQZB2" autoResize></kindo-echart>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
    </kindo-box>
    <kindo-box title="综合指标详情" icon="fas fa-list">
      <kindo-table :url="url.listpage" :queryParam="searchForm" ref="table2" width="100%" :pageSize="15" :default-sort="{prop:'jbgindrgnum',order:'descending'}">
        <el-table-column prop="jbgdrgcode" label="DRG编码" width="140px" header-align="center" sortable='custom'></el-table-column>
        <el-table-column prop="jbgdrgname" label="DRG名称" width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="jbgindrgnum" label="入组病例数" width="130px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <el-button type="text" @click="goTo(scope.row)">{{scope.row.jbgindrgnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jbgrwt" label="总权重" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgnxzs" label="能效指数" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgfwnlzs" label="服务能力指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgfwxlzs" label="服务效率指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgcmi" label="CMI" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgcostsi" label="费用消耗指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgcjfy" label="次均费用" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbghyljfy" label="行业例均费用" width="160px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgtimesi" label="时间消耗指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbgpjzyr" label="平均住院日" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="120px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbghypjzyr" label="行业平均住院日" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="150px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbglowswl" label="低风险组死亡率（%）" width="190px" header-align="center" align="right" sortable='custom' :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="jbglownum" label="低风险组死亡人数" width="190px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <span v-if="kindo.validate.isEmpty(scope.row.jbglownum)">-</span>
            <span v-else>
              <el-button type="text" @click="goToStandardPage(scope.row,undefined,{mlRisk:'1'}) ">{{scope.row.jbglownum}}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="jbgmedswl" label="中低风险组死亡率（%）" width="200px" header-align="center" align="right" sortable='custom' :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="jbgmednum" label="中低风险组死亡人数" width="200px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <span v-if="kindo.validate.isEmpty(scope.row.jbgmednum)">-</span>
            <span v-else>
              <el-button type="text" @click="goToStandardPage(scope.row,undefined,{mlRisk:'2'}) ">{{scope.row.jbgmednum}}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60" header-align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" :class="isCompare(scope.row, 'jbgdrgcode') === true ? 'hide' : 'show'" @click="compareSel(scope.$index, scope.row)">对比
              <i class="el-icon-fa-compress el-icon--right"></i>
            </el-button>
            <span style="color:#999;font-size:13px;" :class="isCompare(scope.row, 'jbgdrgcode') === true ? 'show' : 'hide'">已加入</span>
          </template>
        </el-table-column>
      </kindo-table>
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable(url.exportTable, searchForm)">导出</el-button>
      </div>
    </kindo-box>
    <!-- 对比弹框 -->
    <div :class="compare.selectVisi ? 'show' : 'hide'" class="compareDialog">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">DRG对比</span>
          <span style="font-size:12px;color:#999;margin-left: 10px;">最多5个</span>
          <el-button style="float: right" @click="compareRemoveAll()">取消对比</el-button>
          <el-button type="primary" style="float: right;margin-right: 10px;" @click="compareDate($event, 'jbgdrgcode')">开始对比</el-button>
        </div>
        <table class="item">
          <tr v-for="(row, index) in compare.selection" :key="row.jbgdrgcode">
            <td width="30%">{{row.jbgdrgcode}}</td>
            <td width="30%">{{row.jbgdrgname}}</td>
            <td>
              <el-button type="text" size="small" @click="compareRemoveSingle(row, index)">
                <i class="el-icon-close" style="color:#666;font-size:14px;"></i>
              </el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
    <!-- 对比结果弹框 -->
    <el-dialog title="DRG对比" :visible.sync="compare.visible" width="90%" :before-close="handleClose" v-drag>
      <el-row>
        <el-col :span="12">
          <kindo-echart :options="view.compare.radarChart" autoResize></kindo-echart>
        </el-col>
        <el-col :span="12">
          <table class="table-list">
            <tr>
              <th>指标</th>
              <th v-for="(item, index) in source.tabledd" :key="index">{{item.itemName}}</th>
            </tr>
            <tr v-for="(title, index) in source.tableList" :key="index">
              <td class="normal">{{title}}</td>
              <td v-show="title==='入组病例数'" v-for="item in source.tabledd" :key="item.id">
                {{item.jbgindrgnum }}
              </td>
              <td v-show="title==='CMI值'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.cmmi, 2)}}
              </td>
              <td v-show="title==='时间消耗指数'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.timeCostSi, 2)}}
              </td>
              <td v-show="title==='费用消耗指数'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.feeCostSi, 2)}}
              </td>
              <td v-show="title==='低风险组死亡率(%)'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.lowDieRate, 2)}}
              </td>
              <td v-show="title==='中低风险组死亡率(%)'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.midLowDieRate, 2)}}
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <kindo-echart :options="view.compare.stackbar" autoResize></kindo-echart>
        </el-col>
        <el-col :span="12">
          <table class="table-list">
            <tr>
              <th>指标</th>
              <th v-for="vfitem in source.tabledd" :key="vfitem.id">{{vfitem.itemName}}</th>
            </tr>
            <tr v-for="title2 in source.fyList" :key="title2">
              <td class="normal">{{title2}}</td>
              <td v-show="title2==='药品类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.ypfyRate, 2)}}%
              </td>
              <td v-show="title2==='综合服务类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.zhfyRate, 2)}}%
              </td>
              <td v-show="title2==='诊断类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.zdfyRate, 2)}}%
              </td>
              <td v-show="title2==='治疗类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.zlfyRate, 2)}}%
              </td>
              <td v-show="title2==='血液和血液制品类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.xyfyRate, 2)}}%
              </td>
              <td v-show="title2==='材料类'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.clfyRate, 2)}}%
              </td>
              <td v-show="title2==='其他'" v-for="item in source.tabledd" :key="item.id">
                {{kindo.util.formatNum(item.qtfyRate, 2)}}%
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import config from './config'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'
import mixinKPI from '@src/utils/helper/mixinKPI.js'
export default {
  mixins: [mixinKPI],
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  data() {
    return {
      searchTemp: {
        richDatePicker: ['3', new Date().formatDate('yyyy'), null, '01']
      },
      queryHosUrl: kindo.api.qualitygroup + config.api.queryhospital,
      compDialVisi: false,
      compObj: [],
      cmiTop: {
        top: '50'
      },
      compare: {
        selectVisb: false,
        visible: false,
        url: config.api.compare,
        isJoin: false,
        selection: []
      },
      view: {
        tab: {
          activeName: '效率指标',
          效率指标options: {},
          AQZB1: {},
          AQZB2: {},
          CMIoptions: {}
        },
        compare: {
          radarChart: {},
          stackbar: {}
        }
      },
      // 数据字典分类
      Deplist: [],
      searchForm: {
        year: '',
        quarter: '',
        month: '',
        MDCCode: ''
      },
      searchRules: {
        year: { required: true, message: '请选择年份', trigger: 'change' }
      },
      source: {
        tabledd: [],
        tableList: ['入组病例数', 'CMI值', '时间消耗指数', '费用消耗指数', '低风险组死亡率(%)', '中低风险组死亡率(%)'],
        fyList: ['药品类', '综合服务类', '诊断类', '治疗类', '血液和血液制品类', '材料类', '其他']
      },
      url: {
        linebar: config.api.linebar,
        cmibar: config.api.cmibar,
        scatter2: config.api.scatter2,
        bar1: config.api.bar1,
        bar2: config.api.bar2,
        listpage: config.api.listpage,
        compare: config.api.compare,
        exportTable: config.api.exportTable
      }
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // 一定会存在时间和科室的字段
      this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      if (this.$route.query.MDCCode && !kindo.validate.isEmpty(this.$route.query.MDCCode)) {
        this.searchForm.MDCCode = this.$route.query.MDCCode
      }
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.searchTemp.richDatePicker = this.returnTime()
    }
    this.initCharts()
    this.$http.get(config.api.getQuery, { params: { catalog: 'DICT_DYN_MDC' } }).then(res => {
      if (res.data) {
        this.Deplist = res.data
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  methods: {
    goTo(row) {
      let params = {}
      if (this.searchForm.month !== '') {
        let year = this.searchForm.month.substr(0, 4)
        let month = this.searchForm.month.substr(4)
        params = { dateType: '3', year: year, month: month, quarter: '' }
      } else if (this.searchForm.quarter !== '') {
        let year = this.searchForm.quarter.substr(0, 4)
        params = { dateType: '2', year: year, month: '', quarter: this.searchForm.quarter.substr(4) }
      } else {
        let year = this.searchForm.year
        params = { dateType: '1', year: year, month: '', quarter: '' }
      }
      params.drgCode = row.jbgdrgcode
      this.$router.push({
        path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/51150754-6c3f-4560-8e10-34df9f633273',
        query: params
      })
      let photo = Object.assign({}, params)
      delete photo.drgCode
      photo.MDCCode = this.searchForm.MDCCode
      kindo.cache.set('goBack', { from: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/7a83ade2-bd35-4dd5-8335-a962c67d8021', params: photo }, 'session')
    },
    initCharts() {
      this.view.tab.效率指标options = {
        tooltip: {
          formatter: function (obj) {
            console.log(obj)
            if (obj.value.length > 1) {
              return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">${obj.name}(${obj.value[2]})</div>时间消耗指数：${obj.value[0]}<br>费用消耗指数：${obj.value[1]}`
            } else {
              return obj.name + ' : ' + obj.value
            }
          }
        },
        xAxis: {
          type: 'value',
          name: '时间消耗指数',
          nameLocation: 'middle',
          nameGap: 25,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '费用消耗指数',
          // nameLocation: 'middle',
          // nameGap: 30,
          splitLine: {
            show: false
          }
        },
        series: []
      }
      this.view.tab.AQZB1 = this.setBarH('中低风险组死亡率(%)', 'DRG名称')
      this.view.tab.AQZB2 = this.setBarH('低风险组死亡率(%)', 'DRG名称')
      this.view.tab.CMIoptions = this.setBar('DRG名称', 'CMI')
      this.view.compare.radarChart = this.setRadar()
      this.view.compare.stackbar = this.setStackbar()
    },
    getEcharts() {
      switch (this.view.tab.activeName) {
        case '效率指标':
          this.getXLZB()
          break
        case '安全指标':
          this.getBarH('AQZB2', this.url.bar1, this.searchForm)
          this.getBarH('AQZB1', this.url.bar2, this.searchForm)
          break
        case 'CMI':
          this.getBar('CMIoptions', this.url.cmibar, Object.assign({}, this.searchForm, this.cmiTop))
          break
      }
    },
    tabClick() {
      this.getEcharts()
      this.$nextTick(function () {
        // javascript 触发 window.onresize
        if (Event.prototype.initEvent) {
          const evt = window.document.createEvent('UIEvents')
          evt.initUIEvent('resize', true, false, window, 0)
          window.dispatchEvent(evt)
        } else {
          window.dispatchEvent(new Event('resize'))
        }
      })
    },
    getXLZB() {
      this.$http.get(this.url.scatter2, { params: this.searchForm }).then(res => {
        if (res.data.rows.length > 0) {
          let valArr = res.data.rows.map(function (o, i) {
            return {
              name: o.name,
              value: [parseFloat(o.valuex).toFixed(2), parseFloat(o.valuey).toFixed(2), o.code]
            }
          })
          this.view.tab.效率指标options.series = [{
            type: 'scatter',
            data: valArr,
            itemStyle: {
              color: function (series) {
                return kindo.util.getColor(series.dataIndex)
              }
            },
            markLine: {
              lineStyle: {
                normal: {
                  type: 'solid',
                  color: '#3fb1e3'
                }
              },
              data: [{ xAxis: res.data.polex, name: '平均值' }, { yAxis: res.data.poley, name: '平均值' }]
            }
          }]
        } else {
          this.view.tab.效率指标options.series = []
        }
      })
    },
    get() {
      this.setDate()
      this.$refs.table2.reloadData()
      this.getEcharts()
    }
  },
  watch: {
    'cmiTop.top'(v) {
      this.getCMI()
    }
  }
}
</script>
<style scoped>
.box-card .item {
  border-spacing: inherit;
  width: 100%;
  font-size: 13px;
}

.box-card .item td {
  border-bottom: 1px solid #ddd;
  padding: 5px 8px;
}

.box-card .item tr:last-child td {
  border-bottom: 0;
}

.compareDialog {
  position: fixed;
  width: 100%;
  display: none;
  top: 0;
  z-index: 999;
  left: 0;
  box-shadow: 0 0 10px #ccc;
}

.show {
  display: block;
}

.hide {
  display: none;
}
</style>