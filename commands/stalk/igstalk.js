module.exports = {
  name: 'igstalk',
  param: '<username>',
  cmd: ['igstalk'],
  category: 'stalk',
  desc: 'View ig profile',
  query: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    try{
      const stalk = await ig.igstalk(text)
      if(!stalk.status) return m.reply('User not found!')
      const opt = {
        quoted: m,
        adReply: {
          type: 2,
          title: 'Instagram Profile : ' + text,
          url: `https://instagram.com/${text}`
        }
      }
      await conn.sendFileFromUrl(m.from, stalk.profile.high, {caption: await tool.parseResult('INSTAGRAM STALK', stalk.data, {delete: [ 'profile']})}, {...opt})
    }catch{
      m.reply('User not found!')
    }
  }
}