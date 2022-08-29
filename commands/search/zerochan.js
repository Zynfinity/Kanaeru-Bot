module.exports = {
  name: 'zerochan',
  param: '<query>',
  cmd: ['zerochan'],
  category: 'search',
  desc: 'search image anime on zerochan',
  query: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const zerochan = await scrapp.zerochan(text)
    if(!zerochan.status) return m.reply('Image not found')
    const rand = await tool.randomobj(zerochan.result)
    await conn.sendButtonImageV2(m.from, await tool.getBuffer(rand), `konachan : ${text}`, "Click Button above to get again", [`GET AGAIN`], [`.zerochan ${text}`], { quoted: m });
  }
}
