module.exports = {
	name: "add",
	param: "<number/reply chat>",
	cmd: ["add", "inv"],
	category: "group",
	desc: "add members to group",
	group: true,
	botadmin: true,
	admin: true,
	async handler(m, { conn, text, prefix }) {
		add = text ? text : m.quoted ? m.quoted : false;
		if (!add) return m.reply("Example: " + prefix + "add 62728288");
		q = m.quoted ? m.quoted.sender.split("@")[0] : text;
		let prk = q.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
		let chunk = [];
		for (let i of prk) {
			i == " " ? "" : chunk.push(i + "@s.whatsapp.net");
		}
		const cek = await conn.groupMetadata(m.from);
		if (await cek.participants.map((id) => id.id).includes(chunk[0])) return m.reply("The user is already in the group");
		let participant = await conn.groupParticipantsUpdate(m.from, chunk, "add");
		await tool.sleep(5000);
		if (global.statParticipant == true) {
			global.statParticipant = false;
			return;
		}
		for (let i of participant) {
			if (!global.statParticipant && !cek.participants.includes(i.jid)) {
				const code = await conn.groupInviteCode(m.from);
				await m.reply("The number @" + i.jid.split("@")[0] + " you added is private", {withTag: true});
				//await conn.sendGroupV4Invite(m.from, i.jid, code, "", cek.subject);
			}
		}
	},
};
