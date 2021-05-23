'use strict';
const importProductFile = require("./handlers/importProductsFile");
const importFileParser = require("./handlers/importFileParser");
const catalogBatchProcess = require("./handlers/catalogBatchProcess");

module.exports = {
  importProductFile,
  importFileParser,
  catalogBatchProcess
};
