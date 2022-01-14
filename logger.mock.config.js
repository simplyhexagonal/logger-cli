const os = require('os');

module.exports = {
  optionsByLevel: {
    warn: [],
    info: [
      {
        transport: 'discord',
        options: {
          destination: (process.env.DISCORD_WEBHOOK || ''),
        },
      },
    ],
    debug: [],
    error: [],
    fatal: [],
    all: [
      {
        transport: 'discord',
        options: {
          destination: (process.env.DISCORD_WEBHOOK || ''),
        },
      },
    ],
    raw: [],
  },
  appIdentifiers: {
    clusterType: 'TEST',
    cluster: 'CI',
    hostname: os.hostname(),
    app: 'logger-cli',
  },
};
