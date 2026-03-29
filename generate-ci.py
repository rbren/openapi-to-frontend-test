#!/usr/bin/env python3
"""
Generate CI/CD workflows for the generated frontend.
"""

from pathlib import Path


def generate_ci_workflow():
    """Generate the main CI workflow."""
    ci_yml = '''name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --run
      
      - name: Generate coverage report
        run: npm run test:coverage -- --run
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  e2e:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run e2e tests
        run: npm run test:e2e
      
      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30'''
    
    return ci_yml


def generate_deploy_workflow():
    """Generate the deployment workflow."""
    deploy_yml = '''name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for production
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ vars.VITE_API_BASE_URL || 'https://api.example.com' }}
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3'''
    
    return deploy_yml


def generate_publish_workflow():
    """Generate the npm publish workflow."""
    publish_yml = '''name: Publish to npm

on:
  release:
    types: [created]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to publish (e.g., 1.0.0)'
        required: true
        type: string

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --run
      
      - name: Build package
        run: npm run build
      
      - name: Update version
        if: github.event_name == 'workflow_dispatch'
        run: npm version ${{ github.event.inputs.version }} --no-git-tag-version
      
      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub release
        if: github.event_name == 'workflow_dispatch'
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ github.event.inputs.version }}
          release_name: Release v${{ github.event.inputs.version }}
          body: |
            ## Changes in this release
            
            - Generated from OpenAPI specification
            - TypeScript client with full type safety
            - React components for all schemas
            - Complete test coverage
            
            See [CHANGELOG.md](https://github.com/${{ github.repository }}/blob/main/CHANGELOG.md) for details.
          draft: false
          prerelease: false'''
    
    return publish_yml


def generate_dependabot_config():
    """Generate Dependabot configuration."""
    dependabot_yml = '''version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    groups:
      development-dependencies:
        dependency-type: "development"
        patterns:
          - "@types/*"
          - "eslint*"
          - "vitest*"
          - "@testing-library/*"
          - "playwright*"
      production-dependencies:
        dependency-type: "production"
        patterns:
          - "react*"
          - "vite*"
          - "tailwind*"
    
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"'''
    
    return dependabot_yml


def generate_readme():
    """Generate a README file."""
    readme = '''# OpenAPI Frontend

This frontend application was automatically generated from an OpenAPI specification.

## Features

- **TypeScript Client**: Fully typed API client generated from OpenAPI spec
- **React Components**: Pre-built components for all API schemas
- **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Testing**: Unit, integration, and e2e tests included
- **CI/CD**: GitHub Actions workflows for testing and deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API server running (configure URL in `.env`)

### Installation

```bash
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Build for production
npm run build
```

### Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Or set the API URL in localStorage:

```javascript
localStorage.setItem('api_base_url', 'http://your-api-url.com');
```

## Project Structure

```
├── app/              # Main application code
│   ├── pages/        # Page components
│   ├── context/      # React contexts
│   ├── hooks/        # Custom hooks
│   └── utils/        # Utility functions
├── client/           # Generated API client
│   ├── types.ts      # TypeScript types
│   ├── api.ts        # API client class
│   └── auth.ts       # Authentication helpers
├── components/       # Reusable components
│   ├── generic/      # Generic form/list components
│   ├── shared/       # Shared UI components
│   └── [Schema]/     # Schema-specific components
└── tests/            # Test files
    ├── unit/         # Unit tests
    ├── integration/  # Integration tests
    └── e2e/          # End-to-end tests
```

## API Integration

The application uses a generated TypeScript client that provides:

- Type-safe API calls
- Automatic request/response handling
- Built-in error handling
- Authentication support

Example usage:

```typescript
import { useApiClient } from './app/context';

function MyComponent() {
  const client = useApiClient();
  
  const fetchData = async () => {
    try {
      const data = await client.listUsers({ page: 1, pageSize: 20 });
      console.log(data);
    } catch (error) {
      console.error('API error:', error);
    }
  };
}
```

## Deployment

### GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages:

1. Enable GitHub Pages in your repository settings
2. Set the `VITE_API_BASE_URL` variable in your repository settings
3. Push to the `main` branch to trigger deployment

### Custom Deployment

Build the application and deploy the `dist` folder:

```bash
npm run build
# Deploy dist/ folder to your hosting service
```

## Contributing

This is a generated codebase. To make changes:

1. Update the OpenAPI specification
2. Regenerate the frontend code
3. Apply any custom modifications
4. Submit a pull request

## License

MIT'''
    
    return readme


def main():
    # Create workflows directory
    workflows_dir = Path('.github/workflows')
    workflows_dir.mkdir(parents=True, exist_ok=True)
    
    print("Generating CI workflow...")
    (workflows_dir / 'ci.yml').write_text(generate_ci_workflow())
    
    print("Generating deploy workflow...")
    (workflows_dir / 'deploy.yml').write_text(generate_deploy_workflow())
    
    print("Generating publish workflow...")
    (workflows_dir / 'publish.yml').write_text(generate_publish_workflow())
    
    print("Generating Dependabot config...")
    Path('.github/dependabot.yml').write_text(generate_dependabot_config())
    
    print("Generating README...")
    Path('README.md').write_text(generate_readme())
    
    print("CI/CD setup complete!")
    print("\nWorkflows created:")
    print("  - .github/workflows/ci.yml       # Run tests on PR/push")
    print("  - .github/workflows/deploy.yml   # Deploy to GitHub Pages")
    print("  - .github/workflows/publish.yml  # Publish to npm")
    print("  - .github/dependabot.yml         # Dependency updates")
    print("  - README.md                      # Project documentation")


if __name__ == '__main__':
    main()