<template>
  <div>
    <kindo-box title="条件筛选" icon="fa fa-search">
      <el-form @submit.native.prevent :model="searchForm" ref="searchForm" :inline="true" label-width="110px">
        <el-form-item label="出院日期：">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="searchForm.cykbbm" filterable placeholder="请选择或输入" :clearable="true">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.kb" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="query">查询</el-button>
    </kindo-box>

    <kindo-box>
      <el-tabs v-model="searchForm.rwType" type="card" @tab-click="query">
        <el-tab-pane name="1" label='2&lt;=RW'>
          <kindo-box title="疑难病例分布" icon="fa fa-bar-chart">
            <kindo-echart :options="stackbar1" ref="distributeRef1" autoResize></kindo-echart>
          </kindo-box>

          <kindo-box title="疑难病例详情" icon="fa fa-list">
            <kindo-table :url="config.api.tablelist" :queryParam="Object.assign({}, searchForm, { rwType: 1 })" ref="tableListRef1" width="100%" :default-sort="{prop:'drgCode',order:'ascending'}">
              <el-table-column prop="drgCode" label="DRG编码" width="140px" header-align="center" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column prop="drgName" label="DRG名称" min-width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="inDrgNum" label="病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column prop="zhzs" label="综合绩效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="rwt" label="DRG组总权重" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="nxzs" label="能效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwnlzs" label="服务能力指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwxlzs" label="服务效率指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cmi" label="DRG组CMI" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="feeSi" label="费用消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cjfy" label="次均费用" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="hyljfy" label="行业例均费用" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="timeSi" label="时间消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="pjzyr" label="平均住院日" width="120px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="hypjzyr" label="行业平均住院日" width="150px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="dfxzswl" label="低风险组死亡率（%）" width="190px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v,2,'%')}"></el-table-column>
              <el-table-column prop="dfxzswrs" label="低风险组死亡人数" width="190px" header-align="center" align="right" sortable='custom'>
                <template slot-scope="scope">
                  <span v-if="kindo.validate.isEmpty(scope.row.dfxzswrs)">-</span>
                  <span v-else>
                    <el-button type="text" @click="goToStandardPage(scope.row,'special',{mlRisk:'1'}) ">{{scope.row.dfxzswrs}}</el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="zdfxzswl" label="中低风险组死亡率（%）" width="200px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v,2,'%')}"></el-table-column>
              <el-table-column prop="zdfxzswrs" label="中低风险组死亡人数" width="200px" header-align="center" align="right" sortable='custom'>
                <template slot-scope="scope">
                  <span v-if="kindo.validate.isEmpty(scope.row.zdfxzswrs)">-</span>
                  <span v-else>
                    <el-button type="text" @click="goToStandardPage(scope.row,'special',{mlRisk:'2'}) ">{{scope.row.zdfxzswrs}}</el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50px" header-align="center" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :open-delay="300" content="查看详情" placement="top-start">
                    <el-button @click="goDrgRecordQuery(scope.$index, scope.row)" type="text" size="small">
                      <i class="fa fa-eye"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </kindo-table>
          </kindo-box>
        </el-tab-pane>
        <el-tab-pane name="2" label='2&lt;=RW&lt;5'>
          <kindo-box title="疑难病例分布" icon="fa fa-bar-chart">
            <kindo-echart :options="stackbar2" ref="distributeRef2" autoResize></kindo-echart>
          </kindo-box>

          <kindo-box title="疑难病例详情" icon="fa fa-list">
            <kindo-table :url="config.api.tablelist" :queryParam="Object.assign({}, searchForm, { rwType: 2 })" ref="tableListRef2" width="100%">
              <el-table-column prop="drgCode" label="DRG编码" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="drgName" label="DRG名称" min-width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="inDrgNum" label="病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column prop="zhzs" label="综合绩效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="rwt" label="DRG组总权重" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="nxzs" label="能效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwnlzs" label="服务能力指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwxlzs" label="服务效率指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cmi" label="DRG组CMI" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="feeSi" label="费用消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cjfy" label="次均费用" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="timeSi" label="时间消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="pjzyr" label="平均住院日" width="120px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="swNum" label="死亡人数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column label="操作" width="50px" header-align="center" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :open-delay="300" content="查看详情" placement="top-start">
                    <el-button @click="goDrgRecordQuery(scope.$index, scope.row)" type="text" size="small">
                      <i class="fa fa-eye"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </kindo-table>
          </kindo-box>
        </el-tab-pane>
        <el-tab-pane name="3" label='5&lt;=RW&lt;10'>
          <kindo-box title="疑难病例分布" icon="fa fa-bar-chart">
            <kindo-echart :options="stackbar3" ref="distributeRef3" autoResize></kindo-echart>
          </kindo-box>

          <kindo-box title="疑难病例详情" icon="fa fa-list">
            <kindo-table :url="config.api.tablelist" :queryParam="Object.assign({}, searchForm, { rwType: 3 })" ref="tableListRef3" width="100%">
              <el-table-column prop="drgCode" label="DRG编码" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="drgName" label="DRG名称" min-width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="inDrgNum" label="病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column prop="zhzs" label="综合绩效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="rwt" label="DRG组总权重" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="nxzs" label="能效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwnlzs" label="服务能力指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwxlzs" label="服务效率指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cmi" label="DRG组CMI" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="feeSi" label="费用消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cjfy" label="次均费用" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="timeSi" label="时间消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="pjzyr" label="平均住院日" width="120px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="swNum" label="死亡人数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column label="操作" width="50px" header-align="center" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :open-delay="300" content="查看详情" placement="top-start">
                    <el-button @click="goDrgRecordQuery(scope.$index, scope.row)" type="text" size="small">
                      <i class="fa fa-eye"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </kindo-table>
          </kindo-box>
        </el-tab-pane>
        <el-tab-pane name="4" label='10&lt;=RW'>
          <kindo-box title="疑难病例分布" icon="fa fa-bar-chart">
            <kindo-echart :options="stackbar4" ref="distributeRef4" autoResize></kindo-echart>
          </kindo-box>

          <kindo-box title="疑难病例详情" icon="fa fa-list">
            <kindo-table :url="config.api.tablelist" :queryParam="Object.assign({}, searchForm, { rwType: 4 })" ref="tableListRef4" width="100%">
              <el-table-column prop="drgCode" label="DRG编码" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="drgName" label="DRG名称" min-width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="inDrgNum" label="病例数" width="100px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column prop="zhzs" label="综合绩效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="rwt" label="DRG组总权重" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="nxzs" label="能效指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwnlzs" label="服务能力指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="fwxlzs" label="服务效率指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cmi" label="DRG组CMI" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="feeSi" label="费用消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="cjfy" label="次均费用" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="timeSi" label="时间消耗指数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="pjzyr" label="平均住院日" width="120px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom' :formatter="(r,c,v)=>{return kindo.util.toPercent(v)}"></el-table-column>
              <el-table-column prop="swNum" label="死亡人数" width="140px" header-align="center" align="right" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
              <el-table-column label="操作" width="50px" header-align="center" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :open-delay="300" content="查看详情" placement="top-start">
                    <el-button @click="goDrgRecordQuery(scope.$index, scope.row)" type="text" size="small">
                      <i class="fa fa-eye"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </kindo-table>
          </kindo-box>
        </el-tab-pane>
      </el-tabs>
    </kindo-box>
  </div>
