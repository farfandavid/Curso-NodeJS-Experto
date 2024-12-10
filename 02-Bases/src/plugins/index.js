const { getBirthdate } = require("./get-birthdate.plugin");
const { getID } = require("./get-id.plugin");
const httpClientPlugin = require("./http-client.plugin");
const buildLogger = require("./logger.plugin");

module.exports = {
  getID,
  getBirthdate,
  httpClientPlugin,
  buildLogger

}