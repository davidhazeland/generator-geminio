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

    const saga = items[length - 1];
    const module = items[length - 2];
    const moduleFolder = items.slice(0, length - 1).join('/');

    const sagasPath = `src/modules/${moduleFolder}/sagas`;
    const sagasTestPath = `test/modules/${moduleFolder}/sagas`;

    // Copy saga template
    const sagaName = utils.getCapitalizeName(saga);
    const actionType = (sagaName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    this.fs.copyTpl(
      this.templatePath('saga.js'),
      this.destinationPath(`${sagasPath}/${saga}.js`), {
        actionType: actionType
      });

    const action = utils.getCamelCaseName(saga);
    const moduleName = utils.getCapitalizeName(module);
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(`${sagasTestPath}/${saga}-test.js`), {
        saga: saga,
        sagaName: sagaName,
        moduleFolder: moduleFolder,
        moduleName: moduleName,
        action: action,
        actionType: actionType
      });
  }
});
