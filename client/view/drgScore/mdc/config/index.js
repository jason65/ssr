export default {
  api: {
    // 专业宽度
    linebar: kindo.api.performance + 'bzjxpjcla/mdc/zykd',
    // CMI
    cmibar: kindo.api.performance + 'bzjxpjcla/mdc/cmi',
    // 效率指标
    scatter2: kindo.api.performance + 'bzjxpjcla/mdc/efficiency',
    // 低风险组死亡率
    bar1: kindo.api.performance + 'bzjxpjcla/mdc/lowdeathrate',
    // 中低风险组死亡率
    bar2: kindo.api.performance + 'bzjxpjcla/mdc/medlowdeathrate',
    // 数据列表查询
    listpage: kindo.api.performance + 'bzjxpjcla/mdc/querylistpage',
    // mdc对比
    compare: kindo.api.performance + 'bzjxpjcla/mdc/compare',
    // 数据导出
    exportTable: kindo.api.performance + 'bzjxpjcla/mdc/export',
    // 查询区域的下拉框
    queryqy: 'common/query/queryqy',
    // 查询医院的下拉框
    queryhospital: 'common/query/queryhospital',
    mdcDetail: kindo.api.performance + 'bzjxpjcla/mdc/detail'
  },
  mock: {
    // listpage: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'jbgmdccode|+1': [
    //           'MDC A',
    //           'MDC B',
    //           'MDC C',
    //           'MDC D',
    //           'MDC E',
    //           'MDC F',
    //           'MDC G',
    //           'MDC H',
    //           'MDC I',
    //           'MDC J',
    //           'MDC K',
    //           'MDC L',
    //           'MDC M',
    //           'MDC N',
    //           'MDC O'
    //         ],
    //         'jbgmdcname|+1': [
    //           '神经系统疾病',
    //           '内分泌代谢及营养性疾病',
    //           '眼和附器疾病',
    //           '耳鼻咽喉口腔颌面疾病',
    //           '呼吸系统疾病',
    //           '循环系统疾病',
    //           '血液、造血器官、免疫系统疾病',
    //           '消化系统疾病',
    //           '泌尿系统疾病',
    //           '男性生殖系统疾病',
    //           '女性生殖系统疾病',
    //           '妊娠、分娩和产褥期疾病',
    //           '新生儿疾病',
    //           '肌肉骨骼系统和结缔组织疾病',
    //           '皮肤、皮下组织、乳腺疾病'
    //         ],
    //         'jbmmdcnum|1-100': 626,
    //         'jbmadrgnum|1-100': 9,
    //         'jbmdrgnum|1-100.2': 0.0,
    //         'jbgrwt|1-100': 0.0,
    //         'jbgnxzs|1-100': 0.0,
    //         'jbgfwnlzs|1-100': 0.0,
    //         'jbgfwxlzs|1-100': 0.0,
    //         'jbgcmi|1-100': 0.0,
    //         'jbgcostsi|1-100': 0.0,
    //         'jbgcjfy|1-100': 0.0,
    //         'jbgtimesi|1-100': 0.0,
    //         'jbgpjzyr|1-100': 0.0,
    //         'jbmlownum|0-1.2': 0.0,
    //         'jbmmednum|0-1.2': 0.0
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
    //           'MDC A',
    //           'MDC B',
    //           'MDC C',
    //           'MDC D',
    //           'MDC E',
    //           'MDC F',
    //           'MDC G',
    //           'MDC H',
    //           'MDC I',
    //           'MDC J',
    //           'MDC K',
    //           'MDC L',
    //           'MDC M',
    //           'MDC N',
    //           'MDC O'
    //         ],
    //         'name|+1': [
    //           '神经系统疾病',
    //           '内分泌代谢及营养性疾病',
    //           '眼和附器疾病',
    //           '耳鼻咽喉口腔颌面疾病',
    //           '呼吸系统疾病',
    //           '循环系统疾病',
    //           '血液、造血器官、免疫系统疾病',
    //           '消化系统疾病',
    //           '泌尿系统疾病',
    //           '男性生殖系统疾病',
    //           '女性生殖系统疾病',
    //           '妊娠、分娩和产褥期疾病',
    //           '新生儿疾病',
    //           '肌肉骨骼系统和结缔组织疾病',
    //           '皮肤、皮下组织、乳腺疾病'
    //         ],
    //         'poleValue|1-100': 0,
    //         'actualValue|1-60': 0
    //       }
    //     ],
    //     'pole|1-100': 0
    //   }
    // },
    // scatter1: {
    //   code: 200,
    //   data: {
    //     'rows|15': [
    //       {
    //         'code|+1': [
    //           'MDC A',
    //           'MDC B',
    //           'MDC C',
    //           'MDC D',
    //           'MDC E',
    //           'MDC F',
    //           'MDC G',
    //           'MDC H',
    //           'MDC I',
    //           'MDC J',
    //           'MDC K',
    //           'MDC L',
    //           'MDC M',
    //           'MDC N',
    //           'MDC O'
    //         ],
    //         'name|+1': [
    //           '神经系统疾病',
    //           '内分泌代谢及营养性疾病',
    //           '眼和附器疾病',
    //           '耳鼻咽喉口腔颌面疾病',
    //           '呼吸系统疾病',
    //           '循环系统疾病',
    //           '血液、造血器官、免疫系统疾病',
    //           '消化系统疾病',
    //           '泌尿系统疾病',
    //           '男性生殖系统疾病',
    //           '女性生殖系统疾病',
    //           '妊娠、分娩和产褥期疾病',
    //           '新生儿疾病',
    //           '肌肉骨骼系统和结缔组织疾病',
    //           '皮肤、皮下组织、乳腺疾病'
    //         ],
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
    //           'MDC A',
    //           'MDC B',
    //           'MDC C',
    //           'MDC D',
    //           'MDC E',
    //           'MDC F',
    //           'MDC G',
    //           'MDC H',
    //           'MDC I',
    //           'MDC J',
    //           'MDC K',
    //           'MDC L',
    //           'MDC M',
    //           'MDC N',
    //           'MDC O'
    //         ],
    //         'name|+1': [
    //           '神经系统疾病',
    //           '内分泌代谢及营养性疾病',
    //           '眼和附器疾病',
    //           '耳鼻咽喉口腔颌面疾病',
    //           '呼吸系统疾病',
    //           '循环系统疾病',
    //           '血液、造血器官、免疫系统疾病',
    //           '消化系统疾病',
    //           '泌尿系统疾病',
    //           '男性生殖系统疾病',
    //           '女性生殖系统疾病',
    //           '妊娠、分娩和产褥期疾病',
    //           '新生儿疾病',
    //           '肌肉骨骼系统和结缔组织疾病',
    //           '皮肤、皮下组织、乳腺疾病'
    //         ],
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
    //         'name|+1': ['神经系统疾病', '内分泌代谢及营养性疾病'],
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
    //         'name|+1': ['神经系统疾病', '内分泌代谢及营养性疾病', '眼和附器疾病', '耳鼻咽喉口腔颌面疾病', '呼吸系统疾病'],
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
    //         'code|+1': ['MDC A', 'MDC B', 'MDC C', 'MDC D', 'MDC E'],
    //         'name|+1': ['神经系统疾病', '内分泌代谢及营养性疾病', '眼和附器疾病', '耳鼻咽喉口腔颌面疾病', '呼吸系统疾病'],
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
    //         'itemCode|+1': ['MDC A', 'MDC B', 'MDC C', 'MDC D', 'MDC E'],
    //         'itemName|+1': ['神经系统疾病', '内分泌代谢及营养性疾病', '眼和附器疾病', '耳鼻咽喉口腔颌面疾病', '呼吸系统疾病'],
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
