const { default: axios } = require('axios')
const { execSync } = require('child_process')
class line {
  static sendMessage = async (jid, content) => {
    try {
      if (typeof content != 'string') return ({ status: 404, message: 'content must string' })
      let ex = `curl -v -X POST https://api.line.me/v2/bot/message/push \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer ${config.line.token}' \
        -d '{
            "to": "id",
            "messages": isi
        }'`
      ex = ex.replace('id', jid)
      ex = ex.replace('isi', content)
      const exec = await execSync(ex)
      return ({ status: 200, message: `Success send Message to ${jid}` })
    } catch (e) {
      return ({ status: 404, message: String(e) })
    }
  }
  static getUserProfile = async (id) => {
    return new Promise((resolve) => {
      axios.get(`https://api.line.me/v2/bot/profile/${id}`, {
        headers: {
          "Authorization": `Bearer ${config.line.token}`
        }
      }).then(res => {
        if (res.status == 200) resolve({ status: 200, message: res.statusText, ...res.data })
        else resolve({ status: res.status, message: res.statusText })
      }).catch(e => resolve({ status: 404, message: 'error' }))
    })
  }
  static getBotInfo = async () => {
    return new Promise((resolve) => {
      axios.get(`https://api.line.me/v2/bot/info`, {
        headers: {
          "Authorization": `Bearer ${config.line.token}`
        }
      }).then(res => {
        if (res.status == 200) resolve({ status: 200, message: res.statusText, ...res.data })
        else resolve({ status: res.status, message: res.statusText })
      }).catch(e => resolve({ status: 404, message: String(e) }))
    })
  }
}
class telegram{
  static sendMessage = async(jid, content) => {
    const {data} = await axios.get(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${jid}&text=${content}`)
    return data
  }
}
module.exports = {line, telegram}