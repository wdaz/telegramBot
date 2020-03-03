const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { reply } = require('telegraf-i18n')
const Extra = require('telegraf/extra')
const stage = new Stage()

// BoT modules
const start = require('../modules/start.module')
const unKnownCommand = require('../modules/unKnownCommand.module')
const i18n = require('../modules/locale/locale.module')


// Bot token
const bot = new Telegraf('1069607930:AAFj2ha3ND8b83wm0jTTeTLNholUHGycCLw')


bot.use(Telegraf.session())
bot.use(stage.middleware())
bot.use(i18n.middleware())

bot.start((ctx) => start(ctx))

// bot.use((ctx,next)=>
// {console.log(ctx.message)
// next()
// })

bot.use((ctx, next) => {
    const value = ctx.message.text;
    if (value === '🇦🇿 Azərbaycan' || value === '🇷🇺 Русский' || value === '🇺🇸 English') {
        switch (value) {
            case '🇦🇿 Azərbaycan':
                ctx.reply('Siz Azərbaycan dilini seçdiniz')
                break;
            case '🇷🇺 Русский':
                ctx.reply('Вы выбрали Русский язык')
                break;
            case '🇺🇸 English':
                ctx.reply('You have selected English ')
                break;
            default:
                break;
        }
    } else {
        next()
    }
})
//bot.command('help', reply('help'))


bot.command('special', (ctx) => {
    return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
        return markup.resize()
            .keyboard([
                markup.contactRequestButton('Send contact'),
                markup.locationRequestButton('Send location')
            ])
    }))

})
bot.on('contact', (ctx) => ctx.reply('Thank you with phone')
)
bot.on('location', (ctx) => ctx.reply('Thank you with location'))


bot.on('text', (ctx) => unKnownCommand(ctx))
bot.launch()
