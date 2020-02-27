const path = require('path')
const TelegrafI18n = require('telegraf-i18n')

module.exports = new TelegrafI18n({
  directory: path.resolve(__dirname, '../../locales'),
  defaultLanguage: 'az',
  locales: ['en', 'ru', 'az']
})