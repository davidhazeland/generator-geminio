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

    this.fs.copyTpl(this.templatePath('component.js'),
    this.destinationPath(`${businessPath}/components/${component}.js`), {
      componentName: componentName
    });

    // attachRoute(`${businessPath}/index.js`, component);
  }
});

function attachRoute(path, component) {
  let tree = utils.read(path);

  const importSaga = utils.createImport('component', `./containers/${component}`);
  const componentProperty = utils.createProperty('component');

  tree.body.unshift(importSaga);
  walk(tree, function(node) {
    console.log(node);
    // const isDeclaration = node.type === 'VariableDeclaration' &&
    // node.declarations[0].id.name === 'sagasList';
    //
    // if (isDeclaration) {
    //   node.declarations[0].init.elements.unshift(saga);
    // }
  });

  utils.write(path, tree);
}
