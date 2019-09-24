# @svrx/create-plugin

[![npm](https://img.shields.io/npm/v/@svrx/create-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@svrx/create-plugin)

Initialize a svrx plugin by running one command.

## Usage

> Node >= 8 LTS

#### Initialize

 - npm

```bash
npm init @svrx/plugin
```

Publish as scoped npm package:

```bash
npm init @svrx/plugin --scope=<scope-name>
```

 - yarn

```bash
yarn create @svrx/plugin
```

Publish as scoped npm package:

```bash
yarn create @svrx/plugin --scope=<scope-name>
```

#### Test with plugin

> Make sure you've installed [svrx-cli](https://github.com/svrxjs/svrx-cli) globally.

In plugin directory:

```bash
npm start
```

## Development

 - `npm install`
 - `git commit` follows the [spec](https://www.conventionalcommits.org)
 - `npm run release`
