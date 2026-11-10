/**
 * @file
 * Step definitions for the Cucumber Starter site template.
 *
 * The generic steps come from webship-js; keep this file for the steps that
 * only make sense for this site template.
 */

const path = require('path');
const { Before, Given, When } = require('@cucumber/cucumber');

Before(function () {
  // Serve the attachments of this suite, not the webship-js defaults.
  this.assetsFolder = path.join(process.cwd(), 'tests', 'assets') + path.sep;
});

/**
 * Set the content of the Ace editor that replaced a textarea, then wait for
 * the editor to write it back to the textarea.
 *
 * Example #1: When I fill in the Ace editor with:
 * Example #2: And I fill in the Ace editor with:
 * Example #3: When we fill in the Ace editor with:
 * Example #4: And we fill in the Ace editor with:
 * Example #5: When fill in the Ace editor with:
 */
When(/^(?:I |we )?fill in the Ace editor with:$/, async function (text) {
  await this.page.waitForFunction(
    () => window.ace && document.querySelector('.ace_editor'),
    null,
    { timeout: 15000 },
  );
  await this.page.evaluate((value) => {
    window.ace
      .edit(document.querySelector('.ace_editor'))
      .session.setValue(value);
  }, text);
  await this.page.waitForTimeout(700);
});
