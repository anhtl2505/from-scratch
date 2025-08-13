export const API_ENDPOINTS = {
  BASE_URL: 'https://reqres.in',
  USERS: '/api/users',
  USER_BY_ID: (id: number) => `/api/users/${id}`,
  LOGIN: '/api/login',
  API_KEY: 'reqres-free-v1'
};

export const HTTP_STATUS = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400
};

export const DATA = {
  PAGE_NUMBER: 1,
  TOTAL_PAGES: 2,
  TOTAL_USERS: 12,
  USERS_PER_PAGE: 6,
};

export const AUTH_CREDENTIALS = {
    email: "janet.weaver@reqres.in",
    password: "753shikaru"
};
