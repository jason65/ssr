export default {
  login({
    commit
  }, {
    username,
    password
  }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      // model.login(username, password)
      //   .then(data => {
      //     commit('doLogin', data)
      //     notify({
      //       content: '登录成功'
      //     })
      //     resolve()
      //     commit('endLoading')
      //   }).catch(err => {
      //     handleError(err)
      //     reject(err)
      //     commit('endLoading')
      //   })

    })
  }
}