<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form @submit.native.prevent :model="searchForm" ref="searchForm" :inline="true" label-width="110px">
        <el-form-item label="出院日期：">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" slot="control" @click="query">查询</el-button>
    </kindo-box>

    <kindo-box title="DRG全院概览" icon="fa fa-street-view">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="12">
          <kindo-echart :options="radarChartOps" ref="radarChartRef" autoResize></kindo-echart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <el-table :data="tableData">
            <el-table-column label="指标名称" prop="quotaName" min-width="130px" show-overflow-tooltip header-align="center" align="center"></el-table-column>
            <el-table-column label="本期" prop="period" min-width="80px" show-overflow-tooltip header-align="center" align="right"></el-table-column>
            <el-table-column label="上期" prop="lastPeriod" min-width="80px" show-overflow-tooltip header-align="center" align="right"></el-table-column>
            <el-table-column label="同比" prop="yearOnYear" min-width="80px" show-overflow-tooltip header-align="center" align="right">
              <template slot-scope="scope">
                <span :class="{down:(scope.row.yearOnYear&&scope.row.yearOnYear<0)}">{{kindo.util.toPercent(scope.row.yearOnYear,2,'%')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="环比" prop="monthOnMonth" min-width="80px" show-overflow-tooltip header-align="center" align="right">
              <template slot-scope="scope">
                <span :class="{down:(scope.row.monthOnMonth&&scope.row.monthOnMonth<0)}">{{kindo.util.toPercent(scope.row.monthOnMonth,2,'%')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </kindo-box>

    <kindo-box title="DRG指标分析" icon="fa fa-area-chart">
      <el-tabs v-model.trim="activeName" @tab-click="tabClick">
        <el-tab-pane label="科室" name="科室"><br>
          <el-row>
            <el-col :xs="24" :sm="24" :md="8">
              <kindo-echart :options="deptCapacityOps" ref="deptCapacityRef" autoResize style="height:400px"></kindo-echart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8">
              <kindo-echart :options="deptEfficOps" ref="deptEfficRef" autoResize style="height:400px"></kindo-echart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8">
              <kindo-echart :options="deptSecurityOps" ref="deptSecurityRef" autoResize style="height:400px"></kindo-echart>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="MDC" name="MDC"><br>
          <kindo-echart :options="mdcEfficOps" ref="mdcEfficRef" autoResize style="height:400px"></kindo-echart>
        </el-tab-pane>
        <el-tab-pane label="ADRG" name="ADRG"><br>
          <kindo-echart :options="adrgEfficOps" ref="adrgEfficRef" autoResize style="height:400px"></kindo-echart>
        </el-tab-pane>
        <el-tab-pane label="DRG" name="DRG"><br>
          <kindo-echart :options="drgEfficOps" ref="drgEfficRef" autoResize style="height:400px"></kindo-echart>
        </el-tab-pane>
      </el-tabs>
    </kindo-box>
  </div>
</template>
<script>
import config from './config'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'

export default {
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  data() {
    return {
      searchForm: {
        dateType: '1',
        year: new Date().formatDate('yyyy'),
        quarter: null,
        month: null
      },
      searchTemp: {
        richDatePicker: ['1', new Date().formatDate('yyyy'), null, null]
      },
      radarChartOps: {
        tooltip: {
          formatter: obj => {
            if (obj) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                obj.name +
                '</div>' +
                'DRG组数：' +
                kindo.util.formatNum(obj.data.value1[0], 0) +
                '<br>CMI值：' +
                kindo.util.formatNum(obj.data.value1[5]) +
                '<br>时间消耗指数：' +
                kindo.util.formatNum(obj.data.value1[4]) +
                '<br>费用消耗指数：' +
                kindo.util.formatNum(obj.data.value1[3]) +
                '<br>低风险组死亡率：' +
                kindo.util.toPercent(obj.data.value1[2], 2, '%') +
                '<br>中低风险组死亡率：' +
                kindo.util.toPercent(obj.data.value1[1], 2, '%')
              )
            }
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          data: []
        },
        radar: {
          // splitNumber: 4,
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#444'
            }
          },
          indicator: [{ name: 'DRG组数' }, { name: '中低风险组死亡率' }, { name: '低风险组死亡率' }, { name: '费用消耗指数' }, { name: '时间消耗指数' }, { name: 'CMI值' }]
        },
        series: [
          {
            type: 'radar',
            data: []
          }
        ]
      },
      tableData: [],
      activeName: '科室',
      deptCapacityOps: {
        tooltip: {
          formatter: obj => {
            if (obj.value instanceof Array && obj.value.length > 1) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                obj.name +
                '</div>' +
                'DRG组数：' +
                obj.value[0] +
                '<br>' +
                'CMI：' +
                obj.value[1]
              )
            } else {
              return obj.name + ' : ' + kindo.util.formatNum(obj.value)
            }
          }
        },
        title: {
          text: '产能指标'
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: 'DRG组数',
          nameLocation: 'middle',
          nameGap: 25,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'CMI',
          nameLocation: 'middle',
          nameGap: 30,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'scatter',
            data: [],
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
              }
              // data: [{ xAxis: 3, name: '平均值' }, { yAxis: 10, name: '平均值' }]
            }
          }
        ]
      },
      deptEfficOps: {
        tooltip: {
          formatter: function (obj) {
            if (obj.value instanceof Array && obj.value.length > 1) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                obj.name +
                '</div>' +
                '时间消耗指数：' +
                kindo.util.formatNum(obj.value[0]) +
                '<br>' +
                '费用消耗指数：' +
                kindo.util.formatNum(obj.value[1])
              )
            } else {
              return obj.name + ' : ' + kindo.util.formatNum(obj.value)
            }
          }
        },
        title: {
          text: '效率指标'
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '10%',
          containLabel: true
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
          nameLocation: 'middle',
          nameGap: 30,
          // maxInterval: 0.1,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'scatter',
            data: [],
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
              }
              // data: [{ xAxis: 3, name: '平均值' }, { yAxis: 10, name: '平均值' }]
            }
          }
        ]
      },
      deptSecurityOps: {
        title: {
          text: '安全指标'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (obj) {
            if (obj && obj.length === 2) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                obj[0].name +
                '</div>' +
                obj[0].seriesName +
                '：' +
                kindo.util.toPercent(obj[0].value, 2, '%') +
                '<br/>' +
                obj[1].seriesName +
                '：' +
                kindo.util.toPercent(obj[1].value, 2, '%')
              )
            }
          }
        },
        grid: {
          left: '30%'
        },
        legend: {
          data: ['中低风险组死亡率（%）', '低风险组死亡率（%）'],
          bottom: 0
        },
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        series: [
          {
            name: '中低风险组死亡率（%）',
            type: 'bar',
            barWidth: '35%',
            data: []
          },
          {
            name: '低风险组死亡率（%）',
            type: 'bar',
            barWidth: '35%',
            data: []
          }
        ]
      },
      mdcEfficOps: null,
      adrgEfficOps: null,
      drgEfficOps: null
    }
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.tabClick()

      this.query()
    })
  },
  methods: {
    query() {
      this.overview()
      this.tabClick()
    },
    overview() {
      this.$http.get(config.api.overview, { params: this.searchForm }).then(res => {
        if (res.data) {
          this._radar(res.data)
          this._table(res.data)
        }
      })
    },
    tabClick() {
      let self = this
      setTimeout(() => {
        switch (this.activeName) {
          case '科室':
            self.queryDetp()
            break
          case 'MDC':
            self.queryMdc()
            break
          case 'ADRG':
            self.queryAdrg()
            break
          case 'DRG':
            self.queryDrg()
            break

          default:
            break
        }
      }, 0)
    },
    queryDetp() {
      this.$http.get(config.api.hoscapacity, { params: this.searchForm }).then(res => {
        let tempArr = []
        if (res.data.rows && res.data.rows.length) {
          res.data.rows.forEach((o, i) => {
            tempArr.push({ name: o.name, value: [o.coordX, o.coordY] })
          })
        }
        this.$refs.deptCapacityRef.mergeOptions({
          series: {
            markLine: {
              data: [{ xAxis: kindo.util.formatNum(res.data.averageX), name: '平均值' }, { yAxis: kindo.util.formatNum(res.data.averageY), name: '平均值' }]
            },
            data: tempArr
          }
        })
      })

      this.$http.get(config.api.hosefficiency, { params: this.searchForm }).then(res => {
        let tempArr = []
        if (res.data.rows && res.data.rows.length) {
          res.data.rows.forEach((o, i) => {
            tempArr.push({ name: o.name, value: [o.coordX, o.coordY] })
          })
        }
        this.$refs.deptEfficRef.mergeOptions({
          series: {
            markLine: {
              data: [{ xAxis: kindo.util.formatNum(res.data.averageX), name: '平均值' }, { yAxis: kindo.util.formatNum(res.data.averageY), name: '平均值' }]
            },
            data: tempArr
          }
        })
      })

      this.$http.get(config.api.hossecurity, { params: this.searchForm }).then(res => {
        var tempNameArr = []
        let tempArr = []
        let tempArr1 = []
        if (res.data && res.data.length > 0) {
          res.data.forEach((o, i) => {
            tempNameArr.push(o.name)
            tempArr.push({ name: o.name, value: o.coordX })
            tempArr1.push({ name: o.name, value: o.coordY })
          })
        }
        this.$refs.deptSecurityRef.mergeOptions({ yAxis: { data: tempNameArr }, series: [{ data: tempArr }, { data: tempArr1 }] })
      })
    },
    async queryMdc() {
      if (this.mdcEfficOps === null) {
        this.mdcEfficOps = {
          tooltip: {
            formatter: function (obj) {
              if (obj.value instanceof Array && obj.value.length > 1) {
                return (
                  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                  obj.name +
                  '</div>' +
                  '时间消耗指数：' +
                  kindo.util.formatNum(obj.value[0]) +
                  '<br>' +
                  '费用消耗指数：' +
                  kindo.util.formatNum(obj.value[1])
                )
              } else {
                return obj.name + ' : ' + kindo.util.formatNum(obj.value)
              }
            }
          },
          title: {
            text: '效率指标'
          },
          grid: {
            left: '5%',
            right: '8%',
            bottom: '10%',
            containLabel: true
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
            nameLocation: 'middle',
            nameGap: 30,
            // maxInterval: 0.1,
            splitLine: {
              show: false
            }
          },
          series: [
            {
              type: 'scatter',
              data: [],
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
                }
                // data: [{ xAxis: 3, name: '平均值' }, { yAxis: 10, name: '平均值' }]
              }
            }
          ]
        }
      }

      const mdcEfficData = await this.$http.get(config.api.mdcefficiency, { params: this.searchForm })
      let tempArr = []
      if (mdcEfficData.data.rows && mdcEfficData.data.rows.length > 0) {
        mdcEfficData.data.rows.forEach((o, i) => {
          tempArr.push({ name: o.name, value: [o.coordX, o.coordY] })
        })
      }
      this.$refs.mdcEfficRef.mergeOptions({
        series: {
          markLine: {
            data: [
              { xAxis: kindo.util.formatNum(mdcEfficData.data.averageX), name: '平均值' },
              { yAxis: kindo.util.formatNum(mdcEfficData.data.averageY), name: '平均值' }
            ]
          },
          data: tempArr
        }
      })
    },
    async queryAdrg() {
      if (this.adrgEfficOps === null) {
        this.adrgEfficOps = {
          tooltip: {
            formatter: function (obj) {
              if (obj.value instanceof Array && obj.value.length > 1) {
                return (
                  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                  obj.name +
                  '</div>' +
                  '时间消耗指数：' +
                  kindo.util.formatNum(obj.value[0]) +
                  '<br>' +
                  '费用消耗指数：' +
                  kindo.util.formatNum(obj.value[1])
                )
              } else {
                return obj.name + ' : ' + kindo.util.formatNum(obj.value)
              }
            }
          },
          title: {
            text: '效率指标'
          },
          grid: {
            left: '5%',
            right: '8%',
            bottom: '10%',
            containLabel: true
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
            nameLocation: 'middle',
            nameGap: 30,
            // maxInterval: 0.1,
            splitLine: {
              show: false
            }
          },
          series: [
            {
              type: 'scatter',
              data: [],
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
                }
                // data: [{ xAxis: 3, name: '平均值' }, { yAxis: 10, name: '平均值' }]
              }
            }
          ]
        }
      }

      const adrgEfficData = await this.$http.get(config.api.adrgefficiency, { params: this.searchForm })
      let tempArr = []
      if (adrgEfficData.data.rows && adrgEfficData.data.rows.length > 0) {
        adrgEfficData.data.rows.forEach((o, i) => {
          tempArr.push({ name: o.name, value: [o.coordX, o.coordY] })
        })
      }
      this.$refs.adrgEfficRef.mergeOptions({
        series: {
          markLine: {
            data: [
              { xAxis: kindo.util.formatNum(adrgEfficData.data.averageX), name: '平均值' },
              { yAxis: kindo.util.formatNum(adrgEfficData.data.averageY), name: '平均值' }
            ]
          },
          data: tempArr
        }
      })
    },
    async queryDrg() {
      if (this.drgEfficOps === null) {
        this.drgEfficOps = {
          tooltip: {
            formatter: function (obj) {
              if (obj.value instanceof Array && obj.value.length > 1) {
                return (
                  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                  obj.name +
                  '</div>' +
                  '时间消耗指数：' +
                  kindo.util.formatNum(obj.value[0]) +
                  '<br>' +
                  '费用消耗指数：' +
                  kindo.util.formatNum(obj.value[1])
                )
              } else {
                return obj.name + ' : ' + kindo.util.formatNum(obj.value)
              }
            }
          },
          title: {
            text: '效率指标'
          },
          grid: {
            left: '5%',
            right: '8%',
            bottom: '10%',
            containLabel: true
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
            nameLocation: 'middle',
            nameGap: 30,
            // maxInterval: 0.1,
            splitLine: {
              show: false
            }
          },
          series: [
            {
              type: 'scatter',
              data: [],
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
                }
                // data: [{ xAxis: 3, name: '平均值' }, { yAxis: 10, name: '平均值' }]
              }
            }
          ]
        }
      }

      const drgEfficData = await this.$http.get(config.api.drgefficiency, { params: this.searchForm })
      let tempArr = []
      if (drgEfficData.data.rows && drgEfficData.data.rows.length > 0) {
        drgEfficData.data.rows.forEach((o, i) => {
          tempArr.push({ name: o.name, value: [o.coordX, o.coordY] })
        })
      }
      this.$refs.drgEfficRef.mergeOptions({
        series: {
          markLine: {
            data: [
              { xAxis: kindo.util.formatNum(drgEfficData.data.averageX), name: '平均值' },
              { yAxis: kindo.util.formatNum(drgEfficData.data.averageY), name: '平均值' }
            ]
          },
          data: tempArr
        }
      })
    },
    async _radar(tempData) {
      let legendArr = ['本期', '上期']
      let seriesArr = [
        {
          name: '本期',
          value: [
            tempData.drgNum || 0,
            tempData.midLowDiePerc || 0,
            tempData.lowDiePerc || 0,
            tempData.feeSi || 0,
            tempData.timeSi || 0,
            tempData.cmi || 0
          ],
          value1: [tempData.drgNum, tempData.midLowDiePerc, tempData.lowDiePerc, tempData.feeSi, tempData.timeSi, tempData.cmi]
        },
        {
          name: '上期',
          value: [
            tempData.drgNumLastPeriod || 0,
            tempData.midLowDiePercLastPeriod || 0,
            tempData.lowDiePercLastPeriod || 0,
            tempData.feeSiLastPeriod || 0,
            tempData.timeSiLastPeriod || 0,
            tempData.cmiLastPeriod || 0
          ],
          value1: [
            tempData.drgNumLastPeriod,
            tempData.midLowDiePercLastPeriod,
            tempData.lowDiePercLastPeriod,
            tempData.feeSiLastPeriod,
            tempData.timeSiLastPeriod,
            tempData.cmiLastPeriod
          ]
        }
      ]
      let maxArr = [
        [tempData.drgNum, tempData.drgNumLastPeriod],
        [tempData.midLowDiePerc, tempData.midLowDiePercLastPeriod],
        [tempData.lowDiePerc, tempData.lowDiePercLastPeriod],
        [tempData.feeSi, tempData.feeSiLastPeriod],
        [tempData.timeSi, tempData.timeSiLastPeriod],
        [tempData.cmi, tempData.cmiLastPeriod]
      ]

      // 标杆数据
      if (this.searchForm.dateType === '1') {
        const drgNum = await this.$http.get(config.api.radarStandardLine, { params: { code: 'STANDARD_DRU_NUM' } })
        const cmi = await this.$http.get(config.api.radarStandardLine, { params: { code: 'STANDARD_CMI' } })
        const time = await this.$http.get(config.api.radarStandardLine, { params: { code: 'TIME_CONSUMPTION_INDEX' } })
        const cost = await this.$http.get(config.api.radarStandardLine, { params: { code: 'COST_CONSUMPTION_INDEX' } })
        const low = await this.$http.get(config.api.radarStandardLine, { params: { code: 'LOW_RISK_MORTALITY' } })
        const mid = await this.$http.get(config.api.radarStandardLine, { params: { code: 'MIDDLE_RISK_MORTALITY' } })

        legendArr.splice(0, 0, '标杆')
        seriesArr.splice(0, 0, {
          name: '标杆',
          value: [drgNum.data || 0, mid.data || 0, low.data || 0, cost.data || 0, time.data || 0, cmi.data || 0],
          value1: [drgNum.data, mid.data, low.data, cost.data, time.data, cmi.data]
        })

        maxArr[0].splice(0, 0, drgNum.data)
        maxArr[1].splice(0, 0, mid.data)
        maxArr[2].splice(0, 0, low.data)
        maxArr[3].splice(0, 0, cost.data)
        maxArr[4].splice(0, 0, time.data)
        maxArr[5].splice(0, 0, cmi.data)
      }

      this.$refs.radarChartRef.mergeOptions({
        legend: {
          data: legendArr
        },
        radar: {
          indicator: [
            { name: 'DRG组数', max: Number(this._max(maxArr[0])) + 50 },
            { name: '中低风险组死亡率', max: Number(this._max(maxArr[1])) + 0.5 },
            { name: '低风险组死亡率', max: Number(this._max(maxArr[2])) + 0.5 },
            { name: '费用消耗指数', max: Number(this._max(maxArr[3])) + 0.5 },
            { name: '时间消耗指数', max: Number(this._max(maxArr[4])) + 0.5 },
            { name: 'CMI值', max: Number(this._max(maxArr[5])) + 0.5 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: seriesArr
          }
        ]
      })
    },
    _table(tempData) {
      let tableDataNum = this.tableData.length
      for (let i = 0; i < tableDataNum; i++) {
        this.tableData.shift()
      }

      this.tableData.push({
        quotaName: '入组病例数',
        period: kindo.util.formatNum(tempData.inDrgNum, 0),
        lastPeriod: kindo.util.formatNum(tempData.inDrgNumLastPeriod, 0),
        yearOnYear: tempData.inDrgNumYearInc,
        monthOnMonth: tempData.inDrgNumPeriodInc
      })

      this.tableData.push({
        quotaName: 'ADRG组数',
        period: kindo.util.formatNum(tempData.adrgNum, 0),
        lastPeriod: kindo.util.formatNum(tempData.adrgNumLastPeriod, 0),
        yearOnYear: tempData.adrgNumYearInc,
        monthOnMonth: tempData.adrgNumPeriodInc
      })

      this.tableData.push({
        quotaName: 'DRG组数',
        period: kindo.util.formatNum(tempData.drgNum, 0),
        lastPeriod: kindo.util.formatNum(tempData.drgNumLastPeriod, 0),
        yearOnYear: tempData.drgNumYearInc,
        monthOnMonth: tempData.drgNumPeriodInc
      })

      this.tableData.push({
        quotaName: '总权重',
        period: kindo.util.formatNum(tempData.rwt),
        lastPeriod: kindo.util.formatNum(tempData.rwtLastPeriod),
        yearOnYear: tempData.rwtYearInc,
        monthOnMonth: tempData.rwtPeriodInc
      })

      this.tableData.push({
        quotaName: 'CMI值',
        period: kindo.util.formatNum(tempData.cmi),
        lastPeriod: kindo.util.formatNum(tempData.cmiLastPeriod),
        yearOnYear: tempData.cmiYearInc,
        monthOnMonth: tempData.cmiPeriodInc
      })

      this.tableData.push({
        quotaName: '时间消耗指数',
        period: kindo.util.formatNum(tempData.timeSi),
        lastPeriod: kindo.util.formatNum(tempData.timeSiLastPeriod),
        yearOnYear: tempData.timeSiYearInc,
        monthOnMonth: tempData.timeSiPeriodInc
      })

      this.tableData.push({
        quotaName: '费用消耗指数',
        period: kindo.util.formatNum(tempData.feeSi),
        lastPeriod: kindo.util.formatNum(tempData.feeSiLastPeriod),
        yearOnYear: tempData.feeSiYearInc,
        monthOnMonth: tempData.feeSiPeriodInc
      })

      this.tableData.push({
        quotaName: '低风险组死亡率',
        period: kindo.util.toPercent(tempData.lowDiePerc, 2, '%'),
        lastPeriod: kindo.util.toPercent(tempData.lowDiePercLastPeriod, 2, '%'),
        yearOnYear: tempData.lowDiePercYearInc,
        monthOnMonth: tempData.lowDiePercPeriodInc
      })

      this.tableData.push({
        quotaName: '中低风险组死亡率',
        period: kindo.util.toPercent(tempData.midLowDiePerc, 2, '%'),
        lastPeriod: kindo.util.toPercent(tempData.midLowDiePercLastPeriod, 2, '%'),
        yearOnYear: tempData.midLowDiePercYearInc,
        monthOnMonth: tempData.midLowDiePercPeriodInc
      })
    },
    _max(arr) {
      let maxOne = null
      arr.forEach((o, i) => {
        if (i === 0) {
          maxOne = o
        } else {
          maxOne = maxOne > o ? maxOne : o
        }
      })
      return maxOne
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
<style scope>
.down {
  color: #d32f2f;
}
</style>