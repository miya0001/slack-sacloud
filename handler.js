'use strict';

const slack = require('serverless-slack');
const events = require('events');
const config = require('./lib/config.js');
const Server = require('./lib/server.js')

exports.slack = slack.handler.bind(slack);

// Slash Command handler
slack.on('/sacloud', (msg, bot) => {
  const eventEmitter = new events.EventEmitter();

  /**
   * Get the list of the instances
   *
   * Usage: /sacloud list
   */
  eventEmitter.on('list', () => {
    const server = new Server();
    server.list((servers) => {
      var attachments = [];
      for (var i=0; i<servers.length; i++) {
        const s = servers[i];
        var color = "#cccccc";
        if ('up' === s.instance.status) {
          color = "#003366";
        }
        attachments.push({
          "title": s.name,
          "color": color,
          "text": `*ID*: ${s.id}\n*IP Address*: ${s.interfaces[0].ipAddress}\n*Status*: ${s.instance.status}`,
          "mrkdwn_in": [
              "text"
          ]
        });
      }
      const message = {
        "attachments": attachments
      };
      // ephemeral reply
      bot.replyPrivate(message);
    })
  });

  if (! eventEmitter.listeners(bot.payload.text).length) {
    bot.replyPrivate({
      "text": "*Usage*:\n/sacloud list\n/sacloud halt <id>\n/sacloud destroy <id>",
      "mrkdwn": true
    });
  }

  eventEmitter.emit(bot.payload.text);
});
