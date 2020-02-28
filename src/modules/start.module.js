const Markup = require('telegraf/markup')

module.exports = (ctx) => {
  ctx.i18n.locale()
  const message = ctx.i18n.t('greeting', {
    username: ctx.from.first_name
  })
  ctx.reply(message, Markup.keyboard([
    [`🇦🇿 Azərbaycan`],
    [`🇷🇺 Русский`],
    [`🇺🇸 English`],
  ])
    .oneTime()
    .resize()
    .extra()
  )
}
