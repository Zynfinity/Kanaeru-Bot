module.exports = {
  name: 'infogempa',
  cmd: ['gempa', 'infogempa'],
  category: 'information',
  desc: 'Get info about earthquake',
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const gempa = await scrapp.gempa(text)
    const opt = {
    	quoted: m,
    	adReply: {
    		type: 2,
    		title: 'INFO GEMPA'
    	}
    }
    await conn.sendFileFromUrl(m.from, gempa.data.imagemap, {caption: await tool.parseResult('INFO GEMPA', gempa.data, {delete: ['imagemap']})}, {...opt})
  }
}
