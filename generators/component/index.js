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
    const length = items.length;

    const component = items[length - 1];
    const businessFolder = items.slice(0, length - 1).join('/');

    const businessPath = `src/business/${businessFolder}`;

    const componentsPath = `${businessPath}/components`;

    const componentName = utils.getCapitalizeName(component);

    // Copy component template
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`${componentsPath}/${component}.js`), {
        componentName: componentName
      });
  }
});
