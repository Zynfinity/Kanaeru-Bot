module.exports = {
	name: 'asupantiktok',
	param: '<username tiktok>',
	cmd: ['asupantiktok', 'asupan'],
	category: 'other',
	query: true,
	disabled: true,
	async handler(m, {
		conn,
		text
	}) {
		await m.reply(response.wait)
		const asupan = await scrapp.randomtt(text)
		if (!asupan.status) return m.reply(asupan)
		await conn.sendButtonVideoV2(
			m.from,
			await tool.getBuffer(asupan.video.url),
			await tool.parseResult('ASUPAN TIKTOK', {
				username: asupan.user.username,
				...asupan.video,
				...asupan.sound
			}, {
				delete: ['url', 'thumbnail']
			}),
			"Get Again?",
			["Get Again"],
			[`.asupan ${text}`], {
				quoted: m
			}
		);
	}
}
