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
    const name = items[1];
    const module = items[0];

    const sagasPath = `src/modules/${module}/sagas`;
    const sagasTestPath = `test/modules/${module}/sagas`;

    // Copy saga template
    this.fs.copyTpl(
      this.templatePath('saga.js'),
      this.destinationPath(`${sagasPath}/${name}.js`));

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(`${sagasTestPath}/${name}-test.js`));
  }
});
