import request from '../../utils/request';

describe('test utils request', () => {
  const interceptorsResponse = request.interceptors.response.handlers[0];
  it('response fail', async () => {
    const mockResponse = {
      status: 404,
    };
    await expect(interceptorsResponse.fulfilled(mockResponse)).rejects.toEqual(mockResponse);
  });

  it('response result is not ok', async () => {
    const mockResponse = {
      status: 200,
      data: {
        result: 'error',
      },
    };
    await expect(interceptorsResponse.fulfilled(mockResponse)).rejects.toEqual(new Error('Error'));
  });

  it('get response successfully', async () => {
    const result = {
      result: 'ok',
      someData: {},
    };
    const mockResponse = {
      status: 200,
      data: result,
    };
    await expect(interceptorsResponse.fulfilled(mockResponse)).toEqual(result);
  });

  it('request error', async () => {
    const mockErrorResponse = {
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    };
    await expect(interceptorsResponse.rejected(mockErrorResponse)).rejects.toMatchObject(mockErrorResponse);
  });
});
