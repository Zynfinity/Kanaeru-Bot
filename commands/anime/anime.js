const {neonime} = require('../../lib/anime')
module.exports = {
	name: 'anime',
	param: '<anime title>',
	cmd: ['anime', 'animenext'],
	category: 'anime',
	desc: 'Search anime in anime.watch',
	query: 'enter the title\nExample : .anime Spy',
	async handler(m, {conn, text, args}){
		async function anime(q, page){
			const cari = await neonime.search(q, page)
			if(!cari.status) return m.reply('Anime not found!')
			if(cari.status == 404) return m.reply('Page not found!')
			const list = [
			{
				title: `Next Page`,
				rows: [{
					title: 'Next Page',
					rowId: `.animenext ${Number(cari.page) + 1}/${cari.query} ${m.sender}`
				}]
			},
			{
				title: `Result From ${q}`,
				rows: []
			}]
			for (let i of cari.result) {
			    list[1].rows.push({
			    	title: i.title,
			    	rowId: `.animedl ${i.url} ${m.sender}`,
			    	description: i.episode
			    })
			}
			const listMessage = {
				text: `Page : ${cari.page}\n\nSelect the anime you want to download below`,
				footer: "neonime.watch",
				title: "*ANIME SEARCH*",
				buttonText: "Click Here",
				sections: list
			}
			await conn.sendMessage(m.from, listMessage, {quoted: m})
		}
		if(m.command == 'anime') await anime(text, 1)
		else {
			if(m.type != 'listResponseMessage') throw('Not Authorized')
			if(args[1] != m.sender) return m.reply(`This option is only for @${args[1].split('@')[0]}, please request first`, {withTag: true})
			await anime(args[0].split('/')[1], args[0].split('/')[0])
		}
	}
}