# Portfolio Improvement Roadmap

This document outlines recommended improvements for the Santiago Kirk Portfolio website.

---

## 🔴 Critical Issues (High Priority)

### 1. Update Dependencies
**Priority**: URGENT
**Effort**: Medium
**Impact**: High (Security, Performance, Features)

Current versions are significantly outdated:

| Package | Current | Latest | Type |
|---------|---------|--------|------|
| React | 18.2.0 | 19.2.4 | Major update |
| React DOM | 18.2.0 | 19.2.4 | Major update |
| Next.js | 14.2.2 | 16.1.6 | 2 Major versions |
| TypeScript | 5.1.6 | 5.9.3 | Minor updates |
| Tailwind CSS | 3.4.3 | 4.1.18 | Major update |
| @headlessui/react | 2.0.3 | 2.2.9 | Minor updates |
| FontAwesome (all) | 6.5.2 | 7.2.0 | Major update |
| AWS SDK | 3.583.0 | 3.989.0 | Minor updates |

**Action Items**:
- [x] Review Next.js 15 and 16 migration guides
- [x] Review React 19 breaking changes
- [x] Review Tailwind CSS 4 migration guide
- [x] Update dependencies incrementally (test after each major update)
- [x] Run full test suite after updates
- [x] Update any deprecated API usage

**Commands**:
```bash
npm outdated
npm update
# For major versions:
npm install react@latest react-dom@latest
npm install next@latest
npm install tailwindcss@latest
```

---

### 2. Remove Debug Code
**Priority**: HIGH
**Effort**: Low
**Impact**: Medium (Performance, Console Cleanliness)

**Location**: `src/pages/index.tsx:15`

**Issue**: `console.log(entry)` in production code

**Action**:
- [ ] Remove console.log from IntersectionObserver callback
- [ ] Search entire codebase for other console.log/warn/error statements
- [ ] Consider adding ESLint rule to prevent console statements

```bash
# Search for console statements
grep -r "console\." src/
```

---

### 3. Security: Exposed R2 Bucket URL
**Priority**: HIGH
**Effort**: Low
**Impact**: High (Security)

**Location**: `src/utils/resources.tsx:2-4`

**Issue**: Public R2 bucket URL hardcoded in client-side code

**Action**:
- [ ] Move R2_BUCKET to environment variable
- [ ] Add .env.example file with placeholder
- [ ] Update documentation about required env vars
- [ ] Consider using Next.js Image Loader for CDN URLs

**Implementation**:
```typescript
// .env.local
NEXT_PUBLIC_R2_BUCKET=https://your-bucket-url.r2.dev

// src/utils/resources.tsx
export const R2_BUCKET = process.env.NEXT_PUBLIC_R2_BUCKET || '';
```

---

### 4. Remove Dead Code
**Priority**: MEDIUM
**Effort**: Low
**Impact**: Low (Code Cleanliness)

**Location**: `src/components/projects.tsx:16-51`

**Issue**: Unused `Example` component

**Action**:
- [ ] Remove the unused Example component
- [ ] Run build to ensure nothing breaks
- [ ] Search for other unused components/functions

---

### 5. Fix Accessibility Issues
**Priority**: HIGH
**Effort**: Medium
**Impact**: High (Accessibility, SEO)

**Issues**:
1. Missing alt text on images (`src/components/contact.tsx:99-100`)
2. Form inconsistency: required fields with "optional" placeholder
3. No skip-to-content link
4. Missing semantic HTML in some sections
5. No ARIA labels for icon buttons

**Action Items**:
- [ ] Add descriptive alt text to all images
- [ ] Fix contact form placeholder text
- [ ] Add skip navigation link
- [ ] Use semantic HTML (`<main>`, `<section>`, `<article>`)
- [ ] Add ARIA labels to icon-only buttons
- [ ] Add focus indicators for keyboard navigation
- [ ] Test with screen reader
- [ ] Run Lighthouse accessibility audit

