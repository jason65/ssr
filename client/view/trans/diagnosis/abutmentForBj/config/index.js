export default {
  api: {
    // 院内诊断查询
    hosApi: kindo.api.transfer + 'beijing/diagnosis/hospital/query',

    // 删除院内诊断
    deleteHos: kindo.api.transfer + 'beijing/diagnosis/hospital/delete',

    // 获取科室名称
    getDeptName: kindo.api.transfer + 'beijing/diagnosis/hospital/queryDept',

    // 标准诊断查询
    standardApi: kindo.api.transfer + 'beijing/diagnosis/areastandard/queryStandard',

    // 术语对接
    submitApi: kindo.api.transfer + 'beijing/diagnosis/areastandard/join',

    // 推荐算法
    recommendApi: kindo.api.transfer + 'beijing/solr/search',

    // 下载模版
    downloadApi: kindo.api.transfer + 'beijing/diagnosis/hospital/download',

    // 上传模版
    uploadApi: kindo.api.transfer + 'beijing/diagnosis/hospital/upload',

    // 一级对接 & 二级对接
    quick: kindo.api.transfer + 'beijing/solr/quick'
  },
  mock: {}
}
