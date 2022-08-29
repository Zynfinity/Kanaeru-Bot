module.exports = {
	name: "facebook",
	param: "<url>",
	cmd: ["facebook", "fb"],
	category: "downloader",
	desc: "Download video from facebook",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		if (!/facebook|fb/.test(text)) return m.reply(response.errorlink);
		await m.reply(response.wait);
		const fb = await scrapp.facebook(text);
		if (!fb.status) return m.reply(fb);
		const lingfb = fb ? fb.hd ? fb.hd : fb.sd : false
		if (!lingfb) return m.reply("Can`t find download link!");
		await conn.sendFileFromUrl(
			m.from,
			lingfb,
			{},
			{ quoted: m }
		);
	},
};
