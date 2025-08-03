# Ecommerce - AI Coding Instructions

## Architecture Overview

This is a full-stack React Native e-commerce application with:
- **Frontend**: Expo/React Native app (`/app`) with web support via `expo-router`
- **Backend**: Strapi CMS headless backend (`/server`) with SQLite database
- **Dual Development**: Run `yarn develop` (server) and `yarn start` (app) simultaneously

## Key Development Patterns

### 1. Navigation Structure
- Uses nested navigation: `TabNavigation` → `Stacks` → `Screens`
- Screen names centralized in `src/utils/screensName.js` with hierarchical structure
- All screens use `BasicLayout` wrapper with consistent header/back button patterns

### 2. Context-Based State Management
Three main contexts in `src/contexts/`:
- `AuthContext`: JWT token management, user session, auto-logout on token expiry
- `CartContext`: Local storage-based cart with AsyncStorage persistence
- `SearchContext`: Search history and product filtering

### 3. API Integration Pattern
- All API calls in `src/api/` modules with consistent naming (`*Ctrl` exports)
- `authFetch` wrapper in `src/lib/` handles JWT authorization and token expiry
- Constants in `src/utils/constants.js` - **Update API_URL for local development**
- Strapi backend endpoints follow REST conventions with `/api/` prefix

### 4. Component Organization
- `src/components/` organized by feature domains (Auth, Account, Product, etc.)
- `Shared/` components for reusable UI (Search, GridProducts, ProductBanners)
- Each component folder exports via `index.js` for clean imports

### 5. Layouts and Styling
- `BasicLayout` provides consistent header with back navigation and search
- Uses React Native Paper for UI components
- Custom styles typically co-located with components (`.styles.js` files)

## Critical Development Workflows

### Starting Development
```bash
# Terminal 1 - Start Strapi backend
yarn develop

# Terminal 2 - Start Expo app
cd app && yarn start
```

### Data Seeding
```bash
cd server && yarn seed:example
```

### Key Environment Setup
- Update `app/src/utils/constants.js` ENV.API_URL for your local IP
- Strapi admin panel: `http://localhost:1337/admin`
- Default frontend dev: `http://localhost:8081`

## Strapi Backend Specifics

### Content Types Structure
- Products: `title`, `price`, `discount`, `main_image`, `images`, `description`
- Users: Extended with addresses relationship
- Orders: Related to users and products
- Home banners: For carousel display

### Authentication Flow
- JWT tokens stored in AsyncStorage (`STORAGE.TOKEN`)
- Token expiry checked on each authenticated request
- Auto-logout redirects to auth screens

## Component Development Guidelines

### New Screen Pattern
1. Create in appropriate `src/screens/` subfolder
2. Add route to `src/utils/screensName.js`
3. Wrap with `BasicLayout` for consistency
4. Import and use relevant context hooks

### API Integration Pattern
```javascript
// In component
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await someCtrl.getAll();
      setData(response?.data || []);
    } catch (error) {
      Toast.show('Error message', { position: Toast.positions.CENTER });
    }
  };
  fetchData();
}, []);
```

### Context Usage
Always destructure needed values:
```javascript
const { user, login, logout } = useAuth();
const { addToCart, removeFromCart, cartItems } = useCart();
```

## Project-Specific Conventions

- Use functional components with hooks throughout
- Toast notifications for user feedback (react-native-root-toast)
- AsyncStorage for client-side persistence
- Formik + Yup for form handling and validation
- React Navigation v6 with type-safe screen names
- Expo Router for file-based routing in newer parts
