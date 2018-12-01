export default {
  api: {
    department: kindo.api.manageDrg + 'baqc/normal/cyks',
    distribute: kindo.api.kpiDrg + 'badifficult/distribute', // 分布
    tablelist: kindo.api.kpiDrg + 'badifficult/drgkpi', // 详情
    getDetail: kindo.api.manageDrg + 'baqc/normal/bas/' // 查看明细
  },
  mock: {
    // distribute: {
    //   code: '200',
    //   'data|5-10': [{ name: '@cname', 'rwt2|1-100': 1, 'rwt3|1-100': 2, 'rwt4|1-100': 2 }],
    //   message: ''
    // },
    // tablelist: {
    //   code: '200',
    //   data: {
    //     'rows|8-30': [
    //       {
    //         drgCode: '@cname',
    //         drgName: '@cname',
    //         'inDrgNum|1-100': 1,
    //         'zhzs|1-100': 2,
    //         'rwt|1-100': 3,
    //         'nxzs|1-100': 4,
    //         'fwnlzs|1-100': 5,
    //         'fwxlzs|1-100': 6,
    //         'cmi|1-100': 7,
    //         'feeSi|1-100': 8,
    //         'cjfy|1-100': 12,
    //         'timeSi|1-100': 9,
    //         'pjzyr|1-100': 10,
    //         'swNum|1-100': 11
    //       }
    //     ],
    //     'total|8-30': 1
    //   },
    //   message: ''
    // },
    // getDetail: {
    //   code: '200',
    //   data: {},
    //   message: ''
    // }
  }
}
