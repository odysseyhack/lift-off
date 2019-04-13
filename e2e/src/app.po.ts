import { browser, by, element } from 'protractor';

export class AppPage {
  static navigateTo(destination) {
    return browser.get(destination);
  }

  static getTitle() {
    return browser.getTitle();
  }

  static getPageOneTitleText() {
    return element(by.tagName('app-home')).element(by.deepCss('ion-title')).getText();
  }
}
