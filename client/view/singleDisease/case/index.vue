<template>
  <div>
    <kindo-box title="条件筛选" icon="el-icon-search">
      <el-form onsubmit="return false;" :model="search" ref="searchForm" :inline="true" label-width="110px" label-position="right" @keyup.enter.native="get" style="height:auto;">
        <el-form-item label="单病种选择：">
          <div style="width:270px">
            <el-radio v-model.trim="search.bzFalg" :label="1">省100个单病种</el-radio>
            <el-radio v-model.trim="search.bzFalg" :label="2" style="margin-left:12px;">国家320个单病种</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="医疗付费方式：">
          <el-select v-model.trim="search.ylfkfs" placeholder="" filterable :clearable="true">
            <el-option v-for="(item,index) in dict.OT_01" :key="index" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算方式：">
          <el-select v-model.trim="search.jsfs" placeholder="" filterable :clearable="true">
            <el-option v-for="(item,index) in dict.OT_06" :key="index" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="出院日期：">
          <el-select v-model.trim="dateComb.dateType" placeholder="请选择" style="width:78px" @change="dateCombChange">
            <el-option v-for="item in dict.DATE_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model.trim="dateComb.year" type="year" placeholder="请选择时间" :clearable="false" :editable="false" style="width:85px"></el-date-picker>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleQuarter" label="">
          <el-select v-model.trim="dateComb.quarter" style="width:95px;margin-left:5px;">
            <el-option v-for="item in dict.QUARTER" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="dateComb.visibleMonth" label="">
          <el-select v-model.trim="dateComb.month" style="width:85px;margin-left:5px;">
            <el-option v-for="item in dict.MONTH" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出院科室：">
          <el-select v-model.trim="search.cykbbm" placeholder="" filterable :clearable="true">
            <el-option v-for="(item,index) in dict.DICT_DYN_KESHI" :key="index" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病例号：">
          <el-input v-model.trim="search.bah"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名：">
          <el-input v-model.trim="search.xm"></el-input>
        </el-form-item>
      </el-form>
      <div slot="control">
        <el-button type="primary" icon="el-icon-back" @click="goBack" v-show="JSON.stringify(condition)!=='{}'">返回</el-button>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
      </div>
    </kindo-box>

    <kindo-box title=" " icon=" ">
      <div slot="control">
        <el-button icon="el-icon-download" @click="exportTable">导出</el-button>
      </div>
      <kindo-table :url="tableUrl" :queryParam="search" ref="table" width="100%" :default-sort="{prop:'bah',order:'ascending'}" :pageSize="15">
        <el-table-column prop="bah" label="病例号" sortable='custom' width="100px" header-align="center"></el-table-column>
        <el-table-column prop="xm" label="姓名" width="100px" header-align="center"></el-table-column>
        <el-table-column prop="xb" label="性别" width="100px" header-align="center" align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.GB_T2261_1,row.xb)}"></el-table-column>
        <el-table-column prop="nl" label="年龄" sortable='custom' width="80px" header-align="center" align="right"></el-table-column>
        <el-table-column prop="cysj" label="出院日期" sortable='custom' width="130px" header-align="center" :formatter="(r,c,v)=>{return kindo.util.formatDate(v)}" align="center"></el-table-column>
        <el-table-column prop="cykb" label="出院科室" sortable='custom' width="120px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="zzys" label="主治医生" width="120px" header-align="center"></el-table-column>
        <el-table-column prop="sjzyts" label="住院天数" sortable='custom' width="120px" header-align="center" align="right"></el-table-column>
        <el-table-column prop="zyzd" label="病种名称" sortable='custom' width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ssjczmc1" label="主要操作" sortable='custom' width="180px" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="mzfs1" label="麻醉类型" width="120px" header-align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.CV06_00_103,row.mzfs1)}"></el-table-column>
        <el-table-column prop="ylfkfs" label="医疗付费方式" sortable='custom' width="170px" header-align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.OT_01,row.ylfkfs)}"></el-table-column>
        <el-table-column prop="jsfs" label="结算方式" sortable='custom' width="120px" header-align="center" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.OT_06,row.jsfs)}"></el-table-column>
        <el-table-column prop="zfy" label="总费用" sortable='custom' width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="bzfy" label="标准费用" width="120px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="tczf" label="统筹支付" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="grzfje" label="患者自付" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
        <el-table-column prop="zfze" label="患者自费" width="130px" header-align="center" align="right" :formatter="(row,col)=>{return kindo.util.formatNum(row[col.property],2)}"></el-table-column>
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
          <!-- <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <kindo-patientInfo-item title="错误描述">
                <p v-for="item in rowDetail.errs" :key="item" class="errorClass">{{ item }}</p>
              </kindo-patientInfo-item>
            </el-col>
          </el-row> -->
        </div>
      </kindo-patientInfo>
    </el-dialog>
  </div>
