import React, { useReducer } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  render, cleanup, waitForElement, waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import '../../lang';
import * as userApi from '../../api/Users';
import Users, { useDataApi, modalFormReducer } from '../../components/Users';


afterEach(cleanup);

const fakeListData = [{
  id: 1, username: 'user1', enable: 0, locked: 1, created_at: '2020-04-19T11:11:23+00:00',
}, {
  id: 2, username: 'user2', enable: 1, locked: 0, created_at: '2020-04-19T20:40:48+00:00',
}, {
  id: 3, username: 'user3', enable: 1, locked: 1, created_at: '2020-04-21T12:40:43+00:00',
}, {
  id: 4, username: 'user4', enable: 0, locked: 0, created_at: '2020-04-18T23:53:27+00:00',
}, {
  id: 5, username: 'user5', enable: 0, locked: 0, created_at: '2020-04-25T05:37:41+00:00',
}, {
  id: 6, username: 'user6', enable: 1, locked: 0, created_at: '2020-04-26T13:31:04+00:00',
}, {
  id: 7, username: 'user7', enable: 1, locked: 1, created_at: '2020-04-25T06:38:46+00:00',
}, {
  id: 8, username: 'user8', enable: 1, locked: 1, created_at: '2020-04-15T00:24:06+00:00',
}, {
  id: 9, username: 'user9', enable: 1, locked: 0, created_at: '2020-04-08T01:34:59+00:00',
}, {
  id: 10, username: 'user10', enable: 1, locked: 1, created_at: '2020-04-26T14:24:25+00:00',
}, {
  id: 11, username: 'user11', enable: 1, locked: 0, created_at: '2020-04-12T20:06:25+00:00',
}, {
  id: 12, username: 'user12', enable: 1, locked: 0, created_at: '2020-04-21T00:09:01+00:00',
}, {
  id: 13, username: 'user13', enable: 0, locked: 0, created_at: '2020-04-16T07:16:34+00:00',
}, {
  id: 14, username: 'user14', enable: 0, locked: 0, created_at: '2020-04-22T22:46:08+00:00',
}, {
  id: 15, username: 'user15', enable: 1, locked: 0, created_at: '2020-04-13T00:35:16+00:00',
}, {
  id: 16, username: 'user16', enable: 0, locked: 1, created_at: '2020-04-12T03:18:53+00:00',
}, {
  id: 17, username: 'user17', enable: 0, locked: 0, created_at: '2020-04-15T23:12:01+00:00',
}, {
  id: 18, username: 'user18', enable: 0, locked: 0, created_at: '2020-04-19T06:36:58+00:00',
}, {
  id: 19, username: 'user19', enable: 0, locked: 0, created_at: '2020-04-16T19:54:12+00:00',
}, {
  id: 20, username: 'user20', enable: 1, locked: 0, created_at: '2020-04-09T14:48:40+00:00',
}];

const fakeResponse = {
  result: 'ok',
  ret: fakeListData,
  pagination: { first_result: 0, max_results: 20, total: 50 },
};
const fakeConfirmResponse = {
  result: 'ok',
  ret: {
    id: 52, username: 'userTest', enable: 0, locked: 0, created_at: '2020-04-29T01:30:17.010Z',
  },
};
it('useReducer switch-case default value', () => {
  const defaultFormData = {
    username: '',
    enable: 1,
    locked: 0,
  };
  const { result } = renderHook(() => useReducer(modalFormReducer, defaultFormData));
  const [, dispatch] = result.current;
  act(() => {
    dispatch({});
  });

  expect(result.error).toEqual(Error('unknown action'));
});
it('useDataApi performs GET request', async () => {
  jest.spyOn(userApi, 'fetchList').mockImplementation(() => Promise.resolve(fakeResponse));

  const { result, waitForNextUpdate } = renderHook(() => {
    const [{
      data, isLoading, pageData, params,
    }, doParams, doData] = useDataApi({}, []);

    return {
      data,
      isLoading,
      pageData,
      params,
      doParams,
      doData,
    };
  });

  expect(result.current.data).toEqual([]);
  expect(result.current.isLoading).toBeTruthy();

  await waitForNextUpdate();

  expect(result.current.data).toEqual(fakeListData);
  expect(result.current.isLoading).toBeFalsy();
});

