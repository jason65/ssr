export default {
  api: {
    // 查询对接结果
    query: kindo.api.transfer + 'diagnosis/areastandard/audit/queryAudited',

    // 驳回
    reject: kindo.api.transfer + 'diagnosis/areastandard/audit/finalReject',

    // 导出
    exportApi: kindo.api.transfer + 'diagnosis/areastandard/audit/queryAudited/export',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'diagnosis/hospital/queryDept '
  },
  mock: {}
}
