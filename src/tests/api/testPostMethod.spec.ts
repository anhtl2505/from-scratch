import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';

test.describe('POST GROUP', () => {
  let apiClient: ApiReqresPage;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiReqresPage(request);
  });

  test('TC_POST_001: Create new user - should create user successfully', {
    tag: ['@API', '@REQRES', '@E2E'],
  }, async () => {
    // Test data for creating user
    const userData = {
      name: "check.user01",
      job: "worker"
    };
    
    const response = await apiClient.createUser(userData);
    
    // Verify response status
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    
    // Verify response structure
    expect(response.data).toHaveProperty('name', userData.name);
    expect(response.data).toHaveProperty('job', userData.job);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
    
    // Verify ID and createdAt are generated
    expect(response.data.id).toBeTruthy();
    expect(response.data.createdAt).toBeTruthy();
  });

  test('TC_POST_002: Create user with minimal data - should create user', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const userData = {
      name: "test user"
    };
    
    const response = await apiClient.createUser(userData);
    
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toHaveProperty('name', userData.name);
    expect(response.data).toHaveProperty('id');
  });

  test('TC_POST_003: Create user with empty data - should still create user', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const userData = {};
    
    const response = await apiClient.createUser(userData);
    
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toHaveProperty('id');
  });

  test('TC_POST_004: Create user with complete data - should create with all fields', {
    tag: ['@API', '@REQRES', '@SMOKE'],
    annotation: {
      type: 'reqres api',
      description: 'API check'
    }
  }, async () => {
    const userData = {
      name: "check.user02",
      job: "Worker",
      email: "check.user02@yopmail.com",
      phone: "0000000000"
    };
    
    const response = await apiClient.createUser(userData);
    
    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toHaveProperty('name', userData.name);
    expect(response.data).toHaveProperty('job', userData.job);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
  });
});
