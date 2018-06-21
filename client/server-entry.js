import createApp from './createApp'
export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router,
      store
    } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}