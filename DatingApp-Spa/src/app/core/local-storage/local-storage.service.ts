import { Injectable } from '@angular/core';

const APP_PREFIX = 'dtapp-';

@Injectable()
export class LocalStorageService {
  constructor() {}

  static loadInitialState(): any {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map(
                (token, index) =>
                  index === 0
                    ? token
                    : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  setItem(key: string, value: any): void {
    try {
      const stringified = JSON.stringify(value);
      localStorage.setItem(this.getAppKey(key), stringified);
    } catch (error) {
      console.error('could not stringify' + value, error);
    }

  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(this.getAppKey(key)));
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getAppKey(key));
  }

  private getAppKey(key: string): string {
    return `${APP_PREFIX}${key}`;
  }
}
