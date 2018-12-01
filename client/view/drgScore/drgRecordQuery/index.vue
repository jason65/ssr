<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form @submit.native.prevent @keyup.enter.native="getData" :model="searchForm" ref="searchForm" :inline="true" label-width="120px">
        <el-form-item label="出院日期：">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="searchForm.cykbbm" filterable clearable placeholder="" class="searchInput">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.kb" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病案信息：">
          <el-input v-model.trim="searchForm.baKeyword" placeholder="请输入病案号或患者姓名" class="searchInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" icon="el-icon-back" @click="goBack" v-show="JSON.stringify(condition)!=='{}'">返回</el-button>
        <el-button type="primary" icon="el-icon-search" @click="getData">查 询</el-button>
      </div>
      <div slot="more">
        <el-form slot="more" @submit.native.prevent @keyup.enter.native="getData" label-width="120px" :model="searchForm" ref="searchForm" :inline="true" :rules="searchRules">
          <el-form-item label="DRG组：">
            <el-input v-model.trim="searchForm.drgKeyword" placeholder="请输入DRG编码/名称" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="主要操作ICD9：">
            <el-input v-model.trim="searchForm.ssKeyword" placeholder="请输入编码/名称" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="主要诊断：">
            <el-input v-model.trim="searchForm.zyzdKeyword" placeholder="请输入编码/名称" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="离院方式：">
            <el-select clearable v-model.trim="searchForm.lyfs" placeholder="" class="searchInput">
              <el-option label="全部" value=""></el-option>
              <el-option v-for=" item in source.lyfs" :key="item.value " :label="item.label " :value="item.value "></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主任医生：">
            <el-input v-model.trim="searchForm.zrys" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="主治医生：">
            <el-input v-model.trim="searchForm.zzys" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="住院医生：">
            <el-input v-model.trim="searchForm.zyys" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="住院天数：" prop="sjzytsBegin">
            <el-input v-model.trim="searchForm.sjzytsBegin" :maxlength="3" class="searchHalf"></el-input>
            <span style="width: 8px; text-align:center">-</span>
          </el-form-item>
          <el-form-item label="" prop="sjzytsEnd">
            <el-input v-model.trim="searchForm.sjzytsEnd" :maxlength="3" class="searchHalf"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </kindo-box>

    <kindo-box title="病案详情" icon="fa fa-list">
      <kindo-table :url="getUrl" ref="table" :queryParam="searchForm" :default-sort="{prop:'bah',order:'ascending'}">
        <el-table-column show-overflow-tooltip width="100px" label="病案号" prop="bah" header-align="center" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip width="120px" label="姓名" prop="xm" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="80px" label="性别" prop="xb" header-align="center" align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(source.xb,row.xb)}"> </el-table-column>
        <el-table-column show-overflow-tooltip width="80px" label="年龄" prop="nl" header-align="center" align="right" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip width="120px" label="住院天数" prop="sjzyts" header-align="center" align="right" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip width="120px" label="出院日期" prop="cysj" header-align="center" align="center" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip width="120px" label="DRG编码" prop="drgCode" header-align="center" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip min-width="140px" label="DRG名称" prop="drgName" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="主要诊断" prop="zyzd" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="主要操作ICD9" prop="ssjczmc1" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="出院科室" prop="cykb" header-align="center" sortable="custom"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="主任医生" prop="zrys" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="主治医生" prop="zzys" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="130px" label="住院医生" prop="zyys" header-align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip width="150px" label="医疗付费方式" prop="ylfkfs" header-align="center" align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(source.ylfkfs,row.ylfkfs)}"> </el-table-column>
        <el-table-column show-overflow-tooltip width="100px" label="总费用" prop="zfy" header-align="center" align="right" sortable="custom" :formatter="(r,c,v)=>{return kindo.util.formatNum(v)}"> </el-table-column>
        <el-table-column width="50px" label="操作" header-align="center" align="center" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :open-delay="300" content="查看详情" placement="top-start">
              <el-button @click="showDetail(scope.$index, scope.row)" type="text" size="small">
                <i class="fa fa-eye"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </kindo-table>
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable">导出</el-button>
      </div>
    </kindo-box>

    <el-dialog title="病例明细" :visible.sync="dialogVisible" top="50px" width="80%">
      <kindo-patientInfo :detailData="Object.assign(rowDetail,{zbd:'####'})">
        <div slot="more">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <kindo-patientInfo-item title="医疗付费方式">{{ kindo.dictionary.getLabel(source.ylfkfs,rowDetail.ylfkfs) }}</kindo-patientInfo-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
              <kindo-patientInfo-item title="病案号">{{ rowDetail.bah }}</kindo-patientInfo-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
              <kindo-patientInfo-item title="健康卡号">{{ rowDetail.jkkh }}</kindo-patientInfo-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
              <kindo-patientInfo-item title="入院次数">{{ rowDetail.zycs }}</kindo-patientInfo-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="24">
              <kindo-patientInfo-item title="DRG分组编码">{{ rowDetail.drgCode }}</kindo-patientInfo-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="24">
              <kindo-patientInfo-item title="DRG分组名称">{{ rowDetail.drgName }}</kindo-patientInfo-item>
            </el-col>
          </el-row>
        </div>
      </kindo-patientInfo>
    </el-dialog>
  </div>
