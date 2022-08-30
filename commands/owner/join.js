const moment = require('moment-timezone')
const fs = require('fs')
module.exports = {
	name: "join",
	param: "<link group>",
	cmd: ["join"],
	category: "other",
	desc: "Adding bots to the group using the group link",
	//owner: true,
	query: true,
	url: true,
	async handler(m, { conn, text, isOwner, args }) {
		if (!/whatsapp/.test(text) && text.split("whatsapp.com/")[1] == undefined) return m.reply(response.errorlink);
		try{
			console.log(text.split("/")[3].split(' ')[0])
			const accept = await conn.groupGetInviteInfo(text.split("/")[3].split(' ')[0])
			if(isOwner){
				if(m.type == "templateButtonReplyMessage") await conn.sendMessage(args[1], {text: 'Indonesia\nBot berhasil ditambahkan ke group anda\n\nEnglish\nThe bot has been successfully added to your group'})
				const join = await conn.groupAcceptInvite(text.split("/")[3].split(' ')[0]);
				m.reply(`Succsess Join Group ${join}`);
			}
			else{
				const button = [
					{
						urlButton: {
							displayText: "Got To Link",
							url: text,
						},
					},
					{
						urlButton: {
							displayText: "Owner Group",
							url: `https://wa.me/${accept.subjectOwner.split('@')[0]}`,
						},
					},
					{
						urlButton: {
							displayText: "Copy Link Group",
							url: `https://www.whatsapp.com/otp/copy/${text}`,
						},
					},
					{
						quickReplyButton: {
							displayText: "Join",
							id: `.join ${text} ${m.sender}`,
						},
					},
				];
				if(accept.size < 150) return m.reply(`Indonesia\nTidak dapat menambahkan bot ke group anda\n	> _Member group kurang dari 150, untuk menambahkan bot ke group, member group harus >= 150_\n\nEnglish\nUnable to add bot to your group\n	> _Group members are less than 150, to add bots to the group, group members must be >= 150_\n\nFor more information, Join My Group\nhttps://chat.whatsapp.com/CGMJD56YU2w4v1q5kvuyKg`)
				let joinr = `*Request to add bot to group*\n\n`
				joinr += `${shp} Name : ${accept.subject}\n`
				joinr += `${shp} Members : ${accept.size}\n`
				joinr += `${shp} Since : ${moment(accept.subjectTime * 1000)}`
				m.reply(`Indonesia\nSilahkan tunggu persetujuan dari owner, Jika pesan ini tidak dibalas maka owner belum menyetujui permintaan anda\n\nEnglish\nPlease wait for approval from the owner, if this message is not replied to then the owner has not approved your request`)
				await conn.sendButton(owner[0], joinr, config.botname, button)
				//await conn.sendButtonImage(owner[0], await fs.readFileSync("./media/thumb.jpg"), joinr, config.botname, button, {isLoc: true });
			}
		}catch(e){
			console.log(e)
			m.reply('Link Group Not Valid')
		}
	}
};
