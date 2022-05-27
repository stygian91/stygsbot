/**
 * External dependencies:
 */
const keytar = require("keytar");
const F = require('funky-lib');

/**
 * Internal dependencies:
 */
const packageConfig = require("../../package.json");
const { promiseToEither } = require("../utils/async");

const getToken = promiseToEither((username) =>
  keytar.getPassword(packageConfig.name, username)
);

const setToken = promiseToEither((username, token) =>
  keytar.setPassword(packageConfig.name, username, token)
);

module.exports = {
  getToken,
  setToken,
};
