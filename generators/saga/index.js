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
    const items = this.name.split('/');
    const length = items.length;

    const saga = items[length - 1];
    const module = items[length - 2];
    const moduleFolder = items.slice(0, length - 1).join('/');

    const sagasPath = `src/business/${moduleFolder}/sagas`;

    // Copy saga template
    const sagaName = utils.getCapitalizeName(saga);
    const action = utils.getCamelCaseName(saga);
    const actionType = (sagaName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const moduleName = utils.getCapitalizeName(module);

    this.fs.copyTpl(this.templatePath('saga.js'), this.destinationPath(`${sagasPath}/${saga}.js`), {action: action});

    this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath(`${sagasPath}/__tests__/${saga}.js`), {
      saga: saga,
      sagaName: sagaName,
      moduleFolder: moduleFolder,
      moduleName: moduleName,
      action: action,
      actionType: actionType
    });

    attach(`${sagasPath}/index.js`, `./${saga}`, sagaName);
  }
});

function attach(sagasPath, sagaPath, sagaName) {
  let tree = utils.read(sagasPath);

  const importProperty = utils.createImport(sagaName, sagaPath);
  const property = utils.createProperty(sagaName);

  tree.body.unshift(importProperty);
  walk(tree, function(node) {
    const isExportExpression = node.type === 'ExpressionStatement' && node.expression.left.object.name === 'module' && node.expression.left.property.name === 'exports';

    if (isExportExpression) {
      node.expression.right.properties.unshift(property);
    }
  });

  utils.write(sagasPath, tree);
}
