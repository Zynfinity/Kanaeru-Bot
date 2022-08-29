module.exports = {
	name: "kick",
	param: "<tag/reply chat>",
	cmd: ["kick"],
	category: "group",
	desc: "kick members group",
	group: true,
	botadmin: true,
	admin: true,
	async handler(m, { conn, text }) {
		let participant = m.mentions[0]
			? m.mentions[0]
			: m.quoted
			? m.quoted.sender
			: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
		if (participant.replace(/\D/g, "") == "")
			return m.reply("Example : .kick @0", {
				mentions: ["0@s.whatsapp.net"],
			});
		const mdata = await conn.groupMetadata(m.from);
		const plist = mdata.participants.map((pe) => pe.id);
		if (!plist.includes(participant))
			return m.reply("The user is no longer in the group");
		await conn.groupParticipantsUpdate(m.from, [participant], "remove");
		await m.reply("Sukses Kick user");
	},
};
