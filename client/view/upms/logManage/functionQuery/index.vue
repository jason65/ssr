<template>
  <div>
    <kindo-box title="条件筛选" icon="fa-search">
      <el-form onsubmit="return false;" @keyup.enter.native="get" label-position="right" label-width="110px" :model="search" :inline="true">
        <el-form-item label="开始日期：">
          <el-date-picker v-model.trim="search.startDate" placeholder="请选择时间" :editable="false" :picker-options="{disabledDate:val=>val.getTime() > Date.parse(search.endDate)}"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker v-model.trim="search.endDate" placeholder="请选择时间" :editable="false" :picker-options="{disabledDate:val=>val.getTime() < Date.parse(search.startDate)}"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>
    <kindo-box>
      <el-form label="TOP" :model="search" onsubmit="return false;" :inline="true" align="right" style="margin-right:60px;">
        <el-form-item label="TOP">
          <el-select v-model.trim="search.top" style="width:80px">
            <el-option label="50" value="50"></el-option>
            <el-option label="40" value="40"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="10" value="10"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <kindo-echart ref="chart" :options="bar" autoResize></kindo-echart>
    </kindo-box>
  </div>
</template>
<script>
import config from './config'
import 'echarts/lib/chart/bar'
export default {
  data() {
    return {
      search: {
        startDate: kindo.util.formatDate(new Date().getTime() - 1000 * 60 * 60 * 24 * 31),
        endDate: kindo.util.formatDate(new Date()),
        top: '10'
      },
      url: config.api.get,

      RES: [],
      // 初始化图标
      bar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          }
        },

        yAxis: [
          {
            type: 'value',
            name: '单位（个）',
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            splitLine: {
              show: false
            },
            data: []
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '35%',
            data: []
          }
        ]
      }
    }
  },
  create() {},
  mounted() {
    this.get()
  },
  methods: {
    get() {
      this.$http.get(this.url, { params: this.search }).then(res => {
        if (res.code === 200) {
          res = res.data
          let option = this.bar
          option.xAxis[0].data = []
          option.series[0].data = []
          res.map(item => {
            option.xAxis[0].data.push(item.menuModel)
            option.series[0].data.push(item.count)
          })
          this.$refs.chart.mergeOptions(option)
        } else {
          kindo.util.alert(res.message, undefined, 'warning')
        }
      })
    }
  },
  watch: {
    'search.startDate'(v) {
      this.search.startDate = kindo.util.formatDate(v)
    },
    'search.endDate'(v) {
      this.search.endDate = kindo.util.formatDate(v)
    },
    'search.top'(v) {
      this.get()
    }
  }
}
</script>
<style scoped>

</style>