export default {
  api: {
    department: kindo.api.manageDrg + 'baqc/normal/cyks',
    get: kindo.api.kpiDrg + 'bakpi/bas', // 表信息获取
    getDetail: kindo.api.manageDrg + 'baqc/normal/bas/', // 查看明细
    exportTable: kindo.api.kpiDrg + 'bakpi/bas/export/' // 导出
  },
  mock: {
    // get: {
    //   'code': '200',
    //   'message': '成功',
    //   'data': {
    //     'total': 196,
    //     'rows|20': [{
    //       'AAC001': '@INTEGER(1000000000,9999999999)',
    //       'SEX': '@CWORD("男女",1)',
    //       'AGE|10-80': 10,
    //       'ZYTS|1-15': 1,
    //       'AKC192': function() {
    //         return kindo.util.formatDate(new Date().getTime() - 1000 * 60 * 60 * 24 * parseInt(15 * Math.random()))
    //       },
    //       'CYZDMC|1': ['治愈', '好转', '未愈', '死亡', '其他', '转归'],
    //       'RYZDMC|1': ['肺恶性肿瘤', '慢性阻塞性肺病伴急性下呼吸道感染', '肺炎', '急性支气管炎', '重度子痫前期', '多处二度烧伤'],
    //       'SSCZ|1': ['吸氧', '吸氧', '雾化吸入', '胸部X线检查', '超声心动图', '皮肤及皮下组织清创术'],
    //       'AKC264|100-2000.2-2': 0,
    //       'FKFS|1': ['城镇职工基本医疗保险',
    //         '城镇居民基本医疗保险',
    //         '新型农村合作医疗',
    //         '贫困救助',
    //         '商业医疗保险',
    //         '全公费',
    //         '其他社会保险'
    //       ],
    //       'A-DRG|1': ['A101',
    //         'A102',
    //         'A103',
    //         'A104',
    //         'A105',
    //         'A106',
    //         'A107',
    //         'A108'
    //       ],
    //       'DRG|1': ['开颅联合手术', '复杂开颅手术，有严重合并症并发症', '复杂开颅手术，有一般合并症并发症', '复杂开颅手术，无合并症并发症', '其他开颅手术，有严重合并症并发症'],
    //       'STATE': true
    //     }]
    //   }
    // }
  }
}
