const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const stage = new Stage()

const bot = new Telegraf('1069607930:AAFj2ha3ND8b83wm0jTTeTLNholUHGycCLw')

// BoT modules
const start = require('./modules/start.module')
const unKnownCommand = require('./modules/unKnownCommand.module')
const i18n = require('./modules/locale/locale.module')



const age = new Scene('age')
age.enter((ctx) =>  {
    const chat_id = ctx.chat.id
    const message_id = ctx.message.message_id
    ctx.telegram.sendMessage(chat_id,"Write me your birthyear",{ reply_to_message_id: message_id })
    })
age.on('message', (ctx) =>{
    const age = ctx.message.text  
    const currentdate = new Date()  
    const currentYear =  currentdate.getFullYear()
    if(age.length ===4 && !isNaN(age) && age<=currentYear ){
       ctx.reply( currentYear- age)
       ctx.scene.leave('age') 
       return;    
    }
    ctx.scene.enter('age');
})

bot.use(Telegraf.session())
bot.use(stage.middleware())
bot.use(i18n.middleware())
stage.register(age)
bot.command('age', (ctx) => ctx.scene.enter('age'))


bot.start((ctx) =>start(ctx))
bot.on('text', (ctx) =>unKnownCommand(ctx))
bot.launch()
