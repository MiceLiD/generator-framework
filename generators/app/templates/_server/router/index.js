module.exports = (app) => {
  app.get('/', async ctx => {
    await ctx.render('index', { title: 'framework' })
  })

  /* api */
  app.post('/api/getusername', async (ctx) => {
    ctx.body = JSON.stringify({
      code: 0,
      data: {
        username: 'seven'
      }
    })
  })
}

