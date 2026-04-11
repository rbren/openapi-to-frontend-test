# OpenAPI Frontend

[![CI](https://github.com/${{ github.repository }}/actions/workflows/ci.yml/badge.svg)](https://github.com/${{ github.repository }}/actions/workflows/ci.yml)
[![Deploy](https://github.com/${{ github.repository }}/actions/workflows/deploy.yml/badge.svg)](https://github.com/${{ github.repository }}/actions/workflows/deploy.yml)
[![codecov](https://codecov.io/gh/${{ github.repository }}/branch/main/graph/badge.svg)](https://codecov.io/gh/${{ github.repository }})

Auto-generated frontend from OpenAPI specification.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## 📁 Project Structure

```
├── client/          # TypeScript API client
├── components/      # React components
├── app/            # React application
├── tests/          # Test suites
└── .github/        # CI/CD workflows
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Open test UI
npm run test:ui
```

## 🚀 Deployment

This project automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Publishing

Packages are automatically published to npm when a release is created.

### Manual Publishing

```bash
# Publish client package
cd client && npm publish

# Publish components package
cd components && npm publish
```

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL` - API base URL (default: `http://localhost:8000`)

### Branch Protection

Recommended settings for the `main` branch:

1. Require pull request reviews
2. Require status checks:
   - lint
   - test
   - build
3. Require branches to be up to date
4. Include administrators

## 📄 License

MIT

---

Generated with ❤️ by [OpenHands](https://github.com/All-Hands-AI/OpenHands)
