# 🌍 Travel and Accommodation Booking Platform

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-230%20passing-success)](https://vitest.dev/)

A production-ready **React + TypeScript** web application for hotel and accommodation booking, developed as the **final capstone project** for Front-End Developer Training at **Foothill Technology Solutions**.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Architecture & Design Patterns](#-architecture--design-patterns)
- [API Integration](#-api-integration)
- [Testing Strategy](#-testing-strategy)
- [Code Quality & Standards](#-code-quality--standards)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Key Concepts Applied](#-key-concepts--technologies-applied)

---

## ✨ Features

### User Features
- **🔐 Authentication System**: Secure login with JWT token management and role-based access control
- **🔍 Advanced Search**: Multi-criteria hotel search (city, dates, guests, rooms) with real-time filtering
- **🏨 Hotel Discovery**:
  - Browse featured deals and trending destinations
  - View recently visited hotels with personalized recommendations
  - Filter by star rating, price range, room type, and amenities
  - Sort results by price, rating, or name
- **📸 Rich Hotel Details**: 
  - Interactive photo gallery with lightbox view
  - Comprehensive descriptions and amenities list
  - Guest reviews with star ratings
  - Interactive maps showing hotel location
  - Real-time room availability
- **🛒 Multi-Step Checkout**:
  - Personal details form with validation
  - Payment method selection (Credit Card, PayPal, Cash on Arrival)
  - Special requests handling
  - Booking summary with price breakdown
  - Form state persistence across steps
- **✅ Booking Confirmation**: Detailed confirmation page with booking reference

### Admin Features
- **🎛️ Admin Dashboard**: Full CRUD operations for:
  - **Cities Management**: Create, update, delete cities
  - **Hotels Management**: Manage hotel information, ratings, and availability
  - **Rooms Management**: Configure room types, pricing, and capacity
- **🔄 Generic Components**: Reusable data grid and form system for all entities
- **🔒 Protected Routes**: Admin-only access with authentication guards

---

## 🚀 Tech Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.1.1 | UI library with latest features |
| **Language** | TypeScript | 5.9.3 | Type-safe development |
| **Build Tool** | Vite | 7.1.7 | Fast development and optimized builds |
| **Routing** | React Router DOM | 7.9.4 | Client-side routing with nested routes |
| **State Management** | Zustand | 5.0.8 | Lightweight global state management |
| **Server State** | TanStack Query | 5.90.10 | Data fetching, caching, and synchronization |
| **Forms** | Formik + Yup | 2.4.6 + 1.7.1 | Form state management and validation |
| **HTTP Client** | Axios | 1.13.0 | API communication with interceptors |
| **Styling** | CSS Modules | - | Scoped component styling |

### UI & Utilities

| Library | Purpose |
|---------|---------|
| `react-icons` | 5,000+ icon components |
| `react-date-range` | Date picker for check-in/out |
| `react-leaflet` | Interactive maps for hotel locations |
| `yet-another-react-lightbox` | Photo gallery lightbox |
| `react-infinite-scroll-component` | Infinite scroll for search results |
| `date-fns` | Date manipulation and formatting |

### Development & Testing

| Tool | Version | Purpose |
|------|---------|---------|
| **Vitest** | 4.0.7 | Unit testing framework |
| **Testing Library** | 16.3.0 | React component testing |
| **Playwright** | 1.56.1 | End-to-end browser testing |
| **Storybook** | 10.0.4 | Component documentation and testing |
| **ESLint** | 9.38.0 | Code linting with React/TypeScript rules |
| **Prettier** | 3.6.2 | Code formatting |

### Code Quality Features

- ✅ **TypeScript Strict Mode**: No implicit `any`, full type safety
- ✅ **ESLint Configuration**: React Hooks rules, JSX a11y, React Refresh
- ✅ **Prettier Integration**: Consistent code formatting (100 char width, single quotes)
- ✅ **Path Aliases**: `@/*` imports for clean import statements
- ✅ **Git Hooks Ready**: Pre-commit hooks support for linting/formatting
- ✅ **Test Coverage**: 230 passing unit tests with 26 test suites

---

## 📁 Project Structure

```
travel-booking/
├── src/
│   ├── api/                      # API service layer
│   │   ├── axiosClient.ts       # Configured axios instance
│   │   ├── adminService.ts      # Admin CRUD operations
│   │   ├── homeService.ts       # Featured deals, trending destinations
│   │   ├── hotelService.ts      # Hotel details, reviews
│   │   ├── searchService.ts     # Search and filters
│   │   ├── userService.ts       # Authentication
│   │   └── bookingService.ts    # Checkout and bookings
│   │
│   ├── components/              # Reusable components
│   │   ├── common/              # Shared UI components
│   │   │   ├── Button/          # Primary UI button
│   │   │   ├── Input/           # Form input with validation
│   │   │   ├── Checkbox/        # Checkbox component
│   │   │   ├── StarRating/      # Star rating display
│   │   │   ├── ErrorMessage/    # Error display component
│   │   │   ├── Logo/            # Brand logo
│   │   │   ├── Icon/            # Icon components (Eye, EyeOff)
│   │   │   └── ProtectedRoute/  # Route authentication guard
│   │   │
│   │   └── layout/              # Layout components
│   │       ├── Header/          # Navigation header
│   │       ├── MainLayout/      # Page wrapper with header
│   │       └── ProfileMenu/     # User profile dropdown
│   │
│   ├── pages/                   # Page components
│   │   ├── Login/               # Authentication page
│   │   │   └── components/      # LoginForm, BrandSection, FeatureList
│   │   ├── Home/                # Landing page
│   │   │   └── components/      # Hero, SearchBar, FeaturedDeals,
│   │   │                        # TrendingDestinations, RecentlyVisited
│   │   ├── Search/              # Search results page
│   │   │   └── components/      # HotelList, FilterSidebar, SortDropdown
│   │   ├── Hotel/               # Hotel details page
│   │   │   └── components/      # VisualGallery, HotelDetails, RoomList,
│   │   │                        # HotelReviews (with ReviewCard)
│   │   ├── Checkout/            # Multi-step checkout
│   │   │   └── components/      # PersonalDetailsForm, PaymentMethodForm,
│   │   │                        # SpecialRequestsForm, BookingSummary
│   │   ├── Confirmation/        # Booking confirmation
│   │   └── Admin/               # Admin dashboard
│   │       └── components/      # GenericDataGrid, GenericForm,
│   │                            # entityConfigs (city, hotel, room)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFetchData.ts     # Generic data fetching hook
│   │   └── useScroll.ts        # Scroll position hook
│   │
│   ├── store/                   # Global state management
│   │   └── useAuthStore.ts     # Zustand auth store (token, userType)
│   │
│   ├── styles/                  # Design system
│   │   ├── variables.css       # CSS custom properties
│   │   └── theme.ts            # TypeScript theme constants
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts            # All type definitions (340+ lines)
│   │
│   ├── test/                    # Test configuration
│   │   └── setup.ts            # Vitest setup with jest-dom
│   │
│   ├── main.tsx                 # App entry point with routing
│   └── index.css                # Global styles
│
├── .storybook/                  # Storybook configuration
├── public/                      # Static assets
├── vitest.config.ts            # Vitest configuration
├── vite.config.ts              # Vite configuration with path aliases
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint flat config
├── .prettierrc                 # Prettier configuration
├── DESIGN_SYSTEM.md            # Design system documentation
├── STORYBOOK.md                # Storybook usage guide
└── package.json                # Dependencies and scripts
```

**Key Architectural Decisions:**
- **Feature-based organization**: Pages contain their specific components
- **Reusable common components**: Shared UI elements in `components/common/`
- **Service layer separation**: All API calls isolated in `api/` directory
- **Type-safe development**: Centralized types in `types/index.ts`
- **CSS Modules**: Scoped styling prevents style conflicts

---

## 🎯 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohammadShaded/Travel-Booking.git
   cd travel-booking
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_BASE_URL=https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net

   # App Configuration
   VITE_APP_NAME=Travel Booking Platform
   ```

4. **Start development server**
   ```powershell
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Default Credentials (Development)

**Admin Account:**
- Username: `admin`
- Password: `admin`

**User Account:**
- Username: `user`
- Password: `user`

---

## 📜 Available Scripts

### Development

```powershell
# Start Vite dev server with HMR
npm run dev

# Run development server with specific port
npm run dev -- --port 3000
```

### Production

```powershell
# TypeScript check + production build
npm run build

# Preview production build locally
npm run preview
```

### Testing

```powershell
# Run unit tests (watch mode)
npm test

# Run tests with UI dashboard
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run all tests once (CI mode)
npm test -- --run
```

### Code Quality

```powershell
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint -- --fix

# Format code with Prettier (manual)
npx prettier --write "src/**/*.{ts,tsx,css}"
```

### Documentation

```powershell
# Start Storybook dev server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

### Deployment

```powershell
# Build and deploy to GitHub Pages
npm run deploy
```

---

## 🏗️ Architecture & Design Patterns

### State Management Architecture

1. **Local State**: React `useState` for UI-specific state
2. **Global State**: Zustand for authentication (token, userType)
3. **Server State**: TanStack Query for API data with caching
4. **Form State**: Formik for complex form management


### Design Patterns Implemented

- **Component Composition**: Building complex UIs from small, reusable components
- **Custom Hooks**: Encapsulating reusable logic (`useFetchData`, `useScroll`)
- **Protected Routes**: HOC pattern for route authentication
- **Generic Components**: Type-safe reusable components (GenericDataGrid, GenericForm)
- **Service Layer**: Centralized API calls with consistent error handling

### Routing Strategy

```typescript
// Nested routing with layout wrapper
<Route element={<MainLayout />}>
  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  
  {/* Protected user routes */}
  <Route path="/" element={<ProtectedRoute requireUser><Home /></ProtectedRoute>} />
  <Route path="/search" element={<ProtectedRoute requireUser><Search /></ProtectedRoute>} />
  <Route path="/hotel/:hotelId" element={<ProtectedRoute requireUser><Hotel /></ProtectedRoute>} />
  
  {/* Protected admin routes */}
  <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
</Route>
```

### Form Validation Pattern

All forms use **Formik + Yup** for consistent validation:

```typescript
// Yup schema example
const checkoutValidationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone is required'),
  paymentMethod: yup.string().required('Payment method is required'),
});

// Formik integration
const formik = useFormik({
  initialValues: { email: '', phone: '', paymentMethod: '' },
  validationSchema: checkoutValidationSchema,
  onSubmit: (values) => { /* handle submission */ },
});
```

---

## 🔌 API Integration

### Backend API

**Base URL**: `http://localhost:5000/api`

> **Note**: Backend cloned and running locally for development. 

### Axios Configuration

```typescript
// src/api/axiosClient.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor (adds auth token)
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Services

| Service | Endpoints | Purpose |
|---------|-----------|---------|
| **userService** | `/api/auth/authenticate` | User login, authentication |
| **homeService** | `/api/home/featured-deals`<br>`/api/home/trending`<br>`/api/home/recent-visits` | Homepage data |
| **searchService** | `/api/home/search`<br>`/api/search-results/amenities` | Hotel search, filters |
| **hotelService** | `/api/hotels/{id}`<br>`/api/hotels/{id}/rooms`<br>`/api/bookings` (reviews) | Hotel details, rooms, reviews |
| **bookingService** | `/api/bookings` | Create bookings |
| **adminService** | `/api/cities`<br>`/api/hotels`<br>`/api/rooms` | CRUD operations |

### TanStack Query Integration

```typescript
// Data fetching with caching
const { data, isLoading, error } = useQuery({
  queryKey: ['hotel', hotelId],
  queryFn: () => getHotelById(hotelId),
  staleTime: 1000 * 60 * 5, // 5 minutes
});

// Mutations with cache invalidation
const createMutation = useMutation({
  mutationFn: createCity,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cities'] });
  },
});
```

---

## 🧪 Testing Strategy

- **26 test suites** covering all major components
- **230 passing tests** with comprehensive scenarios
- **Unit tests**: Component behavior and logic
- **Storybook tests**: Visual regression testing

### Testing Libraries

- **Vitest**: Fast unit test runner with native ES modules support
- **React Testing Library**: User-centric component testing
- **@testing-library/user-event**: Realistic user interaction simulation
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

### Test Examples

```typescript
// Component rendering test
it('renders hotel details correctly', () => {
  render(<HotelCard hotel={mockHotel} />);
  expect(screen.getByText(mockHotel.hotelName)).toBeInTheDocument();
});

// User interaction test
it('handles search submission', async () => {
  const user = userEvent.setup();
  render(<SearchBar />);
  
  await user.type(screen.getByLabelText(/city/i), 'Dubai');
  await user.click(screen.getByRole('button', { name: /search/i }));
  
  expect(mockSearchFn).toHaveBeenCalledWith({ city: 'Dubai' });
});

// Form validation test
it('validates required fields', async () => {
  render(<LoginForm />);
  fireEvent.submit(screen.getByRole('button', { name: /login/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });
});
```

### Running Tests

```powershell
# Run all tests
npm test

# Run specific test file
npm test -- SearchBar.test.tsx

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

---

## 💎 Code Quality & Standards

### TypeScript Configuration

- **Strict mode enabled**: No implicit any, strict null checks
- **Path aliases**: `@/*` for clean imports
- **Project references**: Separate configs for app and build tools
- **No unused variables**: Enforced by `noUnusedLocals` and `noUnusedParameters`

### ESLint Rules

- ✅ React Hooks rules (dependencies, exhaustive-deps)
- ✅ React Refresh patterns
- ✅ JSX accessibility (a11y)
- ✅ TypeScript best practices
- ✅ Import/export consistency

### Prettier Configuration

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

### Naming Conventions

- **Components**: PascalCase (`LoginForm.tsx`)
- **Utilities/Hooks**: camelCase (`useFetchData.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Modules**: camelCase (`.hotelCard`)
- **Types/Interfaces**: PascalCase (`interface Hotel`)

### Git Commit Convention

Following **Conventional Commits** specification:

```
feat: add hotel reviews feature
fix: correct discount calculation in HotelCard
refactor: integrate Formik for form handling in Checkout
test: add comprehensive tests for AdminPage
docs: update README with API integration details
style: format code with Prettier
chore: update dependencies
```

---

## 🚀 Deployment

### Build for Production

```powershell
npm run build
```

Output: `dist/` directory with optimized production build

### GitHub Pages Deployment

```powershell
npm run deploy
```

This will:
1. Build the production version
2. Deploy to GitHub Pages
3. Make the app available at: `https://mohammadshaded.github.io/Travel-Booking`

### Environment Variables for Production

Ensure these are set in your hosting platform:

```env
VITE_API_BASE_URL=https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net
VITE_APP_NAME=Travel Booking Platform
```

### Performance Optimizations

- ✅ **Code splitting**: Lazy loading for routes
- ✅ **Tree shaking**: Unused code elimination
- ✅ **Minification**: JavaScript and CSS minification
- ✅ **Compression**: Gzip compression ready
- ✅ **Image optimization**: Optimized asset loading
- ✅ **Caching**: TanStack Query for API response caching

---

## 📚 Documentation

### Storybook

Component documentation and interactive playground:

```powershell
npm run storybook
```

Visit `http://localhost:6006` to explore:
- **Component library**: All reusable components
- **Interactive controls**: Test component props live
- **A11y testing**: Accessibility checks
- **Visual testing**: Component states and variants

---

## 🎓 Key Concepts & Technologies Applied

This project demonstrates mastery of modern front-end development concepts:

### React Concepts
- ✅ **Component Architecture**: Functional components with hooks (useState, useEffect, useCallback, useMemo)
- ✅ **Component Composition**: Building complex UIs from small, reusable pieces
- ✅ **Props & PropTypes**: Type-safe props with TypeScript interfaces
- ✅ **Conditional Rendering**: Dynamic UI based on state and conditions
- ✅ **Lists & Keys**: Efficient rendering of dynamic lists
- ✅ **Event Handling**: User interactions with proper event typing
- ✅ **Controlled Components**: Form inputs managed by React state
- ✅ **Custom Hooks**: Reusable logic extraction (useFetchData, useScroll)
- ✅ **Error Boundaries**: Graceful error handling

### Advanced Patterns
- ✅ **Higher-Order Components (HOC)**: ProtectedRoute wrapper
- ✅ **Render Props Pattern**: Flexible component composition
- ✅ **Compound Components**: Complex UI patterns (SearchBar with GuestsSelector)
- ✅ **Generic Components**: Type-safe reusable components (GenericDataGrid, GenericForm)
- ✅ **Container/Presentational**: Separating logic from presentation

### State Management
- ✅ **Local State**: useState for component-specific state
- ✅ **Global State**: Zustand for authentication and user preferences
- ✅ **Server State**: TanStack Query for API data with caching, optimistic updates
- ✅ **Form State**: Formik for complex multi-step forms
- ✅ **URL State**: React Router for navigation state

### TypeScript Features
- ✅ **Strict Type Checking**: No implicit any, strict null checks
- ✅ **Interfaces & Types**: Comprehensive type definitions (340+ lines)
- ✅ **Generics**: Type-safe reusable components and functions
- ✅ **Union Types**: Flexible type combinations (UserType, PaymentMethod)
- ✅ **Type Guards**: Runtime type checking
- ✅ **Utility Types**: Partial, Pick, Omit for type transformations

### API Integration
- ✅ **RESTful API**: Full CRUD operations
- ✅ **Axios Interceptors**: Request/response transformation
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **Loading States**: Skeleton screens and spinners
- ✅ **Caching Strategy**: TanStack Query cache management
- ✅ **Optimistic Updates**: Instant UI feedback before server response

### Form Handling
- ✅ **Formik Integration**: Declarative form state management
- ✅ **Yup Validation**: Schema-based validation
- ✅ **Custom Validation**: Business logic validation
- ✅ **Error Display**: User-friendly error messages
- ✅ **Multi-Step Forms**: Wizard pattern with state persistence
- ✅ **Conditional Fields**: Dynamic form fields based on user input

### Routing
- ✅ **Client-Side Routing**: React Router DOM v7
- ✅ **Nested Routes**: Layout wrapper pattern
- ✅ **Protected Routes**: Authentication guards
- ✅ **Dynamic Routes**: URL parameters (/hotel/:hotelId)
- ✅ **Programmatic Navigation**: useNavigate hook
- ✅ **Route Guards**: Role-based access control (User/Admin)


### Testing
- ✅ **Unit Testing**: Vitest for component logic
- ✅ **Test Coverage**: 230+ tests across 26 suites
- ✅ **Mocking**: API mocks, component mocks
- ✅ **User-Centric Testing**: Testing user behavior, not implementation
- ✅ **Accessibility Testing**: Storybook a11y addon

### Code Quality
- ✅ **Linting**: ESLint with React/TypeScript rules
- ✅ **Formatting**: Prettier for consistent code style
- ✅ **Type Safety**: TypeScript strict mode
- ✅ **Git Workflow**: Conventional commits, feature branches
- ✅ **Code Review**: PR-based development
- ✅ **Documentation**: Inline comments, README, Storybook

### CSS & Styling
- ✅ **CSS Modules**: Scoped component styling
- ✅ **CSS Variables**: Design system with custom properties
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Flexbox & Grid**: Modern layout techniques
- ✅ **Animations**: Smooth transitions and hover effects
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Build & Deployment
- ✅ **Vite**: Lightning-fast development and builds
- ✅ **GitHub Pages**: Automated deployment
- ✅ **Environment Variables**: Configuration management
- ✅ **Production Optimization**: Minification, compression, code splitting

---

## 📝 License

This project is developed as a capstone project for educational purposes at **Foothill Technology Solutions**.

---

## 👨‍💻 Author

**Mohammad Shaded**
- GitHub: [@MohammadShaded](https://github.com/MohammadShaded)
- Project: [Travel-Booking](https://github.com/MohammadShaded/Travel-Booking)

---

## 🙏 Acknowledgments

- **Foothill Technology Solutions** - For the Front-End Developer Training Program

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
