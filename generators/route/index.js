'use strict';
let generator = require('yeoman-generator');
let walk = require('esprima-walk');
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

    const route = items[length - 1];

    const routePath = `src/routes/${this.name}`;
    const routeTestPath = `test/routes/${this.name}`;

    const container = route;
    const containerName = utils.getCapitalizeName(container);

    this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath(`${routePath}/index.js`), {
      container: container,
      containerName: containerName
    });

    const component = container;
    const componentName = utils.getCapitalizeName(component);
    const title = utils.getCapitalizeName(route, ' ');

    this.fs.copyTpl(this.templatePath('container.js'),
    this.destinationPath(`${routePath}/containers/${container}.js`), {
      containerName: containerName,
      component: component,
      componentName: componentName,
      title: title,
      module: this.name
    });

    this.fs.copyTpl(this.templatePath('component.js'),
    this.destinationPath(`${routePath}/components/${component}.js`), {
      componentName: componentName
    });

    const routeName = utils.getCapitalizeName(route, ' ');
    this.fs.copyTpl(this.templatePath('component-test.js'),
    this.destinationPath(`${routeTestPath}/components/${component}-test.js`), {
      component: component,
      componentName: componentName,
      routeName: routeName,
      routeFolder: this.name
    });

  }
});
