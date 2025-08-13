import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '../constants/baseConst';
import { AuthHelper } from '../utils/auth.helper';

export class ApiReqresPage {
  private baseUrl = API_ENDPOINTS.BASE_URL;

  constructor(private request: APIRequestContext) { }

  private async getAuthHeaders() {
        const token = await AuthHelper.getAuthToken(this.request);
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

  // GET - All users by page
  async getUsers(page: number) {
    const response = await this.request.get(`${this.baseUrl}${API_ENDPOINTS.USERS}?page=${page}`);
    return {
      status: response.status(),
      data: await response.json(),
      headers: {
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    };
  }

  // GET - User by ID
  async getUserById(id: number) {
    const response = await this.request.get(`${this.baseUrl}${API_ENDPOINTS.USER_BY_ID(id)}`);
    return {
      status: response.status(),
      data: response.status() === 200 ? await response.json() : await response.text(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    };
  }

  // POST - Create new user
  async createUser(userData: any) {
    const response = await this.request.post(`${this.baseUrl}${API_ENDPOINTS.USERS}`, {
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    });
    return {
      status: response.status(),
      data: await response.json()
    };
  }

  // PUT - Update user
  async updateUser(id: number, userData: any) {
    const response = await this.request.put(`${this.baseUrl}${API_ENDPOINTS.USER_BY_ID(id)}`, {
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    });
    return {
      status: response.status(),
      data: await response.json()
    };
  }

  // DELETE - Delete user
  async deleteUser(id: number) {
    const response = await this.request.delete(`${this.baseUrl}${API_ENDPOINTS.USER_BY_ID(id)}`, {
      headers: {
        'Content-Type': 'application/json',   
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    });
    
    return {
      status: response.status(),
      data: response.status() === 204 ? null : await response.text(),
      
    };
  }

  // POST - Login
  async login(credentials: any) {
    const response = await this.request.post(`${this.baseUrl}${API_ENDPOINTS.LOGIN}`, {
      data: credentials,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '' + API_ENDPOINTS.API_KEY
      }
    });
    return {
      status: response.status(),
      data: response.status() === 200 ? await response.json() : await response.text()
    };
  }
}
