import createApp from './createApp'

const {
  app,
  router,
  store
} = createApp()
console.log(app, router, store)
router.onReady(() => {
  app.$mount('#root')
})