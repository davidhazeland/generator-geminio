'use strict';
let generator = require('yeoman-generator');
// let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', {
      type: String,
      required: true
    });
  },

  writing: function() {
    const modulePath = `src/modules/${this.name}`;
    const moduleTestPath = `test/modules/${this.name}`;

    const items = this.name.split('/');
    const length = items.length;

    const module = items[length - 1];

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${modulePath}/index.js`));

    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`${modulePath}/reducer.js`));

    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath(`${modulePath}/actions.js`));

    this.fs.copyTpl(
      this.templatePath('action-types.js'),
      this.destinationPath(`${modulePath}/action-types.js`));

    this.fs.copyTpl(
      this.templatePath('sagas.js'),
      this.destinationPath(`${modulePath}/sagas/index.js`));

    // test
    const moduleName = utils.getCapitalizeName(module);
    this.fs.copyTpl(
      this.templatePath('reducer-test.js'),
      this.destinationPath(`${moduleTestPath}/reducer-test.js`), {
        moduleName: moduleName,
        module: this.name
      });
  }
});
