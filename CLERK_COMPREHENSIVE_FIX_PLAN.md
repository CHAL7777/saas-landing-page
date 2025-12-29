# Clerk Authentication Comprehensive Fix Plan

## Issues Identified

### 1. Missing Environment Variables
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Not configured
- **CLERK_SECRET_KEY**: Not configured
- This causes module import errors and JWT token issues

### 2. Next.js Metadata Configuration
- **themeColor** and **viewport** in metadata export should be moved to viewport export
- Current: `export const metadata: Metadata = { themeColor: '#10b981', viewport: 'width=device-width, initial-scale=1' }`
- Should be: separate `export const viewport` function

### 3. Clerk Module Import Errors
- Missing module: `/node_modules/@clerk/nextjs/dist/esm/client-boundary/controlComponents`
- This suggests corrupted or missing Clerk installation

### 4. Authentication Flow Issues
- **JWT Token Expiration**: Tokens expired with clock skew detection
- **Infinite Redirect Loops**: `auth.protect()` causing redirects
- **Improper Logout**: Using `window.location.href` instead of Clerk's signOut

### 5. Middleware Configuration
- Current middleware has redirect loop issues
- Needs better error handling and redirect logic

## Fix Implementation Plan

### Phase 1: Environment Setup
1. **Install Clerk Dependencies**: Clean reinstall of @clerk/nextjs
2. **Configure Environment Variables**: Add proper Clerk keys
3. **Fix Metadata Configuration**: Move themeColor/viewport to viewport export

### Phase 2: Authentication Fix
1. **Fix AuthContext**: Use proper Clerk signOut method
2. **Update Middleware**: Add proper error handling and redirects
3. **Fix Component Imports**: Ensure all Clerk components work properly

### Phase 3: Testing & Validation
1. **Test Authentication Flow**: Sign in, protected routes, sign out
2. **Verify No Redirect Loops**: Ensure middleware works correctly
3. **Check Token Expiration**: Verify JWT handling

## Files to Update
- `.env.local` (create with Clerk keys)
- `app/layout.tsx` (fix metadata/viewport)
- `contexts/AuthContext.tsx` (fix logout method)
- `middleware.ts` (add error handling)
- `components/ClerkProvider.tsx` (add error boundaries)

## Dependencies to Update
- `@clerk/nextjs`: Reinstall latest version
- Clear node_modules and package-lock.json

## Expected Outcomes
- No more JWT expiration errors
- No more clock skew warnings
- Proper authentication flow
- No infinite redirect loops
- Working sign in/sign out functionality
- Clean console without metadata warnings
