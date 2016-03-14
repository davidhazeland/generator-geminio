'use strict';
let generator = require('yeoman-generator');
// let walk = require('esprima-walk');
// let utils = require('../app/utils');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', {
      type: String,
      required: true
    });
  },

  writing: function() {
    // const appPath = this.destinationPath('src/containers/App.js');
    // const destination = utils.getDestinationPath(this.name, 'actions', 'js');
    // const baseName = utils.getBaseName(this.name);
    // const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    // const relativePath = utils.getRelativePath(this.name, 'actions', 'js');

    // Copy action template
    const modulePath = `src/modules/${this.name}`;
    const testPath = `test/modules/${this.name}`;

    const capitalizeName = this.name.split('-').map(n => capitalizeFirstLetter(n)).join(' ');

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
    this.fs.copyTpl(
      this.templatePath('reducer-test.js'),
      this.destinationPath(`${testPath}/reducer-test.js`), {
        moduleName: this.name,
        name: capitalizeName
      });
  }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
