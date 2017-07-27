const sacloud = require('sacloud');
const config = require('./config.js');

var Server = function(client) {
  sacloud.API_ROOT = process.env.SACLOUD_API;
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

Server.prototype.halt = function(serverId, callback) {
  this.client.createRequest({
    method: 'DELETE',
    path: 'server/'+serverId+'/power'
  }).send(function(err, result) {
    callback(result);
  });
}

Server.prototype.up = function(serverId, callback) {
  this.client.createRequest({
    method: 'PUT',
    path: 'server/'+serverId+'/power'
  }).send(function(err, result) {
    callback(result);
  });
}

Server.prototype.destroy = function(serverId, callback) {
  this.client.createRequest({
    method: 'DELETE',
    path: 'server/'+serverId,
    body: {
      WithDisk: true
    }
  }).send(function(err, result) {
    callback(result);
  });
}

module.exports = Server;
