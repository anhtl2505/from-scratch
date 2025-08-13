import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';
import { AUTH_CREDENTIALS } from '../../constants/baseConst';

test.describe('E2E Tests', () => {
    let apiClient: ApiReqresPage;

    test.beforeAll(async ({ request }) => {
        apiClient = new ApiReqresPage(request);
    });
    // E2E Test for user lifecycle if dont want to run by command line by tag
    test('Complete user lifecycle', async () => {
        
        // Login 
        const loginResponse = await apiClient.login({
            email: AUTH_CREDENTIALS.email,
            password: AUTH_CREDENTIALS.password
        });
        expect(loginResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Get & Verify
        const getResponse = await apiClient.getUserById(2);
        expect(getResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Update
        const updateResponse = await apiClient.updateUser(2, {
            name: 'Check.user Updated'
        });
        expect(updateResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Delete
        const deleteResponse = await apiClient.deleteUser(3);
        expect(deleteResponse.status).toBe(HTTP_STATUS.NO_CONTENT);
    });
});