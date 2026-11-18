/**
 * @file
 * Step definitions for the Cucumber Starter site template.
 *
 * The generic steps come from webship-js and the Drupal step packs (the login
 * by handle, access checks, content); keep this file for the steps that only
 * make sense for this site template.
 */

const { When } = require('@cucumber/cucumber');

/**
 * Set the content of the Ace editor that replaced a textarea, then wait until
 * the Ace Editor module has written it back to that textarea (it does so on
 * the editor's change event, debounced), so the form submits the new script.
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
  // The editor's container is "<textarea id>-ace-editor".
  await this.page.waitForFunction(
    () => {
      const editor = document.querySelector('.ace_editor');
      const textarea =
        editor && editor.id
          ? document.getElementById(editor.id.replace(/-ace-editor$/, ''))
          : null;
      return (
        !!textarea &&
        textarea.value === window.ace.edit(editor).session.getValue()
      );
    },
    null,
    { timeout: 15000 },
  );
});
