// src/tests/api/test-login/testLogin.spec.ts
import { test, expect } from '@playwright/test';
import { AuthHelper } from '../../../utils/auth.helper';
import { AUTH_CREDENTIALS, HTTP_STATUS } from '../../../constants/baseConst';
import { ApiReqresPage } from '../../../pom/reqres.page';



test.describe('Login API Tests @auth', () => {
    let apiClient: ApiReqresPage;
    let apiLogin: ApiReqresPage;
    const TEST_DATA = {
        validUser: {
            email: AUTH_CREDENTIALS.email,
            password: AUTH_CREDENTIALS.password
        },
        invalidUser: {
            email: 'invalid@email.com',
            password: 'wrongpassword'
        },
        emptyCredentials: {
            email: '',
            password: ''
        }
    };

    test.beforeAll(async ({ request }) => {
        apiClient = new ApiReqresPage(request);
    });

    test('TC_LOGIN_001: Successful login should return token', async ({ request }) => {
        apiLogin = new ApiReqresPage(request);
        const response = await apiLogin.loginUser(TEST_DATA.validUser);

        expect(response.status).toBe(HTTP_STATUS.SUCCESSFUL);
        expect(response.data.token).toBeDefined();
        expect(typeof response.data.token).toBe('string');
        expect(response.data.token.length).toBeGreaterThan(0);
    });

    test('TC_LOGIN_002: Login with invalid credentials should return error', async ({ request }) => {
        apiLogin = new ApiReqresPage(request);
        const response = await apiLogin.loginUser(TEST_DATA.invalidUser);

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    test('TC_LOGIN_003: Login with empty credentials should fail ', async ({ request }) => {
        apiLogin = new ApiReqresPage(request);
        const response = await apiLogin.loginUser(TEST_DATA.emptyCredentials);

        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    });
});