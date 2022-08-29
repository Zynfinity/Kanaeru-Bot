const fs = require("fs");
const prettyms = require("pretty-ms");
module.exports = {
	name: "afk",
	function: true,
	async handler(m, { conn }) {
		const afk = JSON.parse(fs.readFileSync("./database/json/afk.json"));
		if (afk[m.sender] != undefined) {
			const afktime = await prettyms(Date.now() - afk[m.sender].time, {
				verbose: true,
			});
			const afkreason = afk[m.sender].reason;
			const unafk = `You have exited afk mode,\nafter ${afkreason} for ${afktime}`;
			m.reply(unafk);
			delete afk[m.sender];
			await fs.writeFileSync("./database/json/afk.json", JSON.stringify(afk));
		}
		if (m.quoted && afk[m.quoted.sender] != undefined) {
			const pushname = store.contacts[m.quoted.sender];
			const afktime = await prettyms(Date.now() - afk[m.quoted.sender].time, {
				verbose: true,
			});
			const afkreason = afk[m.quoted.sender].reason;
			const afkteks = `${
				pushname != undefined ? pushname.name : "he`s"
			} in afk, don't disturb\nReason : ${afkreason}\nSince : ${afktime}`;
			await m.reply(afkteks);
		}
		if (m.mentions != "" && afk[m.mentions[0]] != undefined) {
			const pushname = store.contacts[m.mentions[0]];
			const afktime = await prettyms(Date.now() - afk[m.mentions[0]].time, {
				verbose: true,
			});
			const afkreason = afk[m.mentions[0]].reason;
			const afkteks = `${
				pushname != undefined ? pushname.name : "he`s"
			} in afk, don't disturb\nReason : ${afkreason}\nSince : ${afktime}`;
			await m.reply(afkteks);
		}
	},
};
