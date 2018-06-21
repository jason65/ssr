const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const webpack = require('webpack')
const vueServerRender = require('vue-server-renderer')
const webpackConfig = require('../../build/webpack.server')
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()
const serverRender = require('./server-render')

const VueServerRenderer = require('vue-server-renderer')
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))
  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}
const router = new Router()
router.get('*', handleSSR)

module.exports = router