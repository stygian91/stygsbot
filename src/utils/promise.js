/**
 * External dependencies:
 */
const F = require('funky-lib');

const promiseToEither =
  (func) =>
  (...args) =>
    func(...args)
      .then(F.Either.of)
      .catch((err) => new F.Left(err));

module.exports = {
  promiseToEither,
}
