const { resolve } = require('path');
const { existsSync } = require('fs-extra');

const Generator = require('./Generator');
const {
  isSvrxPlugin,
  correctName,
  correctFullName,
  getAuthor,
} = require('./utils');

module.exports = (name) => {
  const fullname = correctName(name);

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'The project name:',
      default: fullname || 'svrx-plugin-<name>',
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
    {
      type: 'confirm',
      name: 'withScope',
      message: 'Publish npm package with scope?',
      default: false,
    },
    {
      type: 'input',
      name: 'scopeName',
      message: 'The npm scope:',
      default: '@svrx',
      when({ withScope }) {
        return withScope;
      },
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
  ];

  new Generator({
    root: resolve(__dirname, '..'),
    questions,
  }).run();
};
