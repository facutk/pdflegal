'use strict';

const apiEnvironments = require('./api-environments.json');

module.exports = () => {
  return apiEnvironments[process.env.NODE_ENV] || apiEnvironments.default;
}
