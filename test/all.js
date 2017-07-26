'use strict';

const path       = require('path'),
      chai       = require('chai'),
      should     = chai.should(),
      sacloud    = require('sacloud'),
      config     = require('../lib/config.js'),
      Server     = require('../lib/server.js'),
      handler    = require('../handler.js')

describe('sacloud', () => {

  it('should get instances', (done) => {
    const server = new Server();
    const servers = server.list((servers) => {
      servers.should.be.a('array');
      done();
    });
  });

});
