const fs = require('fs')
const os = require("os");
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});
const speed = require('performance-now')
module.exports = {
	name: ["status", 'ping'],
	cmd: ["status", 'ping'],
	category: "other",
	desc: "Bot status",
	async handler(m, {conn}) {
    	const times = await speed()
    	const lat = await speed() - times
		let text = "";
		text += `HOST:\n`;
		text += `${shp} Arch: ${os.arch()}\n`
		text += `${shp} CPU: ${os.cpus()[0].model}${os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""}\n`
		text += `${shp} Release: ${os.release()}\n`
    	text += `${shp} Version: ${os.version()}\n`
		text += `${shp} Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;
		text += `${shp} Platform: ${os.platform()}\n\n`;
    	text += `BOT STAT\n`
    	text += `${shp} Runtime : ${await tool.toTimer(await process.uptime())}\n`
    	text += `${shp} Speed : ${lat}\n`
   		text += `${shp} Group Join : ${(Object.keys(await conn.groupFetchAllParticipating())).length}`
		await m.reply(text)
	},
};