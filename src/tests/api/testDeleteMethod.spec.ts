import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';

test.describe('DELETE GROUP', {
}, () => {
  let apiClient: ApiReqresPage;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiReqresPage(request);
  });

  test('TC_DELETE_001: Delete existing user - should return 204', {
    tag: ['@API', '@REQRES', '@E2E'],
  }, async () => {
    // Test deleting user with ID 2
    const response = await apiClient.deleteUser(2);
    
    // Verify response status
    expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    
    // Verify no content returned
    expect(response.data).toBeNull();
  });

  test('TC_DELETE_002: Delete non-existent user - should still return 204', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const response = await apiClient.deleteUser(999);
    
    // Note: reqres.in API returns 204 even for non-existent users
    expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
    expect(response.data).toBeNull();
  });

  test('TC_DELETE_003: Verify user deletion by getting deleted user', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    // First delete a user
    const deleteResponse = await apiClient.deleteUser(2);
    expect(deleteResponse.status).toBe(HTTP_STATUS.NO_CONTENT);
    
    // Then try to get the same user
    const getResponse = await apiClient.getUserById(2);
    // reqres.in is a demo API, so the user will still exist
    expect(getResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);
  });

  test('TC_DELETE_004: Delete multiple users sequentially', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    // Delete user ID 1
    const deleteResponse1 = await apiClient.deleteUser(1);
    expect(deleteResponse1.status).toBe(HTTP_STATUS.NO_CONTENT);
    
    // Delete user ID 2
    const deleteResponse2 = await apiClient.deleteUser(2);
    expect(deleteResponse2.status).toBe(HTTP_STATUS.NO_CONTENT);
    
    // Delete user ID 3
    const deleteResponse3 = await apiClient.deleteUser(3);
    expect(deleteResponse3.status).toBe(HTTP_STATUS.NO_CONTENT);
  });
});
