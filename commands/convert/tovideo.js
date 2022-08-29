const fs = require("fs");
const { exec } = require("child_process");
const { webp2mp4 } = require("../../lib/tools");
module.exports = {
	name: "tovideo",
	param: "<reply sticker>",
	cmd: ["tovideo"],
	category: "converter",
	desc: "Change sticker to video",
	quoted: { sticker: true },
	async handler(m, { conn }) {
		await require("./toimg").handler(m, { conn });
	},
};
