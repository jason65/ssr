export default {
  api: {
    // 综合绩效指数
    linebar: kindo.api.performance + 'ksjxpjcla/yspj/zhjx',
    // 产能指标
    scatter1: kindo.api.performance + 'ksjxpjcla/yspj/cnzb',
    // 效率指标
    scatter2: kindo.api.performance + 'ksjxpjcla/yspj/efficiency',
    // CMI指标
    cmibar: kindo.api.performance + 'ksjxpjcla/yspj/cmi',
    // 低风险组死亡率
    bar1: kindo.api.performance + 'ksjxpjcla/yspj/lowdeathrate',
    // 中低风险组死亡率
    bar2: kindo.api.performance + 'ksjxpjcla/yspj/medlowdeathrate',
    // 科室对比
    compare: kindo.api.performance + 'ksjxpjcla/yspj/compare',
    // 数据列表查询
    listpage: kindo.api.performance + 'ksjxpjcla/yspj/querylistpage',
    // 数据导出
    exportTable: kindo.api.performance + 'ksjxpjcla/yspj/export',
    // 查询区域的下拉框
    queryqy: 'common/query/queryqy',
    // 查询医院的下拉框
    queryhospital: 'common/query/queryhospital',
    department: kindo.api.manageDrg + 'baqc/normal/cyks',
    doctor: kindo.api.performance + 'ksjxpjcla/yspj/doctorname',
    // 查询指标
    drg: kindo.api.performance + 'ksjxpjcla/yspj/drg'
  },
  mock: {
    // listpage: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'jbyyscode|+1': [
    //           '4050001',
    //           '4050002',
    //           '4050003',
    //           '4050004',
    //           '4050005',
    //           '4050006',
    //           '4050007',
    //           '4050008',
    //           '4050009',
    //           '4050010',
    //           '4050011',
    //           '4050012',
    //           '4050013',
    //           '4050014',
    //           '4050015'
    //         ],
    //         'jbyysname|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX', '李XX', '赵XX', '孙XX', '周XX', '吴XX', '郑XX', '艾XX', '鲍XX', '罗XX', '黄XX'],
    //         'jbybanum|1-100': 626,
    //         'jbyindrgnum|1-100': 9,
    //         'jbyrzl|1-100.2': 0.0,
    //         'jbyzhzs|1-100.2': 0.0,
    //         'jbydrgnum|1-100': 0.0,
    //         'jbyrwt|1-100': 0.0,
    //         'jbynxzs|1-100': 0.0,
    //         'jbyfwnlzs|1-100': 0.0,
    //         'jbyfwxlzs|1-100': 0.0,
    //         'jbycmi|1-100': 0.0,
    //         'jbycostsi|1-100': 0.0,
    //         'jbycjfy|1-100': 0.0,
    //         'jbytimesi|1-100': 0.0,
    //         'jbypjzyr|1-100': 0.0,
    //         'jbylownum|1-100': 0.0,
    //         'jbymednum|1-100': 0.0
    //       }
    //     ],
    //     total: 15
    //   }
    // },
    // linebar: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'code|+1': [
    //           '4050001',
    //           '4050002',
    //           '4050003',
    //           '4050004',
    //           '4050005',
    //           '4050006',
    //           '4050007',
    //           '4050008',
    //           '4050009',
    //           '4050010',
    //           '4050011',
    //           '4050012',
    //           '4050013',
    //           '4050014',
    //           '4050015'
    //         ],
    //         'name|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX', '李XX', '赵XX', '孙XX', '周XX', '吴XX', '郑XX', '艾XX', '鲍XX', '罗XX', '黄XX'],
    //         'value|1-100': 0
    //       }
    //     ]
    //   }
    // },
    // scatter1: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'code|+1': [
    //           '4050001',
    //           '4050002',
    //           '4050003',
    //           '4050004',
    //           '4050005',
    //           '4050006',
    //           '4050007',
    //           '4050008',
    //           '4050009',
    //           '4050010',
    //           '4050011',
    //           '4050012',
    //           '4050013',
    //           '4050014',
    //           '4050015'
    //         ],
    //         'name|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX', '李XX', '赵XX', '孙XX', '周XX', '吴XX', '郑XX', '艾XX', '鲍XX', '罗XX', '黄XX'],
    //         'valuex|1-100': 0,
    //         'valuey|1-2.2': 0
    //       }
    //     ],
    //     'polex|1-50': 0,
    //     'poley|1-2.2': 0
    //   }
    // },
    // scatter2: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'code|+1': [
    //           '4050001',
    //           '4050002',
    //           '4050003',
    //           '4050004',
    //           '4050005',
    //           '4050006',
    //           '4050007',
    //           '4050008',
    //           '4050009',
    //           '4050010',
    //           '4050011',
    //           '4050012',
    //           '4050013',
    //           '4050014',
    //           '4050015'
    //         ],
    //         'name|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX', '李XX', '赵XX', '孙XX', '周XX', '吴XX', '郑XX', '艾XX', '鲍XX', '罗XX', '黄XX'],
    //         'valuex|0-1.2': 0,
    //         'valuey|0-1.2': 0
    //       }
    //     ],
    //     'polex|0-1.2': 0,
    //     'poley|0-1.2': 0
    //   }
    // },
    // bar1: {
    //   code: 200,
    //   data: {
    //     'rows|2': [
    //       {
    //         'name|+1': ['杨XX', '刘XX'],
    //         'value|0-1.2': 0
    //       }
    //     ]
    //   }
    // },
    // bar2: {
    //   code: 200,
    //   data: {
    //     'rows|5': [
    //       {
    //         'name|+1': ['郑XX', '艾XX', '鲍XX', '罗XX', '黄XX'],
    //         'value|0-1.2': 0
    //       }
    //     ]
    //   }
    // },
    // cmibar: {
    //   code: 200,
    //   data: {
    //     'rows|5': [
    //       {
    //         'code|+1': ['4050001', '4050002', '4050003', '4050004', '4050005'],
    //         'name|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX'],
    //         'value|0-1.2': 0,
    //         'count|1-100': 0
    //       }
    //     ]
    //   }
    // },
    // compare: {
    //   code: 200,
    //   data: {
    //     'rows|5': [
    //       {
    //         'itemCode|+1': ['4050001', '4050002', '4050003', '4050004', '4050005'],
    //         'itemName|+1': ['杨XX', '刘XX', '张XX', '陈XX', '王XX'],
    //         'drgNum|1-100': 38,
    //         'cmmi|0-1.2': 0.8506657223796034,
    //         'timeCostSi|0-1.2': 0.5588743676338338,
    //         'feeCostSi|0-1.2': 0.38494416883680055,
    //         'lowDieRate|0-1.2': 0.0,
    //         'midLowDieRate|0-1.2': 0.0,
    //         'ypfy|1-100': 2955331,
    //         'zhfy|1-100': 1019158,
    //         'zdfy|1-100': 2936473,
    //         'zlfy|1-100': 267073,
    //         'xyfy|1-100': 4070,
    //         'clfy|1-100': 118275,
    //         'qtfy|0-1.2': 0,
    //         'ypfyRate|0-1.2': 40.481877589676486,
    //         'zhfyRate|0-1.2': 13.960346727109174,
    //         'zdfyRate|0-1.2': 40.22355819511338,
    //         'zlfyRate|0-1.2': 3.658343311123077,
    //         'xyfyRate|0-1.2': 0.055750514938877845,
    //         'clfyRate|0-1.2': 1.6201236620390087,
    //         'qtfyRate|0-1.2': 0.0
    //       }
    //     ]
    //   }
    // }
  }
}
