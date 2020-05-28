import { cleanup } from '@testing-library/react';
import request from '../../utils/request';
import * as userApi from '../../api/Users';

afterEach(cleanup);

jest.mock('../../utils/request', () => jest.fn());

describe('test user api', () => {
  it('fetchList', async () => {
    await userApi.fetchList();
    expect(request).toHaveBeenCalled();
  });
  it('addUser', async () => {
    await userApi.addUser();
    expect(request).toHaveBeenCalled();
  });
  it('updateUser', async () => {
    await userApi.updateUser();
    expect(request).toHaveBeenCalled();
  });
  it('deleteUser', async () => {
    await userApi.deleteUser();
    expect(request).toHaveBeenCalled();
  });
});
