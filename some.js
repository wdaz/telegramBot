const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

// Handler factoriess
const { enter, leave } = Stage

// Greeter scene
const greeterScene = new Scene('start')
greeterScene.enter((ctx) => ctx.reply('Hi start'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.command('exit', leave())

greeterScene.hears('hi', enter('greeter'))
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

// Echo scene
const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

const bot = new Telegraf('1069607930:AAFj2ha3ND8b83wm0jTTeTLNholUHGycCLw')
const stage = new Stage([greeterScene, echoScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
bot.command('start', (ctx) => ctx.scene.enter('start'))
bot.command('echo', (ctx) => ctx.scene.enter('echo'))
bot.on('message', (ctx) => ctx.reply('Try /echo or /greeter'))
bot.launch()