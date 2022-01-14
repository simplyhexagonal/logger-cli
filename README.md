# Logger CLI
![Tests](https://github.com/simplyhexagonal/logger-cli/workflows/tests/badge.svg)

This is a simple yet powerful wrapper around [@simplyhexagonal/logger](https://github.com/simplyhexagonal/logger) that provides
CLI capabilities, including piping the output of a command to the logger:

```sh
$ logger.debug This is a debug message

# [2022-01-13T23:54:00.600] DEBUG 🐞️:
#
#        This is a debug message

$ uname -a | logger.debug

# [2022-01-13T23:55:01.933Z] DEBUG 🐞️:
# 
#        Linux 5.11.0-40-generic #44~20.04.2-Ubuntu SMP Tue Oct 26 18:55:01 UTC 2022 x86_64 GNU/Linux
```

More importantly, configuring transports is supported as well!

We have the following officially supported transports:

- [WebSocket]() (Coming soon)
- [Discord](https://www.npmjs.com/package/@simplyhexagonal/logger-transport-discord)
- [Slack]() (Coming soon)
- [Email]() (Coming soon)
- [SMS]() (Coming soon)

## Open source notice

This project is open to updates by its users, [I](https://github.com/jeanlescure) ensure that PRs are relevant to the community.
In other words, if you find a bug or want a new feature, please help us by becoming one of the
[contributors](#contributors-) ✌️ ! See the [contributing section](#contributing)

## Like this module? ❤

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) ☕
- Supporting Simply Hexagonal on [Open Collective](https://opencollective.com/simplyhexagonal) 🏆
- Starring this repo on [Github](https://github.com/simplyhexagonal/logger-cli) 🌟

## Install

```sh
pnpm i -g @simplyhexagonal/logger-cli

# or
yarn add -g @simplyhexagonal/logger-cli

# or
npm install -g @simplyhexagonal/logger-cli
```

## Usage

```sh
# simply pass your message(s) as arguments
logger.<log-level> <message> [...message]

# or pipe the output of a command to the logger
command | logger.<log-level>
```

The following log levels are supported:

```sh
logger.debug
logger.info
logger.warn
logger.error
logger.fatal
logger.all
logger.raw
```

## Configuration

By default the logger will be configured to log to the console.

To configure the logger you can use the `logger.config` command:

```sh
logger.config <config-file>.js
```

The config file is expected to be a `.js` file that exports a `config` object, e.g.:

```js
const os = require('os');

module.exports = {
  optionsByLevel: {
    warn: [], // leaving this array means the logs will output to console
    info: [
      {
        transport: 'discord',
        options: {
          destination: (process.env.DISCORD_WEBHOOK || ''),
        },
      },
    ],
    debug: [],
    error: [
      // you can configure more than one transport per log level
      {
        transport: 'discord',
        options: {
          destination: (process.env.DISCORD_WEBHOOK || ''),
        },
      },
      {
        transport: 'email',
        options: {
          destination: (process.env.ERROR_NOTIFICATION_EMAIL || ''),
        },
      },
    ],
    fatal: [],
    all: [],
    raw: [],
  },
  appIdentifiers: {
    clusterType: 'TEST',
    cluster: 'CI',
    hostname: os.hostname(),
    app: 'logger-cli',
  },
};
```

This configuration file will be symlinked to the origin directory of the logger-cli package. This means
that if you are running logger from the "global" node context, everywhere on your system that you
logger-cli commands, you will be able to use the same configuration file. On the other hand, if you
install logger-cli as a dependency to a project, only that project will be able to use the config
file (as long as the logger-cli command being run is located in the projects `node_modules` directory).

As you can see in the example above, you can also define environment variables and they will be
used by @simplyhexagonal/logger-cli.

For more information on the available configuration options, please see [@simplyhexagonal/logger](https://github.com/simplyhexagonal/logger).

## Contributing

Yes, thank you! This plugin is community-driven, most of its features are from different authors.
Please update the docs and tests and add your name to the `package.json` file.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jeanlescure.cr"><img src="https://avatars2.githubusercontent.com/u/3330339?v=4" width="100px;" alt=""/><br /><sub><b>Jean Lescure</b></sub></a><br /><a href="#maintenance-jeanlescure" title="Maintenance">🚧</a> <a href="https://github.com/simplyhexagonal/package/commits?author=jeanlescure" title="Code">💻</a> <a href="#userTesting-jeanlescure" title="User Testing">📓</a> <a href="https://github.com/simplyhexagonal/package/commits?author=jeanlescure" title="Tests">⚠️</a> <a href="#example-jeanlescure" title="Examples">💡</a> <a href="https://github.com/simplyhexagonal/package/commits?author=jeanlescure" title="Documentation">📖</a></td>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
## License

Copyright (c) 2022-Present [Package Contributors](https://github.com/simplyhexagonal/package/#contributors-).<br/>
Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
