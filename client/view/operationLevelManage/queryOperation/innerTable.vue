<template>
  <div id="innerTable">
    <el-table :data="tableData" :show-header="false">
      <el-table-column :show-overflow-tooltip="false" header-align="center" label="病案号" prop="undefined" width="219"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="患者姓名" prop="undefined" width="80"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="性别" prop="undefined" align="center" width="80"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="年龄" prop="undefined" align="right" width="80"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="住院天数" prop="undefined" align="right" width="120"></el-table-column>
      <el-table-column :show-overflow-tooltip="false" header-align="center" label="出院日期" prop="undefined" width="120"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="出院科室" prop="undefined" width="120"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="CCHI编码" prop="drgCode" width="130px" sortable='custom'>
        <template slot-scope="scope">
          {{'其他诊断'}}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="CCHI编码" prop="drgCode" width="130px">
        <template slot-scope="scope">
          {{scope.row.drgCode===null?'-':scope.row.drgCode}}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="CCHI名称" prop="ssjczmc1" min-width="160">
        <template slot-scope="scope">
          {{scope.row.ssjczmc1===null?'-':scope.row.ssjczmc1}}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="手术等级" prop="ssfj" width="120" :formatter="(row)=>{return kindo.dictionary.getLabel(dict.CC06_00_255_00,row.ssfj)}"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" header-align="center" label="手术医生" prop="sz1" width="120">
        <template slot-scope="scope">
          {{scope.row.sz1===null?'-':scope.row.sz1}}
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="50"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import mixin from '@src/utils/helper/mixin.js'

export default {
  mixins: [mixin],
  name: '',
  data() {
    return {
      tableData: [],
      dict: {
        CC06_00_255_00: []
      }
    }
  },
  props: {
    rowData: { type: Object, default: function () { return {} } }
  },

  created() {
    this.getDictionary('dict')
  },

  mounted() {
    this.$nextTick(function () {
      this.tableData = [{ drgCode: this.rowData.drgCode, ssjczmc1: this.rowData.ssjczmc1, ssfj: this.rowData.ssfj, sz1: this.rowData.sz1 }]
      console.log(this.rowData)
    })
  },

  methods: {

  },
  watch: {
    'rowData': function (val, oldVal) {
      this.tableData = [{ drgCode: val.drgCode, ssjczmc1: val.ssjczmc1, ssfj: val.ssfj, sz1: val.sz1 }]
    }
  }
}
</script>

<style lang="scss" scoped >

</style>