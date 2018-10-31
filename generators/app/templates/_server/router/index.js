const fs = require('fs')
const path = require('path')
const render = async ctx => {
  await ctx.render('index', { title: 'framwork' })
}
module.exports = (app) => {
  app.get('/', render)

  fs.readdir(path.join(__dirname, '../controller/'), (err, result) => {
    if (err) {
      console.log(err)
      ctx.logger.error(err)
      return
    }
    result.forEach(r => {
      const name = r.slice(0, r.indexOf('.'))
      app.post(`/api/${name}`, require(`../controller/${r}`))
    })
  })
}

