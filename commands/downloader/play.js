const yts = require("yt-search");
module.exports = {
	name: "play",
	param: "<query>",
	cmd: ["play"],
	category: "downloader",
	desc: "Search songs from youtube and download it",
	query: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		const sy = await yts(text);
		const find = sy.all.find((pl) => pl.type == "video" && pl.url);
		if (find == undefined) return m.reply("Song not found");
		find.author = find.author.name;
		await conn.sendButtonImageV2(
			m.from,
			await tool.getBuffer(find.image),
			await tool.parseResult("P L A Y", find, {
				delete: ["image", "thumbnail", "type", "description"],
			}),
			"Audio or Video",
			["AUDIO", "VIDEO"],
			[`.ytmp3 ${find.url}`, `.ytmp4 ${find.url}`],
			{ quoted: m }
		);
	},
};
