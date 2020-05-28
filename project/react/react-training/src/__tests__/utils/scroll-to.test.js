import { cleanup } from '@testing-library/react';
import { scrollToBottom } from '../../utils/scroll-to';

afterEach(cleanup);
jest.useFakeTimers();

delete window.requestAnimationFrame;
delete window.mozRequestAnimationFrame;

it('scrollToBottom', () => {
  // const callFrame = jest.fn();
  const callback = jest.fn();
  // requestAnimFrame(callFrame);

  delete window.innerHeight;
  scrollToBottom(300, callback);
  jest.runAllTimers();

  // expect(callFrame).toHaveBeenCalled();
  expect(callback).toHaveBeenCalled();
});
