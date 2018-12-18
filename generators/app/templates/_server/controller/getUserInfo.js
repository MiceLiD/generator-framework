/**
 * 获取登录用户信息
 * @param {*} ctx 
 */
module.exports = async ctx => {
  console.log(ctx.request.body)
  ctx.body = JSON.stringify({
    code: 0,
    data: {
      username: 'xxx'
    }
  })
}