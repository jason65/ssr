export default {
  api: {
    // 查询对接结果
    query: kindo.api.transfer + 'oper/areastandard/audit/query',

    // 通过对接结果
    resolve: kindo.api.transfer + 'oper/areastandard/audit/confirm',

    // 驳回对接结果
    reject: kindo.api.transfer + 'oper/areastandard/audit/reject',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'oper/hospital/queryDept'
  },
  mock: {}
}
