'use strict';

// Middle darajadagi mavzular skeleti

module.exports = [
  // JavaScript Advanced (15)
  { title: 'Closures', slug: 'closures', importance: 10, difficulty: 'hard', estimatedMinutes: 50, tags: ['javascript', 'closures', 'scope'], category: 'JavaScript Advanced' },
  { title: 'Scope (lexical, block, function)', slug: 'scope', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['javascript', 'scope'], category: 'JavaScript Advanced' },
  { title: 'Hoisting', slug: 'hoisting', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['javascript'], category: 'JavaScript Advanced' },
  { title: 'this binding (call, apply, bind)', slug: 'this-binding', importance: 10, difficulty: 'hard', estimatedMinutes: 45, tags: ['javascript'], category: 'JavaScript Advanced' },
  { title: 'Prototype Chain va Inheritance', slug: 'prototype-chain', importance: 9, difficulty: 'hard', estimatedMinutes: 50, tags: ['javascript', 'oop'], category: 'JavaScript Advanced' },
  { title: 'Classes va class inheritance', slug: 'classes', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['javascript', 'oop', 'es6'], category: 'JavaScript Advanced' },
  { title: 'Promises (chuqur)', slug: 'promises-deep', importance: 10, difficulty: 'hard', estimatedMinutes: 50, tags: ['javascript', 'async'], category: 'JavaScript Advanced' },
  { title: 'async/await', slug: 'async-await', importance: 10, difficulty: 'medium', estimatedMinutes: 40, tags: ['javascript', 'async'], category: 'JavaScript Advanced' },
  { title: 'Event Loop', slug: 'event-loop', importance: 10, difficulty: 'hard', estimatedMinutes: 60, tags: ['javascript', 'async'], category: 'JavaScript Advanced' },
  { title: 'Microtasks va Macrotasks', slug: 'microtask-macrotask', importance: 9, difficulty: 'hard', estimatedMinutes: 40, tags: ['javascript', 'async'], category: 'JavaScript Advanced' },
  { title: 'Generators va Iterators', slug: 'generators', importance: 6, difficulty: 'hard', estimatedMinutes: 40, tags: ['javascript', 'es6'], category: 'JavaScript Advanced' },
  { title: 'Symbols', slug: 'symbols', importance: 5, difficulty: 'medium', estimatedMinutes: 25, tags: ['javascript', 'es6'], category: 'JavaScript Advanced' },
  { title: 'Map va Set', slug: 'map-set', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['javascript', 'es6'], category: 'JavaScript Advanced' },
  { title: 'Proxy va Reflect', slug: 'proxy-reflect', importance: 5, difficulty: 'hard', estimatedMinutes: 35, tags: ['javascript', 'es6'], category: 'JavaScript Advanced' },
  { title: 'Modules (ESM vs CJS)', slug: 'modules', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['javascript', 'modules'], category: 'JavaScript Advanced' },

  // React Advanced (15)
  { title: 'useEffect (chuqur: cleanup, dependencies)', slug: 'useeffect-deep', importance: 10, difficulty: 'hard', estimatedMinutes: 50, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'useMemo', slug: 'usememo', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['react', 'hooks', 'performance'], category: 'React Advanced' },
  { title: 'useCallback', slug: 'usecallback', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['react', 'hooks', 'performance'], category: 'React Advanced' },
  { title: 'useRef', slug: 'useref', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'useReducer', slug: 'usereducer', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'useContext va Context API', slug: 'usecontext', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['react', 'hooks', 'context'], category: 'React Advanced' },
  { title: 'useLayoutEffect', slug: 'uselayouteffect', importance: 6, difficulty: 'hard', estimatedMinutes: 30, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'useImperativeHandle va forwardRef', slug: 'useimperativehandle', importance: 5, difficulty: 'hard', estimatedMinutes: 30, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'Custom Hooks', slug: 'custom-hooks', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['react', 'hooks'], category: 'React Advanced' },
  { title: 'Refs Forwarding', slug: 'refs-forwarding', importance: 6, difficulty: 'medium', estimatedMinutes: 25, tags: ['react'], category: 'React Advanced' },
  { title: 'Portals', slug: 'portals', importance: 6, difficulty: 'medium', estimatedMinutes: 25, tags: ['react'], category: 'React Advanced' },
  { title: 'Error Boundaries', slug: 'error-boundaries', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['react'], category: 'React Advanced' },
  { title: 'Render Props pattern', slug: 'render-props', importance: 5, difficulty: 'medium', estimatedMinutes: 25, tags: ['react', 'patterns'], category: 'React Advanced' },
  { title: 'Higher-Order Components (HOC)', slug: 'hoc', importance: 6, difficulty: 'medium', estimatedMinutes: 30, tags: ['react', 'patterns'], category: 'React Advanced' },
  { title: 'Compound Components pattern', slug: 'compound-components', importance: 7, difficulty: 'hard', estimatedMinutes: 35, tags: ['react', 'patterns'], category: 'React Advanced' },

  // TypeScript (8)
  { title: 'TypeScript asoslari', slug: 'typescript-basics', importance: 10, difficulty: 'medium', estimatedMinutes: 45, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Types vs Interfaces', slug: 'types-vs-interfaces', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Generics', slug: 'generics', importance: 9, difficulty: 'hard', estimatedMinutes: 45, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Utility Types (Partial, Pick, Omit, Record)', slug: 'utility-types', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Type Guards va Narrowing', slug: 'type-guards', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Discriminated Unions', slug: 'discriminated-unions', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Mapped va Conditional Types', slug: 'mapped-conditional-types', importance: 6, difficulty: 'hard', estimatedMinutes: 40, tags: ['typescript'], category: 'TypeScript' },
  { title: 'Declaration Files (.d.ts)', slug: 'declaration-files', importance: 5, difficulty: 'medium', estimatedMinutes: 25, tags: ['typescript'], category: 'TypeScript' },

  // Next.js (12)
  { title: 'Next.js App Router vs Pages Router', slug: 'next-app-vs-pages', importance: 10, difficulty: 'medium', estimatedMinutes: 40, tags: ['nextjs'], category: 'Next.js' },
  { title: 'React Server Components (RSC)', slug: 'rsc', importance: 10, difficulty: 'hard', estimatedMinutes: 60, tags: ['nextjs', 'react'], category: 'Next.js' },
  { title: 'Server Actions', slug: 'server-actions', importance: 9, difficulty: 'medium', estimatedMinutes: 45, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Routing (App Router)', slug: 'next-routing', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Layouts va Templates', slug: 'next-layouts', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Loading va Error UI', slug: 'next-loading-error', importance: 7, difficulty: 'medium', estimatedMinutes: 25, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Middleware', slug: 'next-middleware', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Data Fetching strategiyalari', slug: 'next-data-fetching', importance: 10, difficulty: 'hard', estimatedMinutes: 55, tags: ['nextjs'], category: 'Next.js' },
  { title: 'Caching (fetch, route, full-route)', slug: 'next-caching', importance: 9, difficulty: 'hard', estimatedMinutes: 50, tags: ['nextjs', 'performance'], category: 'Next.js' },
  { title: 'Streaming va Suspense', slug: 'next-streaming', importance: 8, difficulty: 'hard', estimatedMinutes: 40, tags: ['nextjs', 'react'], category: 'Next.js' },
  { title: 'ISR / SSG / SSR / CSR', slug: 'rendering-strategies', importance: 10, difficulty: 'medium', estimatedMinutes: 45, tags: ['nextjs'], category: 'Next.js' },
  { title: 'API Routes va Route Handlers', slug: 'next-api-routes', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['nextjs'], category: 'Next.js' },

  // State Management (5)
  { title: 'Redux Toolkit', slug: 'redux-toolkit', importance: 9, difficulty: 'medium', estimatedMinutes: 50, tags: ['state', 'redux'], category: 'State Management' },
  { title: 'Zustand', slug: 'zustand', importance: 7, difficulty: 'easy', estimatedMinutes: 30, tags: ['state'], category: 'State Management' },
  { title: 'Jotai (atomic state)', slug: 'jotai', importance: 5, difficulty: 'medium', estimatedMinutes: 30, tags: ['state'], category: 'State Management' },
  { title: 'Tanstack Query (React Query)', slug: 'tanstack-query', importance: 9, difficulty: 'medium', estimatedMinutes: 50, tags: ['state', 'data-fetching'], category: 'State Management' },
  { title: 'Context API vs External state', slug: 'context-vs-external', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['state', 'react'], category: 'State Management' },

  // Performance (8)
  { title: 'React.memo', slug: 'react-memo', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['react', 'performance'], category: 'Performance' },
  { title: 'useMemo va useCallback (performance)', slug: 'memo-callback-perf', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['react', 'performance'], category: 'Performance' },
  { title: 'Code Splitting va Dynamic Imports', slug: 'code-splitting', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['performance', 'bundler'], category: 'Performance' },
  { title: 'Lazy Loading (React.lazy, Suspense)', slug: 'lazy-loading', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['react', 'performance'], category: 'Performance' },
  { title: 'List Virtualization', slug: 'virtualization', importance: 7, difficulty: 'hard', estimatedMinutes: 40, tags: ['react', 'performance'], category: 'Performance' },
  { title: 'Web Vitals (LCP, FID/INP, CLS)', slug: 'web-vitals', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['performance'], category: 'Performance' },
  { title: 'Bundle Analysis va Optimization', slug: 'bundle-analysis', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['performance', 'bundler'], category: 'Performance' },
  { title: 'Image Optimization', slug: 'image-optimization', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['performance'], category: 'Performance' },
];
