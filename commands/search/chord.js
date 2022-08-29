module.exports = {
  name: 'chord',
  param: '<query>',
  cmd: ['chord'],
  category: 'search',
  desc: 'Search chord',
  query: true,
  async handler(m, {conn, text}){
    await m.reply(response.wait)
    const chord = await scrapp.chord(text)
    if(!chord.status) return m.reply(chord)
    m.reply(`CHORD\n\n${shp} Title : ${chord.title}\n${shp} Artist : ${chord.artist}\n\n${chord.chord}`)
  }
}
