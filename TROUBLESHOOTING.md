# Troubleshooting Guide

## Common Issues and Solutions

### 1. Hydration Errors

**Symptom**: Console shows "A tree hydrated but some attributes didn't match"

**Solution**: ✅ Already fixed!
- We've implemented comprehensive hydration error prevention
- See `HYDRATION_FIX.md` for details

**If it persists**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Disable browser extensions temporarily
3. Hard refresh (Ctrl+Shift+R)

---

### 2. Tailwind Styles Not Loading

**Symptom**: Page appears unstyled or with default browser styles

**Solution**:
```bash
# Restart the dev server
npm run dev
```

**If it persists**:
1. Check `postcss.config.js` has `@tailwindcss/postcss`
2. Verify `globals.css` has `@import "tailwindcss"`
3. Clear `.next` folder and restart:
```bash
rm -rf .next
npm run dev
```

---

### 3. Module Not Found Errors

**Symptom**: "Cannot find module '@/components/...'"

**Solution**:
1. Check `tsconfig.json` has correct path aliases
2. Restart TypeScript server in VS Code:
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

---

### 4. Charts Not Rendering

**Symptom**: Empty space where charts should be

**Solution**:
1. Verify Recharts is installed:
```bash
npm install recharts
```

2. Check browser console for errors
3. Ensure components have `'use client'` directive

---

### 5. Build Errors

**Symptom**: Build fails with errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

---

### 6. Port Already in Use

**Symptom**: "Port 3000 is already in use"

**Solution** (Windows):
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Or use a different port
npm run dev -- -p 3001
```

**Solution** (Mac/Linux):
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

---

### 7. TypeScript Errors

**Symptom**: Red squiggly lines in VS Code

**Solution**:
1. Ensure all dependencies are installed
2. Restart TypeScript server (see #3)
3. Check `tsconfig.json` is correct
4. Run type check:
```bash
npx tsc --noEmit
```

---

### 8. Slow Performance

**Symptom**: Page loads slowly or feels laggy

**Solution**:
1. Check if you're in development mode (normal to be slower)
2. Build for production to test real performance:
```bash
npm run build
npm start
```

3. Disable React Strict Mode temporarily in `next.config.js`:
```js
const nextConfig = {
  reactStrictMode: false, // Only for testing
};
```

---

### 9. Browser Extension Conflicts

**Symptom**: Unexpected behavior or console errors

**Solution**:
1. Open in Incognito/Private mode (disables most extensions)
2. Disable extensions one by one to find the culprit
3. Common problematic extensions:
   - Dark Reader
   - Grammarly
   - Ad blockers
   - Developer tools extensions

---

### 10. Environment Issues

**Symptom**: "Node version not supported" or similar

**Solution**:
1. Check Node.js version:
```bash
node --version
```

2. Ensure you have Node.js 18+ installed
3. Update if needed from [nodejs.org](https://nodejs.org)

---

## Quick Fixes Checklist

When something goes wrong, try these in order:

1. ✅ **Hard refresh**: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. ✅ **Clear cache**: Browser DevTools → Application → Clear storage
3. ✅ **Restart server**: Stop and run `npm run dev` again
4. ✅ **Clear .next folder**: `rm -rf .next` then restart
5. ✅ **Reinstall dependencies**: `rm -rf node_modules && npm install`
6. ✅ **Check console**: Look for specific error messages
7. ✅ **Disable extensions**: Test in Incognito mode
8. ✅ **Update packages**: `npm update`

---

## Getting Help

If issues persist:

1. **Check the error message** - Most errors are self-explanatory
2. **Search the error** - Copy exact error message to Google
3. **Check Next.js docs** - [nextjs.org/docs](https://nextjs.org/docs)
4. **Check Tailwind docs** - [tailwindcss.com/docs](https://tailwindcss.com/docs)
5. **Check Recharts docs** - [recharts.org](https://recharts.org)

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Debugging
npm run lint             # Check for linting errors
npx tsc --noEmit        # Check TypeScript errors

# Cleanup
rm -rf .next            # Clear Next.js cache
rm -rf node_modules     # Remove dependencies
npm install             # Reinstall dependencies

# Port management
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000 (Mac/Linux)
taskkill /F /IM node.exe       # Kill all Node processes (Windows)
```

---

**Last Updated**: After hydration error fix
**Status**: All known issues resolved ✅
