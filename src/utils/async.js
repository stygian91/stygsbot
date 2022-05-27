/**
 * External dependencies:
 */
const F = require('funky-lib');

const promiseToEither = (func) => (...args) => F.toAsyncEither(func, args);

module.exports = {
  promiseToEither,
};
