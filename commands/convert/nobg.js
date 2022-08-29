const { packInfo } = require("../../config");
const { telegraph } = require("../../lib/tools");
const { sticker } = require("../../lib/convert");
const fs = require("fs");
const { exec } = require("child_process");
module.exports = {
	name: "snobg",
	param: "<reply sticker/image>",
	cmd: ["snobg"],
	category: "converter",
	desc: `Remove image background`,
	disabled: true,
	async handler(m, { conn, args, isMedia, prefix }) {
		const options = {
			pack: config.packInfo.packname,
			author: config.packInfo.author,
			type: StickerTypes.FULL,
		};
		issticker = m.command == "snobg" ? true : false;
		if (
			(m.quoted && m.quoted.mtype == "imageMessage") ||
			(isMedia && m.type == "imageMessage")
		) {
			await m.reply(response.wait);
			const turl = await telegraph(
				isMedia ? await m.download() : await m.quoted.download()
			);
			try {
				remove = await removeBackgroundFromImageUrl({
					url: turl,
					apiKey: "2mZbr62TiNKYw3rFPPtb4BYn",
					bg_color: args != "" && args[0].startsWith("-color") ? args[1] : "",
					size: "regular",
					type: "auto",
					scale: "100%",
				});
			} catch (e) {
				return m.reply(e);
			}
			const stickerBuff = await createSticker(
				await Buffer.from(remove.base64img, "base64"),
				options
			);
			await conn.sendMessage(
				m.from,
				{ sticker: stickerBuff },
				{ quoted: m, adReply: true }
			);
		} else if (m.quoted && m.quoted.mtype == "stickerMessage") {
			await m.reply(response.wait);
			const fname = await tool.getRandom();
			path = `.//temp/${fname}.jpg`;
			output = `.//temp/${fname}.png`;
			await fs.writeFileSync(path, await m.quoted.download());
			exec(`ffmpeg -i ${path} ${output}`, async (err) => {
				await fs.unlinkSync(path);
				if (err) {
					m.reply("Error saat konversi webp ke jpg");
				} else {
					try {
						remove = await removeBackgroundFromImageFile({
							path: output,
							apiKey: "2mZbr62TiNKYw3rFPPtb4BYn",
							bg_color: args != "" && args[0].startsWith("-color") ? args[1] : "",
							size: "regular",
							type: "auto",
							scale: "100%",
						});
					} catch (e) {
						await fs.unlinkSync(output);
						return m.reply();
					}
					const stickerBuff = await createSticker(
						await Buffer.from(remove.base64img, "base64"),
						options
					);
					await conn.sendMessage(
						m.from,
						{ sticker: stickerBuff },
						{ quoted: m, adReply: true }
					);
					await fs.unlinkSync(output);
				}
			});
		} else m.reply("Reply image/sticker dengan caption" + prefix + m.command);
	},
};
