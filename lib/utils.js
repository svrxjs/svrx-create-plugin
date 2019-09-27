const cp = require('child_process');
const { paramCase } = require('change-case');

const isSvrxPlugin = (name) => /^svrx-plugin-/.test(name);
exports.isSvrxPlugin = isSvrxPlugin;

exports.getPluginName = (name, scope) => {
  let pluginName = name.substr(12);
  if (scope) {
    pluginName = `${scope}/${pluginName}`;
  }
  return pluginName;
};

exports.getPackageName = (name, scope) => {
  if (scope) {
    return `${scope}/${name}`;
  }
  return name;
};

exports.correctFullName = (name) => {
  if (isSvrxPlugin(name)) return paramCase(name);
  return `svrx-plugin-${paramCase(name)}`;
};

exports.spawn = (cmd, args, opts = {}) => {
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

exports.getAuthor = () => {
  try {
    const name = cp.execSync('git config --get user.name');
    const email = cp.execSync('git config --get user.email');
    return `${name.toString().trim()} <${email.toString().trim()}>`;
  } catch (err) {
    return 'svrx';
  }
};
