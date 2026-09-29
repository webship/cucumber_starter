# Cucumber Starter

The Cucumber site template: the [Cucumber](https://www.drupal.org/project/cucumber) Automated Functional
Acceptance Testing Management system as a recipe — features with their Gherkin scripts, components, products
and projects, the Cucumber user roles and the Cucumber dashboards.

Maintained by [Webship](https://www.drupal.org/webship). Built with [UI Suite](https://www.drupal.org/project/ui_suite)
and [Display Builder](https://www.drupal.org/project/display_builder) on top of Drupal, with
[HTMX](https://htmx.org). No Layout Builder displays and no Drupal Canvas.

## Install

With the [Cucumber](https://www.drupal.org/project/cucumber_project) project template and DDEV:

```shell
ddev config --project-type=drupal --docroot=web
ddev start
ddev composer create-project drupal/cucumber_project:~12.0
ddev restart
ddev drush site:install ../recipes/cucumber_starter --account-name=webmaster --account-pass=<password> --site-name="<site name>" -y
ddev launch
```

The project template places this site template in `recipes/cucumber_starter`.

On an installed site:

```shell
ddev composer require drupal/cucumber_starter
ddev drush recipe ../recipes/cucumber_starter
```

The site asks everybody to sign in: a visitor who is not signed in is sent to `/user/login`. The Admin role
writes features with their Gherkin scripts, moves them through the automated testing workflow and keeps the
products, the components and the projects. The other roles are switched on at
`/admin/config/development/cucumber-user-roles/settings`.

## What you get

- [Cucumber Core](https://www.drupal.org/project/cucumber_core): Feature media items with their Gherkin
  scripts, the Feature Directory vocabulary, the Features and Media views, the automated testing workflow,
  and the default and admin dashboards.
- [Cucumber Recipes](https://www.drupal.org/project/cucumber_recipes): the Components, Products and Projects
  content types, their displays and views, and their administration menu links.
- [Cucumber User Roles](https://www.drupal.org/project/cucumber_user_roles): the Cucumber roles — Super
  Admin, Admin, Product Owner, Coordinator, Designer, Developer, Tester and Analyst — each switched on from
  one settings form.
- [Cucumber Default Content](https://www.drupal.org/project/cucumber_default_content): the Features link in
  the administration menu.
- [Cucumber UI](https://www.drupal.org/project/cucumber_ui): the test screens, on Drupal core's HTMX.

The demo content is a separate download: [Cucumber Demos](https://www.drupal.org/project/cucumber_demos).

## Tests

Automated functional testing with [webship-js](https://www.npmjs.com/package/webship-js) (Playwright and
Cucumber-js):

```shell
yarn install
LAUNCH_URL=https://my-site.ddev.site yarn test
```