---

## 🟡 Code Quality Issues (Medium Priority)

### 6. Improve Type Safety
**Priority**: MEDIUM
**Effort**: Low
**Impact**: Medium (Code Quality, Developer Experience)

**Issues**:
- `src/components/experience.tsx:7` - `projectMobile?: any`
- `src/components/header.tsx:138` - `event: any`
- `src/pages/index.tsx:10` - `FC<{}>` (empty object type)

**Action**:
- [ ] Replace `any` types with proper types
- [ ] Add proper React event types
- [ ] Create interfaces for all component props
- [ ] Enable stricter TypeScript rules

**Example**:
```typescript
// Instead of
const handleClose = (event: any) => {}

// Use
const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {}

// Instead of
projectMobile?: any

// Use
projectMobile?: string | React.ReactNode
```

---

### 7. Fix Data Inconsistency
**Priority**: MEDIUM
**Effort**: Low
**Impact**: Medium (UX Consistency)

**Location**: `src/components/experience.tsx:98`

**Issue**: Desktop shows newest-first, mobile shows oldest-first

**Action**:
- [ ] Decide on consistent ordering (recommend newest-first)
- [ ] Apply same ordering to both desktop and mobile views

---

### 8. Improve Error Handling
**Priority**: MEDIUM
**Effort**: Medium
**Impact**: Medium (UX)

**Issues**:
- Contact form has no error handling for failed submissions
- No user feedback for network errors
- No loading states in some components

**Action Items**:
- [ ] Add try-catch blocks in contact form
- [ ] Show user-friendly error messages
- [ ] Add toast/notification system
- [ ] Add error boundaries for React components
- [ ] Log errors to monitoring service (optional)

---

## 🟢 Enhancement Opportunities (Nice to Have)

### 9. SEO Improvements
**Priority**: MEDIUM
**Effort**: Medium
**Impact**: High (Discoverability)

**Current Issues**:
- Typo in meta description: "portafolio" → "portfolio"
- Missing Open Graph tags
- Missing Twitter Card tags
- No structured data (JSON-LD)
- Missing sitemap.xml
- Missing robots.txt

**Action Items**:
- [ ] Fix typo in meta description
- [ ] Add Open Graph meta tags
- [ ] Add Twitter Card meta tags
- [ ] Add JSON-LD structured data for Person/Portfolio
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Add canonical URLs
- [ ] Improve meta descriptions for each section

**Example**:
```tsx
<Head>
  <title>Santiago Kirk - Front-End Developer Portfolio</title>
  <meta name="description" content="Portfolio of Santiago Kirk, a Front-End Developer specializing in React, TypeScript, and modern web technologies." />

  {/* Open Graph */}
  <meta property="og:title" content="Santiago Kirk - Front-End Developer" />
  <meta property="og:description" content="Portfolio showcasing web development projects" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:url" content="https://yourwebsite.com" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Santiago Kirk - Front-End Developer" />
</Head>
```

---

### 10. Performance Optimizations
**Priority**: MEDIUM
**Effort**: Medium
**Impact**: Medium (UX, SEO)

**Opportunities**:
1. Lazy load images below the fold
2. Code split game pages
3. Add loading skeletons
4. Optimize images (WebP format)
5. Add service worker for offline support
6. Implement font optimization

**Action Items**:
- [ ] Use Next.js Image component everywhere
- [ ] Add dynamic imports for heavy components
- [ ] Implement intersection observer for lazy loading
- [ ] Convert images to WebP
- [ ] Add loading states/skeletons
- [ ] Run Lighthouse performance audit
- [ ] Add Web Vitals tracking

---

### 11. UX Improvements
**Priority**: MEDIUM
**Effort**: Medium
**Impact**: Medium (User Experience)