describe('form modal', () => {
  it('add user', async () => {
    jest.useFakeTimers();
    jest.spyOn(userApi, 'fetchList').mockImplementation((url) => {
      let result = [...fakeListData];
      if (url.first_result) {
        result = [
          {
            id: 41, username: 'user41', enable: 0, locked: 1, created_at: '2020-04-22T09:15:24+00:00',
          },
          {
            id: 42, username: 'user42', enable: 1, locked: 0, created_at: '2020-04-26T04:43:00+00:00',
          },
          {
            id: 43, username: 'user43', enable: 1, locked: 0, created_at: '2020-04-19T21:55:39+00:00',
          },
          {
            id: 44, username: 'user44', enable: 1, locked: 1, created_at: '2020-04-29T09:23:06+00:00',
          },
          {
            id: 45, username: 'user45', enable: 0, locked: 1, created_at: '2020-04-25T13:24:49+00:00',
          },
          {
            id: 46, username: 'user46', enable: 1, locked: 1, created_at: '2020-05-06T04:59:13+00:00',
          },
          {
            id: 47, username: 'user47', enable: 1, locked: 0, created_at: '2020-04-18T21:01:32+00:00',
          },
          {
            id: 48, username: 'user48', enable: 0, locked: 0, created_at: '2020-04-28T18:50:32+00:00',
          },
          {
            id: 49, username: 'user49', enable: 0, locked: 1, created_at: '2020-04-24T06:02:07+00:00',
          },
          {
            id: 50, username: 'user50', enable: 0, locked: 1, created_at: '2020-04-21T23:08:04+00:00',
          },
          {
            id: 51, username: 'userTest', enable: 1, locked: 0, created_at: '2020-05-08T03:45:34.804Z',
          }];
      }
      return Promise.resolve({
        result: 'ok',
        ret: result,
        pagination: {
          first_result: url.first_result ? 40 : 0,
          max_results: 20,
          total: url.first_result ? 51 : 50,
        },
      });
    });
    const {
      getByTestId,
      queryByTestId,
      getAllByPlaceholderText,
      getAllByRole,
      getByText,
    } = render(<Users />);

    userEvent.click(getByText('Add New User'));

    const [
      openModal,
      formUserName,
      formEnable,
      formLocked,
    ] = await waitForElement(() => ([
      getByTestId('modal'),
      getAllByPlaceholderText('User Name')[1],
      getAllByRole('listbox')[2],
      getAllByRole('listbox')[3],
    ]));

    expect(openModal).toBeVisible();
    expect(formUserName).toHaveAttribute('value', '');
    expect(formEnable.querySelector('[role="alert"]')).toContainHTML('Enable');
    expect(formLocked.querySelector('[role="alert"]')).toContainHTML('Unlock');

    userEvent.type(formUserName, 'userTest');
    userEvent.click(formEnable);
    userEvent.click(formEnable.querySelector('.menu').children[1]);

    userEvent.click(formLocked);
    userEvent.click(formLocked.querySelector('.menu').children[0]);

    jest.spyOn(userApi, 'addUser').mockImplementation(() => Promise.resolve(fakeConfirmResponse));

    userEvent.click(getByText('Add'));
    await waitForElementToBeRemoved(() => getByTestId('modal'));
    expect(queryByTestId('modal')).toBe(null);

    const newRowHighlight = await waitForElement(() => getByTestId('tableRow_51'));
    expect(newRowHighlight).toHaveClass('positive');
    jest.runOnlyPendingTimers();
    const newRow = await waitForElement(() => getByTestId('tableRow_51'));
    expect(newRow).not.toHaveClass();
  });

  it('edit user', async () => {
    const {
      getByTestId,
      queryByTestId,
      getAllByPlaceholderText,
      getAllByRole,
      getByText,
    } = render(<Users />);

    const randomRowIndex = Math.floor(Math.random() * 18) + 1;
    const tableRow = await waitForElement(() => getByTestId('table').querySelector(`tbody tr:nth-child(${randomRowIndex + 1})`));
    const [uid, userName, enable, locked] = [
      tableRow.children[1].innerHTML,
      tableRow.children[3].innerHTML,
      tableRow.children[4].innerHTML,
      tableRow.children[5].innerHTML,
    ];

    const btnEdit = tableRow.children[6].children[0];
    userEvent.click(btnEdit);

    const [
      openModal,
      formUserName,
      formEnable,
      formLocked,
    ] = await waitForElement(() => ([
      getByTestId('modal'),
      getAllByPlaceholderText('User Name')[1],
      getAllByRole('listbox')[2],
      getAllByRole('listbox')[3],
    ]));

    expect(openModal).toBeVisible();
    expect(formUserName).toHaveAttribute('value', userName);
    expect(formEnable.querySelector('[role="alert"]')).toContainHTML(enable);
    expect(formLocked.querySelector('[role="alert"]')).toContainHTML(locked);

    const editName = 'Edit';
    userEvent.type(formUserName, editName);

    jest.spyOn(userApi, 'updateUser').mockImplementation(() => Promise.resolve({
      result: 'ok',
      ret: {
        id: Number(uid), username: formUserName.value, enable: enable === 'Enable' ? 1 : 0, locked: locked === 'Locked' ? 1 : 0, created_at: '2020-04-29T01:30:17.010Z',
      },
    }));

    userEvent.click(getByText('Update'));

    const editedUserName = await waitForElement(() => getByText(formUserName.value));
    expect(editedUserName).toBeVisible();

    expect(queryByTestId('modal')).toBe(null);
  });

  it('close modal', async () => {
    const {
      getByTestId,
      queryByTestId,
      getByText,
      getAllByText,
    } = render(<Users />);

    userEvent.click(getByText('Add New User'));
    const addModal = await waitForElement(() => getByTestId('modal'));
    expect(addModal).toBeVisible();
    userEvent.click(getByText('Cancel'));
    expect(queryByTestId('modal')).toBe(null);

    userEvent.click(getAllByText('Edit')[0]);
    const editModal = await waitForElement(() => getByTestId('modal'));
    expect(editModal).toBeVisible();
    userEvent.click(getByText('Cancel'));
    expect(queryByTestId('modal')).toBe(null);
  });
});


