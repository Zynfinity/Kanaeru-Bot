const {neonime} = require('../../lib/anime')
module.exports = {
	name: 'ongoing',
	cmd: ['ongoing'],
	category: 'anime',
	desc: 'get information about latest anime update',
	async handler(m, {conn, args}){
		const data = await neonime.ongoing(m.type == 'listResponseMessage' ? args[0] : '')
		const list = [
			{
				title: `Next Page`,
				rows: [{
					title: 'Next Page',
					rowId: `.ongoing ${Number(data.page) + 1}`
				}]
			},
			{
				title: `Ongoing Anime Page ${data.page}`,
				rows: []
			}]
		for (let i of data.result) {
			list[1].rows.push({
			   	title: i.title,
			    rowId: `.animedl ${i.url} ${m.sender}`,
			    description: `${i.episode} : ${i.upload_date}`
			})
		}
		const listMessage = {
			text: `${shp} Page : ${data.page}\n\nSelect the anime you want to download below`,
			footer: "neonime.watch",
			title: "*ONGOING ANIME*",
			buttonText: "Click Here",
			sections: list
		}
		await conn.sendMessage(m.from, listMessage, {quoted: m})
	}
}