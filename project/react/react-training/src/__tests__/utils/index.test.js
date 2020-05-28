import { deepClone } from '../../utils';

describe('test deepClone', () => {
  it('source is not object', () => {
    const testFn = jest.fn();
    expect(() => {
      deepClone(testFn);
    }).toThrow();
    expect(deepClone).toThrow(Error);
  });

  it('input an array', () => {
    const testArray = ['a', 'b'];
    expect(deepClone(testArray)).toEqual(testArray);
  });

  it('loop itself', () => {
    const testObj = {
      test: {
        test: '',
      },
    };
    expect(deepClone(testObj)).toEqual(testObj);
  });
});
