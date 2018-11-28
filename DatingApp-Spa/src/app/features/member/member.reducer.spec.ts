import { memberReducer, initialMemberState } from './member.reducer';

describe('Member Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = memberReducer(initialMemberState, action);

      expect(result).toBe(initialMemberState);
    });
  });
});
