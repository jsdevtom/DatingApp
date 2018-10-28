import { Component } from '@angular/core';

/* tslint:disable:class-name */

/**
 * Examples:
 * MockComponent({ selector: 'cranium' });
 * MockComponent({ selector: 'arm', inputs: ['side'] });
 */
export function MockComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs,
  };
  // @ts-ignore
  return Component(metadata)(class _ {});
}

/* tslint:enable:class-name */
