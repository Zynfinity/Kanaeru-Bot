module.exports = {
	name: 'wikipedia',
	param: '<query>',
	cmd: ['wikipedia', 'wiki'],
	category: 'search',
	desc: 'Search article in wikipedia',
	query: true,
	async handler(m, {conn, text}){
		await m.reply(response.wait)
		const wiki = await scrapp.wikisearch(text)
		if(wiki == '') return m.reply('Article not found!')
		let twiki = `*WIKIPEDIA* : ${text}\n\n`
		twiki += wiki[0].wiki
		m.reply(twiki)
	}
}