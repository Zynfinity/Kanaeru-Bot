module.exports = {
	name: "antilink_function",
	function: true,
	async handler(m, { conn, chats, isAdmin, isBotAdmin }) {
		await db.read();
		if (!m.isGroup) return;
		if (!db.data.antilink.includes(m.from)) return;
		const regexlink = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
		isGroupLink = regexlink.exec(chats);
		if (isBotAdmin && !isAdmin && isGroupLink) {
			linkgc = await conn.groupInviteCode(m.from);
			if (isGroupLink[1] == linkgc) return;
			await m.reply("Group link detected\nyou will be removed from the group");
			await conn.sendMessage(m.from, {delete: {...m.key, participant: m.sender}})
			await conn.groupParticipantsUpdate(m.from, [m.sender], "remove");
		}
	},
};
