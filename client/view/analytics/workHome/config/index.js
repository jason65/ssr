export default {
  api: {
    // 医院诊断信息
    diagnosis: kindo.api.codeStandard + 'api/queryRate',

    // 医院操作信息
    oper: kindo.api.codeStandard + 'oper/queryRate',
    queryHos: kindo.api.codeStandard + 'api/queryHos',

    injuryPoison: kindo.api.codeStandard + 'injury/queryRate',
    tumor: kindo.api.codeStandard + 'tumor/queryRate'
  }
}
