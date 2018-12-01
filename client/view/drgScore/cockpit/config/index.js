export default {
  api: {
    // 雷达图 & 表格
    overview: kindo.api.kpiDrg + 'bakpi/total/overview',
    radarStandardLine: kindo.api.upms + 'nologin/param/queryValueByCode',
    // 产能指标 & 效率指标 & 安全指标
    hoscapacity: kindo.api.kpiDrg + 'bakpi/total/dept/cmi',
    hosefficiency: kindo.api.kpiDrg + 'bakpi/total/dept/si',
    hossecurity: kindo.api.kpiDrg + 'bakpi/total/dept/qi',
    // mdc > 效率指标
    mdcefficiency: kindo.api.kpiDrg + 'bakpi/total/mdc/si',
    // adrg > 效率指标
    adrgefficiency: kindo.api.kpiDrg + 'bakpi/total/adrg/si',
    // drg > 效率指标
    drgefficiency: kindo.api.kpiDrg + 'bakpi/total/drg/si'
  },
  mock: {
    // overview: {
    //   code: '200',
    //   data: {
    //     'inDrgNum|1-100': 1,
    //     'drgNum|1-100': 2,
    //     'rwt|1-100': 2,
    //     'cmi|1-100': 3,
    //     'timeSi|1-100': 4,
    //     'feeSi|1-100': 6,
    //     'lowDiePerc|1-100': 7,
    //     'midLowDiePerc|1-100': 8,
    //     'inDrgNumLastPeriod|1-100': 9,
    //     'drgNumLastPeriod|1-100': 10,
    //     'rwtLastPeriod|1-100': 11,
    //     'cmiLastPeriod|1-100': 12,
    //     'timeSiLastPeriod|1-100': 13,
    //     'feeSiLastPeriod|1-100': 14,
    //     'lowDiePercLastPeriod|1-100': 15,
    //     'midLowDiePercLastPeriod|1-100': 16,
    //     'inDrgNumYearInc|1-100': 17,
    //     'drgNumYearInc|1-100': 18,
    //     'rwtYearInc|1-100': 19,
    //     'cmiYearInc|1-100': 20,
    //     'timeSiYearInc|1-100': 21,
    //     'feeSiYearInc|1-100': 22,
    //     'inDrgNumPeriodInc|1-100': 23,
    //     'drgNumPeriodInc|1-100': 24,
    //     'rwtPeriodInc|1-100': 25,
    //     'cmiPeriodInc|1-100': 26,
    //     'timeSiPeriodInc|1-100': 27,
    //     'feeSiPeriodInc|1-100': 28
    //   },
    //   message: ''
    // },
    // hoscapacity: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // },
    // hosefficiency: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // },
    // hossecurity: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // },
    // mdcefficiency: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // },
    // adrgefficiency: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // },
    // drgefficiency: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'coordX|1-100': 1, 'coordY|1-100': 2 }],
    //   message: ''
    // }
  }
}
