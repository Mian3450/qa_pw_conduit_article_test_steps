import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitle('Test Title');
  await createArticlePage.fillDescription('Test Description');
  await createArticlePage.fillText('Test Article Text');
  await createArticlePage.fillTag(['Test Tag']);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleTitleIsVisible('Test Title');
});

test('Create an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article without description field', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitle('Test Title');
  await createArticlePage.fillText('Test Article Text');
  await createArticlePage.fillTag(['Test Tag']);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without text field', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitle('Test Title');
  await createArticlePage.fillDescription('Test Article Text');
  await createArticlePage.fillTag(['Test Tag']);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without tag field', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitle('Test Title');
  await createArticlePage.fillDescription('Test Description');
  await createArticlePage.fillText('Test Article Text');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleTitleIsVisible('Test Title');
});
