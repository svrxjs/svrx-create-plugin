/* eslint-disable class-methods-use-this */
const { resolve } = require('path');
const { mkdirSync } = require('fs-extra');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');

const Editor = require('./Editor');
const {
  spawn,
  getPluginName,
  getPackageName,
  getEngineVersion,
} = require('./utils');

class Generator extends Editor {
  constructor({ root, questions }) {
    super(root);
    this.questions = questions;
  }

  async run() {
    await this.prompt();
    await this.write();
    await this.install();
    await this.end();
  }

  async prompt() {
    this.answers = await inquirer.prompt(this.questions);
    const { projectName } = this.answers;
    const workDir = resolve(process.cwd(), projectName);
    mkdirSync(workDir);
    process.chdir(workDir);
  }

  async write() {
    const answers = {
      ...this.answers,
      engineVersion: await getEngineVersion(),
      pluginName: getPluginName(this.answers.projectName, this.answers.scopeName),
      packageName: getPackageName(this.answers.projectName, this.answers.scopeName),
    };
    await this.copyFiles(
      this.templatePath(),
      this.destinationPath(),
    );
    await this.copyFile(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      answers,
    );
    await this.copyFile(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      answers,
    );
    await this.copyFile(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      answers,
    );
    await this.copyFile(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
    );
    await this.copyFile(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      answers,
    );
    await this.deleteFile(this.destinationPath('_package.json'));
    await this.deleteFile(this.destinationPath('_gitignore'));
    if (answers.pluginType === 'server') {
      await this.deleteFile(this.destinationPath('client.js'));
    }
  }

  async install() {
    await spawn('git', ['init']);
    const spinner = ora('Install packages...').start();
    await spawn('npm', ['install']);
    spinner.stop();
  }

  async end() {
    const { projectName } = this.answers;
    console.log('\n');
    console.log(chalk.green(
      'Congratulations! Go to',
      chalk.white.bgGreen(projectName),
      'and rock!',
    ));
  }
}

module.exports = Generator;
