module.exports = {
    name: "antiporn",
    param: "<on/off>",
    cmd: ["antiporn"],
    category: "group",
    desc: `Turn on or off antiporn`,
    group: true,
    admin: true,
    botadmin: true,
    async handler(m, {
        conn,
        args
    }) {
        await db.read();
        if (args[0] == "on") {
            if (m.from in db.data.antiporn) return m.reply(`antiporn has been activated previously!`);
            db.data.antiporn[m.from] = ({
                id: m.from,
                sensitivity: ''
            });
            await db.write();
            m.reply(`antiporn has been activated in this group`);
        } else if (args[0] == "off") {
            if (!(m.from in db.data.antiporn)) return m.reply("antiporn is not activated in this group");
            delete db.data.antiporn[m.from]
            await db.write();
            m.reply(`antiporn has been deactivated in this group`);
        } else m.reply("Select on/off");
    },
};
