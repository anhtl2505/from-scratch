# from-scratch
## Project Structure  

```
├── src/
│   ├── constants/             # Chứa các hằng số và cấu hình
│   │   ├── baseConst.ts       # API endpoints, status codes
│   │   └── testData.ts        # Test data
│   │
│   ├── data/                  # Dữ liệu test
│   │   └── credentials.ts     # Thông tin đăng nhập
│   │
│   ├── fixtures/              # Test fixtures
│   │   └── global-setup.ts    # Setup chung cho toàn bộ tests
│   │
│   ├── pom/                   # Page Object Models
│   │   └── reqres.page.ts     # API requests/methods
│   │
│   ├── utils/                 # Utilities
│   │   ├── auth.helper.ts     # Authentication helper
│   │   └── test.helper.ts     # Test helper
│   │
│   └── tests/                 # Test cases
│       └── api/
│           ├── auth/          # Authentication tests
│           └── e2e/           # End-to-end tests (IF)
│
├── .env.test                  # Test environment config
├── .env.stage                 # Stage environment config
├── playwright.config.ts       # Playwright configuration
└── package.json               # Project dependencies
```
# Run test

## Chạy E2E tests
 npx playwright test --grep "@E2E"

## Test environment
 set TEST_ENV=test && npx playwright test

## Stage environment
 set TEST_ENV=stage && npx playwright test

## View report after run test 
 npx playwright show-report

