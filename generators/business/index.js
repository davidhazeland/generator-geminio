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
    const modulePath = `src/businesses/${this.name}`;
    const moduleTestPath = `test/businesses/${this.name}`;

    const items = this.name.split('/');
    const length = items.length;

    const module = items[length - 1];

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
      this.destinationPath(`${modulePath}/action-types.js`), {
        module: module
      });

    this.fs.copyTpl(
      this.templatePath('sagas.js'),
      this.destinationPath(`${modulePath}/sagas/index.js`));

    const moduleName = utils.getCapitalizeName(module);

    // test
    // this.fs.copyTpl(
    //   this.templatePath('reducer-test.js'),
    //   this.destinationPath(`${moduleTestPath}/reducer-test.js`), {
    //     moduleName: moduleName,
    //     module: this.name
    //   });

    attachSaga('src/sagas/index.js', `businesses/${this.name}`, moduleName);
    attachReducer('src/reducers/index.js', `businesses/${this.name}`, moduleName);
  }
});

function attachSaga(sagasPath, sagaPath, sagaName) {
  let tree = utils.read(sagasPath);

  const importSaga = utils.createImport(sagaName, sagaPath, 'sagas');
  const saga = {
      'type': 'Identifier',
      'name': sagaName
  };

  tree.body.unshift(importSaga);
  walk(tree, function(node) {
    const isDeclaration = node.type === 'VariableDeclaration' &&
    node.declarations[0].id.name === 'sagasList';

    if (isDeclaration) {
      node.declarations[0].init.elements.unshift(saga);
    }
  });

  utils.write(sagasPath, tree);
}

function attachReducer(reducersPath, reducerPath, reducerName) {
  let tree = utils.read(reducersPath);

  const importSaga = utils.createImport(reducerName, reducerPath);
  const reducer = utils.createProperty(reducerName);

  tree.body.unshift(importSaga);
  walk(tree, function(node) {
    const isDeclaration = node.type === 'VariableDeclaration' &&
    node.declarations[0].id.name === 'reducers';

    if (isDeclaration) {
      node.declarations[0].init.properties.unshift(reducer);
    }
  });

  utils.write(reducersPath, tree);
}
