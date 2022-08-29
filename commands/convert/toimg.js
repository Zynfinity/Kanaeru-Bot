const fs = require("fs");
const { exec } = require("child_process");
const { webp2mp4 } = require("../../lib/tools");
module.exports = {
	name: "toimg",
	param: "<reply sticker>",
	cmd: ["toimg"],
	category: "converter",
	desc: "Change sticker to image",
	quoted: { sticker: true },
	async handler(m, { conn }) {
		await m.reply(response.wait);
		if (m.quoted.message.stickerMessage.isAnimated) {
			const convert = await webp2mp4(await m.quoted.download());
			return await conn.sendMessage(
				m.from,
				{ video: { url: convert } },
				{ quoted: m }
			);
		}
		const nem = await tool.getRandom();
		const path = `./temp/${nem}.webp`;
		const out = `./temp/${nem}.jpg`;
		await m.quoted.download(path)
		exec(`ffmpeg -i ${path} ${out}`, async (err) => {
			fs.unlinkSync(path);
			if (err) {
				m.reply(`Conversion failed!`);
			} else {
				buffer = await fs.readFileSync(out);
				await conn.sendMessage(
					m.from,
					{ image: buffer },
					{ quoted: m }
				);
				fs.unlinkSync(out);
			}
		});
	},
};
