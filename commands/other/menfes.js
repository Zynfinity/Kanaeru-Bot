module.exports = {
	name: 'menfes',
	param: '< Coming Soon >',
	cmd: ['menfes'],
	category: 'other',
	desc: 'Berbicara kepada orang yang kamu suka secara anonim\n\nCara Penggunaan : .menfes nomor(diawali kode negara)|pesan',
	private: true,
	owner: true,
	query: 'Example : .menfes 62895xxxxx|I Love You',
	async handler(m, {conn, text, args}){
		if(args[0] == 'accept' && m.type == "templateButtonReplyMessage"){
			const find = Object.values(db.data.menfes).find(t => t.to == m.sender)
			db.data.menfes[find.id].chatting = true
			await db.write()
			await m.reply('Anda menerima ajakan chatting dari dia\n\nGood Luck!')
			return await conn.sendMessage(find.id, {text: 'Dia telah menerima ajakan chatting denganmu\n\nGood Luck Bro & Sis:'})
		}
		else if(args[0] == 'decline' && m.type == "templateButtonReplyMessage"){
			const find = Object.values(db.data.menfes).find(t => t.to == m.sender)
			await m.reply('Anda menolak ajakan chatting dari dia!')
			await conn.sendMessage(find.id, {text: `@${find.to.split('@')[0]} Menolak ajakan untuk chatting\n\nNT dan Tetap semangat bro & Sis:)`, withTag: true})
			delete db.data.menfes[find.id]
			await db.write()
		}
		const to = `${text.split('|')[0].replace(/\D/g, '')}@s.whatsapp.net`
		const onWa =  await conn.onWhatsApp(to)
		if(!onWa) return m.reply('Number not registered on whatsapp')
		db.data.menfes[m.sender] = {
			id: m.sender,
			to: to,
			chatting: false
		}
		await db.write()
		const teks = `Halo ${await conn.getName(to)} 👋🏻\n Kamu mendapat pesan dari seseorang\n\n"${text.split('|')[1]}"`
		const button = [
		    {
				quickReplyButton: {
		            displayText: "Y",
		            id: ".menfes accept",
		        },
		    },
		    {
		        quickReplyButton: {
		            displayText: "N",
		            id: ".menfes decline",
		        },
		    },
      	];
		await conn.sendButton(to, teks, `Ingin chatting bersama dia? Y/N`, button)
		await m.reply('Pesan sudah dikirim ke target\n\nSilahkan tunggu jawaban dari dia:')
	}
}