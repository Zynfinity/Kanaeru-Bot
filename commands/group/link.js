module.exports = {
	name: "linkgroup",
	cmd: ["linkgroup", "link"],
	category: "group",
	desc: "Get link group",
	group: true,
	botadmin: true,
	async handler(m, { conn }) {
		const getinv = await conn.groupInviteCode(m.from);
		m.reply(`https://chat.whatsapp.com/${getinv}`, { adReply: true });
	},
};
