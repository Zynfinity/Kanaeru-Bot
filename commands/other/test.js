module.exports = {
	name: "test",
	cmd: ["test"],
	group: true,
	category: 'other',
	async handler(m, { conn }) {
		m.reply(await tool.toTimer(process.uptime()));
	},
};