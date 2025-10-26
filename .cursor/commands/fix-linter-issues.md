# Fix Linter Issues

## Description

Automatically identify and fix common linter issues in the project.

## Steps

### 1. Check Current Linter Status

```bash
# Run ESLint to see all issues
pnpm lint

# Run TypeScript type checking
pnpm type-check

# Run Prettier formatting check
pnpm format:check
```

### 2. Auto-fix ESLint Issues

```bash
# Fix auto-fixable ESLint issues
pnpm lint:fix

# Or run ESLint directly with --fix flag
npx eslint . --ext .ts,.tsx,.js,.jsx --fix
```

### 3. Auto-fix Prettier Issues

```bash
# Format all files with Prettier
pnpm format:fix

# Or run Prettier directly
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
```

### 4. Fix TypeScript Issues

```bash
# Check for type errors
npx tsc --noEmit

# Fix common TypeScript issues
# - Add missing imports
# - Fix type annotations
# - Resolve interface mismatches
```

### 5. Common Fixes

#### Import Issues

- Add missing imports: `import { Component } from 'react'`
- Remove unused imports: Delete unused import statements
- Fix import paths: Ensure correct relative/absolute paths

#### Type Issues

- Add proper types: `const [state, setState] = useState<string>('')`
- Fix interface mismatches: Ensure props match component interface
- Add missing return types: `function handler(): void`

#### Formatting Issues

- Fix indentation: Use consistent 2-space indentation
- Fix line endings: Ensure consistent line endings
- Fix spacing: Remove extra spaces, add missing spaces

### 6. Verify Fixes

```bash
# Run all checks again
pnpm lint
pnpm type-check
pnpm format:check

# If using CI, run the full CI check
pnpm ci:check
```

### 7. Commit Clean Code

```bash
# Stage fixed files
git add .

# Commit with descriptive message
git commit -m "fix: resolve linter issues

- Fix ESLint warnings and errors
- Apply Prettier formatting
- Resolve TypeScript type issues
- Clean up unused imports"
```

## Notes

- Always run `pnpm lint:fix` before manual fixes
- Use `pnpm format:fix` for consistent code style
- Check TypeScript errors with `npx tsc --noEmit`
- Commit fixes in separate commits from feature changes
- Consider using pre-commit hooks to prevent linter issues
