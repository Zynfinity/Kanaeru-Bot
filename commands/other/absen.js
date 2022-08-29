const fs = require('fs')
const datapath = './database/json/absen.json'
module.exports = {
	name: ['mulaiabsen', 'listabsen', 'hapusabsen'],
	cmd: ['absen','mulaiabsen', 'listabsen', 'hapusabsen'],
	category: 'other',
	group: true,
	async handler(m, {conn, args, text, isAdmin}){
		const absen = JSON.parse(fs.readFileSync(datapath))
		const data = absen[m.from]
		const sections = [
			{
				rows: [
					{title: "Hadir", rowId: ".absen 0"},
					{title: "Sakit", rowId: ".absen 1"},
					{title: "Izin", rowId: ".absen 2"}
				]
			}
		]
		if(m.command == 'mulaiabsen'){
			if(!isAdmin) return m.reply(response.admin)
			if(m.from in absen){
				const button = [
					{
			            quickReplyButton: {
			                displayText: "Here",
			                id: ".absen show"
			            }
            		}
            	]
            	let absent = `Masih ada sesi absen yang sedang berlangsung!`
            	let footer = `Klik disini untuk melihat sesi absen`
            	return await conn.sendButton(m.from, absent, footer, button)
			}
			absen[m.from] = {
				id: m.from,
				author: m.sender,
				konteks: text ? text : null,
				members: []
			}
			await fs.writeFileSync(datapath, JSON.stringify(absen, null, 2))
			const button = [
				{
			        quickReplyButton: {
			            displayText: "Hadir",
			            id: ".absen 0"
			       }
            	},
            	{
			        quickReplyButton: {
			            displayText: "Sakit",
			            id: ".absen 1"
			       }
            	},
            	{
			        quickReplyButton: {
			            displayText: "Izin",
			            id: ".absen 2"
			       }
            	},
            ]
            let absent = `*ABSEN*\n`
            const konteks = text ? text : false
            if(konteks) absent += `"${text}"\n\n`
            absent += `${shp} *List* :\n\n`
            let footer = `Absen${konteks ? `|| "${text}"` : ''}`
            await conn.sendButton(m.from, absent, footer, button)
		}
		else if(m.command == 'listabsen'){
			if(data == undefined) return m.reply('Tidak ada sesi absen berlangsung di group ini!')
			let absent = `*ABSEN*\n`
            const konteks = data.konteks ? data.konteks : false
            if(konteks) absent += `"${data.konteks}"\n\n`
            absent += `${shp} *List* :\n\n`
        	let num = 1
        	for(let i of data.members){
        		absent += `*${num}.* @${i.id.split('@')[0]} : ${i.absen}\n`
        		num++
        	}
        	m.reply(absent, {withTag: true})
		}
		else if(m.command == 'hapusabsen'){
			if(data == undefined) return m.reply('Tidak ada sesi absen berlangsung di group ini!')
			delete absen[m.from]
			await fs.writeFileSync(datapath, JSON.stringify(absen, null, 2))
			m.reply('✅')
		}
		else{
			if(m.type != 'templateButtonReplyMessage') return 
			if(data == undefined) return
			if(data.members.find(mem => mem.id == m.sender) != undefined) return
			const pres = args[0] == 0 ? 'hadir' : args[0] == 1 ? 'sakit' : args[0] == 2 ? 'izin' : '' 
			data.members.push({
				id: m.sender,
				absen: pres
			})
			await fs.writeFileSync(datapath, JSON.stringify(absen, null, 2))
			const button = [
				{
			        quickReplyButton: {
			            displayText: "Hadir",
			            id: ".absen 0"
			       }
            	},
            	{
			        quickReplyButton: {
			            displayText: "Sakit",
			            id: ".absen 1"
			       }
            	},
            	{
			        quickReplyButton: {
			            displayText: "Izin",
			            id: ".absen 2"
			       }
            	},
            ]
            let absent = `*ABSEN*\n`
            const konteks = data.konteks ? data.konteks : false
            if(konteks) absent += `"${data.konteks}"\n\n`
            absent += `${shp} *List* :\n\n`
        	let num = 1
        	for(let i of data.members){
        		absent += `*${num}.* ${await conn.getName(i.id)} / wa.me/${i.id.split('@')[0]} : ${i.absen}\n`
        		num++
        	}
            let footer = `Absen${konteks ? `|| "${data.konteks}"` : ''}`
            await conn.sendButton(m.from, absent, footer, button, {withTag: true})
		}
	}
}