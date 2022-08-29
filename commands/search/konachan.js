module.exports = {
  name: 'konachan',
  param: '<query>',
  cmd: ['konachan'],
  category: 'search',
  desc: 'search image anime on konachan',
  query: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const konachan = await scrapp.konachan(text)
    if(!konachan.status) return m.reply('Image not found')
    const rand = await tool.randomobj(konachan.result)
    await conn.sendButtonImageV2(m.from, await tool.getBuffer(rand), `konachan : ${text}`, "Click Button above to get again", [`GET AGAIN`], [`.konachan ${text}`], { quoted: m });
  }
}
