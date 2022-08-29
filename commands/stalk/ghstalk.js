module.exports = {
	name: 'githubstalk',
	param: '<username>',
	cmd: ['githubstalk', 'ghstalk'],
	category: 'stalk',
	desc: 'View profile github by username',
	query: 'Input the username\nExample : .githubstalk Zynfinity',
	async handler(m, {conn, text}){
		await m.reply(response.wait)
		const ghstalk = await scrapp.ghuser(text)
		if(!ghstalk.status) return m.reply('User not found!')
		const opt = {
        	quoted: m,
	        adReply: {
	          type: 2,
	          title: 'Github Profile : ' + text,
	          url: ghstalk.user.githubUrl
	        }
      }
		await conn.sendFileFromUrl(m.from, ghstalk.user.avatarUrl, {caption: await tool.parseResult('GITHUB STALK', ghstalk.user, {delete: ['avatarUrl']})}, {...opt})
	}
}