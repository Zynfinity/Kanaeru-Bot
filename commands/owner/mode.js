module.exports = {
	name: "self/public",
	cmd: ["self", "public"],
	category: "owner",
	owner: true,
	async handler(m, { conn }) {
		if (m.command == "self") {
			attr.isSelf = true;
			m.reply("Self mode active");
		} else {
			attr.isSelf = false;
			m.reply("Public mode active");
		}
	},
};
