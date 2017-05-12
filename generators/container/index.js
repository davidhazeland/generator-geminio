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
    // Copy action template
    const items = this.name.split('/');
    const length = items.length;

    const business = items[length - 1];

    const businessPath = `src/business/${this.name}`;

    const container = business;
    const containerName = utils.getCapitalizeName(container);

    const component = container;
    const componentName = utils.getCapitalizeName(component);
    const title = utils.getCapitalizeName(business, ' ');

    this.fs.copyTpl(this.templatePath('container.js'),
    this.destinationPath(`${businessPath}/containers/${container}.js`), {
      containerName: containerName,
      component: component,
      componentName: componentName,
      title: title,
      module: this.name
    });
  }
});
