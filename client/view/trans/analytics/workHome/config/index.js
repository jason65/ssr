export default {
  api: {
    // 医院诊断
    diagnosis: kindo.api.transfer + 'diagnosis/hospital/queryRate',

    // 医院操作
    oper: kindo.api.transfer + 'oper/hospital/queryRate'
  }
}
