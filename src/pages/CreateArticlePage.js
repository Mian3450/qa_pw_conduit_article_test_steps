import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  /**
   * Open the 'Create Article' page
   * @returns {Promise<void>}
   */
  async open() {
    await test.step(`Open the 'Create Article' page`, async () => {
      await this.page.goto('/editor');
    });
  }

  /**
   * Fill the 'Title' field with the given title
   * @param {string} title - Title to fill
   * @returns {Promise<void>}
   */
  async fillTitle(title) {
    await test.step(`Fill the 'Title' field with '${title}'`, async () => {
      await this.titleField.fill(title);
    });
  }

  /**
   * Fill the 'Description' field with the given description
   * @param {string} description - Description to fill
   * @returns {Promise<void>}
   */
  async fillDescription(description) {
    await test.step(
      `Fill the 'Description' field with '${description}'`,
      async () => {
        await this.descriptionField.fill(description);
      },
    );
  }

  /**
   * Fill the 'Body' field with the given body
   * @param {string} body - Body to fill
   * @returns {Promise<void>}
   */
  async fillText(body) {
    await test.step(`Fill the 'Body' field with '${body}'`, async () => {
      await this.bodyField.fill(body);
    });
  }

  /**
   * Fill the 'Tag' field with the given tags
   * @param {string[]} tags - Array of tags to fill
   * @returns {Promise<void>}
   */
  async fillTag(tags) {
    await test.step(`Fill the 'Tag' field with '${tags}'`, async () => {
      for (const tag of tags) {
        await this.tagField.fill(tag);
        await this.tagField.press('Enter');
      }
    });
  }

  /**
   * Click the 'Publish Article' button
   * @returns {Promise<void>}
   */
  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  /**
   * Assert the error message contains the given text
   * @param {string} messageText - Text to assert
   * @returns {Promise<void>}
   */
  /**
   * Assert the article title is visible on the article page
   * @param {string} title - Expected article title
   * @returns {Promise<void>}
   */
  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article title '${title}' is visible`, async () => {
      await expect(this.page.getByRole('heading', { name: title, level: 1 })).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
