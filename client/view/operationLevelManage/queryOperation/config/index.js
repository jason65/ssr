export default {
  api: {
    // 查询表格
    get: kindo.api.cDrgOGM + 'ssfjglcla/sscx/querylistpage/',
    // 查询明细
    getDetail: kindo.api.cDrgOGM + 'ssfjglcla/sscx/queryBaInfo',
    // 导出
    export: kindo.api.cDrgOGM + 'ssfjglcla/sscx/exportSscx',
    // 查询数据更新时间
    hisUpdateDate: kindo.api.manageDrg + 'baqc/summary/syndate'
  }
  // mock: {
  //   get: {
  //     code: '200',
  //     data: {
  //       'rows|8-30': [{
  //         'bah': '@word',
  //         'deptName': '@cname',
  //         'sscs|1-100': 1,
  //         'cysj|1-100': 1,
  //         'sscs1|1-100': 2,
  //         'sscs2|1-100': 3,
  //         'sscs3|1-100': 3,
  //         'sscs4|1-100': 4,
  //         'sscstot|1-100': 5,
  //         'sszb|1-100': 6,
  //         'zhjf|1-100': 7,
  //         'sqpjzyr|1-100': 8,
  //         'pjzyfy|1-100': 12,
  //         'pjssfy|1-100': 9
  //       }],
  //       'total|8-30': 1
  //     },
  //     message: ''
  //   }
  // }
}
