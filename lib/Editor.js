/* eslint-disable class-methods-use-this */
const { resolve } = require('path');
const {
  readFile,
  ensureFile,
  writeFile,
  ensureDir,
  copy,
  remove,
} = require('fs-extra');
const { render } = require('ejs');

class Editor {
  constructor(root) {
    this.sourceRoot = root;
  }

  templatePath(...args) {
    if (args && args.length > 0) {
      return resolve(this.sourceRoot, 'template', ...args);
    }
    return resolve(this.sourceRoot, 'template');
  }

  destinationPath(...args) {
    if (args && args.length > 0) {
      return resolve(process.cwd(), ...args);
    }
    return resolve(process.cwd());
  }

  sourcePath(...args) {
    if (args && args.length > 0) {
      return resolve(this.sourceRoot, ...args);
    }
    return resolve(this.sourceRoot);
  }

  async copyFile(src, dest, data) {
    let fileStr = await readFile(src, 'utf8');
    if (data) {
      fileStr = render(fileStr, data);
    }
    await ensureFile(dest);
    await writeFile(dest, fileStr, 'utf8');
  }

  async copyFiles(src, dest) {
    await ensureDir(dest);
    await copy(src, dest);
  }

  async deleteFile(src) {
    await remove(src);
  }
}

module.exports = Editor;
