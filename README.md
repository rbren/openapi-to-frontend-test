# OpenHands Agent Server Frontend

This is an auto-generated frontend application for the OpenHands Agent Server API, created from the OpenAPI specification.

## Features

- **TypeScript API Client**: Fully typed client with all endpoints from the OpenAPI spec
- **React Components**: Reusable components for displaying and managing resources
- **Authentication Support**: Built-in support for API Key, Bearer Token, and OAuth2
- **Modern Stack**: Built with React 18, TypeScript, Vite, and Tailwind CSS

## Project Structure

```
├── client/           # Generated TypeScript API client
│   ├── types.ts     # TypeScript interfaces from OpenAPI schemas
│   ├── api.ts       # API client class with typed methods
│   └── auth.ts      # Authentication handlers
├── components/       # React components
│   ├── shared/      # Shared UI components
│   └── */           # Resource-specific components
├── app/             # React application
│   ├── pages/       # Page components
│   ├── context/     # React context providers
│   ├── hooks/       # Custom React hooks
│   └── utils/       # Utility functions
└── tests/           # Test files
    ├── unit/        # Unit tests
    ├── integration/ # Integration tests
    └── e2e/         # End-to-end tests
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Configuration

The app stores configuration in localStorage:
- API base URL
- Authentication credentials

Configure these in the Settings page of the app.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Client Usage

```typescript
import { ApiClient } from './client';

const client = new ApiClient({
  baseUrl: 'https://api.example.com',
  auth: {
    type: 'bearer',
    token: 'your-token'
  }
});

// Example: Get conversations
const conversations = await client.searchConversations({ limit: 20 });
```

## Deployment

### GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages on push to main branch.

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting service

## Contributing

This is auto-generated code. To make changes:
1. Update the OpenAPI specification
2. Regenerate the frontend using `/openapi-to-frontend`
3. Any manual customizations should be clearly documented

## License

[Your License Here]