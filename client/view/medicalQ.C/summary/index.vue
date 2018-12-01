<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form :model="search" ref="searchRef" inline @submit.native.prevent @keyup.enter.prevent.native="get" label-width="110px">
        <el-form-item label="出院年份：">
          <el-date-picker v-model.trim="search.year" type="year" value-format="yyyy" placeholder="请选择时间" :clearable="false" :editable="false" style="width:75px"></el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-tag>{{'数据更新时间：' + (alertTime ? kindo.util.formatDate(alertTime, 'yyyy年MM月dd日 HH:mm:ss') : '')}}</el-tag>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="问题病例汇总" icon="fa fa-list">
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable"> 导 出 </el-button>
      </div>
      <kindo-table :url="url" :queryParam="search" ref="table" :pageSize="10" :headerHeight="72" :default-sort="{prop:'allTotal',order:'descending'}">
        <el-table-column prop="cykb" label="科室名称" min-width="120px" show-overflow-tooltip header-align="center"></el-table-column>
        <el-table-column label="总计" header-align="center" align="center">
          <el-table-column prop="allTotal" label="总数" min-width="80px" header-align="center" align="right" sortable='custom'></el-table-column>
          <el-table-column prop="passTotal" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(null,scope) ">{{scope.row.passTotal}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="failTotal" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(null,scope) ">{{scope.row.failTotal}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="1月" header-align="center" align="center">
          <el-table-column prop="all1" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass1+r.fail1}" sortable='custom'></el-table-column>
          <el-table-column prop="pass1" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(1,scope) ">{{scope.row.pass1}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail1" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(1,scope) ">{{scope.row.fail1}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="2月" header-align="center" align="center">
          <el-table-column prop="all2" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass2+r.fail2}" sortable='custom'></el-table-column>
          <el-table-column prop="pass2" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(2,scope) ">{{scope.row.pass2}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail2" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(2,scope) ">{{scope.row.fail2}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="3月" header-align="center" align="center">
          <el-table-column prop="all3" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass3+r.fail3}" sortable='custom'></el-table-column>
          <el-table-column prop="pass3" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(3,scope) ">{{scope.row.pass3}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail3" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(3,scope) ">{{scope.row.fail3}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="4月" header-align="center" align="center">
          <el-table-column prop="all4" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass4+r.fail4}" sortable='custom'></el-table-column>
          <el-table-column prop="pass4" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(4,scope) ">{{scope.row.pass4}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail4" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(4,scope) ">{{scope.row.fail4}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="5月" header-align="center" align="center">
          <el-table-column prop="all5" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass5+r.fail5}" sortable='custom'></el-table-column>
          <el-table-column prop="pass5" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(5,scope) ">{{scope.row.pass5}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail5" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(5,scope) ">{{scope.row.fail5}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="6月" header-align="center" align="center">
          <el-table-column prop="all6" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass6+r.fail6}" sortable='custom'></el-table-column>
          <el-table-column prop="pass6" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(6,scope) ">{{scope.row.pass6}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail6" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(6,scope) ">{{scope.row.fail6}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="7月" header-align="center" align="center">
          <el-table-column prop="all7" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass7+r.fail7}" sortable='custom'></el-table-column>
          <el-table-column prop="pass7" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(7,scope) ">{{scope.row.pass7}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail7" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(7,scope) ">{{scope.row.fail7}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="8月" header-align="center" align="center">
          <el-table-column prop="all8" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass8+r.fail8}" sortable='custom'></el-table-column>
          <el-table-column prop="pass8" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(8,scope) ">{{scope.row.pass8}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail8" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(8,scope) ">{{scope.row.fail8}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="9月" header-align="center" align="center">
          <el-table-column prop="all9" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass9+r.fail9}" sortable='custom'></el-table-column>
          <el-table-column prop="pass9" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(9,scope) ">{{scope.row.pass9}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail9" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(9,scope) ">{{scope.row.fail9}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="10月" header-align="center" align="center">
          <el-table-column prop="all10" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass10+r.fail10}" sortable='custom'></el-table-column>
          <el-table-column prop="pass10" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(10,scope) ">{{scope.row.pass10}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail10" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(10,scope) ">{{scope.row.fail10}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="11月" header-align="center" align="center">
          <el-table-column prop="all11" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass11+r.fail11}" sortable='custom'></el-table-column>
          <el-table-column prop="pass11" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(11,scope) ">{{scope.row.pass11}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail11" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(11,scope) ">{{scope.row.fail11}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="12月" header-align="center" align="center">
          <el-table-column prop="all12" label="总数" min-width="80px" header-align="center" align="right" :formatter="(r)=>{return r.pass12+r.fail12}" sortable='custom'></el-table-column>
          <el-table-column prop="pass12" label="通过" min-width="80px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goStandardPage(12,scope) ">{{scope.row.pass12}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="fail12" label="未通过" min-width="90px" header-align="center" align="right" sortable='custom'>
            <template slot-scope="scope">
              <el-button type="text" @click="goSubstandardPage(12,scope) ">{{scope.row.fail12}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <kindo-box title="问题病例质控分析" icon="fa fa-bar-chart">
      <div slot="control">
        <el-radio-group v-model.trim="currentChart">
          <el-radio-button :label="true">
            <i class="fa fa-bar-chart"></i>
          </el-radio-button>
          <el-radio-button :label="false">
            <i class="fa fa-table"></i>
          </el-radio-button>
        </el-radio-group>
        <el-button icon="el-icon-download" @click="exportTable1"> 导 出 </el-button>
      </div>
      <el-alert type="info" :closable="false" :title="alertTitleComd1"></el-alert>
      <div v-show="currentChart">
        <kindo-echart :options="echartOptions" ref="chart"></kindo-echart>
      </div>
      <div v-show="!currentChart">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-table ref="ptable" :data="talbeData" show-summary :default-sort="{prop:'count',order:'descending'}" @sort-change="sortChg" highlight-current-row @current-change="chgRow" :height="300">
              <el-table-column type="index" align="center" width="60px" fixed="left" class-name="rowNumber"></el-table-column>
              <el-table-column label="问题描述" prop="type" min-width="120px" show-overflow-tooltip></el-table-column>
              <el-table-column label="问题病案统计" prop="count" header-align="center" align="right" width="140px" show-overflow-tooltip sortable="custom">
                <template slot-scope="scope">
                  <el-button type="text" @click="goSubstandardPage1(scope.row.code) ">{{scope.row.count}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="10">
            <el-table :data="subTalbeData" :default-sort="{prop:'count',order:'descending'}" @sort-change="subSortChg" :height="300">
              <el-table-column label="科室编码" prop="cykbbm" width="80px" show-overflow-tooltip></el-table-column>
              <el-table-column label="出院科室" prop="cykb" header-align="center" min-width="120px" show-overflow-tooltip></el-table-column>
              <el-table-column label="问题病案统计" prop="count" header-align="center" align="right" width="140px" show-overflow-tooltip sortable="custom">
                <template slot-scope="scope">
                  <el-button type="text" @click="goSubstandardPage1(currentRow.code, scope.row.cykbbm) ">{{scope.row.count}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </kindo-box>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      currentChart: true,
      url: config.api.get,
      search: {
        year: kindo.util.formatDate(new Date().getTime(), 'yyyy')
      },
      echartOptions: {
        color: ['#3398DB'],
        title: {
          x: 'center'
        },
        dataZoom: {
          height: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          }
        },
        grid: {
          right: 125
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            // name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            barMaxWidth: '60',
            data: []
          }
        ]
      },
      alertTime: '',
      alertData: {},
      talbeData: [],
      currentRow: null,
      subTalbeData: []
    }
  },

  created() { },

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },
  watch: {},

  methods: {
    get() {
      this.$http.get(config.api.hisUpdateDate).then(res => {
        this.alertTime = res.data
      })

      this.$refs.table.reloadData()

      this.getChartData()
      this.getAlertData()
      this.getTableData()
    },
    async getChartData() {
      const res = await this.$http.get(config.api.getChartData, { params: this.search })

      let valArr = []
      res.data.forEach(o => {
        valArr.push(o.count)
      })

      let nameArr = []
      res.data.forEach(o => {
        nameArr.push(o.type)
      })

      this.$refs.chart.mergeOptions({ xAxis: [{ data: nameArr }], series: [{ data: valArr }] })
    },
    async getAlertData() {
      const res = await this.$http.get(config.api.getAlertData, { params: this.search })

      this.alertData = res.data
    },
    async getTableData() {
      const res = await this.$http.get(config.api.getChartData, { params: this.search })
      this.talbeData = res.data

      if (this.talbeData && this.talbeData.length > 0) {
        this.$refs.ptable.setCurrentRow(this.talbeData[0])
      }
    },
    async chgRow(currentRow, oldCurrentRow) {
      if (currentRow) {
        this.currentRow = currentRow
        const res = await this.$http.get(config.api.getSubTableData, { params: Object.assign({}, this.search, { errCode: currentRow.code }) })
        this.subTalbeData = res.data
      } else {
        this.subTalbeData = []
      }
    },
    async sortChg(chgger) {
      let paras = this.search
      if (chgger && chgger.column && chgger.prop === 'count') {
        paras = Object.assign({}, this.search, { sort: 'count', order: chgger.order === 'ascending' ? 'asc' : 'desc' })
      }

      const res = await this.$http.get(config.api.getChartData, { params: paras })
      this.talbeData = res.data
    },
    async subSortChg(chgger) {
      if (this.currentRow !== null) {
        let paras = Object.assign({}, this.search, { errCode: this.currentRow.code })
        if (chgger.column && chgger.prop === 'count') {
          paras = Object.assign({}, this.search, {
            errCode: this.currentRow.code,
            sort: 'count',
            order: chgger.order === 'ascending' ? 'asc' : 'desc'
          })
        }

        const res = await this.$http.get(config.api.getSubTableData, { params: paras })
        this.subTalbeData = res.data
      }
    },
    exportTable() {
      let temp = Object.assign({}, this.search, { sort: this.$refs.table.sort, order: this.$refs.table.order })
      let paras = ''
      let idx = 0
      for (let o in temp) {
        paras += (idx === 0 ? '?' : '&') + o + '=' + (temp[o] || '')
        if (idx === 0) {
          idx = 1
        }
      }
      window.open(config.api.exportTable + paras)
    },
    exportTable1() {
      let temp = Object.assign({}, this.search)
      let paras = ''
      let idx = 0
      for (let o in temp) {
        paras += (idx === 0 ? '?' : '&') + o + '=' + (temp[o] || '')
        if (idx === 0) {
          idx = 1
        }
      }
      window.open(config.api.exportTable1 + paras)
    },
    goStandardPage(month, scope) {
      let params = {}
      if (month === null) {
        params = { cykbbm: scope.row.cykbbm, dateType: '1', year: this.search.year, month: '', quater: '' }
      } else {
        params = { cykbbm: scope.row.cykbbm, dateType: '3', year: this.search.year, month: parseInt(month) < 10 ? ('0' + month) : month }
      }
      this.$router.push({
        path: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/e6cdb832-4e82-4d92-b8b9-cb66f8d94db4',
        query: Object.assign(params)
      })
      kindo.cache.set('goBack', { from: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/2fcab62f-64af-478a-a2a6-9e91cd1ec5e6', params: { year: params.year } }, 'session')
    },
    goSubstandardPage(month, scope) {
      let params = {}
      if (month === null) {
        params = { cykbbm: scope.row.cykbbm, dateType: '1', year: this.search.year, month: '', quater: '' }
      } else {
        params = { cykbbm: scope.row.cykbbm, dateType: '3', year: this.search.year, month: parseInt(month) < 10 ? ('0' + month) : month }
      }

      this.$router.push({
        path: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/d5aed344-361b-429e-b654-9e47b4c9f0c8',
        query: Object.assign(params)
      })
      let photo = Object.assign({}, params)
      delete photo.cykbbm
      kindo.cache.set('goBack', { from: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/2fcab62f-64af-478a-a2a6-9e91cd1ec5e6', params: { year: params.year } }, 'session')
    },
    goSubstandardPage1(errorCode, cykbbm) {
      let params = { cykbbm: cykbbm, dateType: '1', errCode: errorCode, year: this.search.year, month: '', quater: '' }
      this.$router.push({
        path: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/d5aed344-361b-429e-b654-9e47b4c9f0c8',
        query: Object.assign(params)
      })
      let photo = Object.assign({}, params)
      delete photo.cykbbm
      delete photo.errCode
      kindo.cache.set('goBack', { from: '/8a156092-6a97-44e2-a771-a2c4ba0e3bc4/2fcab62f-64af-478a-a2a6-9e91cd1ec5e6', params: photo }, 'session')
    }
  },

  computed: {
    alertTitleComd1() {
      return (
        '上传病例数量：' +
        this.alertData.baCount +
        '；问题病案数量：' +
        this.alertData.errCount +
        '；病案错误率：' +
        this.alertData.errPercent +
        '；问题描述统计：' +
        this.alertData.typeCount
      )
    }
  }
}
</script>