const fs = require('fs')


module.exports = (ctx) => {
  //console.log(ctx.poll)
  //
  ctx.i18n.locale()
  ctx.i18n.locale(ctx.from.language_code)
  const message = ctx.i18n.t('greeting', {
    username: ctx.from.first_name
  })
  ctx.reply(message)
}

