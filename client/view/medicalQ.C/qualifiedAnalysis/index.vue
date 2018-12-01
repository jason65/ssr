<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form inline label-position="right" label-width="110px" :model="search" @submit.native.prevent @keyup.enter.native="get">
        <el-form-item label="出院日期：">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="search.organization" filterable clearable placeholder="" class="searchInput">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.kb" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="总体指标" icon="fab fa-500px">
      <div slot="control">
        <el-alert type="info" :closable="false" title="">
          <span class="alertTit">总病案数:</span>
          <span class="alertContent">{{source.alert.sum}}例</span>
          <span class="alertTit">问题病案数:</span>
          <span class="alertContent">{{source.alert.wtbas}}例</span>
          <span class="alertTit">合格病案数:</span>
          <span class="alertContent">{{source.alert.hgbas}}例</span>
          <span class="alertTit">入组病案数:</span>
          <span class="alertContent">{{source.alert.rzbas}}例</span>
        </el-alert>
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <div class="combobox">
            <div class="tt">产能</div>
            <ul class="ct">
              <li>
                <span>出院人数</span>
                <span class="highlight">{{ this.source.ztzb.cyrs }}</span>
                <span v-show="this.source.ztzb.cyrsRate" :class="this.source.ztzb.cyrsRate > 0 ? 'up' : 'down'">
                  <i :class="this.source.ztzb.cyrsRate > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i>
                </span>
              </li>
              <li>
                <span>总费用（万元）</span>
                <span class="highlight">{{ kindo.util.formatNum(this.source.ztzb.zfy10000) }}</span>
                <span v-show="this.source.ztzb.zfyRate" :class="this.source.ztzb.zfyRate > 0 ? 'up' : 'down'">
                  <i :class="this.source.ztzb.zfyRate > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i>
                </span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <div class="combobox">
            <div class="tt">效率</div>
            <ul class="ct">
              <li>
                <span>平均住院日</span>
                <span class="highlight">{{ kindo.util.formatNum(this.source.ztzb.pjzyr) }}</span>
                <span v-show="this.source.ztzb.pjzyrRate" :class="this.source.ztzb.pjzyrRate > 0 ? 'up' : 'down'">
                  <i :class="this.source.ztzb.pjzyrRate > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i>
                </span>
              </li>
              <li>
                <span>次均费用</span>
                <span class="highlight">{{ kindo.util.formatNum(this.source.ztzb.cjfy) }}</span>
                <span v-show="this.source.ztzb.cjfyRate" :class="this.source.ztzb.cjfyRate > 0 ? 'up' : 'down'">
                  <i :class="this.source.ztzb.cjfyRate > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i>
                </span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <div class="combobox">
            <div class="tt">质量</div>
            <ul class="ct">
              <li>
                <span>死亡率</span>
                <span class="highlight">{{ kindo.util.toPercent(this.source.ztzb.swl,2,'%') }}</span>
              </li>
              <li>
                <span>2周内再住院率</span>
                <span class="highlight">{{ kindo.util.toPercent(this.source.ztzb.zzyl,2,'%') }}</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
          <div class="combobox last">
            <div class="tt">医保</div>
            <ul class="ct">
              <li>
                <span>医保人次</span>
                <span class="highlight">{{ this.source.ztzb.ybrc }}</span>
              </li>
              <li>
                <span>医保费占比</span>
                <span class="highlight">{{ kindo.util.toPercent(this.source.ztzb.ybzb,2,'%') }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </kindo-box>

    <kindo-box title="入组病例费用结构" icon="fas fa-asterisk">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <kindo-echart :options="inDrgStructure" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-table :data="source.fyjg" :border="false">
            <el-table-column label="费用" header-align="center" align="center" prop="type"></el-table-column>
            <el-table-column label="金额" header-align="center" align="right" prop="value" :formatter="(r,c,v)=>{return kindo.util.formatNum(v)}"></el-table-column>
            <el-table-column label="占比（%）" header-align="center" align="right" prop="percent" :formatter="(r,c,v)=>{return kindo.util.formatNum(v)}"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </kindo-box>

    <el-row :gutter="15">
      <el-col :sm="24" :md="12">
        <kindo-box title="住院费用分布" icon="fas fa-bar-chart">
          <kindo-echart :options="expenditureDistribution" autoResize></kindo-echart>
        </kindo-box>
      </el-col>
      <el-col :sm="24" :md="12">
        <kindo-box title="住院天数分布" icon="fas fa-bar-chart">
          <kindo-echart :options="inHospiatalDay" autoResize></kindo-echart>
        </kindo-box>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from './config'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'

export default {
  name: '',

  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  data() {
    return {
      config,

      search: {
        dateType: '1',
        year: new Date().formatDate('yyyy'),
        quarter: null,
        month: null,

        organization: ''
      },

      searchTemp: {
        richDatePicker: ['1', new Date().formatDate('yyyy'), null, null]
      },

      source: {
        options: [],

        ztzb: {}, // 总体指标
        fyjg: [], // 费用结构
        fyfb: {}, // 费用分布
        tsfb: {}, // 天数分布

        kb: [], // 出院科室
        alert: {
          sum: '',
          wtbas: '',
          hgbas: '',
          rzbas: ''
        }
      },

      inDrgStructure: {},
      expenditureDistribution: {},
      inHospiatalDay: {}
    }
  },

  async created() {
    // const res = await this.$http.get(config.api.orga)
    // this.source.options = res.data

    // 出院科室
    const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
    this.source.kb = resDepartment || []

    this.initChart()
  },

  mounted() {
    this.$nextTick(function () {
      this.get()
    })
  },

  methods: {
    get() {
      this.getZtzb()
      this.getFyjg()
      this.getFyfb()
      this.getTsfb()
      this.alertTitleComd()
    },

    initChart() {
      this.inDrgStructure = {
        tooltip: {},
        series: [
          {
            center: ['50%', '50%'],
            type: 'pie',
            radius: '60%',
            data: [],
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      this.expenditureDistribution = {
        grid: {
          right: 125
        },
        dataZoom: {
          height: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (paras) {
            return '病例数：' + paras[0].value + '<br>例均费用：' + kindo.util.formatNum(paras[0].data.obj && paras[0].data.obj.avgValue)
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          }
        },
        xAxis: [
          {
            type: 'category',
            name: '住院总费用',
            data: [],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '病例数',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '住院总费用',
            type: 'bar',
            barWidth: '60%',
            data: []
          },
          {
            name: '病例数',
            type: 'line',
            smooth: true,
            data: []
          }
        ]
      }

      this.inHospiatalDay = {
        grid: {
          right: 125
        },
        dataZoom: {
          height: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (paras) {
            return '病例数：' + paras[0].value + '<br>天数：' + (paras[0].data.obj ? paras[0].data.obj.key : '')
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          }
        },
        xAxis: [
          {
            type: 'category',
            name: '天数',
            data: [],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '病例数',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '天数',
            type: 'bar',
            barWidth: '60%',
            data: []
          },
          {
            name: '病例数',
            type: 'line',
            smooth: true,
            data: []
          }
        ]
      }
    },

    async getZtzb() {
      const res = await this.$http.get(config.api.ztzb, { params: this.search })
      this.source.ztzb = res.data
    },

    async getFyjg() {
      const res = await this.$http.get(config.api.fyjg, { params: this.search })

      res.data.forEach(item => {
        item.name = item.type
        item.value = item.value
      })

      this.source.fyjg = res.data
      this.inDrgStructure.series[0].data = res.data
    },

    async getFyfb() {
      const res = await this.$http.get(config.api.fyfb, { params: this.search })

      let x = []
      let y1 = []
      let y2 = []

      res.data.forEach(item => {
        x.push(item.key)
        y1.push({ value: item.value, obj: item })
        y2.push(item.value)
      })

      this.expenditureDistribution.xAxis[0].data = x
      this.expenditureDistribution.series[0].data = y1
      this.expenditureDistribution.series[1].data = y2
    },

    async getTsfb() {
      const res = await this.$http.get(config.api.tsfb, { params: this.search })

      let x = []
      let y1 = []
      let y2 = []

      res.data.forEach(item => {
        x.push(item.key)
        y1.push({ value: item.value, obj: item })
        y2.push(item.value)
      })

      this.inHospiatalDay.xAxis[0].data = x
      this.inHospiatalDay.series[0].data = y1
      this.inHospiatalDay.series[1].data = y2
    },

    async alertTitleComd() {
      const res = await this.$http.get(config.api.ztzbalert, { params: this.search })

      if (res && res.data) {
        this.source.alert.sum = res.data.sum
        this.source.alert.wtbas = res.data.wtbas
        this.source.alert.hgbas = res.data.hgbas
        this.source.alert.rzbas = res.data.rzbas
      }
    }
  },
  watch: {
    'searchTemp.richDatePicker'(arr) {
      this.search.dateType = arr[0]
      this.search.year = arr[1]
      this.search.quarter = arr[2]
      this.search.month = arr[3]
    }
  }
}
</script>

<style lang="scss" scoped>
.combobox {
  border-right: 1px solid #ddd;
  padding: 0 16px;

  .tt {
    margin-bottom: 24px;
  }

  .ct {
    font-size: 13px;
    color: #666;

    li {
      list-style: none;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    span {
      width: 38%;
      margin-bottom: 16px;
    }

    .highlight {
      color: #333;
      text-align: right;
      width: 34%;
    }

    .up,
    .down {
      text-align: right;
      width: 28%;
    }

    .up {
      color: #d32f2f;
    }
    .down {
      color: #388e3c;
    }
  }
}

.alertTit {
  font-weight: bold;
}

.alertContent {
  color: #87cefa;
}
// .combobox.last {
//   border-right: none;
// }
</style>
