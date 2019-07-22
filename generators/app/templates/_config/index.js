const path = require('path')
const os = require('os')
const ifaces = os.networkInterfaces()
let ipv4 = ''
Object.keys(ifaces).forEach(key => {
  const value = ifaces[key]
  value.forEach(v => {
    if (v.internal || v.family !== 'IPv4') {
      return
    }
    const { address } = v
    ipv4 = address
  })
})
module.exports = {
  devPort: 4000,
  nodePort: 8000,
  localAddr: `http://${ipv4}`,
  moduleName: "<%= appPrefix%>",
  nodeSocket: path.join(__dirname, '../shared/sockets/node.sock'),
  nodePidPath: path.join(__dirname, '../shared/pids/node.pid'),
  appPrefix: '/<%= appPrefix%>',
  logDir: path.join(__dirname, '../shared/logs')
}