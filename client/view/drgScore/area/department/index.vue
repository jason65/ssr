<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="searchForm" :rules="searchRules" ref="searchForm" :inline="true" label-width="100px">
        <el-form-item label="出院日期：" prop="dateType">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="searchForm.ksCode" clearable filterable placeholder="" class="searchInput">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.DICT_DYN_KESHI" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="get">查询</el-button>
    </kindo-box>
    <kindo-box title="科室绩效评价" icon="fa fa-bar-chart" style="padding-bottom: 25px">
      <el-tabs type="card" v-model.trim="view.tab.activeName" @tab-click="tabClick">

        <el-tab-pane name="综合绩效">
          <span slot="label">
            <i class="el-icon-date"></i> 综合绩效</span>
          <kindo-echart :options="view.tab.ZHJX" autoResize></kindo-echart>
        </el-tab-pane>

        <el-tab-pane name="产能指标">
          <span slot="label">
            <i class="el-icon-date"></i> 产能指标</span>
          <kindo-echart :options="view.tab.CNZB" autoResize></kindo-echart>
        </el-tab-pane>

        <el-tab-pane name="效率指标">
          <span slot="label">
            <i class="el-icon-date"></i> 效率指标</span>
          <kindo-echart :options="view.tab.XLZB" autoResize></kindo-echart>
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

        <el-tab-pane name="CMI">
          <span slot="label">
            <i class="el-icon-date"></i> CMI</span>
          <kindo-echart :options="view.tab.CMIoptions" autoResize></kindo-echart>
        </el-tab-pane>
      </el-tabs>
    </kindo-box>
    <kindo-box title="综合指标详情" icon="fas fa-list">
      <kindo-table :url="url.listpage" :queryParam="searchForm" ref="table2" width="100%" :pageSize="15" :default-sort="{prop:'jbdzhzs',order:'descending'}" @expand-change="tableExpand" class="special-table">
        <!-- API modifiled -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- <kindo-table :url="url.querydetail"  ref="tableSel" :queryParam="searchSelForm" width="100%" :pagination="false" :show-header="false"> -->
            <el-table :data="props.row.child" width="100%" :pagination="false" :show-header="false" class="expand-table">
              <el-table-column width="49.6px"></el-table-column>
              <el-table-column width="48px"></el-table-column>
              <el-table-column prop="jbddeptcode" width="139px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="jbddeptname" width="139px" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="jbdbanum" width="110px" align="right"></el-table-column>
              <el-table-column prop="jbdindrgnum" width="130px" align="right">
                <!-- <template slot-scope="scope">
                  <el-button type="text" @click="goTo(scope.row)">{{scope.row.jbdindrgnum}}</el-button>
                </template> -->
              </el-table-column>
              <el-table-column prop="jbdrzl" width="128px" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property]*100,2)}"></el-table-column>
              <el-table-column prop="jbdzhzs" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" align="right"></el-table-column>
              <el-table-column prop="jbddrgnum" width="110px" align="right"></el-table-column>
              <el-table-column prop="jbdrwt" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" align="right"></el-table-column>
              <el-table-column prop="jbdnxzs" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" align="right"></el-table-column>
              <el-table-column prop="jbdfwnlzs" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" align="right"></el-table-column>
              <el-table-column prop="jbdfwxlzs" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="129px" align="right"></el-table-column>
              <el-table-column prop="jbdcmi" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" align="right"></el-table-column>
              <el-table-column prop="jbdcostsi" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" align="right"></el-table-column>
              <el-table-column prop="jbdcjfy" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" align="right"></el-table-column>
              <el-table-column prop="jbdhycjfy" width="160px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" align="right"></el-table-column>
              <el-table-column prop="jbdtimesi" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" align="right"></el-table-column>
              <el-table-column prop="jbdpjzyr" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="120px" align="right"></el-table-column>
              <el-table-column prop="jbdhypjzyr" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="150px" align="right"></el-table-column>
              <el-table-column prop="jbdlowswl" width="190px" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
              <el-table-column prop="jbdmedswl" width="200px" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
              <el-table-column width="59px"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="jbdstddeptcode" label="科室编码" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="jbdstddeptname" label="出院科室" width="140px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="jbdbanum" label="总病例数" width="110px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdindrgnum" label="入组病例数" width="130px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <el-button type="text" @click="goTo(scope.row)">{{scope.row.jbdindrgnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jbdrzl" label="入组率（%）" width="130px" header-align="center" align="right" sortable='custom' :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property]*100,2)}"></el-table-column>
        <el-table-column prop="jbdzhzs" label="综合绩效指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbddrgnum" label="DRG组数" width="110px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <el-button type="text" @click="drgDetail(scope.row)">{{scope.row.jbddrgnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jbdrwt" label="总权重" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdnxzs" label="能效指数" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdfwnlzs" label="服务能力指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdfwxlzs" label="服务效率指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdcmi" label="CMI" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdcostsi" label="费用消耗指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdcjfy" label="次均费用" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdhycjfy" label="行业例均费用" width="160px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdtimesi" label="时间消耗指数" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdpjzyr" label="平均住院日" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="120px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdhypjzyr" label="行业平均住院日" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" width="150px" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbdlowswl" label="低风险组死亡率（%）" width="190px" header-align="center" align="right" sortable='custom' :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="jbdlownum" label="低风险组死亡人数" width="190px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <span v-if="kindo.validate.isEmpty(scope.row.jbdlownum)">-</span>
            <span v-else>
              <el-button type="text" @click="goToStandardPage(scope.row,undefined,{mlRisk:'1'}) ">{{scope.row.jbdlownum}}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="jbdmedswl" label="中低风险组死亡率（%）" width="200px" header-align="center" align="right" sortable='custom' :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="jbdmednum" label="中低风险组死亡人数" width="200px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <span v-if="kindo.validate.isEmpty(scope.row.jbdmednum)">-</span>
            <span v-else>
              <el-button type="text" @click="goToStandardPage(scope.row,undefined,{mlRisk:'2'}) ">{{scope.row.jbdmednum}}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60" header-align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" :class="isCompare(scope.row, 'id') === true ? 'hide' : 'show'" @click="compareSel(scope.$index, scope.row)">对比
              <i class="el-icon-fa-compress el-icon--right"></i>
            </el-button>
            <span style="color:#999;font-size:13px;" :class="isCompare(scope.row, 'id') === true ? 'show' : 'hide'">已加入</span>
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
          <span style="font-weight: bold">绩效对比</span>
          <span style="font-size:12px;color:#999;margin-left: 10px;">最多5个</span>
          <el-button style="float: right" @click="compareRemoveAll()">取消对比</el-button>
          <el-button type="primary" style="float: right;margin-right: 10px;" @click="compareDate($event, 'id')">开始对比</el-button>
        </div>
        <table class="item">
          <tr v-for="(row, index) in compare.selection" :key="index">
            <td width="30%">{{row.jbdstddeptcode}}</td>
            <td width="30%">{{row.jbdstddeptname}}</td>
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
    <el-dialog title="绩效对比" :visible.sync="compare.visible" width="90%" :before-close="handleClose" v-drag>
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
              <td v-show="title==='DRG组数'" v-for="item in source.tabledd" :key="item.id">
                {{item.drgNum}}
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

    <!-- Drg组数弹框 -->
    <el-dialog title="指标详情" :visible.sync="drgZuGoto.visible" width="90%" :before-close="handleClose">
      <kindo-table :url="drgZuGoto.url" ref="drgZu" :queryParam="drgZuGoto.searchForm" width="100%">
        <el-table-column prop="jbbdrgcode" label="DRG编码" width="140px" header-align="center" sortable='custom'></el-table-column>
        <el-table-column prop="jbbdrgname" label="DRG名称" min-width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="jbbdrgnum" label="入组病例数" width="130px" header-align="center" align="right" sortable='custom'>
          <template slot-scope="scope">
            <el-button type="text" @click="goToDrg(scope.row)">{{scope.row.jbbdrgnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jbbdrgrwt" label="总权重" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" sortable='custom'></el-table-column>
        <el-table-column prop="jbbcmi" label="CMI" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" sortable='custom'></el-table-column>
        <el-table-column prop="jbbcostsi" label="费用消耗指数" width="150px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" sortable='custom'></el-table-column>
        <el-table-column prop="jbbcjfy" label="次均费用" width="110px" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" header-align="center" align="right" sortable='custom'></el-table-column>
        <el-table-column prop="jbbtimesi" label="时间消耗指数" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" sortable='custom'></el-table-column>
        <el-table-column prop="jbbpjzyr" label="平均住院日" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}" sortable='custom'></el-table-column>
        <el-table-column prop="jbbswnum" label="死亡人数" width="130px" header-align="center" align="right" sortable='custom'></el-table-column>
      </kindo-table>
    </el-dialog>
  </div>
</template>
<script>
// import Vue from 'vue'
import config from './config'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'
// import mixin from '@src/utils/helper/mixin.js'
import mixinKPI from '@src/utils/helper/mixinKPI.js'
export default {
  mixins: [mixinKPI],
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  data() {
    return {
      searchTemp: {
        richDatePicker: ['3', null, null, null]
      },
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
          activeName: '综合绩效',
          XLZB: {},
          CNZB: {},
          AQZB1: {},
          AQZB2: {},
          CMIoptions: {},
          ZHJX: {}
        },

        compare: {
          visible: false,
          radarChart: {},
          stackbar: {}
        }
      },
      searchForm: {
        year: '',
        quarter: '',
        month: '',
        ksCode: ''
      },
      searchRules: {
        year: { required: true, message: '请选择年份', trigger: 'change' }
      },
      source: {
        DICT_DYN_KESHI: [],
        tabledd: [],
        tableList: ['DRG组数', 'CMI值', '时间消耗指数', '费用消耗指数', '低风险组死亡率(%)', '中低风险组死亡率(%)'],
        fyList: ['药品类', '综合服务类', '诊断类', '治疗类', '血液和血液制品类', '材料类', '其他']
      },
      url: {
        linebar: config.api.linebar,
        scatter1: config.api.scatter1,
        scatter2: config.api.scatter2,
        bar1: config.api.bar1,
        bar2: config.api.bar2,
        cmibar: config.api.cmibar,
        listpage: config.api.listpage,
        querydetail: config.api.querydetail,
        compare: config.api.compare,
        exportTable: config.api.exportTable
      },
      drgZuGoto: {
        url: config.api.drg,
        visible: false,
        searchForm: {}
      }
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // 一定会存在时间和科室的字段
      this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      if (this.$route.query.ksCode && !kindo.validate.isEmpty(this.$route.query.ksCode)) {
        this.searchForm.ksCode = this.$route.query.ksCode
      }
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.searchTemp.richDatePicker = this.returnTime()
    }
    this.initCharts()
    kindo.dictionary.getDictionary('DICT_DYN_KESHI').then(res => {
      this.source.DICT_DYN_KESHI = res
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  methods: {
    drgDetail(row) {
      this.drgZuGoto.visible = true
      this.drgZuGoto.searchForm = {
        year: this.searchForm.year,
        quarter: this.searchForm.quarter,
        month: this.searchForm.month,
        ksCode: row.jbdstddeptcode
      }
      this.$nextTick(() => {
        this.$refs.drgZu.reloadData()
      })
    },
    async tableExpand(row, expanded) {
      if (!row.child) {
        // this.expandTableLoading = true
        let parentData = this.$refs.table2.internalData
        let index = parentData.findIndex((value) => { return value.id === row.id })
        let params = Object.assign({}, this.searchForm, { id: row.id })
        let childData = await this.$http.get(this.url.querydetail, { params: params })
        this.$set(this.$refs.table2.internalData, index, Object.assign(parentData[index], { child: childData.data.rows }))
        this.$refs.table2.setCurrentRow(row)
        // this.expandTableLoading = false
      }
    },
    setGoToDate() {
      let date = {}
      if (this.searchForm.month !== '') {
        let year = this.searchForm.month.substr(0, 4)
        let month = this.searchForm.month.substr(4)
        date = { dateType: '3', year: year, quarter: null, month: month }
      } else if (this.searchForm.quarter !== '') {
        let year = this.searchForm.quarter.substr(0, 4)
        let quarter = this.searchForm.quarter.substr(4)
        date = { dateType: '2', year: year, quarter: quarter, month: null }
      } else {
        let year = this.searchForm.year
        date = { dateType: '1', year: year, quarter: null, month: null }
      }
      return date
    },
    goTo(row) {
      let params = {
        dateType: this.setGoToDate().dateType,
        year: this.setGoToDate().year,
        quarter: this.setGoToDate().quarter,
        month: this.setGoToDate().month,
        cykbbm: row.jbdstddeptcode
      }
      this.$router.push({
        path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/51150754-6c3f-4560-8e10-34df9f633273',
        query: params
      })
      kindo.cache.set('goBack', { from: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/fe8bca5f-bdb8-4704-82b1-970602c9ec35', params: Object.assign(params, { ksCode: this.searchForm.ksCode }) }, 'session')
    },
    goToDrg(row) {
      let params = {
        dateType: this.setGoToDate().dateType,
        year: this.setGoToDate().year,
        quarter: this.setGoToDate().quarter,
        month: this.setGoToDate().month,
        cykbbm: row.stddeptcode,
        drgCode: row.jbbdrgcode
      }
      this.$router.push({
        path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/51150754-6c3f-4560-8e10-34df9f633273',
        query: params
      })
      kindo.cache.set('goBack', { from: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/fe8bca5f-bdb8-4704-82b1-970602c9ec35', params: Object.assign(params, { ksCode: this.searchForm.ksCode }) }, 'session')
    },
    initCharts() {
      this.view.tab.ZHJX = this.setBar('出院科室', '综合绩效指数')
      this.view.tab.CNZB = this.setScatter('DRG组数', 'CMI')
      this.view.tab.XLZB = this.setScatter('时间消耗指数', '费用消耗指数')
      this.view.tab.AQZB1 = this.setBarH('中低风险组死亡率(%)', '出院科室')
      this.view.tab.AQZB2 = this.setBarH('低风险组死亡率(%)', '出院科室')
      this.view.tab.CMIoptions = this.setBarline()
      this.view.compare.radarChart = this.setRadar()
      this.view.compare.stackbar = this.setStackbar()
    },
    getEcharts() {
      switch (this.view.tab.activeName) {
        case '效率指标':
          this.getScatter('XLZB', this.url.scatter2, this.searchForm)
          break
        case '产能指标':
          this.getScatter('CNZB', this.url.scatter1, this.searchForm)
          break
        case '安全指标':
          this.getBarH('AQZB2', this.url.bar1, this.searchForm)
          this.getBarH('AQZB1', this.url.bar2, this.searchForm)
          // this.get安全指标()
          break
        case 'CMI':
          this.getBarLine('CMIoptions', this.url.cmibar, Object.assign({}, this.searchForm, this.cmiTop))
          break
        case '综合绩效':
          this.getBar('ZHJX', this.url.linebar, this.searchForm)
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