</template>

<script>
import config from './config'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'
import mixinKPI from '@src/utils/helper/mixinKPI.js'

export default {
  mixins: [mixinKPI],
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  data() {
    return {
      config,
      searchForm: {
        dateType: '1',
        year: new Date().formatDate('yyyy'),
        quarter: null,
        month: null,
        cykbbm: '',
        rwType: '1'
      },
      searchTemp: {
        richDatePicker: ['1', new Date().formatDate('yyyy'), null, null]
      },
      source: {
        kb: [],
        ylfkfs: []
      },
      stackbar1: {
        color: ['rgb(90,177,239)', 'rgb(255,185,128)', 'rgb(217,122,128)'],
        title: {
          // text: '费用构成对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          },
          formatter: obj => {
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
              (obj && obj[0] ? obj[0].name : '') +
              '</div>' +
              '2<=RW<5：' +
              (obj && obj[0] ? kindo.util.formatNum(obj[0].value, 0) : '') +
              '<br />' +
              '5<=RW<10：' +
              (obj && obj[1] ? kindo.util.formatNum(obj[1].value, 0) : '') +
              '<br />' +
              '10<=RW：' +
              (obj && obj[2] ? kindo.util.formatNum(obj[2].value, 0) : '')
            )
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '3%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ['2<=RW<5', '5<=RW<10', '10<=RW'],
          bottom: 0
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        series: [
          {
            name: '2<=RW<5',
            type: 'bar',
            stack: '总量',
            barMaxWidth: '50px',
            data: []
          },
          {
            name: '5<=RW<10',
            type: 'bar',
            stack: '总量',
            barMaxWidth: '50px',
            data: []
          },
          {
            name: '10<=RW',
            type: 'bar',
            stack: '总量',
            barMaxWidth: '50px',
            data: []
          }
        ]
      },
      stackbar2: null,
      stackbar3: null,
      stackbar4: null
    }
  },
  async created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // 一定会存在时间和科室的字段
      this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      if (this.$route.query.cykbbm && !kindo.validate.isEmpty(this.$route.query.cykbbm)) {
        this.searchForm.cykbbm = this.$route.query.cykbbm
      }
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    }
    // 科室
    const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
    this.source.kb = resDepartment || []

    // 医疗付费方式
    const resYlfkfs = await kindo.dictionary.getDictionary('OT_01')
    this.source.ylfkfs = resYlfkfs || []
  },
  mounted() {
    this.$nextTick(() => {
      this.query()
    })
  },
  methods: {
    query() {
      switch (this.searchForm.rwType) {
        case '1':
          this.queryBarChart1()
          this.queryTableList1()
          break

        case '2':
          this.queryBarChart2()
          this.queryTableList2()
          break

        case '3':
          this.queryBarChart3()
          this.queryTableList3()
          break

        case '4':
          this.queryBarChart4()
          this.queryTableList4()
          break

        default:
          break
      }
    },
    queryBarChart1() {
      this.$http.get(config.api.distribute, { params: this.searchForm }).then(res => {
        let monthArr = []
        let tempArr2 = []
        let tempArr3 = []
        let tempArr4 = []
        if (res.data && res.data.length > 0) {
          res.data = res.data
          res.data.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr2.push({ name: o.name, value: o.rwt2 })
            tempArr3.push({ name: o.name, value: o.rwt3 })
            tempArr4.push({ name: o.name, value: o.rwt4 })
          })
        }
        this.$refs.distributeRef1.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr2 }, { data: tempArr3 }, { data: tempArr4 }] })
      })
    },
    queryTableList1() {
      this.$refs.tableListRef1.reloadData()
    },
    queryBarChart2() {
      if (this.stackbar2 === null) {
        this.stackbar2 = {
          color: 'rgb(90,177,239)',
          title: {
            // text: '费用构成对比'
          },
          tooltip: {
            trigger: 'axis'
            // axisPointer: {
            //   type: 'shadow',
            //   shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
            // },
            // formatter:
            //   '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">{b0}</div>2<=RW<5：{c0}<br />5<=RW<10：{c1}<br />10<=RW：{c2}'
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '3%',
            bottom: '20%',
            containLabel: true
          },
          legend: {
            data: ['2<=RW<5'],
            bottom: 0
          },
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false
              }
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          series: [
            {
              name: '2<=RW<5',
              type: 'bar',
              stack: '总量',
              barMaxWidth: '50px',
              data: []
            }
          ]
        }
      }

      this.$http.get(config.api.distribute, { params: this.searchForm }).then(res => {
        let monthArr = []
        let tempArr2 = []

        if (res.data && res.data.length > 0) {
          res.data.sort((a, b) => {
            if (a.rwt2 > b.rwt2) {
              return -1
            }

            if (a.rwt2 === b.rwt2) {
              return 0
            } else {
              return 1
            }
          })

          res.data.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr2.push({ name: o.name, value: o.rwt2 })
          })
        }
        this.$refs.distributeRef2.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr2 }] })
      })
    },
    queryTableList2() {
      this.$refs.tableListRef2.reloadData()
    },
    queryBarChart3() {
      if (this.stackbar3 === null) {
        this.stackbar3 = {
          color: 'rgb(255,185,128)',
          title: {
            // text: '费用构成对比'
          },
          tooltip: {
            trigger: 'axis'
            // axisPointer: {
            //   type: 'shadow',
            //   shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
            // },
            // formatter:
            //   '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">{b0}</div>2<=RW<5：{c0}<br />5<=RW<10：{c1}<br />10<=RW：{c2}'
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '3%',
            bottom: '20%',
            containLabel: true
          },
          legend: {
            data: ['5<=RW<10'],
            bottom: 0
          },
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false
              }
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          series: [
            {
              name: '5<=RW<10',
              type: 'bar',
              stack: '总量',
              barMaxWidth: '50px',
              data: []
            }
          ]
        }
      }

      this.$http.get(config.api.distribute, { params: this.searchForm }).then(res => {
        let monthArr = []
        let tempArr3 = []
        if (res.data && res.data.length > 0) {
          res.data.sort((a, b) => {
            if (a.rwt3 > b.rwt3) {
              return -1
            }

            if (a.rwt3 === b.rwt3) {
              return 0
            } else {
              return 1
            }
          })

          res.data.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr3.push({ name: o.name, value: o.rwt3 })
          })
        }
        this.$refs.distributeRef3.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr3 }] })
      }, 0)
    },
    queryTableList3() {
      this.$refs.tableListRef3.reloadData()
    },
    queryBarChart4() {
      if (this.stackbar4 === null) {
        this.stackbar4 = {
          color: 'rgb(217,122,128)',
          title: {
            // text: '费用构成对比'
          },
          tooltip: {
            trigger: 'axis'
            // axisPointer: {
            //   type: 'shadow',
            //   shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
            // },
            // formatter:
            //   '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">{b0}</div>2<=RW<5：{c0}<br />5<=RW<10：{c1}<br />10<=RW：{c2}'
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '3%',
            bottom: '20%',
            containLabel: true
          },
          legend: {
            data: ['10<=RW'],
            bottom: 0
          },
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false
              }
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          series: [
            {
              name: '10<=RW',
              type: 'bar',
              stack: '总量',
              barMaxWidth: '50px',
              data: []
            }
          ]
        }
      }

      this.$http.get(config.api.distribute, { params: this.searchForm }).then(res => {
        let monthArr = []
        let tempArr4 = []
        if (res.data && res.data.length > 0) {
          res.data.sort((a, b) => {
            if (a.rwt4 > b.rwt4) {
              return -1
            }

            if (a.rwt4 === b.rwt4) {
              return 0
            } else {
              return 1
            }
          })

          res.data.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr4.push({ name: o.name, value: o.rwt4 })
          })
        }
        this.$refs.distributeRef4.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr4 }] })
      }, 0)
    },
    queryTableList4() {
      this.$refs.tableListRef4.reloadData()
    },
    goDrgRecordQuery(idx, row) {
      let params = {}
      switch (this.searchForm.dateType) {
        case '1':
          params = {
            cykbbm: this.searchForm.cykbbm,
            drgCode: row.drgCode,
            year: this.searchForm.year,
            dateType: '1',
            month: '',
            quarter: ''
          }
          break
        case '2':
          params = {
            cykbbm: this.searchForm.cykbbm,
            drgCode: row.drgCode,
            year: this.searchForm.year,
            dateType: '2',
            month: '',
            quarter: this.searchForm.quarter
          }
          break
        case '3':
          params = {
            cykbbm: this.searchForm.cykbbm,
            drgCode: row.drgCode,
            year: this.searchForm.year,
            dateType: '3',
            month: this.searchForm.month,
            quarter: ''
          }
          break
        default:
          break
      }
      this.$router.push({
        path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/51150754-6c3f-4560-8e10-34df9f633273',
        query: Object.assign(params)
      })
      let photo = {
        dateType: this.searchForm.dateType,
        year: this.searchForm.year,
        quarter: this.searchForm.quarter,
        month: this.searchForm.month,
        cykbbm: this.searchForm.cykbbm
      }
      kindo.cache.set('goBack', { from: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/b030bc42-6d49-41a7-95c8-7689a19a162b', params: photo }, 'session')
    }
  },
  watch: {
    'searchTemp.richDatePicker'(arr) {
      this.searchForm.dateType = arr[0]
      this.searchForm.year = arr[1]
      this.searchForm.quarter = arr[2]
      this.searchForm.month = arr[3]
    }
  }
}
</script>