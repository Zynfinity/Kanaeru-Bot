const fs = require("fs");
module.exports = {
	name: "addcommand",
	param: "<reply code>",
	cmd: ["addcommand", "addcmd"],
	category: "owner",
	owner: true,
	quoted: true,
	async handler(m, { conn, text}) {
		const file = `./commands/${text}`;
		await fs.writeFileSync(file, m.quoted.text);
		m.reply("Succsess add command " + text);
	},
};
