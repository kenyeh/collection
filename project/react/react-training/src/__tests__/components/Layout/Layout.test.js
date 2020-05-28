import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import '../../../lang';
import Layout from '../../../components/Layout/Layout';

afterEach(cleanup);

describe('test Layout', () => {
  it('Layout render', () => {
    const {
      container,
    } = render(<Layout />);

    expect(container).toBeVisible();
  });
});
