module.exports = (ctx) =>
{
        const text = ctx.message.text
    switch (text) {
        case "How are you":
             const message = ctx.i18n.t('question1', {
               username: ctx.from.first_name
             })
            return ctx.reply(message)
            break;
    
        default:
        ctx.reply(`${ctx.message.from.first_name}, I don't know what you say`)
        break;
    }
}