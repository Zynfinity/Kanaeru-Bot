const fs = require('fs')
const datapath = './database/json/stickcmd.json'
module.exports = {
	name: ['addstick', 'delstick', 'listcmd', 'getstick'],
	cmd: ['addstick', 'delstick', 'listcmd', 'getstick'],
	category: 'owner',
	owner: true,
	async handler(m, {conn, text}){
		const stickcmd = JSON.parse(fs.readFileSync(datapath))
		if(m.command == 'addstick'){
			if(!m.quoted || !m.quoted.mtype == 'stickerMessage') return m.reply('Please reply a sticker message')
			if(m.quoted.message.stickerMessage.fileSha256 in stickcmd) return m.reply('Sticker tersebut sudah terdaftar di database!')
			stickcmd[m.quoted.message.stickerMessage.fileSha256] = {
				id: m.quoted.message.stickerMessage.fileSha256,
				cmd: `.${text}`,
				sticker: m.quoted
			}
			await fs.writeFileSync(datapath, JSON.stringify(stickcmd, null, 2))
			m.reply('Berhasil menambahkan sticker command ke database')
		}
		else if(m.command == 'delstick'){
			if(!m.quoted || !m.quoted.mtype == 'stickerMessage') return m.reply('Please reply a sticker message')
			if(!(m.quoted.message.stickerMessage.fileSha256 in stickcmd)) return m.reply('Sticker tersebut tidak terdaftar di database!')
			delete stickcmd[m.quoted.message.stickerMessage.fileSha256]
			await fs.writeFileSync(datapath, JSON.stringify(stickcmd, null, 2))
			m.reply('Berhasil menghapus sticker command dari database')
		}
		else if(m.command == 'getstick'){
			const find = Object.values(stickcmd).filter(stc => stc.cmd == `.${text}` || stc.cmd.startsWith(`.${text}`))
			if(find == '') return m.reply('Command tidak ditemukan!')
			for(let i of find){
				await conn.copyNForward(m.from, i.sticker, {quoted: m})
			}
		}
		else{
			m.reply(await tool.parseResult('LIST STICKER COMMAND', Object.values(stickcmd), {delete: ['sticker']}))
		}
	}
}