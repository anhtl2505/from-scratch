# from-scratch
## Project Structure  

```
├── src/
│   ├── constants/             # Data
│   │   ├── baseConst.ts       # API endpoints, status codes
│   │   └── testData.ts        # Test data
│   │
│   ├── data/                  # Test Data
│   │   └── credentials.ts     # Login credential
│   │
│   ├── fixtures/              # Test fixtures
│   │   └── global-setup.ts    # Setup test
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

