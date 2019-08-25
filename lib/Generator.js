/* eslint-disable class-methods-use-this */
const inquirer = require('inquirer');
const { logger } = require('svrx-util');

const Editor = require('./Editor');
const { spawn } = require('./utils');

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
  }

  async write() {
    // TODO
  }

  async install() {
    const stopSpin = logger.spin('Install packages...');
    await spawn('npm', ['install'], { stdio: 'inherit' });
    stopSpin();
  }

  async end() {
    // TODO
  }
}

module.exports = Generator;
