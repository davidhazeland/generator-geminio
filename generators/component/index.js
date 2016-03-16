'use strict';
let generator = require('yeoman-generator');
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
    const items = this.name.split('/');
    const component = items[1];
    const module = items[0];

    const componentCapitalizeName = utils.getCapitalizeName(component);
    const moduleCapitalizeName = utils.getCapitalizeName(module, ' ');

    const componentsPath = `src/routes/${module}/components`;
    const componentsTestPath = `test/routes/${module}/components`;

    // Copy component template
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`${componentsPath}/${component}.js`), {
        name: componentCapitalizeName
      });

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(`${componentsTestPath}/${component}-test.js`), {
        component: component,
        componentName: componentCapitalizeName,
        module: module,
        moduleName: moduleCapitalizeName
      });
  }
});
