module.exports = {
  name: 'cuaca',
  param: '<place>',
  cmd: ['cuaca', 'weather'],
  category: 'information',
  desc: 'Get info about weather',
  query: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    m.reply(await tool.parseResult('INFO CUACA', await scrapp.cuaca(text)))
  }
}
