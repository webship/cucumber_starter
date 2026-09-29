module.exports = {
  default: {
    timeout: 45000,
    requireModule: ['tsx/cjs'],
    require: [
      'node_modules/webship-js/tests/step-definitions/**/*.js',
      'tests/step-definitions/**/*.js',
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
      '@cucumber/pretty-formatter',
      'json:tests/reports/cucumber_report.json',
    ],
    formatOptions: {
      colorsEnabled: true,
      theme: {
        'feature keyword': ['bold', 'blue'],
        'feature name': ['blue', 'underline'],
        'feature description': ['blueBright'],
        'scenario keyword': ['bold', 'magenta'],
        'scenario name': ['magenta', 'underline'],
        'step keyword': ['bold', 'green'],
        'step text': ['greenBright', 'italic'],
      },
    },
    worldParameters: {
      launchUrl: process.env.LAUNCH_URL || 'http://localhost',
      minWaitTime: {
        page: 3000,
        before_scenario: 0,
        after_scenario: 0,
        before_step: 0,
        after_step: 0,
      },
      assets_folder: "/assets/",
      // Test users used by the suite.
      //
      // Webmaster is the account of the site install (`drush site:install
      // ../recipes/cucumber_starter --account-name=webmaster
      // --account-pass=dD.123123ddd`). The rest are provisioned by `Given I
      // add testing users` (see tests/step-definitions), which skips the
      // entries flagged `isAdmin: true`.
      users: {
        Webmaster: {
          username: 'webmaster',
          email: 'webmaster@example.test',
          password: 'dD.123123ddd',
          isAdmin: true,
        },
        Admin: {
          username: 'admin_user',
          email: 'admin_user@example.test',
          password: 'dD.123123ddd',
          roles: ['admin'],
        },
        'Authenticated user': {
          username: 'authenticated_user',
          email: 'authenticated_user@example.test',
          password: 'dD.123123ddd',
          roles: [],
        },
      }
    },
  },
};
