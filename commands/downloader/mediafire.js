module.exports = {
  name: 'mediafire',
  param: '<url>',
  cmd: ['mediafire'],
  category: 'downloader',
  desc: 'Download media from mediafire',
  query: true,
  url: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const mfire = await caliph.downloader.mediafire(text)
    await m.reply(await tool.parseResult('MEDIAFIRE DOWNLOADER', mfire.result))
    const tsize = mfire.result.filesize.includes('.') ? mfire.result.filesize.split('.')[1].replace(/\d/g, '') : mfire.result.filesize.replace(/\d/g, '')
    const size = mfire.result.filesize.includes('.') ? mfire.result.filesize.split('.')[0].replace(/\D/g, '') : mfire.result.filesize.replace(/\D/g, '')
    if(tsize != 'KB' && size > 100 || tsize == 'GB') return m.reply('Oversized, silahkan download menggunakan link diatas')
    await conn.sendMessage(m.from, {document: await tool.getBuffer(mfire.result.link), mimetype: mfire.result.mimetype, fileName: `${mfire.result.filename}`}, {quoted: m, adReply: true})
  }
}