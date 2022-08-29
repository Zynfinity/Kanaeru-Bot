const fs = require("fs");
const { showhit } = require("../../database/hit");
const imgurl = 'https://telegra.ph/file/e0afca1f2e494f2a2db63.jpg'
module.exports = {
	name: "menu",
	cmd: ["menu"],
	ignored: true,
	async handler(m, { conn, prefix}) {
		const cmd = [];
		Object.values(attr.commands)
			.filter((cm) => !cm.disabled && !cm.ignored)
			.map((cm) => {
        		if(Array.isArray(cm.name)){
          			for(let i=0; i<cm.name.length; i++){
            			cmd.push({
							name: `${cm.name[i]}${cm.param ? ` ${cm.param}` : ""}`,
							cmd: [cm.cmd.find(y => y == cm.name[i])],
							param: cm.param ? cm.param : false,
							tag: cm.category ? cm.category : "Uncategorized",
							desc: cm.desc ? cm.desc : '-'
						});
          			}
        		}
        		else{
					cmd.push({
						name: `${cm.name}${cm.param ? ` ${cm.param}` : ""}`,
						cmd: cm.cmd,
						param: cm.param ? cm.param : false,
						tag: cm.category ? cm.category : "Uncategorized",
						desc: cm.desc ? cm.desc : '-'
					});
        		}
			});
		let d = new Date(new Date() + 3600000);
		let date = d.toLocaleDateString("id", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		const hit = Object.values(await showhit()).map((ht) => ht.total);
		const thit = await eval(hit.join(" + "));
		const map_tag = cmd.map((mek) => mek.tag);
		const sort_tag = await map_tag.sort();
		const tag_data = new Set(sort_tag);
		const tags = [...tag_data];
		//let menu = `${config.botname}\n\n`
		let menu = `${config.botname}\n\n`
		menu += `*About Bot*\n`
		menu += `${shp} Library : Baileys-MD\n`;
		menu += `${shp} Runtime  : ${await tool.toTimer(process.uptime())}\n`;
		menu += `${shp} Command Total : ${cmd.length}\n`;
		menu += `${shp} Hit Total : ${thit}\n`;
		menu += `${shp} Prefix : [ ${prefix} ]\n`;
		menu += `${shp} Date : ${date}\n\n`;
		menu += `Hallo ${await conn.getName(m.sender)} Here my command list\n`;
		let numtag = 1
		for (let tag of tags) {
			menu += `\n*${tag.toUpperCase()}*\n`;
			const filt_cmd = cmd.filter((mek) => mek.tag == tag);
			const map_cmd = await filt_cmd.map((mek) => mek.name);
			const sort = await map_cmd.sort(function (a, b) {
				return a.length - b.length;
			});
			for (let j = 0; j < sort.length; j++) {
				menu += `	• ${prefix}${sort[j]}\n`;
			}
			numtag++
		}
		const button = [
			{
				urlButton: {
					displayText: "🤖 Join Group Bot",
					url: "https://chat.whatsapp.com/CGMJD56YU2w4v1q5kvuyKg",
				},
			},
			{
				quickReplyButton: {
					displayText: "👨🏻‍💻 OWNER",
					id: '.owner',
				},
			},
			{
				quickReplyButton: {
					displayText: "📚 Dashboard",
					id: ".dashboard",
				},
			},
		]; 
		//await conn.sendButtonImage(m.from, await tool.getBuffer(imgurl), menu, 'Masih dalam pengembangan', button)
		await conn.sendMessage(m.from, {
			document: await fs.readFileSync('./media/thumb.jpg'),
			mimetype: 'application/pdf',
			pageCount: 1,
			fileName: `Hello ${await conn.getName(m.sender)}`,
			contextInfo: {
				externalAdReply: {
					title: config.botname,
					sourceUrl: `https://chat.whatsapp.com/CGMJD56YU2w4v1q5kvuyKg`,
					mediaUrl: imgurl,
					mediaType: 1,
					showAdAttribution: true,
					renderLargerThumbnail: true,
					thumbnail: await tool.getBuffer(imgurl),
					thumbnailUrl: imgurl
				}
			},
			caption: menu,
			footer: '\nMasih dalam pengembangan!',
			buttons: [
				{buttonId: '.dashboard', buttonText: {displayText: '📚 Dashboard'}, type: 1},
				{buttonId: '.owner', buttonText: {displayText: '👨🏻‍💻 Owner'}, type: 1}
			],
			headerType: 4
			},
			{quoted: m})
	},
};