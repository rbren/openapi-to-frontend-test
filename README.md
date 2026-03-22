# OpenAPI Frontend Generated Code

This frontend application was automatically generated from the OpenAPI specification using the `/openapi-to-frontend` command.

## 📁 Project Structure

```
.
├── client/                 # TypeScript API client
│   ├── types.ts           # 221 TypeScript interfaces from OpenAPI schemas
│   ├── api.ts             # API client with 44 typed methods
│   ├── auth.ts            # Authentication handlers (placeholder - no auth schemes in spec)
│   └── index.ts           # Barrel export
│
├── components/            # React component library
│   ├── shared/           # Common UI components
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorDisplay.tsx
│   │   └── Pagination.tsx
│   ├── <Schema>/         # Components for each schema (10 generated)
│   │   ├── <Schema>Form.tsx
│   │   ├── <Schema>Detail.tsx
│   │   └── <Schema>List.tsx
│   └── index.ts
│
├── app/                   # React application
│   ├── context/          # React contexts
│   │   ├── ApiContext.tsx
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useResource.ts
│   │   └── usePagination.ts
│   ├── pages/            # Application pages
│   │   ├── DashboardPage.tsx
│   │   ├── ConversationsPage.tsx
│   │   ├── EventsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── utils/            # Utility functions
│   │   └── localStorage.ts
│   ├── App.tsx           # Main app component with routing
│   ├── Layout.tsx        # App layout with sidebar
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind CSS imports
│
├── tests/                # Test suite
│   ├── setup/           # Test configuration
│   │   ├── test-setup.ts
│   │   ├── type-guards.ts
│   │   └── factories.ts
│   ├── unit/            # Unit tests
│   │   ├── client/
│   │   └── components/
│   ├── integration/     # Integration tests
│   └── e2e/            # End-to-end tests
│
├── .github/workflows/   # CI/CD pipelines
│   ├── ci.yml          # Build and test on PR
│   ├── deploy.yml      # Deploy to GitHub Pages
│   └── publish.yml     # Publish to npm
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── playwright.config.ts
    └── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Publishing

The project includes workflows to publish packages to npm:

- `@openapi-frontend/client` - TypeScript API client
- `@openapi-frontend/components` - React component library

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. Modify `tailwind.config.js` to customize the theme.

### API Configuration

Update the API base URL in `app/App.tsx` or through the `VITE_API_BASE_URL` environment variable.

### Adding New Pages

1. Create a new page component in `app/pages/`
2. Add the route in `app/App.tsx`
3. Add navigation link in `app/Layout.tsx`

## 📝 API Overview

Based on the OpenAPI specification analysis:

- **API Title**: OpenHands Agent Server
- **Description**: REST/WebSocket interface for OpenHands AI Agent
- **Total Endpoints**: 40
- **Total Schemas**: 221
- **Authentication**: None defined

The frontend was generated as an agent dashboard application with:
- Server status monitoring
- Conversation management
- Event tracking
- Settings configuration

## 🤝 Contributing

This code was automatically generated. To make changes:

1. Update the OpenAPI specification
2. Re-run the generation command: `/openapi-to-frontend new-spec.json old-spec.json`
3. The generator will apply incremental updates preserving customizations

## 📄 License

This project is generated code and inherits the license from your OpenAPI specification.