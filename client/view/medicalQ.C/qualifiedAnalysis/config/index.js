export default {
  api: {
    department: kindo.api.manageDrg + 'baqc/normal/cyks',
    orga: kindo.api.manageDrg + 'baqc/normal/analy/orga',

    // 总体指标
    ztzb: kindo.api.manageDrg + 'baqc/normal/analy/static',
    // 费用结构
    fyjg: kindo.api.manageDrg + 'baqc/normal/analy/type',
    // 费用分布
    fyfb: kindo.api.manageDrg + 'baqc/normal/analy/fee',
    // 天数分布
    tsfb: kindo.api.manageDrg + 'baqc/normal/analy/day',
    // 总体指标alert
    ztzbalert: kindo.api.manageDrg + 'baqc/normal/analy/sumStatic'
  }
}
