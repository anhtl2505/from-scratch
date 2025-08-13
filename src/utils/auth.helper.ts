import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '../constants/baseConst';
import { USER_PROVIDED_CREDENTIALS } from '../data/credential';

export class AuthHelper {
    // Biến static để lưu token xuyên suốt quá trình test
    private static authToken: string;

    // Method để lấy token
    static async getAuthToken(request: APIRequestContext): Promise<string> {
        // Nếu đã có token, trả về luôn
        if (this.authToken) {
            return this.authToken;
        }

        // Nếu chưa có token, thực hiện login
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