</template>
<script>
import config from './config'
import minxin from '@src/utils/helper/mixin.js'

export default {
  mixins: [minxin],
  data() {
    return {
      condition: {},
      handlerIndex: 0,
      dialogVisible: false,
      rowDetail: {},
      search: {
        bzFalg: 1,
        ylfkfs: '',
        jsfs: '',
        cykbbm: '',
        bah: '',
        xm: '',
        bzmc: '',
        year: '',
        month: '',
        quarter: ''

      },
      dateComb: {
        dateType: '3',
        visibleQuarter: false,
        visibleMonth: true,
        year: kindo.util.formatDate(new Date().getTime(), 'yyyy'),
        quarter: '',
        month: kindo.util.formatDate(new Date().getTime(), 'MM')
      },
      dict: {
        DATE_TYPE: [],
        MONTH: [],
        QUARTER: [],
        OT_01: [],
        OT_06: [],
        GB_T2261_1: [],
        DICT_DYN_KESHI: [],
        CV06_00_103: []
      },
      tableUrl: config.api.table
    }
  },
  watch: {
    search: {
      handler(newValue, oldValue) {
        this.handlerIndex += 1
        if (this.handlerIndex > 2) {
          if (this.search.bzmc !== '') {
            this.search.bzmc = ''
          }
        }
      },
      deep: true
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.routerParams()
    } else {
      let dateDefault = this.returnTime()
      this.dateComb.dateType = dateDefault[0]
      this.dateComb.year = dateDefault[1]
      this.dateComb.month = dateDefault[3]
    }
    this.getDictionary('dict')
  },
  mounted() {
    this.$nextTick(() => {
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
    routerParams() {
      let search = this.$route.query
      this.condition = Object.assign({}, this.condition, this.$route.query)
      // 出院日期
      if (JSON.stringify(search) !== '{}') {
        this.dateComb.dateType = this.$route.query.dateType
        this.dateComb.year = this.$route.query.year.toString()
        this.dateComb.month = this.$route.query.month
        this.dateComb.quarter = this.$route.query.quarter
        this.dateComb.visibleQuarter = this.$route.query.visibleQuarter
        this.dateComb.visibleMonth = this.$route.query.visibleMonth
      }
      // 出院科室
      if (search.hasOwnProperty('deptCode')) {
        this.search.cykbbm = search.deptCode
        delete search.deptCode
      }
      // 医疗付费方式
      if (search.hasOwnProperty('ylfkfs')) {
        this.search.ylfkfs = search.ylfkfs
        delete search.ylfkfs
      }
      // 病种名称
      if (search.hasOwnProperty('bzmc')) {
        this.search.bzmc = search.bzmc
        delete search.bzmc
      }
      // 病种类型
      if (search.hasOwnProperty('bzlx')) {
        this.search.bzFalg = search.bzlx
        delete search.bzlx
      }
    },
    getDictionary(obj) {
      for (let k in this[obj]) {
        if (this[obj].hasOwnProperty(k)) {
          kindo.dictionary.getDictionary(k).then(res => {
            this.dict[k] = res || []
          })
        }
      }
    },
    get() {
      this.setSearchDate()
      this.$refs['table'].reloadData()
    },
    async showDetail(idx, row) {
      const res = await this.$http.get(config.api.getDetail, {
        params: { id: window.encodeURIComponent(row.id) }
      })
      this.rowDetail = res && res.data ? res.data : {}
      this.dialogVisible = true
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