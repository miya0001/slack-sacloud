const sacloud = require('sacloud');
const config = require('./config.js');

var Server = function(client) {
  sacloud.API_ROOT = config.api;
  this.client = sacloud.createClient({
    accessToken        : process.env.SACLOUD_ACCESS_TOKEN,
    accessTokenSecret  : process.env.SACLOUD_ACCESS_TOKEN_SECRET,
    disableLocalizeKeys: false,
    debug              : false
  });
}

Server.prototype.list = function(callback) {
  this.client.createRequest({
    method: 'GET',
    path  : 'server'
  }).send(function(err, result) {
    if (err) throw new Error(err);
    callback(result.response.servers);
  });
}
//
// Server.prototype.destroy = (serverId) => {
//   const client = this.client;
//   Promise.resolve()
//   // インスタンスを停止
//   .then(function() {
//     return new Promise(function(resolve, reject) {
//       client.createRequest({
//         method: 'DELETE',
//         path: 'server/'+serverId+'/power',
//         body: {
//           Force: true
//         }
//       }).send(function(err, result) {
//         if (err) reject(err)
//         resolve();
//       })
//     });
//   })
//   // インスタンスを削除
//   .then(function() {
//     return new Promise(function(resolve, reject) {
//       var timer = setInterval(function() {
//         client.createRequest({
//           method: 'DELETE',
//           path: 'server/'+serverId,
//           body: {
//             WithDisk: true
//           }
//         }).send(function(err, result) {
//           if (err && '409 Conflict' === result.response.status) {
//             console.log('Shutting down ...')
//           } else if (! err) {
//             clearInterval(timer);
//             resolve();
//           } else {
//             clearInterval(timer);
//             reject(err);
//           }
//         })
//       }, 10000);
//     });
//   })
//   .then(function() {
//     console.log('Deleted: '+serverId)
//   })
//   .catch(function(err) {
//     throw new Error(err)
//   })
// }

module.exports = Server;
