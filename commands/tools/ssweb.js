const axios = require('axios')
module.exports = {
  name: 'ssweb',
  param: '<url>',
  cmd: ['ssweb'],
  category: 'other',
  desc: 'Take screenshot webpage',
  query: true,
  url: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const {data} = await axios.get(`https://shot.screenshotapi.net/screenshot?&url=${text}&full_page=true&output=json&file_type=png&dark_mode=true&wait_for_event=load`)
    await conn.sendMessage(m.from, {document: {url: data.screenshot}, mimetype: 'image/png', fileName: `${text}.png`}, {quoted: m})
  }
}
