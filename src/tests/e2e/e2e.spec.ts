import { test, expect } from '@playwright/test';
import { ApiReqresPage } from '../../pom/reqres.page';
import { HTTP_STATUS } from '../../constants/baseConst';
import { AUTH_CREDENTIALS } from '../../constants/baseConst';

test.describe('E2E Tests', () => {
    let apiClient: ApiReqresPage;
    let apiE2E: ApiReqresPage;
    const TEST_DATA = {
        validUser: {
            email: AUTH_CREDENTIALS.email,
            password: AUTH_CREDENTIALS.password
        }
    };

    test.beforeAll(async ({ request }) => {
        apiClient = new ApiReqresPage(request);

    });
    // E2E Test for user lifecycle if dont want to run by command line using tag
    test('Complete user lifecycle', async ({ request }) => {
        apiE2E = new ApiReqresPage(request);

        // Login 
        const response = await apiE2E.loginUser(TEST_DATA.validUser);

        expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Get & Verify
        const getResponse = await apiE2E.getUserById(2);
        expect(getResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Update
        const updateResponse = await apiE2E.updateUser(2, {
            name: 'Check.user Updated'
        });
        expect(updateResponse.status).toBe(HTTP_STATUS.SUCCESSFUL);

        // Delete
        const deleteResponse = await apiE2E.deleteUser(3);
        expect(deleteResponse.status).toBe(HTTP_STATUS.NO_CONTENT);
    });
});