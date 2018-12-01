<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form @submit.native.prevent @keyup.enter.native="getData" :model="searchForm" ref="searchRef" :rules="searchRules" :inline="true" label-width="120px">
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
        <el-form-item label="病案号：">
          <el-input v-model.trim="searchForm.bah" id="sampleWidth" placeholder="" class="searchInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-tag>{{'数据更新时间：' + (alertTime ? kindo.util.formatDate(alertTime, 'yyyy年MM月dd日 HH:mm:ss') : '')}}</el-tag>
        <el-button type="primary" icon="el-icon-back" @click="goBack" v-show="JSON.stringify(condition)!=='{}'">返回</el-button>
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
      </div>
      <div slot="more">
        <el-form slot="more" @submit.native.prevent @keyup.enter.native="getData" label-width="120px" :model="searchForm" ref="searchRef" :rules="searchRules" :inline="true">
          <el-form-item label="入组状态：">
            <el-select clearable v-model.trim="searchForm.rzzt" placeholder="" class="searchInput">
              <el-option label="已入组" value="Y"></el-option>
              <el-option label="未入组" value="N"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="患者姓名：">
            <el-input v-model.trim="searchForm.xm" class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="主要操作ICD9：">
            <el-input v-model.trim="searchForm.ssKeyword" placeholder="请输入名称或编码 " class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="主要诊断：">
            <el-input v-model.trim="searchForm.zyzdKeyword" placeholder="请输入名称或编码 " class="searchInput"></el-input>
          </el-form-item>

          <el-form-item label="离院方式：">
            <el-select clearable v-model.trim="searchForm.lyfs" placeholder="" class="searchInput">
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

          <div>
            <el-form-item label="住院天数：" prop="sjzytsBegin">
              <el-input v-model.trim="searchForm.sjzytsBegin" :maxlength="3" class="searchHalf"></el-input>
              <span style="width: 8px; text-align:center">-</span>
            </el-form-item>
            <el-form-item label="" prop="sjzytsEnd">
              <el-input v-model.trim="searchForm.sjzytsEnd" :maxlength="3" class="searchHalf"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </kindo-box>

    <kindo-box title="病案详情" icon="fa fa-list">
      <kindo-table :url="getUrl" :queryParam="searchForm" ref="table" :default-sort="{prop:'bah',order:'ascending'}">
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="120px" label="病案号" prop="bah" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="120px" label="姓名" prop="xm"> </el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="80px" label="性别" prop="xb" :formatter="(row)=>{return kindo.dictionary.getLabel(source.xb,row.xb)}" align="center"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="80px" label="年龄" prop="nl" align="right" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="110px" label="住院天数" prop="sjzyts" align="right" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="120px" label="出院日期" prop="cysj" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" align="center" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" min-width="160px" label="主要诊断" prop="zyzd" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="160px" label="主要操作ICD9" prop="ssjczmc1" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="130px" label="出院科室" prop="cykb"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="130px" label="主任医生" prop="zrys"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="130px" label="主治医生" prop="zzys"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="130px" label="住院医生" prop="zyys"> </el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="170px" label="医疗付费方式" prop="ylfkfs" :formatter="(row)=>{return kindo.dictionary.getLabel(source.ylfkfs,row.ylfkfs)}" align="center" sortable='custom'> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="120px" label="总费用" prop="zfy" :formatter="(row)=>{return kindo.util.formatNum(row.zfy,2)}" align="right"> </el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" width="120px" label="入组状态" prop="drgState" :formatter="(row)=>{return kindo.dictionary.getLabel(source.drgState,row.drgState)}" align="center"> </el-table-column>
        <el-table-column width="50px" label="操作" align="center" fixed="right">
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
      <kindo-patientInfo :detailData="rowDetail">
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
      getUrl: config.api.get,
      searchForm: {
        year: '',
        month: '',
        quarter: '',
        cykbbm: '', // 出院科室编码
        bah: '', // 病案号
        rzzt: '', // 入组状态
        xm: '', // 姓名
        ssKeyword: '', // 手术操作关键字（编码+名称）
        zyzdKeyword: '', // 主要诊断（编码+名称）
        lyfs: '', // 离院方式
        zrys: '', // 主任医师
        zzys: '', // 主治医师
        zyys: '', // 住院医师
        sjzytsBegin: '0', // 住院天数从
        sjzytsEnd: '999' // 住院天数到
      },
      searchTemp: {
        richDatePicker: ['3', null, null, null]
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
        ylfkfs: [], // 医疗付费方式
        kb: [], // 出院科室
        lyfs: [], // 离院方式
        drgState: [{ value: 'Y', label: '已入组' }, { value: 'N', label: '未入组' }] // 入组状态
      },
      dialogVisible: false,
      rowDetail: {},
      alertTime: ''
    }
  },
  async created() {
    if (
      this.$route.query.hasOwnProperty('cykbbm') &&
      this.$route.query.hasOwnProperty('dateType')
    ) {
      this.condition = Object.assign({}, this.condition, this.$route.query)
      this.searchForm.cykbbm = this.$route.query.cykbbm
      this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.searchTemp.richDatePicker = this.returnTime()
    }

    // 医疗付费方式
    const resYlfkfs = await kindo.dictionary.getDictionary('OT_01')
    this.source.ylfkfs = resYlfkfs || []

    // 性别
    const resXb = await kindo.dictionary.getDictionary('GB_T2261_1')
    this.source.xb = resXb || []

    // 出院科室
    const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
    this.source.kb = resDepartment || []

    // 离院方式
    const resLyfs = await kindo.dictionary.getDictionary('CC06_00_223_00')
    this.source.lyfs = resLyfs || []
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
    getData() {
      this.$http.get(config.api.hisUpdateDate).then(res => {
        this.alertTime = res.data
      })

      this.$refs.searchRef.validate(validate => {
        if (validate) {
          this.setDate()
          this.$refs.table.reloadData()
        }
      })
    },
    async showDetail(idx, row) {
      const res = await this.$http.get(config.api.getDetail + window.encodeURIComponent(row.id), {
        params: { id: window.encodeURIComponent(row.id) }
      })
      this.rowDetail = res && res.data ? res.data : {}
      this.dialogVisible = true
    },
    exportTable() {
      this.setDate()
      kindo.util.downloadFile(config.api.exportTable, this.searchForm)
    }
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
  width: 89px !important;
}
.spanTitle {
  display: inline-block;
  width: 48%;
  text-align: right;
  font-weight: bold;
}
</style>
