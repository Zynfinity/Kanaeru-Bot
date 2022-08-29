module.exports = {
	name: "pinterest",
	param: "<query>",
	cmd: ["pinterest"],
	category: "search",
	desc: "Search image from Pinterest.com",
	query: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		const pin = await scrapp.pinterest(text);
		if (pin == "") return m.reply("Image not found!");
		const rand = await tool.randomobj(pin);
		await conn.sendButtonImageV2(
			m.from,
			await tool.getBuffer(rand),
			`Pinterest : ${text}`,
			"Click Button above to get again",
			[`GET AGAIN`],
			[`.pinterest ${text}`],
			{ quoted: m }
		);
	},
};
