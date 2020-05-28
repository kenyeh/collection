import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import '../lang';
import App from '../App';

afterEach(cleanup);

describe('test App', () => {
  it('App render', () => {
    const {
      container,
    } = render(<App />);

    expect(container).toBeVisible();
  });
});
