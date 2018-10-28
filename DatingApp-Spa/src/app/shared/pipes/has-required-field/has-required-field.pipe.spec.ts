import { HasRequiredFieldPipe } from './has-required-field.pipe';

describe('HasRequiredFieldPipe', () => {
  it('create an instance', () => {
    const pipe = new HasRequiredFieldPipe();
    expect(pipe).toBeTruthy();
  });
});
