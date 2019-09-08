<%= packageName %>
---

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