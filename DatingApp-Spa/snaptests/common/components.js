module.exports.bindComponents = function(browser) {

  browser.components = {};

  browser.components.clearLocalStorage = function() {
    return browser
  };

  browser.components.logout = function(baseUrl) {
    return browser
      .click(`[e2e-id='header-user-icon']`, `CSS`, `Click element`)
      .click(`[e2e-id='header-logout-button']`, `CSS`, `Click element`)
  };

  browser.components.login = function(baseUrl) {
    return browser
      .components.clearLocalStorage()
      .url(`${baseUrl}/`, 981, 950, `Load page... "${baseUrl}/"`)
      .click(`Sign in`, `TEXT`, `Click element`)
      .pathIs(`/login`, `Path is... "/login"`)
      .click(`[e2e-id='user-auth-form-username-input']`, `CSS`, `Click element`)
      .changeInput(`[e2e-id='user-auth-form-username-input']`, `CSS`, `John`, `Change input to... "John"`)
      .changeInput(`[e2e-id='user-auth-form-password-input']`, `CSS`, `password`, `Change input to... "password"`)
      .click(`[e2e-id='user-auth-form-submit-button']`, `CSS`, `Click element`)
      .pathIs(`/`, `Path is... "/"`)
  };


}