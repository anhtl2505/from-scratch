import { test as base, APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS, AUTH_CREDENTIALS } from '../constants/baseConst';
import { AuthenticatedRequest, TokenResponse } from '../type/auth.types';

// Define custom fixtures
type CustomFixtures = {
    authenticatedRequest: APIRequestContext & AuthenticatedRequest;
};

// Create the test with custom fixtures
export const test = base.extend<CustomFixtures>({
    authenticatedRequest: async ({ request }, use) => {
        // Perform login and get token
        const loginResponse = await request.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            data: AUTH_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const { token } = await loginResponse.json() as TokenResponse;

        // Create authenticated request context
        const authenticatedContext = request as APIRequestContext & AuthenticatedRequest;
        authenticatedContext.headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        // Use the authenticated context in tests
        await use(authenticatedContext);
    }
});

export { expect } from '@playwright/test';