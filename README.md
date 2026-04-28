# OrangeHRM Playwright Tests

Small Playwright test suite for the OrangeHRM demo application.


## Tech
- Playwright
- TypeScript

## Setup
```bash
npm install
npm test
npm run test:headed
npm run test:ui
npm run test:debug
```

## Covered scenarios
- Login (happy path and invalid credentials)
- Sidebar navigation (PIM, Leave, Admin)
- Add employee (PIM)
- Logout


## Project Structure

tests/
├── fixtures/        # Custom Playwright fixtures
├── pages/           # Page Object Model
├── smoke-tests/     # Smoke test specifications
└── utils/           # Test helpers

.github/
└── workflows/       # CI pipeline (GitHub Actions)

playwright-report/   # HTML report (generated locally / in CI)
test-results.json    # Machine-readable test results

![Playwright](../../actions/workflows/playwright.yml/badge.svg)
