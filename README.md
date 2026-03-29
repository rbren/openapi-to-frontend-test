# OpenAPI Frontend

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

MIT