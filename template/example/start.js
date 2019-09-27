const path = require('path');
const reguireg = require('requireg');

let Manager;
try {
  Manager = reguireg('@svrx/cli/lib');
} catch (err) {
  console.log('Please install svrx-cli by `npm i @svrx/cli -g`');
  process.exit();
}

process.chdir(__dirname);

new Manager(); // eslint-disable-line
Manager.loadSvrx({}, {
  root: __dirname,
  plugins: [{ path: path.resolve('..') }],
}).then((svrx) => {
  svrx.start();
});
