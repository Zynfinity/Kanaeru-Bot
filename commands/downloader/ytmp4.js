module.exports = {
	name: "ytmp4",
	param: "<url>",
	cmd: ["ytmp4"],
	category: "downloader",
	desc: "download video from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		const down = await scrapp.youtube("mp4", text);
		const link = down.link;
		down.author = down.author.name;
		const opt = {
			quoted: m,
			adReply: {
				type: 2,
				title: 'Youtube Mp4',
				url: text
			}
		}
		if (link == undefined) return m.reply("Cannot find download url!");
		if (m.type != "templateButtonReplyMessage" && m.type != "buttonsResponseMessage")
			await conn.sendFileFromUrl(m.from, down.thumbnail, {caption: await tool.parseResult("Y T M P 4", down, {delete: ["description", "link", "thumb", "thumbnail", "image"]})}, {...opt});
		try{
			await conn.sendMessage(m.from, { video: { url: link }, mimetype: "video/mp4" }, { quoted: m});
		}catch{
			const down = await scrapp.y1s('mp4', text)
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			await conn.sendMessage(m.from, {video: {url: down.link}, mimetype: 'video/mp4'}, {quoted: m})
		}
	},
};
