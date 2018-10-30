import {
  AuthActionTypes,
  ActionAuthLogin,
  ActionAuthLogout
} from './auth.actions';

describe('Auth Actions', () => {
  it('should create ActionAuthLogin action', () => {
    const action = new ActionAuthLogin({username: 'bob', password: 'hi'});
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });

  it('should create ActionAuthLogout action', () => {
    const action = new ActionAuthLogout();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });
});
