const os = require('os');

const discordConfig = {
  transport: 'discord',
  options: {
    destination: (process.env.DISCORD_WEBHOOK || ''),
  },
};

module.exports = {
  optionsByLevel: {
    warn: [],
    info: [discordConfig],
    debug: [],
    error: [],
    fatal: [],
    all: [discordConfig],
    raw: [],
  },
  appIdentifiers: {
    clusterType: 'TEST',
    cluster: 'CI',
    hostname: os.hostname(),
    app: 'logger-cli',
  },
};
