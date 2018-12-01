<template>
  <div>
    <kindo-box>
      <el-form onsubmit="return false;" @keyup.enter.native="get" :model="form" :inline="true">
        <el-form-item>
          <el-select v-model="form.hos" placeholder="请选择医院...">
            <el-option v-for="item in source.hos" :key="item" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button icon="search" @click="get">查 询</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <div chart="工作量"></div>
      <br>
      <br>
      <div chart="剩余工作量"></div>
    </kindo-box>

    <kindo-box>
      <kindo-table ref="table" :url="url">
        <el-table-column prop="医院名称" label="医院名称" width="140" sortable="custom" show-overflow-tooltip> </el-table-column>
        <el-table-column label="工作量统计" header-align="center">
          <el-table-column prop="操作" label="操作" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="诊断" label="诊断" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="合计" label="合计" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
        </el-table-column>
        <el-table-column label="剩余工作量统计" header-align="center">
          <el-table-column prop="操作" label="操作" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="诊断" label="诊断" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="合计" label="合计" width="80" sortable="custom" align="right" show-overflow-tooltip> </el-table-column>
        </el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
import config from './config'
import echarts from 'echarts'

export default {
  data() {
    return {
      form: {
        hos: ''
      },

      source: {
        hos: [{ name: '南开', value: '南开' }]
      },

      url: config.api.get
    }
  },

  created() {
    this.echarts = {}
  },

  mounted() {
    this.$nextTick(function () {
      this.get()

      window.onresize = () => {
        if (this.$el.parentNode) {
          for (let key in this.echarts) {
            if (this.echarts.hasOwnProperty(key)) {
              this.echarts[key].resize()
            }
          }
        }
      }
    })
  },

  methods: {
    getTotal() {
      if (!this.echarts.hasOwnProperty('工作量')) {
        this.$el.querySelector('[chart="工作量"]').style.width = '100%'
        this.$el.querySelector('[chart="工作量"]').style.height = '350px'

        this.echarts.工作量 = echarts.init(this.$el.querySelector('[chart="工作量"]'))
        this.echarts.工作量.on('click', (param) => {
          this.$refs.table.loadData()
        })
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '医院整体工作量统计表'
        },
        legend: {
          data: ['整体工作量', '诊断', '操作', '剩余工作量', '剩余诊断', '剩余操作']
        },
        grid: {
          left: '3%',
          right: '4%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['南开医院', '儿童医院', '中心医院', '人民医院', '第一医院', '第二医院', '第三医院']
        }],
        yAxis: [{
          type: 'value'
        }],
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 50
        }, {
          show: true,
          type: 'slider',
          y: '90%',
          start: 0,
          end: 50
        }],
        series: [{
          name: '整体工作量',
          type: 'bar',
          data: [740, 864, 802, 848, 1380, 1360, 1340],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }, {
          name: '诊断',
          type: 'bar',
          stack: '整体工作量',
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        }, {
          name: '操作',
          type: 'bar',
          stack: '整体工作量',
          data: [120, 132, 101, 134, 290, 230, 220]
        }, {
          name: '剩余工作量',
          type: 'bar',
          data: [74, 86, 80, 86, 138, 136, 134],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }, {
          name: '剩余诊断',
          type: 'bar',
          stack: '剩余工作量',
          data: [62, 73, 70, 73, 109, 113, 112]
        }, {
          name: '剩余操作',
          type: 'bar',
          stack: '剩余工作量',
          data: [12, 13, 10, 13, 29, 23, 22]
        }]
      }

      this.echarts.工作量.setOption(option)
    },

    get() {
      this.getTotal()
    }
  }
}
</script>

<style>

</style>
