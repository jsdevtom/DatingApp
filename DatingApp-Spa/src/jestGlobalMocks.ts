import {del} from 'selenium-webdriver/http';

global['CSS'] = null;

const mock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {})
  };
};

class LocalStorageMock {

  clear() {
    Object.keys(this).forEach(key => delete this[key]);
  }

  getItem(key) {
    return this[key] || null;
  }

  setItem(key, value) {
    this[key] = value.toString();
  }

  removeItem(key) {
    delete this[key];
  }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
