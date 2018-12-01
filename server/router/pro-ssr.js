const Router = require('koa-router')

const path = require('path')
const fs = require('fs')

const vueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')



const clientManifest = require('../../client-build/vue-ssr-client-manifest.json')
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)
const renderer = vueServerRender
  .createBundleRenderer(path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
    inject: false,
    clientManifest
  })
const router = new Router()
router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router