const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const stage = new Stage()

// Bot token
const bot = new Telegraf('1069607930:AAFj2ha3ND8b83wm0jTTeTLNholUHGycCLw')

// BoT modules
const start = require('../modules/start.module')
const unKnownCommand = require('../modules/unKnownCommand.module')
const i18n = require('../modules/locale/locale.module')


bot.use(Telegraf.session())
bot.use(stage.middleware())
bot.use(i18n.middleware())

bot.start((ctx) => start(ctx))
bot.use((ctx, next) => {
    const str = ctx.message.text;
    if (str ==='🇦🇿 Azərbaycan' || str=== '🇷🇺 Русский' ||str=== '🇺🇸 English') {
        console.log(str, ctx.from)
    }else{
        next()
    }
})
bot.on('text', (ctx) => unKnownCommand(ctx))


bot.launch()
