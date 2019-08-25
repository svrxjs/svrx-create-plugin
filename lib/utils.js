const cp = require('child_process');
const { paramCase } = require('change-case');

const isSvrxPlugin = (name) => /^svrx-plugin-/.test(name);
exports.isSvrxPlugin = isSvrxPlugin;

exports.correctName = (name) => {
  if (name && !isSvrxPlugin(name)) return `svrx-plugin-${paramCase(name)}`;
  return name;
};

exports.correctFullName = (name) => {
  if (isSvrxPlugin(name)) return paramCase(name);
  return `svrx-plugin-${paramCase(name)}`;
};

// TODO: move to svrx-util
exports.spawn = (cmd, args, opts) => {
  const shell = opts.shell || process.platform === 'win32';
  return new Promise((res, rej) => {
    const child = cp.spawn(cmd, args, { ...opts, shell });
    let stdout = '';
    let stderr = '';
    if (child.stdout) {
      child.stdout.on('data', (d) => {
        stdout += d;
      });
    }
    if (child.stderr) {
      child.stderr.on('data', (d) => {
        stderr += d;
      });
    }
    child.on('error', rej);
    child.on('close', (code) => {
      if (code) {
        rej(stderr);
      } else {
        res(stdout);
      }
    });
  });
};
