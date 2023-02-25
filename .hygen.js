const changeCase = require('change-case');

module.exports = {
  helpers: {
    toPascalCase(text) {
      return changeCase.pascalCase(text);
    },
    createBaseClassName(level, name) {
      const atomicPrefix = `${level.slice(0, 1)}-`;
      return `${atomicPrefix}${name}`;
    }
  }
};
