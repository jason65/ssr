<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form inline label-position="right" label-width="110px" :model="search" @submit.native.prevent ref="searchRef" @keyup.enter.native="get" :rules="searchRules">
        <el-form-item label="出院日期：">
          <el-select v-model.trim="dateComb.dateType" placeholder="请选择" style="width:70px" @change="dateCombChange">
            <el-option v-for="item in dict.DATE_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model.trim="dateComb.year" type="year" placeholder="请选择时间" :clearable="false" :editable="false" style="width:80px"></el-date-picker>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleQuarter" label="">
          <el-select v-model.trim="dateComb.quarter" style="width:90px;margin-left:5px;">
            <el-option v-for="item in dict.QUARTER" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleMonth" label="">
          <el-select v-model.trim="dateComb.month" style="width:85px;margin-left:5px;">
            <el-option v-for="item in dict.MONTH" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="search.cykbbm" clearable filterable placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in dict.DICT_DYN_KESHI" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手术等级：">
          <el-select v-model.trim="search.ssfj" clearable placeholder="">
            <el-option v-for="item in dict.CC06_00_255_00" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <el-option label="三四级手术" value="E">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form slot="more" inline label-position="right" label-width="110px" :model="search" @submit.native.prevent ref="searchRef" @keyup.enter.native="get" :rules="searchRules">
        <el-form-item label="病案号：">
          <el-input v-model.trim="search.bah" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="患者姓名：">
          <el-input v-model.trim="search.xm" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="离院方式：">
          <el-select v-model.trim="search.lyfs" clearable placeholder="">
            <el-option v-for="item in dict.CC06_00_223_00" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手术医生：">
          <el-input v-model.trim="search.sz1" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="住院天数：" prop="startDay">
          <el-input v-model.trim="search.startDay" :maxlength="3" class="searchHalf"></el-input>
          <span style="width: 8px; text-align:center">-</span>
          <el-input v-model.trim="search.endDay" :maxlength="3" class="searchHalf"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-tag>{{'数据更新时间：' + (alertTime ? kindo.util.formatDate(alertTime, 'yyyy年MM月dd日 HH:mm:ss') : '')}}</el-tag>
        <el-button type="primary" icon="el-icon-back" @click="goBack" v-show="JSON.stringify(condition)!=='{}'">返回</el-button>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        <!-- <el-button type="primary" icon="el-icon-search" @click="jump">jump</el-button> -->
      </div>
    </kindo-box>

    <kindo-box title="手术病案" icon="fas fa-list">
      <kindo-table ref="table" :url="config.api.get" :queryParam="search" :default-sort="{prop:'bah',order:'ascending'}" :loadFilter="filterData">
        <el-table-column :show-overflow-tooltip="false" header-align="center" label="病案号" prop="bah" width="120" sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.bah===null?'-':scope.row.bah}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="患者姓名" prop="xm" width="80">
          <template slot-scope="scope">
            {{scope.row.xm===null?'-':scope.row.xm}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="性别" prop="xb" align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.GB_T2261_1,row.xb)}" width="80"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="年龄" prop="nl" align="right" width="80" sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.nl===null?'-':scope.row.nl}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="住院天数" prop="sjzyts" align="right" width="120" sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.sjzyts===null?'-':scope.row.sjzyts}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="操作类型" prop="xh" align="center" width="130px" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="CCHI编码" prop="cchiCode" width="130px" sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.cchiCode===null?'-':scope.row.cchiCode}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="CCHI名称" prop="cchiName" min-width="160">
          <template slot-scope="scope">
            {{scope.row.cchiName===null?'-':scope.row.cchiName}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="ICD9名称" prop="icdNineName" min-width="160">
          <template slot-scope="scope">
            {{scope.row.icdNineName===null?'-':scope.row.icdNineName}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="手术等级" prop="ssfj" width="120" sortable='custom' :formatter="(row)=>{return kindo.dictionary.getLabel(dict.CC06_00_255_00,row.ssfj)}"></el-table-column>
        <el-table-column :show-overflow-tooltip="false" header-align="center" label="出院日期" prop="cysj" width="120" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" sortable='custom'></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="出院科室" prop="cykb" width="120">
          <template slot-scope="scope">
            {{scope.row.cykb===null?'-':scope.row.cykb}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" label="手术医生" prop="sz" width="120" sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.sz===null?'-':scope.row.sz}}
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
              <kindo-patientInfo-item title="医疗付费方式">{{ kindo.dictionary.getLabel(dict.OT_01,rowDetail.ylfkfs) }}</kindo-patientInfo-item>
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
import mixin from '@src/utils/helper/mixin.js'
import innerTable from './innerTable'
export default {
  name: '',
  mixins: [mixin],
  components: {
    'inner-table': innerTable
  },
  data() {
    return {
      config: config,
      condition: {},
      dict: {
        // 手术等级
        CC06_00_255_00: [],
        // 离院方式
        CC06_00_223_00: [],
        // 性别
        GB_T2261_1: [],
        // 所有科室
        DICT_DYN_KESHI: [],
        // 医疗付费方式
        OT_01: [],
        DATE_TYPE: [],
        QUARTER: [],
        MONTH: []
      },
      loading: false,
      list: {
        drgList: [], // drgList列表
        jbdmList: [], // 主要诊断
        cchiList: [], // cchi的列表
        kb: [] // 出院科室
      },
      dateComb: {
        dateType: '3',
        visibleQuarter: false,
        visibleMonth: true,
        year: '',
        quarter: '',
        month: ''
      },
      search: {
        date: [],
        cykbbm: '', // 出院科室编码
        bah: '', // 病案号
        ssfj: '',
        xm: '',
        lyfs: '', // 离院方式
        sz1: '', // 主治医师
        startDay: '0', // 住院天数从
        endDay: '999' // 住院天数到
      },

      searchRules: {
        startDay: [
          {
            pattern: /^\d*$/,
            message: '请输入正整数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback, list, options) => {
              let self = this
              if (self.search.endDay.trim() === '' || self.search.endDay.trim() === '') {
                callback()
              } else {
                if (parseFloat(self.search.endDay) < parseFloat(self.search.startDay)) {
                  callback(new Error())
                } else {
                  callback()
                }
              }
            },
            message: '开始天数不能大于结束天数',
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false,
      rowDetail: {},
      alertTime: ''
    }
  },

  async created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // 一定会存在时间和科室的字段
      this.search.cykbbm = this.$route.query.cykbbm
      this.dateComb.dateType = this.$route.query.dateType
      this.dateComb.year = this.$route.query.year.toString()
      this.dateComb.month = this.$route.query.month
      this.dateComb.quarter = this.$route.query.quarter
      this.dateComb.visibleQuarter = this.$route.query.visibleQuarter
      this.dateComb.visibleMonth = this.$route.query.visibleMonth
      if (this.$route.query.ssfj && !kindo.validate.isEmpty(this.$route.query.ssfj)) {
        this.search.ssfj = this.$route.query.ssfj
      }
      if (this.$route.query.sz1 && !kindo.validate.isEmpty(this.$route.query.sz1)) {
        this.search.sz1 = this.$route.query.sz1
      }
      Object.assign(this.condition, this.$route.query)
      for (let key in this.$route.query) {
        delete this.$route.query[key]
      }
    } else {
      this.initTime()
    }
    this.getDictionary('dict')
  },

  mounted() {
    this.$nextTick(function () {
      this.get()
    })
  },

  methods: {
    // jump() {
    //   this.$router.push({
    //     path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/74388682-622d-42b8-ade2-c907bdc28d2d'
    //   })
    // },
    filterData(res) {
      return res
    },
    get() {
      this.$http.get(config.api.hisUpdateDate).then(res => {
        this.alertTime = res.data
      })
      this.setSearchDate()
      this.$refs.searchRef.validate(validate => {
        if (validate) {
          this.$refs.table.reloadData()
        }
      })
    },

    async showDetail(idx, row) {
      const res = await this.$http.get(config.api.getDetail, {
        params: { bah: row.bah, zycs: row.zycs }
      })
      this.rowDetail = res && res.data ? res.data : {}
      this.dialogVisible = true
    },
    goBack() {
      if (JSON.stringify(this.condition) !== '{}') {
        this.$router.push({
          path: kindo.cache.get('goBack').from,
          query: kindo.cache.get('goBack').params
        })
      }
    },
    exportTable() {
      this.setSearchDate()
      kindo.util.downloadFile(config.api.export, this.search)
    }
  }
}
</script>

<style lang="scss" scoped >
.el-form-item__content {
  .el-date-editor-daterange.el-input__inner,
  .el-input,
  .el-select {
    width: 200px;
  }
}
.searchDateRange {
  width: 200px !important;
  font-size: 12px;
}
.spanRight {
  float: right;
}
.mark {
  cursor: pointer;
}

.errorClass {
  color: red;
}

.searchHalf {
  width: 93px !important;
}
</style>
