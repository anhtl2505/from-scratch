export interface LoginCredentials {
    email: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}

export interface AuthenticatedRequest {
    headers: {
        Authorization: string;
        'Content-Type': string;
    }
}