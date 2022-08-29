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
		const down = await scrapp.youtube("mp3", text);
		const link = down.link;
		down.author = down.author.name;
		const opt = {
			quoted: m,
			adReply: {
				type: 2,
				title: 'Youtube Mp3',
				url: text
			}
		}
		if (link == undefined) return m.reply("Cannot find download url!");
		if (m.type != "templateButtonReplyMessage" && m.type != "buttonsResponseMessage")
			await conn.sendFileFromUrl(m.from, down.thumbnail, {caption: await tool.parseResult("Y T M P 3", down, {delete: ["description", "link", "thumb", "thumbnail", "image"]})}, {...opt});
		try{
			await conn.sendMessage(m.from,{ audio: { url: link }, mimetype: "audio/mpeg" },{ quoted: m });
		}catch{
			const down = await scrapp.y1s('mp3', text)
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			await conn.sendMessage(m.from, {audio: {url: down.link}, mimetype: 'audio/mpeg'}, {quoted: m})
		}
		//await conn.sendFileFromUrl(m.from, link, {mimetype: 'audio/mpeg'}, {quoted: m})
	},
};
