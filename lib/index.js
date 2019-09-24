const { resolve } = require('path');
const { existsSync } = require('fs-extra');

const Generator = require('./Generator');
const {
  isSvrxPlugin,
  correctFullName,
  getAuthor,
} = require('./utils');

module.exports = (argv) => {
  const { scope } = argv;

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'The project name:',
      default: 'svrx-plugin-<name>',
      filter: (input) => correctFullName(input),
      validate(input) {
        if (!isSvrxPlugin(input)) {
          return 'The project name should be: svrx-plugin-<name>';
        }
        const fullPath = resolve(process.cwd(), input);
        if (existsSync(fullPath)) return 'The project exists!';
        return true;
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'The description:',
      default({ projectName }) {
        return `The svrx plugin for ${projectName.substr(12)}`;
      },
    },
    scope && {
      type: 'input',
      name: 'scopeName',
      message: 'The npm scope:',
      default: scope.startsWith('@') ? scope : `@${scope}`,
      validate(input) {
        if (!input || !input.startsWith('@')) {
          return 'The scope should start with @';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'The npm package name:',
      default({ projectName, scopeName }) {
        if (!scopeName) return projectName;
        if (scopeName === '@svrx') {
          return `${scopeName}/plugin-${projectName.substr(12)}`;
        }
        return `${scopeName}/${projectName}`;
      },
      validate(input) {
        if (input) return true;
        return 'Please input package name!';
      },
    },
    {
      type: 'input',
      name: 'author',
      message: 'The author:',
      default: getAuthor(),
    },
    {
      type: 'list',
      name: 'pluginType',
      message: 'The type of plugin:',
      choices: [
        { name: 'Browser', value: 'browser' },
        { name: 'Server', value: 'server' },
        { name: 'Browser and Server', value: 'browser_server' },
      ],
      default: 'browser',
    },
  ].filter(Boolean);

  new Generator({
    root: resolve(__dirname, '..'),
    questions,
  }).run();
};
