export default {
  api: {
    // 综合绩效指数
    linebar: kindo.api.performance + 'ksjxpjcla/kspj/zhjx',
    // 产能指标
    scatter1: kindo.api.performance + 'ksjxpjcla/kspj/cnzb',
    // 效率指标
    scatter2: kindo.api.performance + 'ksjxpjcla/kspj/efficiency',
    // CMI指标
    cmibar: kindo.api.performance + 'ksjxpjcla/kspj/cmi',
    // 低风险组死亡率
    bar1: kindo.api.performance + 'ksjxpjcla/kspj/lowdeathrate',
    // 中低风险组死亡率
    bar2: kindo.api.performance + 'ksjxpjcla/kspj/medlowdeathrate',
    // 科室对比
    compare: kindo.api.performance + 'ksjxpjcla/kspj/compare',
    // 数据列表查询
    listpage: kindo.api.performance + 'ksjxpjcla/kspj/querylistpage',
    // 数据列表下拉
    querydetail: kindo.api.performance + 'ksjxpjcla/kspj/querydetail',
    // 数据导出
    exportTable: kindo.api.performance + 'ksjxpjcla/kspj/export',
    // 查询区域的下拉框
    queryqy: 'common/query/queryqy',
    // 查询医院的下拉框
    queryhospital: 'common/query/queryhospital',
    // 查询指标
    drg: kindo.api.performance + 'ksjxpjcla/kspj/drg'
  }
}
