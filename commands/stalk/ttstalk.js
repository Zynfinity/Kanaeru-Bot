module.exports = {
  name: 'tiktokstalk',
  param: '<username>',
  cmd: ['ttstalk', 'tiktokstalk'],
  category: 'stalk',
  query: 'Example: .tiktokstalk yourrrkayess',
  disabled: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const stalk = await scrapp.tiktokstalk(text)
    if(!stalk.status) return m.reply(stalk)
    const opt = {
        quoted: m,
        adReply: {
          type: 2,
          title: 'Tiktok Profile : ' + text,
          url: 'https://www.tiktok.com'
        }
      }
    await conn.sendFileFromUrl(m.from, stalk.ppurl, {caption: await tool.parseResult('TIKTOK STALK', stalk, {delete: ['ppurl', 'videos', 'likes']})}, {...opt})
  }
}
