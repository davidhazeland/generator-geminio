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
    // Copy action template
    const routePath = `src/routes/${this.name}`;
    const capitalizeName = this.name.split('-').map(n => capitalizeFirstLetter(n)).join('');

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${routePath}/index.js`), {
        containerName: capitalizeName,
        containerFileName: this.name
      });

    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(`${routePath}/containers/${this.name}.js`), {
        name: capitalizeName,
        componentFileName: this.name
      });

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`${routePath}/components/${this.name}.js`), {
        name: capitalizeName
      });
  }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
