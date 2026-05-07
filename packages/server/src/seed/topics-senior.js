'use strict';

// Senior darajadagi mavzular skeleti

module.exports = [
  // JavaScript Internals (10)
  { title: 'V8 Engine Internals', slug: 'v8-internals', importance: 7, difficulty: 'hard', estimatedMinutes: 50, tags: ['javascript', 'internals'], category: 'JS Internals' },
  { title: 'JIT Compilation', slug: 'jit-compilation', importance: 6, difficulty: 'hard', estimatedMinutes: 40, tags: ['javascript', 'internals'], category: 'JS Internals' },
  { title: 'Memory Management va Garbage Collection', slug: 'memory-gc', importance: 8, difficulty: 'hard', estimatedMinutes: 45, tags: ['javascript', 'memory'], category: 'JS Internals' },
  { title: 'Memory Leaks (qanday topish va tuzatish)', slug: 'memory-leaks', importance: 9, difficulty: 'hard', estimatedMinutes: 45, tags: ['javascript', 'memory'], category: 'JS Internals' },
  { title: 'WeakMap va WeakSet', slug: 'weakmap-weakset', importance: 6, difficulty: 'hard', estimatedMinutes: 30, tags: ['javascript', 'memory'], category: 'JS Internals' },
  { title: 'Tail Call Optimization', slug: 'tail-call', importance: 4, difficulty: 'hard', estimatedMinutes: 25, tags: ['javascript'], category: 'JS Internals' },
  { title: 'Module Resolution Algorithms', slug: 'module-resolution', importance: 6, difficulty: 'hard', estimatedMinutes: 35, tags: ['javascript', 'modules'], category: 'JS Internals' },
  { title: 'Tree Shaking', slug: 'tree-shaking', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['bundler', 'performance'], category: 'JS Internals' },
  { title: 'Polyfills va Transpilation (Babel, SWC)', slug: 'polyfills-transpilation', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['tools', 'compatibility'], category: 'JS Internals' },
  { title: 'Browser Compatibility strategiyalari', slug: 'browser-compat', importance: 6, difficulty: 'medium', estimatedMinutes: 30, tags: ['browser', 'compatibility'], category: 'JS Internals' },

  // React Internals (8)
  { title: 'Reconciliation', slug: 'reconciliation', importance: 9, difficulty: 'hard', estimatedMinutes: 50, tags: ['react', 'internals'], category: 'React Internals' },
  { title: 'Fiber Architecture', slug: 'fiber', importance: 9, difficulty: 'hard', estimatedMinutes: 60, tags: ['react', 'internals'], category: 'React Internals' },
  { title: 'Diffing Algorithm', slug: 'diffing', importance: 8, difficulty: 'hard', estimatedMinutes: 35, tags: ['react', 'internals'], category: 'React Internals' },
  { title: 'Concurrent React Features', slug: 'concurrent-react', importance: 9, difficulty: 'hard', estimatedMinutes: 50, tags: ['react', 'internals'], category: 'React Internals' },
  { title: 'Suspense (chuqur)', slug: 'suspense-deep', importance: 8, difficulty: 'hard', estimatedMinutes: 40, tags: ['react'], category: 'React Internals' },
  { title: 'useTransition va useDeferredValue', slug: 'transitions', importance: 7, difficulty: 'hard', estimatedMinutes: 35, tags: ['react'], category: 'React Internals' },
  { title: 'Hydration va Hydration Errors', slug: 'hydration', importance: 9, difficulty: 'hard', estimatedMinutes: 40, tags: ['react', 'ssr'], category: 'React Internals' },
  { title: 'RSC Internals (qanday ishlaydi)', slug: 'rsc-internals', importance: 8, difficulty: 'hard', estimatedMinutes: 50, tags: ['react', 'rsc'], category: 'React Internals' },

  // Architecture & Design (12)
  { title: 'Component Design Patterns', slug: 'component-patterns', importance: 9, difficulty: 'medium', estimatedMinutes: 45, tags: ['architecture', 'patterns'], category: 'Architecture' },
  { title: 'Folder Structure va Code Organization', slug: 'folder-structure', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['architecture'], category: 'Architecture' },
  { title: 'Monorepo (Turborepo, Nx)', slug: 'monorepo', importance: 8, difficulty: 'medium', estimatedMinutes: 45, tags: ['architecture', 'tooling'], category: 'Architecture' },
  { title: 'Micro-Frontends', slug: 'micro-frontends', importance: 7, difficulty: 'hard', estimatedMinutes: 50, tags: ['architecture'], category: 'Architecture' },
  { title: 'Module Federation', slug: 'module-federation', importance: 6, difficulty: 'hard', estimatedMinutes: 45, tags: ['architecture', 'webpack'], category: 'Architecture' },
  { title: 'Design Systems', slug: 'design-systems', importance: 8, difficulty: 'medium', estimatedMinutes: 45, tags: ['architecture', 'ui'], category: 'Architecture' },
  { title: 'BFF (Backend for Frontend) pattern', slug: 'bff', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['architecture'], category: 'Architecture' },
  { title: 'Feature-Sliced Design', slug: 'fsd', importance: 7, difficulty: 'medium', estimatedMinutes: 40, tags: ['architecture'], category: 'Architecture' },
  { title: 'Clean Architecture (frontend)', slug: 'clean-architecture-fe', importance: 7, difficulty: 'hard', estimatedMinutes: 45, tags: ['architecture'], category: 'Architecture' },
  { title: 'DDD (Domain-Driven Design)', slug: 'ddd', importance: 6, difficulty: 'hard', estimatedMinutes: 50, tags: ['architecture'], category: 'Architecture' },
  { title: 'SOLID principles in Frontend', slug: 'solid-frontend', importance: 8, difficulty: 'medium', estimatedMinutes: 40, tags: ['architecture', 'principles'], category: 'Architecture' },
  { title: 'Dependency Injection', slug: 'dependency-injection', importance: 6, difficulty: 'medium', estimatedMinutes: 30, tags: ['architecture', 'patterns'], category: 'Architecture' },

  // Testing (8)
  { title: 'Unit Tests (Vitest/Jest)', slug: 'unit-tests', importance: 9, difficulty: 'medium', estimatedMinutes: 45, tags: ['testing'], category: 'Testing' },
  { title: 'React Testing Library', slug: 'rtl', importance: 9, difficulty: 'medium', estimatedMinutes: 50, tags: ['testing', 'react'], category: 'Testing' },
  { title: 'Integration Tests', slug: 'integration-tests', importance: 8, difficulty: 'medium', estimatedMinutes: 40, tags: ['testing'], category: 'Testing' },
  { title: 'E2E Tests (Playwright/Cypress)', slug: 'e2e-tests', importance: 8, difficulty: 'medium', estimatedMinutes: 50, tags: ['testing'], category: 'Testing' },
  { title: 'Visual Regression Testing', slug: 'visual-regression', importance: 5, difficulty: 'medium', estimatedMinutes: 30, tags: ['testing'], category: 'Testing' },
  { title: 'Mocking strategiyalari (MSW)', slug: 'mocking', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['testing'], category: 'Testing' },
  { title: 'Test Pyramid', slug: 'test-pyramid', importance: 7, difficulty: 'easy', estimatedMinutes: 25, tags: ['testing', 'theory'], category: 'Testing' },
  { title: 'TDD vs BDD', slug: 'tdd-bdd', importance: 6, difficulty: 'medium', estimatedMinutes: 30, tags: ['testing', 'theory'], category: 'Testing' },

  // Performance Deep (8)
  { title: 'Critical Rendering Path', slug: 'crp', importance: 9, difficulty: 'hard', estimatedMinutes: 45, tags: ['browser', 'performance'], category: 'Performance Deep' },
  { title: 'Reflow va Repaint', slug: 'reflow-repaint', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['browser', 'performance'], category: 'Performance Deep' },
  { title: 'GPU Acceleration', slug: 'gpu-acceleration', importance: 6, difficulty: 'hard', estimatedMinutes: 30, tags: ['browser', 'performance'], category: 'Performance Deep' },
  { title: 'Service Workers va PWA', slug: 'service-workers', importance: 7, difficulty: 'hard', estimatedMinutes: 50, tags: ['browser', 'pwa'], category: 'Performance Deep' },
  { title: 'Web Workers', slug: 'web-workers', importance: 7, difficulty: 'hard', estimatedMinutes: 40, tags: ['browser'], category: 'Performance Deep' },
  { title: 'IndexedDB', slug: 'indexeddb', importance: 6, difficulty: 'medium', estimatedMinutes: 35, tags: ['browser', 'storage'], category: 'Performance Deep' },
  { title: 'Streaming SSR', slug: 'streaming-ssr', importance: 7, difficulty: 'hard', estimatedMinutes: 40, tags: ['ssr', 'performance'], category: 'Performance Deep' },
  { title: 'Edge Runtime', slug: 'edge-runtime', importance: 6, difficulty: 'medium', estimatedMinutes: 30, tags: ['nextjs', 'edge'], category: 'Performance Deep' },

  // Security (6)
  { title: 'XSS (Cross-Site Scripting)', slug: 'xss', importance: 10, difficulty: 'medium', estimatedMinutes: 35, tags: ['security'], category: 'Security' },
  { title: 'CSRF (Cross-Site Request Forgery)', slug: 'csrf', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['security'], category: 'Security' },
  { title: 'CSP (Content Security Policy)', slug: 'csp', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['security'], category: 'Security' },
  { title: 'CORS', slug: 'cors', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['security', 'http'], category: 'Security' },
  { title: 'Authentication (JWT, OAuth, Session)', slug: 'authentication', importance: 10, difficulty: 'hard', estimatedMinutes: 60, tags: ['security', 'auth'], category: 'Security' },
  { title: 'HTTPS, TLS, Certificates', slug: 'https-tls', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['security', 'http'], category: 'Security' },

  // System Design (Frontend) (8)
  { title: 'Design: Twitter feed', slug: 'sd-twitter-feed', importance: 9, difficulty: 'hard', estimatedMinutes: 60, tags: ['system-design'], category: 'System Design' },
  { title: 'Design: Google Docs (collaborative editor)', slug: 'sd-google-docs', importance: 8, difficulty: 'hard', estimatedMinutes: 70, tags: ['system-design'], category: 'System Design' },
  { title: 'Design: Chat application', slug: 'sd-chat', importance: 9, difficulty: 'hard', estimatedMinutes: 60, tags: ['system-design', 'realtime'], category: 'System Design' },
  { title: 'Design: Image gallery', slug: 'sd-image-gallery', importance: 7, difficulty: 'hard', estimatedMinutes: 50, tags: ['system-design'], category: 'System Design' },
  { title: 'Design: Analytics dashboard', slug: 'sd-dashboard', importance: 8, difficulty: 'hard', estimatedMinutes: 55, tags: ['system-design'], category: 'System Design' },
  { title: 'Real-time updates (WebSocket, SSE, polling)', slug: 'realtime-updates', importance: 9, difficulty: 'hard', estimatedMinutes: 45, tags: ['system-design', 'realtime'], category: 'System Design' },
  { title: 'Offline-first patterns', slug: 'offline-first', importance: 7, difficulty: 'hard', estimatedMinutes: 45, tags: ['system-design', 'pwa'], category: 'System Design' },
  { title: 'Caching strategies (HTTP, browser, app)', slug: 'caching-strategies', importance: 9, difficulty: 'hard', estimatedMinutes: 50, tags: ['system-design', 'performance'], category: 'System Design' },

  // Soft Skills (5)
  { title: 'Code Review', slug: 'code-review', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['soft-skills'], category: 'Soft Skills' },
  { title: 'Mentoring va Knowledge Sharing', slug: 'mentoring', importance: 7, difficulty: 'medium', estimatedMinutes: 25, tags: ['soft-skills'], category: 'Soft Skills' },
  { title: 'Estimation', slug: 'estimation', importance: 7, difficulty: 'medium', estimatedMinutes: 25, tags: ['soft-skills'], category: 'Soft Skills' },
  { title: 'Tech Debt Management', slug: 'tech-debt', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['soft-skills'], category: 'Soft Skills' },
  { title: 'Architectural Decisions (ADR)', slug: 'adr', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['soft-skills', 'architecture'], category: 'Soft Skills' },
];
