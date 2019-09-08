<%= packageName %>
---

[![svrx](https://img.shields.io/badge/svrx-plugin-%23ff69b4?style=flat-square)](https://svrx.io/)
[![npm](https://img.shields.io/npm/v/<%= packageName %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= packageName %>)

<%= description %>

## Usage

> Please make sure that you have installed [svrx](https://svrx.io/) already.

### Via CLI

```bash
svrx -p <%= pluginName %>
```

### Via API

```js
const svrx = require('svrx');

svrx({ plugins: [ '<%= pluginName %>' ] }).start();
```

## Options

<!-- TODO -->

## License

MIT