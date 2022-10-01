const {sticker} = require("../../lib/convert");
module.exports = {
  name: 'attp',
  param: '<text>',
  cmd: ['attp'],
  category: 'converter',
  desc: 'Create sticker animated text',
  query: 'Enter parameter <text>\nExample: .attp test',
  disabled: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const sttp = await scrapp.attp(text)
    if(!sttp.status) return m.reply(sttp)
    const packInfo = { packname: text, author: "KANAERU | かなえる - BOT" };
    const stickerBuff = await sticker(await tool.getBuffer(sttp.url), {
      isImage: true,
      withPackInfo: true,
      packInfo,
      cmdType: "1"
    });
    await conn.sendMessage(m.from, {sticker: stickerBuff}, {quoted: m})
  }
}
