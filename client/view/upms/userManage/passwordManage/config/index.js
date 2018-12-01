export default {
  api: {
    // 获取用户列表
    get: kindo.api.upms + 'system/user/query',

    // 管理员重置密码
    reset: kindo.api.upms + 'system/user/resetPwd',

    // 管理员修改密码
    update: kindo.api.upms + 'system/user/updatePwd'
  },
  mock: {}
}
