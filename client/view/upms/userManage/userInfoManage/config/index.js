export default {
  api: {
    get: kindo.api.upms + 'system/user/query',
    insert: kindo.api.upms + 'system/user/insert',
    update: kindo.api.upms + 'system/user/update',
    delete: kindo.api.upms + 'system/user/delete',

    getOrg: kindo.api.upms + 'system/orga/tree',
    getMenuRole: kindo.api.upms + 'system/menuRole/queryAll',
    getDataRole: kindo.api.upms + 'system/dataRole/queryAll',

    getMenuRoleById: kindo.api.upms + 'system/user/queryMenuRoles',
    getDataRoleById: kindo.api.upms + 'system/user/queryDataRoles',

    updateMenuRole: kindo.api.upms + 'system/user/setupMenuRoles',
    updateDataRole: kindo.api.upms + 'system/user/setupDataRoles',
    // 获取数据字典分类
    getStatus: kindo.api.upms + 'system/dict/get?catalog=USER_STATUS'
  }
}
