const path = require('path');
const Manager = require(
  path.resolve(require('global-modules'),
  'svrx-cli',
  'lib'
));

process.chdir(__dirname);

const manager = new Manager();
manager.loadConfigFile();
Manager.loadSvrx({}, {
  root: __dirname,
  plugins: [{ path: path.resolve('..') }],
}).then(svrx => {
  svrx.start();
});
