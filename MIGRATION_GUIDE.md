# TypeScript and Fluent UI Migration Guide

## Migration Status

I've begun the migration of your portfolio client application to TypeScript and Fluent UI. Here's what has been completed and what remains:

### ✅ Completed Tasks

1. **Dependencies Updated** ([client/package.json](client/package.json))
   - Added `@fluentui/react-components` ^9.47.0
   - Added `@fluentui/react-icons` ^2.47.0
   - Added `typescript` ^5.0.0
   - Added all necessary `@types/*` packages
   - Removed: `bootstrap`, `font-awesome`, `jquery`, `sass`

2. **TypeScript Configuration** ([client/tsconfig.json](client/tsconfig.json))
   - Created with strict mode enabled
   - Configured for React JSX

3. **Core Files Converted**
   - [src/index.tsx](client/src/index.tsx) - Added FluentProvider with webLightTheme
   - [src/App.tsx](client/src/App.tsx) - Converted with proper typing
   - [src/store.ts](client/src/store.ts) - Added RootState and AppDispatch types
   - [src/data.ts](client/src/data.ts) - Added Project interface
   - [src/hooks.ts](client/src/hooks.ts) - Created typed Redux hooks

4. **Components Converted**
   - [src/Components/SharedLayout.tsx](client/src/Components/SharedLayout.tsx)
   - [src/Components/navBar.tsx](client/src/Components/navBar.tsx)
   - [src/Components/sidebar.tsx](client/src/Components/sidebar.tsx) - Using Fluent UI icons
   - [src/Components/hamburger.tsx](client/src/Components/hamburger.tsx)
   - [src/Components/footer.tsx](client/src/Components/footer.tsx) - Using Fluent UI Link
   - [src/Components/switch.tsx](client/src/Components/switch.tsx) - Using Fluent UI Switch
   - [src/Components/ShareProjectLayout.tsx](client/src/Components/ShareProjectLayout.tsx)
   - [src/Components/SharedDatavizLayout.tsx](client/src/Components/SharedDatavizLayout.tsx) - Using Fluent UI Button

5. **Redux/Features Converted**
   - [src/features/hamburger/hamburgerSlice.ts](client/src/features/hamburger/hamburgerSlice.ts) - Added TypeScript types

6. **Pages Converted**
   - [src/pages/Home.tsx](client/src/pages/Home.tsx) - Using Fluent UI Text component

### 🔨 Remaining Tasks

1. **Pages to Convert**
   - `src/pages/About.js` → `About.tsx`
   - `src/pages/Work.js` → `Work.tsx`
   - `src/pages/Contact.js` → `Contact.tsx`
   - `src/pages/Admin.js` → `Admin.tsx`
   - `src/pages/LogInOut.js` → `LogInOut.tsx`
   - `src/pages/Project.js` → `Project.tsx`
   - `src/pages/Dataviz.js` → `Dataviz.tsx`
   - `src/pages/ErrorPage.js` → `ErrorPage.tsx`

2. **Components to Convert**
   - `src/Components/DemoLauncher.js`
   - `src/Components/form.js`
   - `src/Components/like_button.js`
   - `src/Components/logo.js`
   - `src/Components/projectsCard.js`
   - `src/Components/ProtectedRoute.js`
   - `src/Components/Sign.js`
   - `src/Components/todo.js`

3. **Project Components** (All in `src/Projects/`)
   - Convert all algorithm components
   - Convert all backend components
   - Convert all dataviz components
   - Convert all other project components

4. **Redux** (if applicable)
   - Convert actions to TypeScript
   - Convert reducers to TypeScript
   - Convert services to TypeScript

5. **Helpers/Utils**
   - `src/helpers/history.js` → `.ts`
   - `src/helpers/utils.js` → `.ts`
   - `src/utils/storage.js` → `.ts`

6. **Styling Migration**
   - Remove SCSS files or migrate to Fluent UI theming
   - Update styles to use `makeStyles` from Fluent UI

## Installation Steps

### In WSL Terminal (Ubuntu):

```bash
# Navigate to client directory
cd ~/apps/portfolio/client

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Key Changes to Note

### 1. Fluent UI Styling
Instead of SCSS, we now use Fluent UI's `makeStyles`:

```typescript
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    padding: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const MyComponent = () => {
  const styles = useStyles();
  return <div className={styles.container}>Content</div>;
};
```

### 2. Fluent UI Components
Common replacements:
- `<div>` buttons → `<Button>` from Fluent UI
- Font Awesome icons → Fluent UI icons from `@fluentui/react-icons`
- Bootstrap classes → Fluent UI components + makeStyles
- `<a>` links → `<Link>` from Fluent UI

### 3. Redux Hooks
Use typed hooks instead of raw Redux hooks:

```typescript
import { useAppDispatch, useAppSelector } from '../hooks';

// Instead of:
// const dispatch = useDispatch();
// const state = useSelector(state => state.hamburger);

// Use:
const dispatch = useAppDispatch();
const state = useAppSelector(state => state.hamburger);
```

### 4. Component Props
All components now have explicit prop types:

```typescript
interface MyComponentProps {
  title: string;
  count?: number; // optional
  onSave: (data: string) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, count = 0, onSave }) => {
  // ...
};
```

## Next Steps

1. **Install dependencies** (run `npm install` in WSL terminal in client directory)
2. **Test the application** with `npm run dev`
3. **Fix any remaining import errors** (old `.js` extensions referencing new `.tsx` files)
4. **Continue converting remaining pages and components**
5. **Remove old `.js` files** once their `.tsx` counterparts are working
6. **Update SCSS** or remove if fully replaced by Fluent UI styling

## Common Issues & Solutions

### Import Errors
If you see "Cannot find module" errors:
- Update imports to use `.tsx` or `.ts` extensions where needed
- Some imports may need adjustment based on new file structure

### Type Errors
- Add proper types for all function parameters
- Use `interface` for component props and data structures
- Utilize TypeScript's type inference where possible

### Styling Issues
- Fluent UI uses CSS-in-JS, not SCSS
- Use `makeStyles` for custom styles
- Use `tokens` for consistent theming (colors, spacing, etc.)

## Resources

- [Fluent UI React Documentation](https://react.fluentui.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Note**: The migration is substantial. I recommend testing each converted component individually and converting the remaining files systematically, starting with the pages, then the smaller components.