</template>
<script>
import config from './config'
import kindoRichDatepicker from '@src/components/packages/KindoRichDatepicker.vue'
import mixinKPI from '@src/utils/helper/mixinKPI.js'
export default {
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  mixins: [mixinKPI],
  data() {
    return {
      condition: {},
      searchTemp: {
        richDatePicker: ['3', null, null, null]
      },
      getUrl: config.api.get,
      searchForm: {
        cykbbm: '', // 出院科室
        baKeyword: '', // 病案信息
        drgKeyword: '', // DRG组
        ssKeyword: '', // 手术级别
        zyzdKeyword: '', // 主要诊断
        lyfs: '', // 离院方式
        zrys: '', // 主任医师
        zzys: '', // 主治医师
        zyys: '', // 住院医师
        sjzytsBegin: '0', // 住院天数从
        sjzytsEnd: '999', // 住院天数到
        mlRisk: '' // 低风险1，中低2
      },
      searchRules: {
        sjzytsBegin: [
          {
            pattern: /^\d+$/,
            message: '请输入正整数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback, source, options) => {
              if (this.searchForm.sjzytsEnd && value && Number(value) > Number(this.searchForm.sjzytsEnd)) {
                callback(new Error())
              } else {
                callback()
              }
            },
            message: '开始天数不能大于结束天数',
            trigger: 'blur'
          }
        ],
        sjzytsEnd: [
          {
            pattern: /^\d+$/,
            message: '请输入正整数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (this.searchForm.sjzytsBegin && value && Number(value) < Number(this.searchForm.sjzytsBegin)) {
                callback(new Error())
              } else {
                callback()
              }
            },
            message: '结束天数不能小于开始天数',
            trigger: 'blur'
          }
        ]
      },
      source: {
        xb: [], // 性别
        lyfs: [], // 离院方式
        ylfkfs: [], // 医疗付费方式
        kb: [] // 出院科室
      },
      dialogVisible: false,
      rowDetail: {}
    }
  },
  async created() {
    this.searchTemp.richDatePicker = this.returnTime()
    this._initQueryParams()
    this._initSource()
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    goBack() {
      if (JSON.stringify(this.condition) !== '{}') {
        this.$router.push({
          path: kindo.cache.get('goBack').from,
          query: kindo.cache.get('goBack').params
        })
      }
    },
    _initQueryParams() {
      this.condition = Object.assign({}, this.condition, this.$route.query)
      // DRG编码
      if (this.$route.query.hasOwnProperty('drgCode')) {
        this.searchForm.drgKeyword = this.$route.query.drgCode
        delete this.$route.query.drgCode
      }

      // 出院科室
      if (this.$route.query && this.$route.query.hasOwnProperty('cykbbm')) {
        this.searchForm.cykbbm = this.$route.query.cykbbm
        delete this.$route.query.cykbbm
      }
      // 出院科室
      if (this.$route.query && this.$route.query.hasOwnProperty('lyfs')) {
        this.searchForm.lyfs = this.$route.query.lyfs
        delete this.$route.query.lyfs
      }
      // 出院日期
      if (this.$route.query && this.$route.query.hasOwnProperty('dateType')) {
        this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      }
      if (this.$route.query.hasOwnProperty('zrys')) {
        let ysType = this.$route.query.ysType
        switch (ysType) {
          case '1':
            this.searchForm.zrys = this.$route.query.zrys
            break
          case '2':
            this.searchForm.zzys = this.$route.query.zrys
            break
          case '3':
            this.searchForm.zyys = this.$route.query.zrys
            break
          case '4':
            this.searchForm.zrys = this.$route.query.zrys
            break
          case '5':
            this.searchForm.zzys = this.$route.query.zrys
            break
          case '6':
            this.searchForm.zyys = this.$route.query.zrys
            break
        }
        delete this.$route.query.ysType
        delete this.$route.query.zrys
      }
      if (this.$route.query.hasOwnProperty('mlRisk')) {
        this.searchForm.mlRisk = this.$route.query.mlRisk
        delete this.$route.query.drgCode
      }
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    },
    async _initSource() {
      // 性别
      const resRC001 = await kindo.dictionary.getDictionary('GB_T2261_1')
      this.source.xb = resRC001 || []

      // 离院方式
      const resRC019 = await kindo.dictionary.getDictionary('CC06_00_223_00')
      this.source.lyfs = resRC019 || []

      // 医疗付费方式
      const resRC032 = await kindo.dictionary.getDictionary('OT_01')
      this.source.ylfkfs = resRC032 || []

      // 出院科室
      const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
      this.source.kb = resDepartment || []
    },
    getData() {
      this.$refs.searchForm.validate(validate => {
        if (validate) {
          this.setDate()
          this.$refs.table.reloadData()
        }
      })
    },
    showDetail(idx, row) {
      let self = this
      this.$http
        .get(config.api.getDetail + row.id, { params: { id: row.id } })
        .then(res => {
          self.rowDetail = res.data
        })
        .then(() => {
          self.dialogVisible = true
        })
    },
    exportTable() {
      this.setDate()
      console.log(this.searchForm)
      kindo.util.downloadFile(config.api.exportTable, this.searchForm)
    }
  },
  watch: {
  }
}
</script>
<style scoped>
.searchInput {
  width: 200px !important;
}
.searchDateRange {
  width: 200px !important;
  font-size: 12px;
}
.searchHalf {
  width: 95px !important;
}
.spanTitle {
  display: inline-block;
  width: 48%;
  text-align: right;
  font-weight: bold;
}

.searchHalf {
  width: 95px !important;
}
</style>
