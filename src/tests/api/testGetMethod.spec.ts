import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';
import { DATA } from '../../constants/baseConst';

test.describe('GET GROUP', () => {
    let apiClient: ApiReqresPage;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiReqresPage(request);
    });



    test('TC_GET_001: Get users list with pagination', {
        tag: ['@API', '@REQRES', '@E2E'],
    }, async () => {

        const response = await apiClient.getUsers(DATA.PAGE_NUMBER);
        //---------------------------------------------------
        // Verify response status
        expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Verify response structure
        expect(response.data).toHaveProperty('page', DATA.PAGE_NUMBER);
        expect(response.data).toHaveProperty('per_page', DATA.USERS_PER_PAGE);
        expect(response.data).toHaveProperty('total', DATA.TOTAL_USERS);
        expect(response.data).toHaveProperty('total_pages', DATA.TOTAL_PAGES);
        expect(response.data).toHaveProperty('data');

        //Verify maximum number of users per page
        expect(response.data.data.length).toBeLessThanOrEqual(6);

        // Verify page show if users are present
        expect(Array.isArray(response.data.data)).toBe(true);
        expect(response.data.data.length).toBeGreaterThan(0);

        // Verify user properties
        const infoUser = response.data.data[0];
        expect(infoUser).toHaveProperty('id');
        expect(infoUser).toHaveProperty('email');
        expect(infoUser).toHaveProperty('first_name');
        expect(infoUser).toHaveProperty('last_name');
        expect(infoUser).toHaveProperty('avatar');
    });

    test('TC_GET_002: Get single user by ID', {
        tag: ['@API', '@REQRES', '@E2E'],
    }, async () => {

        const response = await apiClient.getUserById(2);
        // Verify response status
        expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Verify response structure
        expect(response.data).toHaveProperty('data');
        expect(response.data.data).toHaveProperty('id', 2);
        expect(response.data.data).toHaveProperty('email');
        expect(response.data.data).toHaveProperty('first_name');
        expect(response.data.data).toHaveProperty('last_name');
        expect(response.data.data).toHaveProperty('avatar');

        // Verify specific user data
        expect(response.data.data.email).toContain('@');
        expect(response.data.data.first_name).toBeTruthy();
        expect(response.data.data.last_name).toBeTruthy();
    });

    test('TC_GET_003: Get non-existent user', {
        tag: ['@API', '@REQRES', '@SMOKE'],
        annotation: {
            type: 'reqres api',
            description: 'API check'
        }
    }, async () => {
        // Test getting user with non-existent ID
        const response = await apiClient.getUserById(999);

        // Verify response status
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    });

    test('TC_GET_004: Get users from first page', {
        tag: ['@API', '@REQRES', '@SMOKE'],
        annotation: {
            type: 'reqres api',
            description: 'API check'
        }
    }, async () => {
        // Test getting users from page
        const response = await apiClient.getUsers(1);

        // Verify response status
        expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Verify response structure
        expect(response.data).toHaveProperty('page', 1);
        expect(response.data).toHaveProperty('per_page', 6);
        expect(response.data).toHaveProperty('total', 12);
        expect(response.data).toHaveProperty('total_pages', 2);
        expect(response.data).toHaveProperty('data');

        // Verify data is an array with users
        expect(Array.isArray(response.data.data)).toBe(true);
        expect(response.data.data.length).toBe(6);
    });
});
