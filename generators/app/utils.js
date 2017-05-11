'use strict';
const fs = require('fs');
const path = require('path');

/* For regular JS files */
//const esprima = require('esprima');
//const escodegen = require('escodegen');

/* For files with JSX syntax */
const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

const read = function(path) {
  const data = fs.readFileSync(path, 'utf8');
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };

  return esprimaFb.parse(data, options);
};

const write = function(path, tree) {
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = { comment: true, format: { indent: { style: '  ' } } };
  const code = escodegenJsx.generate(tree, options) + '\n';
  fs.writeFileSync(path, code, 'utf8');
};

const getDestinationPath = function(name, type, suffix) {
  const prefix = path.join('src', type, name);
  const portablePrefix = path.sep === '/' ? prefix : prefix.split(path.sep).join('/');
  return [portablePrefix, suffix].join('.');
};

const getRelativePath = function(name, type, suffix) {
  const filePath = path.join('..', type, name);
  const portableFilePath = path.sep === '/' ? filePath : filePath.split(path.sep).join('/');
  return [portableFilePath, suffix].join('.');
};

const getBaseName = function(path) {
  const items = path.split('/');
  return items[items.length - 1];
}

// Custom
const getCapitalizeName = function(name, split) {
  if (!split) split = '';
  return name.split('-').map(n => capitalizeFirstLetter(n)).join(split);
}

const getCamelCaseName = function(name) {
  return camelize(getCapitalizeName(name));
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function createProperty(name, key) {
  return {
    'type': 'Property',
    'key': {
      'type': 'Identifier',
      'name': key || name
    },
    'computed': key ? true : false,
    'value': {
      'type': 'Identifier',
      'name': name
    },
    'kind': 'init',
    'method': false,
    'shorthand': key ? false : true
  };
}


function createImport(name, path, alias) {
  const specifier = alias ? {
    'type': 'ImportSpecifier',
    'id': {
        'type': 'Identifier',
        'name': alias
    },
    'name': {
        'type': 'Identifier',
        'name': name
    }
  } : {
    'type': 'ImportDefaultSpecifier',
    'id': {
      'type': 'Identifier',
      'name': name
    }
  };

  return {
    'type': 'ImportDeclaration',
    'specifiers': [
      specifier
    ],
    'source': {
      'type': 'Literal',
      'value': path
    },
    'importKind': 'value'
  }
}

function createImportWithAlias(name, path, alias, aliasName) {
  const main = {
    'type': 'ImportDefaultSpecifier',
    'id': {
      'type': 'Identifier',
      'name': name
    }
  };
  const aliases = {
    'type': 'ImportSpecifier',
    'id': {
        'type': 'Identifier',
        'name': alias
    },
    'name': {
        'type': 'Identifier',
        'name': aliasName
    }
  }

  return {
    'type': 'ImportDeclaration',
    'specifiers': [
      main,
      aliases
    ],
    'source': {
      'type': 'Literal',
      'value': path
    },
    'importKind': 'value'
  }
}

module.exports = {
  read: read,
  write: write,
  getDestinationPath: getDestinationPath,
  getBaseName: getBaseName,
  getRelativePath: getRelativePath,
  getCapitalizeName: getCapitalizeName,
  getCamelCaseName: getCamelCaseName,
  createImport,
  createProperty,
  createImportWithAlias
}
