module.exports = (ctx) =>
{
    ctx.i18n.locale() 
    ctx.i18n.locale(ctx.from.language_code) 
    const message = ctx.i18n.t('greeting', {
    username: ctx.from.first_name
  })
  return ctx.reply(message)
}
