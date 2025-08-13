import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';

test.describe('PUT GROUP', () => {
  let apiClient: ApiReqresPage;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiReqresPage(request);
  });

  test('TC_PUT_001: Update existing user - should update user successfully', {
    tag: ['@API', '@REQRES', '@E2E']
  }, async () => {
    const updateData = {
      name: "morpheus",
      job: "zion resident"
    };

    const response = await apiClient.updateUser(2, updateData);

    // Verify response status
    expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);

    // Verify response structure
    expect(response.data).toHaveProperty('name', updateData.name);
    expect(response.data).toHaveProperty('job', updateData.job);
    expect(response.data).toHaveProperty('updatedAt');

    // Verify updatedAt timestamp is present
    expect(response.data.updatedAt).toBeTruthy();
  });

  test('TC_PUT_002: Update user with partial data - should update successfully', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const updateData = {
      job: "team leader"
    };

    const response = await apiClient.updateUser(2, updateData);

    expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);
    expect(response.data).toHaveProperty('job', updateData.job);
    expect(response.data).toHaveProperty('updatedAt');
  });

  test('TC_PUT_003: Update non-existent user - should still return 200', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const updateData = {
      name: "test",
      job: "tester"
    };

    const response = await apiClient.updateUser(999, updateData);

    // Note: reqres.in API returns 200 even for non-existent users
    expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);
    expect(response.data).toHaveProperty('name', updateData.name);
    expect(response.data).toHaveProperty('job', updateData.job);
  });

  test('TC_PUT_004: Update user with empty data - should still update', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const updateData = {};

    const response = await apiClient.updateUser(2, updateData);

    expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);
    expect(response.data).toHaveProperty('updatedAt');
  });
});