**Suggestions**:
- [ ] Add dark mode toggle
- [ ] Improve mobile navigation animation
- [ ] Add project filtering/tags
- [ ] Add smooth scroll behavior
- [ ] Add micro-interactions and hover effects
- [ ] Add testimonials section (if available)
- [ ] Add resume download button
- [ ] Add "Back to top" button
- [ ] Improve form validation UX

---

### 12. Missing Features
**Priority**: LOW-MEDIUM
**Effort**: Medium-High
**Impact**: Medium

**Features to Consider**:
- [ ] Dark mode (very common in modern portfolios)
- [ ] Analytics integration (Google Analytics, Plausible, etc.)
- [ ] Blog section
- [ ] Case studies for projects
- [ ] Animations library (Framer Motion)
- [ ] Custom 404 page with design
- [ ] i18n support (English/Spanish)
- [ ] Contact form with validation library (Zod/Yup)

---

### 13. Code Organization
**Priority**: LOW
**Effort**: Medium
**Impact**: Low (Developer Experience)

**Improvements**:
- [ ] Split desktop/mobile components into separate files
- [ ] Move hardcoded data to JSON files or CMS
- [ ] Create `constants/` directory
- [ ] Create `types/` directory for TypeScript interfaces
- [ ] Organize styles better (CSS modules or styled-components)
- [ ] Add component documentation (Storybook optional)
- [ ] Create `hooks/` directory (already have one hook)
- [ ] Add `utils/` for helper functions

**Suggested Structure**:
```
src/
├── components/
│   ├── common/
│   ├── sections/
│   └── layout/
├── constants/
├── types/
├── hooks/
├── utils/
├── data/
│   ├── projects.json
│   └── experience.json
├── styles/
└── pages/
```

---

### 14. Testing
**Priority**: LOW
**Effort**: High
**Impact**: Medium (Code Quality, Confidence)

**Action Items**:
- [ ] Set up Jest and React Testing Library
- [ ] Add unit tests for components
- [ ] Add integration tests for forms
- [ ] Add E2E tests with Playwright
- [ ] Set up test coverage reporting
- [ ] Add tests to CI/CD pipeline

---

### 15. Build & Deploy Improvements
**Priority**: MEDIUM
**Effort**: Low-Medium
**Impact**: Medium (Developer Experience)

**Issues**:
- `/out` directory is committed (should be in .gitignore)
- Missing `.env.example` file
- No CI/CD configuration
- No build optimization configuration

**Action Items**:
- [ ] Add `/out` to .gitignore
- [ ] Remove `/out` from git history
- [ ] Create `.env.example` file
- [ ] Set up GitHub Actions for CI/CD
- [ ] Add pre-commit hooks (Husky + lint-staged)
- [ ] Configure build optimization
- [ ] Add deployment documentation

**.gitignore additions**:
```
# build output
/out
/.next

# environment
.env*.local
.env

# cache
.next/cache
```

---

## 📊 Implementation Priority

### Phase 1: Critical Fixes (Week 1)
1. Remove console.log
2. Fix security issue (R2 bucket)
3. Remove dead code
4. Fix basic accessibility issues
5. Fix type safety issues

### Phase 2: Dependencies & Quality (Week 2)
1. Update dependencies (test thoroughly)
2. Improve error handling
3. Fix data inconsistencies
4. Add basic SEO improvements

### Phase 3: Enhancements (Week 3-4)
1. Add dark mode
2. Improve performance
3. Add analytics
4. Improve UX
5. Better code organization

### Phase 4: Long-term (Month 2+)
1. Add testing
2. Set up CI/CD
3. Add blog/case studies
4. Consider CMS integration

---

## 📝 Notes

- Always test changes locally before deploying
- Keep the README.md updated with setup instructions
- Document any breaking changes
- Consider setting up a staging environment
- Keep dependencies updated regularly (monthly check)

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Migration Guide](https://react.dev/)
- [Tailwind CSS 4 Migration](https://tailwindcss.com/)
- [Web.dev - Performance](https://web.dev/performance/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Last Updated**: 2026-02-12
**Status**: Pending Implementation
