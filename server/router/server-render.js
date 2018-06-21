const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  try {
    ctx.headers['Content-Type'] = 'text/html'
    const context = {
      url: ctx.path
    }
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState()
    })
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}