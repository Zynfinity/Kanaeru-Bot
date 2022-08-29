const fs = require('fs')
const { exec } = require("child_process")
const { Canvas } = require('canvacord')
const { sticker } = require("../../lib/convert")

module.exports = {
  name: ['trigger','facepalm','wanted','wasted','shit','affect','jail','rainbow','color','rip','trash','hitler','circle','invert','beautiful','sepia','greyscale','blur'],
  param: '<image/sticker>',
  cmd: ['trigger','facepalm','wanted','wasted','shit','affect','jail','rainbow','color','rip','trash','hitler','circle','invert','beautiful','sepia','greyscale','blur'],
  category: 'image manipulation',
  async handler(m, {conn, prefix, args, q, isMedia, isQImage, isQSticker}){
    if (isMedia || isQImage) {
        m.reply(response.wait)
        const fn = tool.getRandom('.jpeg')
        const path = `./temp/${fn}`
        const media = isQImage ? await m.quoted.download(path) : await m.download(path);
        await fs.unlinkSync(path)
        const img = await Canvas[m.command](media)
        await conn.sendMessage(m.from,{image:img},{quoted:m})
    } else if (isQSticker) {
        m.reply(response.wait)
        const fn = tool.getRandom('.webp')
        const media = await m.quoted.download(`./temp/${fn}`)
        let ran = await tool.getRandom('.png')
        let to = `./temp/${ran}`
        exec(`ffmpeg -i ${media} ${to}`, async(err) => {
            await fs.unlinkSync(`./temp/${fn}`)
            if (err) return m.reply('Error')
            const packInfo = {packname: config.packInfo.packname,author: config.packInfo.author};
            const img = await Canvas[m.command](to)
            const buffer = await sticker(img, {isImage: true,withPackInfo: true,packInfo,cmdType: "1"})
            await conn.sendMessage(m.from,{sticker:buffer},{quoted:m})
            await fs.unlinkSync(to)
        })
    } else {
        m.reply(`Reply image/sticker with command ${prefix}${m.command}`)
    }
  }
}