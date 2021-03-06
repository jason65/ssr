export default {
  api: {
    department: kindo.api.manageDrg + 'baqc/normal/cyks',
    get: kindo.api.manageDrg + 'baqc/normal/bas', // 表信息获取
    getDetail: kindo.api.manageDrg + 'baqc/normal/bas/', // 查看明细
    exportTable: kindo.api.manageDrg + 'baqc/normal/bas/export/', // 导出
    hisUpdateDate: kindo.api.manageDrg + 'baqc/summary/syndate'
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
    // getDetail: {
    //   code: 200,
    //   message: '成功',
    //   data: {
    //     id: '49458097-X$01283880$5',
    //     memberCode: '49458097-X',
    //     memberName: '贵阳医学院附属医院',
    //     zyh: '01283880',
    //     zycs: 5,
    //     ylfkfs: '2',
    //     jkkh: '',
    //     bah: '01283880',
    //     xm: '周正群',
    //     xb: '2',
    //     csrq: '1971-02-07 06:00:00',
    //     nl: 46,
    //     gj: '',
    //     bzyzsnl: 0.0,
    //     xsecstz: 0,
    //     xserytz: 0,
    //     csd: '贵州省贵阳市开阳县',
    //     jg: '贵州省贵阳市开阳县',
    //     mz: '01',
    //     sfzh: '522522197102072023',
    //     hy: '3',
    //     rytj: '2',
    //     rysj: '2018-02-06 23:30:00',
    //     rykb: '中医科',
    //     rykbbm: '147',
    //     zkkb: '',
    //     zkkbbm1: '',
    //     zkkbbm2: '',
    //     zkkbbm3: '',
    //     cysj: '2018-02-13 18:00:00',
    //     cykb: '中医科',
    //     cykbbm: '147',
    //     sjzyts: 7,
    //     mzzd: '类风湿性关节炎【M06.900】',
    //     jbbm: 'M06.900',
    //     ryzdmc: '类风湿性关节炎【M06.900】',
    //     ryzdbm: 'M06.900',
    //     ryqzrq: '2018-02-06 06:00:00',
    //     zyzd: '类风湿性关节炎【M06.900】',
    //     jbdm: 'M06.900',
    //     rybq: '1',
    //     qtzd1: '原发性双侧膝关节病【M17.000】',
    //     jbdm1: 'M17.000',
    //     rybq1: '3',
    //     qtzd2: '',
    //     jbdm2: '',
    //     rybq2: '',
    //     qtzd3: '',
    //     jbdm3: '',
    //     rybq3: '',
    //     qtzd4: '',
    //     jbdm4: '',
    //     rybq4: '',
    //     qtzd5: '',
    //     jbdm5: '',
    //     rybq5: '',
    //     qtzd6: '',
    //     jbdm6: '',
    //     rybq6: '',
    //     qtzd7: '',
    //     jbdm7: '',
    //     rybq7: '',
    //     qtzd8: '',
    //     jbdm8: '',
    //     rybq8: '',
    //     qtzd9: '',
    //     jbdm9: '',
    //     rybq9: '',
    //     qtzd10: '',
    //     jbdm10: '',
    //     rybq10: '',
    //     qtzd11: '',
    //     jbdm11: '',
    //     rybq11: '',
    //     qtzd12: '',
    //     jbdm12: '',
    //     rybq12: '',
    //     qtzd13: '',
    //     jbdm13: '',
    //     rybq13: '',
    //     qtzd14: '',
    //     jbdm14: '',
    //     rybq14: '',
    //     qtzd15: '',
    //     jbdm15: '',
    //     rybq15: '',
    //     wbyy: '',
    //     h23: '',
    //     kzr: '谢甦',
    //     kzrCode: '3598',
    //     zrys: '潘艳伶',
    //     zrysCode: '3601',
    //     zzys: '潘艳伶',
    //     zzysCode: '3601',
    //     zyys: '秦阳',
    //     zyysCode: '8154',
    //     zrhs: '左群英',
    //     jxys: '-',
    //     sxys: '-',
    //     bmy: '-',
    //     bazl: '1',
    //     zkys: '罗雄',
    //     zkhs: '王会丽',
    //     zkrq: '2018-02-13 06:00:00',
    //     ssjczbm1: '',
    //     ssjczrq1: null,
    //     ssjb1: '0',
    //     ssjczmc1: '',
    //     sz1: '',
    //     yz1: '',
    //     ez1: '',
    //     qkdj1: '',
    //     qkyhlb1: '',
    //     mzfs1: '',
    //     mzys1: '',
    //     ssjczbm2: '',
    //     ssjczrq2: null,
    //     ssjb2: '0',
    //     ssjczmc2: '',
    //     sz2: '',
    //     yz2: '',
    //     ez2: '',
    //     qkdj2: '',
    //     qkyhlb2: '',
    //     mzfs2: '',
    //     mzys2: '',
    //     ssjczbm3: '',
    //     ssjczrq3: null,
    //     ssjb3: '0',
    //     ssjczmc3: '',
    //     sz3: '',
    //     yz3: '',
    //     ez3: '',
    //     qkdj3: '',
    //     qkyhlb3: '',
    //     mzfs3: '',
    //     mzys3: '',
    //     ssjczbm4: '',
    //     ssjczrq4: null,
    //     ssjb4: '0',
    //     ssjczmc4: '',
    //     sz4: '',
    //     yz4: '',
    //     ez4: '',
    //     qkdj4: '',
    //     qkyhlb4: '',
    //     mzfs4: '',
    //     mzys4: '',
    //     ssjczbm5: '',
    //     ssjczrq5: null,
    //     ssjb5: '0',
    //     ssjczmc5: '',
    //     sz5: '',
    //     yz5: '',
    //     ez5: '',
    //     qkdj5: '',
    //     qkyhlb5: '',
    //     mzfs5: '',
    //     mzys5: '',
    //     ssjczbm6: '',
    //     ssjczrq6: null,
    //     ssjb6: '0',
    //     ssjczmc6: '',
    //     sz6: '',
    //     yz6: '',
    //     ez6: '',
    //     qkdj6: '',
    //     qkyhlb6: '',
    //     mzfs6: '',
    //     mzys6: '',
    //     ssjczbm7: '',
    //     ssjczrq7: null,
    //     ssjb7: '0',
    //     ssjczmc7: '',
    //     sz7: '',
    //     yz7: '',
    //     ez7: '',
    //     qkdj7: '',
    //     qkyhlb7: '',
    //     mzfs7: '',
    //     mzys7: '',
    //     ssjczbm8: '',
    //     ssjczrq8: null,
    //     ssjb8: '0',
    //     ssjczmc8: '',
    //     sz8: '',
    //     yz8: '',
    //     ez8: '',
    //     qkdj8: '',
    //     qkyhlb8: '',
    //     mzfs8: '',
    //     mzys8: '',
    //     qjcs: 0,
    //     cgcs: 0,
    //     ywfjhzcss: '无',
    //     fjhzcssmc: '',
    //     ywyyngr: '无',
    //     sfsysslclj: '2',
    //     sfwclclj: '2',
    //     wwclcljyy: '',
    //     sfby: '1',
    //     byyy: '',
    //     sfkzrjss: '1',
    //     lyfs: '9',
    //     yzzyYljg: '-',
    //     sfzzyjh: '1',
    //     md: '-',
    //     zfy: 3702.76,
    //     zfje: 0.0,
    //     ylfuf: 0.0,
    //     zlczf: 0.0,
    //     hlf: 0.0,
    //     qtfy: 0.0,
    //     blzdf: 0.0,
    //     syszdf: 0.0,
    //     yxxzdf: 0.0,
    //     lczdxmf: 0.0,
    //     fsszlxmf: 0.0,
    //     wlzlf: 0.0,
    //     sszlf: 0.0,
    //     maf: 0.0,
    //     ssf: 0.0,
    //     kff: 0.0,
    //     zyzlf: 0.0,
    //     xyf: 0.0,
    //     kjywf: 0.0,
    //     zcyf: 0.0,
    //     zcyf1: 0.0,
    //     xf: 0.0,
    //     bdblzpf: 0.0,
    //     qdblzpf: 0.0,
    //     nxyzlzpf: 0.0,
    //     xbyzlzpf: 0.0,
    //     hcyyclf: 0.0,
    //     yyclf: 0.0,
    //     ycxyyclf: 0.0,
    //     qtf: 0.0,
    //     nxyzlzpf2: 0.0,
    //     ptcwf: 0.0,
    //     zzjhcwf: 0.0,
    //     gdrq: null,
    //     hqmsCheck: 'Y',
    //     drgCheck: 'Y',
    //     syndate: '2018-04-14 19:25:50',
    //     synflag: 'I',
    //     errs: null,
    //     drgCode: 'O304A',
    //     drgName: '骨骼及关节风湿免疫性疾病，有合并症并发症'
    //   }
    // }
  }
}
