const path = require('path')
module.exports = {
  devPort: 4000,
  nodePort: 8000,
  moduleName: "<%= appPrefix%>",
  nodeSocket: path.join(__dirname, '../shared/sockets/node.sock'),
  nodePidPath: path.join(__dirname, '../shared/pids/node.pid'),
  appPrefix: '/<%= appPrefix%>',
  logDir: path.join(__dirname, '../shared/logs')
}