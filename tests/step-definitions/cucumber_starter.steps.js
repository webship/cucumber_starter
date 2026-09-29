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
 * Log in as a named test user defined in cucumber.js worldParameters.users.
 *
 * The Webmaster row is the account of the site install. Every other row is
 * provisioned by `Given I add testing users` (see below).
 *
 * Example #1: Given I am a logged in user with the "Webmaster" user
 * Example #2: Given I am a logged in user with the "Admin" user
 * Example #3: Given I am a logged in user with the "Authenticated user" user
 * Example #4: Given I am a logged in user with the username "Admin" user
 * Example #5: Given I am a logged in user with "Webmaster"
 */
Given(
  /^I am a logged in user with( the)*( username)* "([^"]*)?"( user)?$/,
  // eslint-disable-next-line no-unused-vars
  async function (theCase, usernameCase, key, userCase) {
    const users = this.parameters.users || {};
    if (!(key in users)) {
      throw new Error(
        `No user named "${key}" in cucumber.js worldParameters.users`,
      );
    }
    const { username, password } = users[key];
    await this.context.clearCookies();
    await this.page.goto(`${this.parameters.launchUrl}/user/login`);
    await this.page.locator('#edit-name').fill(username);
    await this.page.locator('#edit-pass').fill(password);
    await this.page.locator('input[value="Log in"]').click();
    await this.page.waitForLoadState('networkidle');
  },
);

/**
 * Provision every non-admin user from cucumber.js worldParameters.users via
 * the form at /admin/people/create. A second run reports that the name is
 * taken, and the step goes on.
 *
 * Example #1: Given I add testing users
 * Example #2: And I add testing users
 * Example #3: When I add testing users
 * Example #4: Given I add the testing users
 * Example #5: And we add testing users
 */
// eslint-disable-next-line no-unused-vars
Given(/^(?:I |we )?add( the)? testing users$/, async function (theCase) {
  const users = this.parameters.users || {};
  for (const info of Object.values(users)) {
    if (info.isAdmin) continue;
    await this.page.goto(`${this.parameters.launchUrl}/admin/people/create`);
    await this.page.locator('#edit-name').fill(info.username);
    await this.page.locator('#edit-mail').fill(info.email);
    await this.page.locator('#edit-pass-pass1').fill(info.password);
    await this.page.locator('#edit-pass-pass2').fill(info.password);
    for (const role of info.roles || []) {
      const cb = this.page.locator(`input[name="roles[${role}]"]`);
      if ((await cb.count()) > 0) await cb.check();
    }
    await this.page.locator('#edit-submit').click();
    await this.page.waitForLoadState('networkidle');
  }
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
