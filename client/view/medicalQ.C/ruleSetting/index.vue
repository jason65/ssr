<template>
  <div>
    <kindo-box icon="fa fa-list">
      <el-radio-group v-model.trim="errType" size="small" @change="getData">
        <el-radio-button label="3">DRG规则</el-radio-button>
        <el-radio-button label="2">HQMS规则</el-radio-button>
      </el-radio-group>

      <el-table :data="tableData" ref="tableRef">
        <!-- 行号 -->
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" width="200px" label="规则名称" prop="errName"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" header-align="center" min-width="260px" label="错误描述" prop="errDesc"> </el-table-column>
        <el-table-column width="120px" label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" active-value="1" inactive-value="2" @change="clickEnable(scope.row)"></el-switch>
            <!-- <el-button type="text" @click="clickEnable(scope.row,2)" v-if="scope.row.enable==='1'">关闭</el-button> -->
            <!-- <el-button type="text" @click="clickEnable(scope.row,1)" v-if="scope.row.enable==='2'" class="grey">开启</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div slot="control">
      </div>
    </kindo-box>

    <el-dialog title="病例明细" :visible.sync="dialogVisible" top="50px" width="80%">
    </el-dialog>
  </div>
</template>
<script>
import config from './config'
export default {
  data() {
    return {
      tableData: [],
      errType: '3',
      getUrl: config.api.get,
      source: {
        xb: [], // 性别
        ylfkfs: [], // 医疗付费方式
        kb: [], // 出院科室
        lyfs: [], // 离院方式
        drgState: [{ value: 'Y', label: '已入组' }, { value: 'N', label: '未入组' }] // 入组状态
      },
      dialogVisible: false
    }
  },
  async created() {
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
    getData() {
      this.$http.get(config.api.get, { params: { errType: this.errType } }).then(res => {
        this.tableData = res.data
      })
    },
    clickEnable(row) {
      this.$http.post(config.api.upd, Object.assign({}, row, { enable: row.enable })).then(res => {
        this.getData()
      })
    }
  }
}
</script>
<style scoped>
.grey {
  color: grey;
}
</style>