describe('delete user', () => {
  const randomRowIndex = Math.floor(Math.random() * 18) + 1;

  it('click delete cancel', async () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(<Users />);

    const tableRow = await waitForElement(() => getByTestId('table').querySelector(`tbody tr:nth-child(${randomRowIndex + 1})`));

    const btnDelete = tableRow.children[6].children[1];
    userEvent.click(btnDelete);

    const popConfirm = await waitForElement(() => getByTestId('popConfirm'));

    const popCancelBtn = popConfirm.querySelector('.button:not(.primary)');
    userEvent.click(popCancelBtn);

    expect(queryByTestId('popConfirm')).toBe(null);
  });

  it('click delete confirm', async () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(<Users />);

    const tableRow = await waitForElement(() => getByTestId('table').querySelector(`tbody tr:nth-child(${randomRowIndex + 1})`));

    const [id, userName] = [
      tableRow.children[1].innerHTML,
      tableRow.children[3].innerHTML,
    ];

    const btnDelete = tableRow.children[6].children[1];
    userEvent.click(btnDelete);

    const popConfirm = await waitForElement(() => getByTestId('popConfirm'));

    const confirmText = `Delete the user "${userName}"`;
    expect(popConfirm).toBeVisible();
    expect(popConfirm.querySelector('.content')).toContainHTML(confirmText);

    jest.spyOn(userApi, 'deleteUser').mockImplementation(() => Promise.resolve(fakeConfirmResponse));

    const popConfirmBtn = popConfirm.querySelector('.primary.button');
    userEvent.click(popConfirmBtn);

    await waitForElementToBeRemoved(() => [
      getByTestId('popConfirm'),
      getByTestId(`tableRow_${id}`),
    ]);
    expect(queryByTestId('popConfirm')).toBe(null);
    expect(queryByTestId(`tableRow_${id}`)).toBe(null);
  });

  it('delete the last item in table', async () => {
    jest.spyOn(userApi, 'fetchList').mockImplementation((url) => Promise.resolve({
      result: 'ok',
      ret: [{
        created_at: '2020-05-07T08:54:10.006Z',
        enable: 1,
        id: 61,
        locked: 0,
        username: 'IAmTheLast',
      }],
      pagination: {
        first_result: url.first_result ? 40 : 60,
        max_results: 20,
        total: url.first_result ? 60 : 61,
      },
    }));

    const {
      getByTestId,
      queryByText,
      queryByTestId,
    } = render(<Users />);

    await waitForElement(() => getByTestId('table').querySelector('tbody tr:nth-child(1)'));
    const tableRow = getByTestId('table').querySelector('tbody tr:nth-child(1)');

    userEvent.click(tableRow.children[6].children[1]);

    const popConfirm = await waitForElement(() => getByTestId('popConfirm'));
    jest.spyOn(userApi, 'deleteUser').mockImplementation(() => Promise.resolve(fakeConfirmResponse));

    const popConfirmBtn = popConfirm.querySelector('.primary.button');
    userEvent.click(popConfirmBtn);
    await waitForElementToBeRemoved(() => getByTestId('popConfirm'));

    expect(queryByTestId('popConfirm')).toBe(null);
    expect(queryByText('4')).toBe(null);
  });
});


