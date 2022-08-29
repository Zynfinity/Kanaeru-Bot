const {neonime} = require('../../lib/anime')
const {extract} = require('zs-extract')
module.exports = {
	name: 'animedl',
	cmd: ['animedl', 'animeget'],
	ignored: true,
	async handler(m, {conn, text, args}){
		if(m.type != 'listResponseMessage') throw('Not Authorized')
		if(m.command == 'animeget'){
			if(args[1] != m.sender) return m.reply(`This option is only for @${args[1].split('@')[0]}, please request first`, {withTag: true})
			await m.reply(response.wait)
			const down = await extract(args[0]).catch(() => {error: true})
			if(down.error) return m.reply('Link Download Error, Please select other Quality!')
			return await conn.sendMessage(m.from, {document: {url: down.download}, mimetype: 'video/mp4', fileName: down.filename}, {quoted: m})
		}
		if(args[1] != m.sender) return m.reply(`This option is only for @${args[1].split('@')[0]}, please request first`, {withTag: true})
		const data = await neonime.getData(args[0])
		const arrayurl = Object.values(data.download).filter(s => s.zippyshare)
		if(arrayurl == '') return m.reply('Sorry, Download link unavailable for now, try again later!')
		const list = [{
				title: `Select Quality : ${text}`,
				rows: []
			}]
		for (let i of arrayurl) {
			list[0].rows.push({
			   	title: i.name,
			    rowId: `.animeget ${i.zippyshare} ${m.sender}`
			})
		}
		const listMessage = {
			text: await tool.parseResult(false, data, {delete: ['download']}),
			footer: "neonime.watch",
			title: "*NEONIME DOWNLOAD*",
			buttonText: "Select Quality",
			sections: list
		}
		await conn.sendMessage(m.from, listMessage, {quoted: m})
	}
}