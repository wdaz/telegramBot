const Composer = require('telegraf/composer')

const test = new Composer()
test.command('/tets', (ctx)=>ctx.reply('from Tets'))

module.exports = test