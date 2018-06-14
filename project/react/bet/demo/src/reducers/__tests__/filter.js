import reducer from '../filter';

describe("filter test case", () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      volume: true,
    })
  })

  it('should handle SWITCH_VOLUME', () => {
    expect(reducer({}, {
      type: 'SWITCH_VOLUME',
      volume: false
    })).toEqual({
      volume: false
    })
    expect(reducer({}, {
      type: 'SWITCH_VOLUME',
      volume: true
    })).toEqual({
      volume: true
    })
  });
  
});
