'use strict';
let generator = require('yeoman-generator');
let path = require('path');
let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.Base.extend({
  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {
    // Copy component template
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`src/modules/reducers/${this.name}.js`));

    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(`test/modules/reducers/${this.name}.js`));


    const reducerName = utils.getCamelCaseName(this.name);
    const reducerTestName = utils.getCapitalizeName(this.name);
    attach('src/modules/reducers/index.js', `./${this.name}`, reducerName);
    attach('test/modules/reducers/index.js', `./${this.name}`, `test${reducerTestName}`);
  }
});


function attach(reducersPath, reducerPath, reducerName) {
  let tree = utils.read(reducersPath);

  const importProperty = utils.createImport(reducerName, reducerPath);
  const property = utils.createProperty(reducerName);

  tree.body.unshift(importProperty);
  walk(tree, function(node) {
    const isExportExpression = node.type === 'ExpressionStatement' && node.expression.left.object.name === 'module' && node.expression.left.property.name === 'exports';

    if (isExportExpression) {
      node.expression.right.properties.unshift(property);
    }
  });

  utils.write(reducersPath, tree);
}
