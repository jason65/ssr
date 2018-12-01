<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form inline label-position="right" label-width="120px" :model="searchForm" @submit.native.prevent ref="searchRef" @keyup.enter.native="get" :rules="searchRules">
        <el-form-item label="出院日期：">
          <kindo-rich-date-picker v-model="searchTemp.richDatePicker"></kindo-rich-date-picker>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="searchForm.cykbbm" filterable clearable placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.kb" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="错误描述：">
          <el-select v-model.trim="searchForm.errCode" filterable clearable placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in source.errdesc" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form slot="more" inline label-position="right" label-width="120px" :model="searchForm" @submit.native.prevent ref="searchRef" @keyup.enter.native="get" :rules="searchRules">
        <el-form-item label="患者信息：">
          <el-input v-model.trim="searchForm.hzKeyword" placeholder="输入病案号或姓名"></el-input>
        </el-form-item>
        <el-form-item label="主要诊断：">
          <el-input v-model.trim="searchForm.zyzdKeyword" placeholder="输入编码或名称"></el-input>
        </el-form-item>
        <el-form-item label="主要操作ICD9：">
          <el-input v-model.trim="searchForm.ssKeyword" placeholder="输入编码或名称"></el-input>
        </el-form-item>
        <el-form-item label="主任医生：">
          <el-input v-model.trim="searchForm.zrys" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="主治医生：">
          <el-input v-model.trim="searchForm.zzys" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="住院医生：">
          <el-input v-model.trim="searchForm.zyys" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="离院方式：">
          <el-select clearable v-model.trim="searchForm.lyfs" placeholder="">
            <el-option v-for=" item in source.lyfs" :key="item.value " :label="item.label " :value="item.value "></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住院天数：" prop="sjzytsBegin">
          <el-input v-model.trim="searchForm.sjzytsBegin" :maxlength="3" class="searchHalf"></el-input>
          <span style="width: 8px; text-align:center">-</span>
        </el-form-item>
        <el-form-item label="" prop="sjzytsEnd">
          <el-input v-model.trim="searchForm.sjzytsEnd" :maxlength="3" class="searchHalf"></el-input>
        </el-form-item>
      </el-form>

      <div slot="control">
        <el-tag>{{'数据更新时间：' + (alertTime ? kindo.util.formatDate(alertTime, 'yyyy年MM月dd日 HH:mm:ss') : '')}}</el-tag>
        <el-button type="primary" icon="el-icon-back" @click="goBack" v-show="JSON.stringify(condition)!=='{}'">返回</el-button>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title="问题病案" icon="fas fa-list">
      <kindo-table ref="table" :url="config.api.get" :queryParam="searchForm" :default-sort="{prop:'bah',order:'ascending'}">
        <el-table-column :show-overflow-tooltip="false" header-align="center" label="病案号" prop="bah" width="90" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="患者姓名" prop="xm" width="80"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="性别" prop="xb" align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(source.xb,row.xb)}" width="80"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="年龄" prop="nl" align="right" width="80" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" label="出院日期" prop="cysj" align="center" width="120" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="住院天数" prop="sjzyts" align="right" width="120" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="主要诊断" prop="zyzd" min-width="160px"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="主要操作ICD9" prop="ssjczmc1" min-width="160px"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="出院科室" prop="cykb" width="120" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="主任医生" prop="zrys" width="120" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="主治医生" prop="zzys" width="120" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="住院医生" prop="zyys" width="120" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="错误类型" prop="errTypes" width="80"></el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" label="错误描述" prop="errs" min-width="160px">
          <template slot-scope="scope">
            <el-tooltip placement="top" v-if="scope.row.errs && scope.row.errs.length>0">
              <div slot="content">
                <p v-for="item in scope.row.errs" :key="item">{{ item }}</p>
              </div>
              <el-tag>{{ scope.row.errs[0] }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="50" fixed="right">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <kindo-patientInfo-item title="错误描述">
                <p v-for="item in rowDetail.errs" :key="item" class="errorClass">{{ item }}</p>
              </kindo-patientInfo-item>
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
  name: '',
  components: {
    'kindo-rich-date-picker': kindoRichDatepicker
  },
  mixins: [mixinKPI],
  data() {
    return {
      condition: {},
      config,
      searchTemp: {
        richDatePicker: ['3', null, null, null]
      },
      searchForm: {
        year: '',
        month: '',
        quarter: '',
        cykbbm: '', // 出院科室编码
        errCode: '', // 错误类型描述
        hzKeyword: '', // 病案号+姓名
        zyzdKeyword: '', // 主要诊断
        ssKeyword: '', // 手术操作
        lyfs: '', // 离院方式
        zrys: '', // 主任医师
        zzys: '', // 主治医师
        zyys: '', // 住院医师
        sjzytsBegin: '0', // 住院天数从
        sjzytsEnd: '999' // 住院天数到
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
        kb: [], // 出院科室
        xb: [], // 性别
        lyfs: [], // 离院方式
        ylfkfs: [], // 医疗付费方式
        errdesc: [] // 错误描述
      },
      dialogVisible: false,
      rowDetail: {},

      alertTime: ''
    }
  },

  async created() {
    if (
      this.$route.query.hasOwnProperty('cykbbm') ||
      this.$route.query.hasOwnProperty('errCode') ||
      this.$route.query.hasOwnProperty('dateType')
    ) {
      this.condition = Object.assign({}, this.condition, this.$route.query)
      this.searchForm.cykbbm = this.$route.query.cykbbm
      this.searchForm.errCode = this.$route.query.errCode
      // this.searchFormTemp.date = [this.$route.query.fromOneStart, this.$route.query.fromOneEnd]
      this.searchTemp.richDatePicker = [this.$route.query.dateType, this.$route.query.year, this.$route.query.quarter, this.$route.query.month]
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.searchTemp.richDatePicker = this.returnTime()
      // this.searchFormTemp.date = [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).formatDate(), new Date().formatDate()]
    }

    // 性别
    const resXb = await kindo.dictionary.getDictionary('GB_T2261_1')
    this.source.xb = resXb || []

    // 出院科室
    const resDepartment = await kindo.dictionary.getDictionary('DICT_DYN_KESHI')
    this.source.kb = resDepartment || []

    // 离院方式
    const resLyfs = await kindo.dictionary.getDictionary('CC06_00_223_00')
    this.source.lyfs = resLyfs || []

    // 医疗付费方式
    const resYlfkfs = await kindo.dictionary.getDictionary('OT_01')
    this.source.ylfkfs = resYlfkfs || []

    // 错误描述
    const resErrdescs = await kindo.dictionary.getDictionary('DICT_DYN_RULEERR')
    this.source.errdesc = resErrdescs || []
  },

  mounted() {
    this.$nextTick(function () {
      this.get()
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
    get() {
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
      const res = await this.$http.get(config.api.getDetail, {
        params: { id: window.encodeURIComponent(row.id) }
      })
      this.rowDetail = res && res.data ? res.data : {}
      this.dialogVisible = true
    },

    exportTable() {
      this.setDate()
      kindo.util.downloadFile(this.config.api.export, this.searchForm)
    }
  }
}
</script>

<style lang="scss" scoped >
.el-form-item__content {
  .el-date-editor--daterange.el-input__inner,
  .el-input,
  .el-select {
    width: 200px;
  }
}

.mark {
  cursor: pointer;
}

.errorClass {
  color: red;
}

.searchHalf {
  width: 95px !important;
}
</style>
