export default {
  api: {
    // 查询对接结果
    query: kindo.api.transfer + 'oper/areastandard/audit/queryAudited',

    // 驳回
    reject: kindo.api.transfer + 'oper/areastandard/audit/finalReject',

    // 导出
    exportApi: kindo.api.transfer + 'oper/areastandard/audit/queryAudited/export',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'oper/hospital/queryDept'
  },
  mock: {}
}