describe('filter test', () => {
  it('click reset button', async () => {
    const {
      getByPlaceholderText, getAllByRole, getByText,
    } = render(<Users />);
    const resetButton = getByText('Reset');

    userEvent.click(resetButton);

    const [filterUserName, filterEnable, filterLocked, filterDateRange,
    ] = await waitForElement(() => ([
      getByPlaceholderText('User Name'),
      getAllByRole('listbox')[0].querySelector('.menu').querySelector('[aria-checked="true"]'),
      getAllByRole('listbox')[1].querySelector('.menu').querySelector('[aria-checked="true"]'),
      getByPlaceholderText('From - To'),
    ]));

    expect(filterUserName).toHaveAttribute('value', '');
    expect(filterEnable).toBe(null);
    expect(filterLocked).toBe(null);
    expect(filterDateRange).toHaveAttribute('value', '');
  });

  it('click search button', async () => {
    const {
      getByPlaceholderText, getAllByRole, getByText,
    } = render(<Users />);

    const [
      filterUserName,
      filterEnable,
      filterLocked,
      filterDateRange,
    ] = [
      getByPlaceholderText('User Name'),
      getAllByRole('listbox')[0],
      getAllByRole('listbox')[1],
      getByPlaceholderText('From - To'),
    ];

    userEvent.type(filterUserName, 'userTest');
    expect(filterUserName).toHaveAttribute('value', 'userTest');

    userEvent.click(filterEnable);
    userEvent.click(filterEnable.querySelector('.menu').children[0]);
    expect(filterEnable.querySelector('[role="alert"]')).toContainHTML('Enable');

    userEvent.click(filterLocked);
    userEvent.click(filterLocked.querySelector('.menu').children[0]);
    expect(filterLocked.querySelector('[role="alert"]')).toContainHTML('Locked');

    userEvent.click(filterDateRange);
    const [dateRangeItem1, dateRangeItem2,
    ] = await waitForElement(() => ([
      getByText('24'),
      getByText('25'),
    ]));

    userEvent.click(dateRangeItem1);
    userEvent.click(dateRangeItem2);
    const thisYear = moment().year();
    const thisMonth = moment().format('MM');
    expect(filterDateRange).toHaveAttribute('value', `${thisYear}-${thisMonth}-24 - ${thisYear}-${thisMonth}-25`);

    userEvent.click(getByText('Search'));
  });

  it('click search button with single date value ', async () => {
    const {
      getByPlaceholderText, getByText,
    } = render(<Users />);

    const filterDateRange = getByPlaceholderText('From - To');
    userEvent.click(filterDateRange);
    const dateRangeItem = await waitForElement(() => getByText('24'));

    userEvent.click(dateRangeItem);
    const thisYear = moment().year();
    const thisMonth = moment().format('MM');
    expect(filterDateRange).toHaveAttribute('value', `${thisYear}-${thisMonth}-24 - `);

    userEvent.click(getByText('Search'));
    const filterDateRangeAfter = await waitForElement(() => getByPlaceholderText('From - To'));
    expect(filterDateRangeAfter).toHaveAttribute('value', '');
  });

  it('click search button without filter', async () => {
    const {
      getByPlaceholderText, getByText,
    } = render(<Users />);

    userEvent.click(getByText('Search'));
    expect(getByPlaceholderText('User Name')).toHaveAttribute('value', '');
  });

  it('click date range button', async () => {
    const {
      getByPlaceholderText, getByText,
    } = render(<Users />);

    const filterDateRange = getByPlaceholderText('From - To');

    userEvent.click(filterDateRange);
    const thisWeekBtn = await waitForElement(() => getByText('This Week'));
    userEvent.click(thisWeekBtn);
    const textThisWeek = `${moment().startOf('week').subtract(-1, 'days').format('YYYY-MM-DD')} - ${moment().endOf('week').subtract(-1, 'days').format('YYYY-MM-DD')}`;
    expect(filterDateRange).toHaveAttribute('value', textThisWeek);

    userEvent.click(filterDateRange);
    const lastWeekBtn = await waitForElement(() => getByText('Last Week'));
    userEvent.click(lastWeekBtn);
    const lastMomentWeek = moment().week(moment().week() - 1);
    const textLastWeek = `${lastMomentWeek.startOf('week').subtract(-1, 'days').format('YYYY-MM-DD')} - ${lastMomentWeek.endOf('week').subtract(-1, 'days').format('YYYY-MM-DD')}`;
    expect(filterDateRange).toHaveAttribute('value', textLastWeek);

    userEvent.click(filterDateRange);
    const thisMonthBtn = await waitForElement(() => getByText('This Month'));
    userEvent.click(thisMonthBtn);
    const textThisMonth = `${moment().startOf('month').format('YYYY-MM-DD')} - ${moment().endOf('month').format('YYYY-MM-DD')}`;
    expect(filterDateRange).toHaveAttribute('value', textThisMonth);

    userEvent.click(filterDateRange);
    const lastMonthBtn = await waitForElement(() => getByText('Last Month'));
    userEvent.click(lastMonthBtn);
    const lastMomentMonth = moment().month(moment().month() - 1);
    const textLastMonth = `${lastMomentMonth.startOf('month').format('YYYY-MM-DD')} - ${lastMomentMonth.endOf('month').format('YYYY-MM-DD')}`;
    expect(filterDateRange).toHaveAttribute('value', textLastMonth);
  });
});
describe('test pagination', () => {
  it('change page', async () => {
    jest.spyOn(userApi, 'fetchList').mockImplementation((url) => Promise.resolve({
      result: 'ok',
      ret: fakeListData,
      pagination: {
        first_result: url.first_result ? url.first_result : 0,
        max_results: 20,
        total: 50,
      },
    }));
    const {
      getAllByText,
    } = render(<Users />);

    const prePageBtn = await waitForElement(() => getAllByText('2')[2]);
    expect(prePageBtn).toHaveClass('item');

    userEvent.click(prePageBtn);
    await waitForElement(() => getAllByText('2')[2]);
    expect(getAllByText('2')[2]).toHaveClass('active item');
  });

  it('change page in searching result', async () => {
    jest.spyOn(userApi, 'fetchList').mockImplementation((url) => Promise.resolve({
      result: 'ok',
      ret: fakeListData,
      pagination: {
        first_result: url.first_result ? url.first_result : 0,
        max_results: 20,
        total: url.start_created_at && url.end_created_at ? 21 : 50,
      },
    }));

    const {
      getByPlaceholderText, getByText, getAllByText,
    } = render(<Users />);

    const filterDateRange = getByPlaceholderText('From - To');

    userEvent.click(filterDateRange);
    const lastWeekBtn = await waitForElement(() => getByText('Last Week'));
    userEvent.click(lastWeekBtn);
    const lastMomentWeek = moment().week(moment().week() - 1);
    const textLastWeek = `${lastMomentWeek.startOf('week').subtract(-1, 'days').format('YYYY-MM-DD')} - ${lastMomentWeek.endOf('week').subtract(-1, 'days').format('YYYY-MM-DD')}`;
    expect(filterDateRange).toHaveAttribute('value', textLastWeek);

    userEvent.click(getByText('Search'));

    const prePageBtn = getAllByText('2')[2];
    expect(prePageBtn).toHaveClass('item');
    userEvent.click(prePageBtn);
    await waitForElement(() => getAllByText('2')[2]);
    expect(getAllByText('2')[2]).toHaveClass('active item');
  });
});
