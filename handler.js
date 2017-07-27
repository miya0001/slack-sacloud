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

  /**
   * Halt the server.
   *
   * Usage: /sacloud halt <id>
   */
  eventEmitter.on('halt', (args) => {
    bot.reply({
      "text": ":computer: *Stopping the server ID:"+args[0]+"...*",
      "mrkdwn": true
    });
    const server = new Server();
    server.halt(args[0], function(result) {
      if (result.response.error_msg) {
        bot.reply({
          "text": "Error: "+result.response.error_msg,
          "mrkdwn": true
        });
      } else if (true === result.response.success) {
        bot.reply({
          "text": "Success: The machine will be stopped. :+1:",
          "mrkdwn": true
        });
      } else {
        bot.reply({
          "text": "Error: Please try later.",
          "mrkdwn": true
        });
      }
    })
  });

  /**
   * Start the server.
   *
   * Usage: /sacloud up <id>
   */
  eventEmitter.on('up', (args) => {
    bot.reply({
      "text": ":computer: *Starting the server ID:"+args[0]+"...*",
      "mrkdwn": true
    });
    const server = new Server();
    server.up(args[0], function(result) {
      if (result.response.error_msg) {
        bot.reply({
          "text": "Error: "+result.response.error_msg,
          "mrkdwn": true
        });
      } else if (true === result.response.success) {
        bot.reply({
          "text": "Success: The machine will be started. :+1:",
          "mrkdwn": true
        });
      } else {
        bot.reply({
          "text": "Error: Please try later.",
          "mrkdwn": true
        });
      }
    })
  });

  /**
   * Destroy the server.
   *
   * Usage: /sacloud destroy <id>
   */
  eventEmitter.on('destroy', (args) => {
    bot.reply({
      "text": ":computer: *Destroying the server ID:"+args[0]+"...*",
      "mrkdwn": true
    });
    const server = new Server();
    server.destroy(args[0], function(result) {
      if (result.response.error_msg) {
        bot.reply({
          "text": "Error: "+result.response.error_msg,
          "mrkdwn": true
        });
      } else if (true === result.response.success) {
        bot.reply({
          "text": "Success: The machine will be destroyed. :+1:",
          "mrkdwn": true
        });
      } else {
        bot.reply({
          "text": "Error: Please try later.",
          "mrkdwn": true
        });
      }
    })
  });

  const args = bot.payload.text.split(/\s+/)
  const subcommand = args.shift();

  if (! eventEmitter.listeners(subcommand).length) {
    bot.replyPrivate({
      "text": "*Usage*:\n/sacloud list\n/sacloud up <id>\n/sacloud halt <id>\n/sacloud destroy <id>",
      "mrkdwn": true
    });
  }

  eventEmitter.emit(subcommand, args);
});
