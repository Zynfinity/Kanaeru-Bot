module.exports = {
	name: "ytmp3",
	param: "<url>",
	cmd: ["ytmp3"],
	category: "downloader",
	desc: "download audio from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		const down = await scrapp.youtube("mp3", await scrapp.expandUrl(text));
		const link = down.link;
		down.author = down.author.name;
		const mdata = {
			title: down.title,
			album: config.botname,
			artist: await conn.getName(m.sender),
			image: {
				mime: 'image/png',
				type: {
					id: 3,
					name: 'front cover'
				},
				imageBuffer: await tool.getBuffer(down.thumbnail)
			}
		}
		if (link == undefined) return m.reply("Cannot find download url!");
		if (m.type != "templateButtonReplyMessage" && m.type != "buttonsResponseMessage")
			await conn.sendFileFromUrl(m.from, down.thumbnail, {caption: await tool.parseResult("Y T M P 3", down, {delete: ["description", "link", "thumb", "thumbnail", "image"]})}, {quoted: m});
		try{
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 100 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(link)}`)
			await conn.sendMessage(m.from,{ audio: { url: link }, mimetype: "audio/mpeg", musicMetadata: mdata},{ quoted: m });
		}catch{
			const down = await scrapp.y1s('mp3', await scrapp.expandUrl(text))
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 100 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(down.dlink)}`)
			await conn.sendMessage(m.from, {audio: {url: down.dlink}, mimetype: 'audio/mpeg', musicMetadata: mdata}, {quoted: m})
		}
		//await conn.sendFileFromUrl(m.from, link, {mimetype: 'audio/mpeg'}, {quoted: m})
	},
};
