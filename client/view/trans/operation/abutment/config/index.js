export default {
  api: {
    // 院内诊断查询
    hosApi: kindo.api.transfer + 'oper/hospital/query',

    // 删除院内诊断
    deleteHos: kindo.api.transfer + 'diagnosis/oper/delete',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'oper/hospital/queryDept',

    // 标准诊断查询
    standardApi: kindo.api.transfer + 'oper/areastandard/queryStandard',

    // 术语对接
    submitApi: kindo.api.transfer + 'oper/areastandard/join',

    // 推荐算法
    recommendApi: kindo.api.transfer + 'oper/search',

    // 下载模版
    downloadApi: kindo.api.transfer + 'oper/hospital/download',

    // 上传模版
    uploadApi: kindo.api.transfer + 'oper/hospital/upload',

    // 一级对接 & 二级对接
    quick: kindo.api.transfer + 'oper/quick'
  },
  mock: {}
}
