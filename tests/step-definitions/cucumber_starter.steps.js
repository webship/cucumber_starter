/**
 * @file
 * Step definitions for the Cucumber Starter site template.
 *
 * The generic steps come from webship-js; keep this file for the steps that
 * only make sense for this site template.
 */

const path = require('path');
const { Before } = require('@cucumber/cucumber');

Before(function () {
  // Serve the attachments of this suite, not the webship-js defaults.
  this.assetsFolder = path.join(process.cwd(), 'tests', 'assets') + path.sep;
});
