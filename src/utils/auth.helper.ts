import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '../constants/baseConst';
import { USER_PROVIDED_CREDENTIALS } from '../data/credential';

export class AuthHelper {
    // Static variable for storing the authentication token
    private static authToken: string;

    // Method get authentication token
    static async getAuthToken(request: APIRequestContext): Promise<string> {
        if (this.authToken) {
            return this.authToken;
        }

        // If the token is not set, perform a login request
        const response = await request.post(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.LOGIN}`,
            {
                data: USER_PROVIDED_CREDENTIALS,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_ENDPOINTS.API_KEY
                }
            }
        );

        const body = await response.json();
        this.authToken = body.token;
        return this.authToken;
    }
}