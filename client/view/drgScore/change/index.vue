<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form @submit.native.prevent @keyup.enter.native="query" :model="searchForm" :inline="true" label-width="110px">
        <el-form-item label="出院日期：">
          <el-select v-model.trim="searchForm.dateType" placeholder="请选择" style="width:65px">
            <el-option label="季度" value="2"></el-option>
            <el-option label="月份" value="3"></el-option>
          </el-select>
          <el-date-picker v-model.trim="searchForm.year" type="year" value-format="yyyy" placeholder="请选择年份" :editable="false" style="width:95px;" :clearable="false"></el-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="searchForm.cykbbm" filterable placeholder="请选择或输入" :clearable="true">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.kb" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MDC：">
          <el-select v-model.trim="searchForm.mdcCode" filterable placeholder="请选择或输入" :clearable="true">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.mdc" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="query">查询</el-button>
      <el-button type="text" icon="el-icon-question" slot="control" @click="dialogVisible = true">DRG相关指标计算公式</el-button>
    </kindo-box>

    <kindo-box title="工作强度" icon="fa fa-area-chart">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="indrgnumRef" :options="indrgnumOps" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="rwtRef" :options="rwtOps" autoResize></kindo-echart>
        </el-col>
      </el-row>
    </kindo-box>

    <kindo-box title="服务产能" icon="fa fa-area-chart">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="drgnumRef" :options="drgnumOps" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="cmiRef" :options="cmiOps" autoResize></kindo-echart>
        </el-col>
      </el-row>
    </kindo-box>

    <kindo-box title="服务效率" icon="fa fa-area-chart">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="timecostsiRef" :options="timecostsiOps" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="feecostsiRef" :options="feecostsiOps" autoResize></kindo-echart>
        </el-col>
      </el-row>
    </kindo-box>

    <kindo-box title="安全质量" icon="fa fa-area-chart">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="lowdeathrateRef" :options="lowdeathrateOps" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart ref="medlowdeathrateRef" :options="medlowdeathrateOps" autoResize></kindo-echart>
        </el-col>
      </el-row>
    </kindo-box>

    <el-dialog :visible.sync="dialogVisible" width="50%">
      <div class="imgpic">
        <img style="width:100%" src='../../../assets/image/page/p0.jpg' />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        dateType: '3',
        year: new Date().formatDate('yyyy'),
        cykbbm: '',
        mdcCode: ''
      },
      source: {
        kb: [], // 出院科室
        mdc: []
      },
      // 工作强度-入组病例数
      indrgnumOps: {
        title: {
          text: '入组病例数'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 工作强度-总权重
      rwtOps: {
        title: {
          text: '总权重'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 服务产能-DRG组数
      drgnumOps: {
        title: {
          text: 'DRG组数'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 服务产能-CMI值
      cmiOps: {
        title: {
          text: 'CMI值'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 服务效率-时间消耗指数
      timecostsiOps: {
        title: {
          text: '时间消耗指数'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 服务效率-费用消耗指数
      feecostsiOps: {
        title: {
          text: '费用消耗指数'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 安全质量-低风险组死亡率
      lowdeathrateOps: {
        title: {
          text: '低风险组死亡率(%)'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(arr) {
            if (arr && arr[0]) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                arr[0].name +
                '</div>' +
                '本期：' +
                kindo.util.toPercent(arr[0].value, 2, '%') +
                (arr[1] ? '<br>' + '上期：' + kindo.util.toPercent(arr[1].value, 2, '%') : '')
              )
            }
          }
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      },
      // 安全质量-中低风险组死亡率
      medlowdeathrateOps: {
        title: {
          text: '中低风险组死亡率(%)'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(arr) {
            if (arr && arr[0]) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                arr[0].name +
                '</div>' +
                '本期：' +
                kindo.util.toPercent(arr[0].value, 2, '%') +
                (arr[1] ? '<br>' + '上期：' + kindo.util.toPercent(arr[1].value, 2, '%') : '')
              )
            }
          }
        },
        toolbox: {
          show: true
        },
        legend: {
          data: ['本期', '上期'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '本期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          },
          {
            name: '上期',
            type: 'line',
            smooth: true,
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  async created() {
    // 科室
    const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
    this.source.kb = resDepartment || []

    // mdc
    const mdcData = await kindo.dictionary.getDictionary('DICT_DYN_MDC')
    this.source.mdc = mdcData || []
  },
  mounted() {
    this.$nextTick(() => {
      this.query()
    })
  },
  methods: {
    query() {
      this.$http.get(config.api.chartUrl, { params: this.searchForm }).then(res => {
        console.log(res)
        // 工作强度-入组病例数
        let monthArr = []
        let tempArr = []
        let tempArr1 = []
        if (res.data && res.data.inDrgNumDatas && res.data.inDrgNumDatas.length > 0) {
          res.data.inDrgNumDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value, 0) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast, 0) })
          })
        }
        this.$refs.indrgnumRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 工作强度-总权重
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.rwtDatas && res.data.rwtDatas.length > 0) {
          res.data.rwtDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.rwtRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 服务产能-DRG组数
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.drgNumDatas && res.data.drgNumDatas.length > 0) {
          res.data.drgNumDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value, 0) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast, 0) })
          })
        }
        this.$refs.drgnumRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 服务产能-CMI值
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.cmiDatas && res.data.cmiDatas.length > 0) {
          res.data.cmiDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.cmiRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 服务效率-时间消耗指数
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.timeSiDatas && res.data.timeSiDatas.length > 0) {
          res.data.timeSiDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.timecostsiRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 服务效率-费用消耗指数
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.feeSiDatas && res.data.feeSiDatas.length > 0) {
          res.data.feeSiDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.feecostsiRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 安全质量-低风险组死亡率
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.lowDiePercDatas && res.data.lowDiePercDatas.length > 0) {
          res.data.lowDiePercDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.lowdeathrateRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })

        // 安全质量-中低风险组死亡率
        monthArr = []
        tempArr = []
        tempArr1 = []
        if (res.data && res.data.midLowDiePercDatas && res.data.midLowDiePercDatas.length > 0) {
          res.data.midLowDiePercDatas.forEach((o, i) => {
            monthArr.push(o.name)
            tempArr.push({ name: o.name, value: kindo.util.toPercent(o.value) })
            tempArr1.push({ name: o.name, value: kindo.util.toPercent(o.valueLast) })
          })
        }
        this.$refs.medlowdeathrateRef.mergeOptions({ xAxis: { data: monthArr }, series: [{ data: tempArr }, { data: tempArr1 }] })
      })
    }
  }
}
</script>
<style scoped>
.rowName {
  font-size: 16px !important;
  color: #1f2d3d;
  font-weight: bold;
  margin: 20px 0 5px 0;
}

.hospital {
  margin-top: 30px;
}

.hospital h2 {
  text-align: center;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}

.hospital table {
  width: 100%;
  margin: 0 0 10px;
  border-spacing: 1px;
}

.hospital table td {
  height: 30px;
  font-size: 14px;
  text-align: left;
  width: 50%;
  line-height: 22px;
  font-family: 'Microsoft YaHei', arial, sans-serif;
  padding: 10px 15px;
  border: 1px solid #ddd;
}

.hospital table tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.hospital table tr td:first-child {
  width: 16%;
}

.imgpic {
  width: 100%;
  text-align: center;
}
</style>
