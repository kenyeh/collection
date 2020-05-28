import React, { Suspense } from 'react';
import {
  render, cleanup, waitForElement,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../../lang';
import Header from '../../../components/Header';

afterEach(cleanup);

describe('test Header', () => {
  it('change Language', async () => {
    const { getByText, getAllByRole } = render(
      <Suspense fallback={null}>
        <Header />
      </Suspense>,
    );

    const headerTitle = await waitForElement(() => getByText('Admin'));

    expect(headerTitle).toBeVisible();

    const langOption = getAllByRole('listbox')[0].querySelector('.menu').children[1];
    userEvent.click(langOption);

    expect(headerTitle).toHaveTextContent('後台');
  });
});
