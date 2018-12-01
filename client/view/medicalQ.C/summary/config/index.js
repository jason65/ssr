export default {
  api: {
    get: kindo.api.manageDrg + 'baqc/summary/dept',
    exportTable: kindo.api.manageDrg + 'baqc/summary/dept/export',
    exportTable1: kindo.api.manageDrg + 'baqc/summary/type/dept/export',
    getAlertData: kindo.api.manageDrg + 'baqc/summary/static',
    getChartData: kindo.api.manageDrg + 'baqc/summary/type',
    getTableData: kindo.api.manageDrg + 'baqc/summary/type/dept',
    hisUpdateDate: kindo.api.manageDrg + 'baqc/summary/syndate',
    getSubTableData: kindo.api.manageDrg + 'baqc/summary/type/onedept'
  },
  mock: {}
}
