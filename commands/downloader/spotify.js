const axios = require("axios");
module.exports = {
	name: "spotify",
	param: "<query>",
	cmd: ["spotify"],
	category: "downloader",
	desc: "Search And Download song from spotify",
	query: true,
	disabled: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		const { data } = await axios.get(`https://spotifydl-production.up.railway.app/search?query=${text}`);
		if (!data.status) return m.reply(data);
		res = data.result[0];
		res.artist = res.artist[0].name;
		const opt = {
			quoted: m,
			adReply: {
				title: 'Spotify Play : ' + res.judul,
				url: res.track
			}
		}
		await conn.sendFileFromUrl(m.from, res.thumbnail, {caption: await tool.parseResult("SPOTIFY PLAY", res, {delete: ["thumbnail"]})} ,{ ...opt });
		const down = await axios.get(`https://spotifydl-production.up.railway.app/download?url=${res.track}`);
		if (!down.status) return m.reply(down);
		await conn.sendFileFromUrl(m.from, down.data.url, { mimetype: "audio/mpeg" }, { quoted: m });
	},
};
