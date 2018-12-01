export default {
  api: {
    // 查询对接结果
    query: kindo.api.transfer + 'diagnosis/areastandard/audit/query',

    // 通过对接结果
    resolve: kindo.api.transfer + 'diagnosis/areastandard/audit/confirm',

    // 驳回对接结果
    reject: kindo.api.transfer + 'diagnosis/areastandard/audit/reject',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'diagnosis/hospital/queryDept '
  },
  mock: {}
}
