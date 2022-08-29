module.exports = {
	name: "antiporn_function",
	function: true,
	async handler(m, { conn, chats, isAdmin, isBotAdmin }) {
        if(m.type != 'imageMessage') return
		await db.read();
		if(!m.isGroup) return;
		if(!isBotAdmin || isAdmin) return
		if (!(m.from in db.data.antiporn)) return;
		const antiporn = db.data.antiporn[m.from]
		const sensitivity = antiporn.sensitivity ? antiporn.sensitivity : 60
		const check = await tool.checkNsfw(await m.download())
		if(!check.status) return
        if(check.result.sexy >= sensitivity || check.result.porn >= sensitivity || check.result.hentai >= sensitivity){
            let aporn = await tool.parseResult(`Porn / Hentai Image Detected`, {sender: `@${m.sender.split('@')[0]}`, ...check.result})
            aporn += `\n\nAnda akan dikeluarkan !!`
            await conn.sendMessage(m.from, {delete: {...m.key, participant: m.sender}})
            await conn.sendMessage(m.from, {text: aporn, withTag: true})
			await conn.groupParticipantsUpdate(m.from, [m.sender], 'remove')
        }
	},
};
