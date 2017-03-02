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
    const route = items[length - 2];
    const routeFolder = items.slice(0, length - 1).join('/');

    const routePath = `src/routes/${routeFolder}`;
    const routeTestPath = `test/routes/${routeFolder}`;

    const componentsPath = `${routePath}/components`;
    const componentsTestPath = `${routeTestPath}/components`;

    const componentName = utils.getCapitalizeName(component);

    // Copy component template
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`${componentsPath}/${component}.js`), {
        componentName: componentName
      });

  //   const routeName = utils.getCapitalizeName(route, ' ');
  //   this.fs.copyTpl(
  //     this.templatePath('test.js'),
  //     this.destinationPath(`${componentsTestPath}/${component}-test.js`), {
  //       component: component,
  //       componentName: componentName,
  //       routeName: routeName,
  //       routeFolder: routeFolder
  //     });
  }
});
