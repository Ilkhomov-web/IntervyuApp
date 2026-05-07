'use strict';

// Junior darajadagi mavzular skeleti (sarlavha + metadata).
// Theory kontenti keyinchalik AI yordamida to'ldiriladi.

module.exports = [
  // HTML/CSS asoslari (10)
  { title: 'Semantic HTML', slug: 'semantic-html', importance: 7, difficulty: 'easy', estimatedMinutes: 25, tags: ['html', 'a11y'], category: 'HTML/CSS' },
  { title: 'HTML Forms va Validation', slug: 'html-forms-validation', importance: 8, difficulty: 'easy', estimatedMinutes: 30, tags: ['html', 'forms'], category: 'HTML/CSS' },
  { title: 'Accessibility (a11y) asoslari', slug: 'accessibility-basics', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['html', 'a11y', 'aria'], category: 'HTML/CSS' },
  { title: 'CSS Box Model', slug: 'css-box-model', importance: 9, difficulty: 'easy', estimatedMinutes: 25, tags: ['css'], category: 'HTML/CSS' },
  { title: 'CSS Specificity va Inheritance', slug: 'css-specificity', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['css'], category: 'HTML/CSS' },
  { title: 'Flexbox', slug: 'flexbox', importance: 10, difficulty: 'medium', estimatedMinutes: 45, tags: ['css', 'layout'], category: 'HTML/CSS' },
  { title: 'CSS Grid', slug: 'css-grid', importance: 9, difficulty: 'medium', estimatedMinutes: 45, tags: ['css', 'layout'], category: 'HTML/CSS' },
  { title: 'CSS Position (relative, absolute, fixed, sticky)', slug: 'css-position', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['css'], category: 'HTML/CSS' },
  { title: 'CSS Pseudo-elements va Pseudo-classes', slug: 'css-pseudo', importance: 6, difficulty: 'easy', estimatedMinutes: 25, tags: ['css'], category: 'HTML/CSS' },
  { title: 'Responsive Design va Media Queries', slug: 'responsive-design', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['css', 'responsive'], category: 'HTML/CSS' },

  // JavaScript Asoslari (15)
  { title: 'var, let, const farqlari', slug: 'var-let-const', importance: 10, difficulty: 'easy', estimatedMinutes: 25, tags: ['javascript', 'fundamentals'], category: 'JavaScript Basics' },
  { title: 'Data Types (primitive vs reference)', slug: 'data-types', importance: 10, difficulty: 'easy', estimatedMinutes: 30, tags: ['javascript', 'fundamentals'], category: 'JavaScript Basics' },
  { title: 'Type Coercion va Equality (== vs ===)', slug: 'type-coercion', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Operatorlar va Expression', slug: 'operators', importance: 6, difficulty: 'easy', estimatedMinutes: 20, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Conditionals (if/else, switch, ternary)', slug: 'conditionals', importance: 5, difficulty: 'easy', estimatedMinutes: 20, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Loops (for, while, for...of, for...in)', slug: 'loops', importance: 7, difficulty: 'easy', estimatedMinutes: 25, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Functions (declaration, expression, arrow)', slug: 'functions-basics', importance: 10, difficulty: 'medium', estimatedMinutes: 35, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Array methods (map, filter, reduce, forEach)', slug: 'array-methods', importance: 10, difficulty: 'medium', estimatedMinutes: 50, tags: ['javascript', 'arrays'], category: 'JavaScript Basics' },
  { title: 'Object asoslari', slug: 'objects-basics', importance: 9, difficulty: 'easy', estimatedMinutes: 30, tags: ['javascript', 'objects'], category: 'JavaScript Basics' },
  { title: 'Destructuring (array va object)', slug: 'destructuring', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['javascript', 'es6'], category: 'JavaScript Basics' },
  { title: 'Spread va Rest operatorlari', slug: 'spread-rest', importance: 9, difficulty: 'medium', estimatedMinutes: 25, tags: ['javascript', 'es6'], category: 'JavaScript Basics' },
  { title: 'Template Literals', slug: 'template-literals', importance: 7, difficulty: 'easy', estimatedMinutes: 20, tags: ['javascript', 'es6'], category: 'JavaScript Basics' },
  { title: 'JSON (parse, stringify)', slug: 'json', importance: 7, difficulty: 'easy', estimatedMinutes: 20, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Error Handling (try/catch, throw)', slug: 'error-handling', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['javascript'], category: 'JavaScript Basics' },
  { title: 'Strict Mode', slug: 'strict-mode', importance: 5, difficulty: 'easy', estimatedMinutes: 15, tags: ['javascript'], category: 'JavaScript Basics' },

  // DOM va Events (5)
  { title: 'DOM API asoslari', slug: 'dom-api', importance: 8, difficulty: 'medium', estimatedMinutes: 40, tags: ['dom'], category: 'DOM' },
  { title: 'Event Handling', slug: 'event-handling', importance: 9, difficulty: 'medium', estimatedMinutes: 35, tags: ['dom', 'events'], category: 'DOM' },
  { title: 'Event Bubbling va Capturing', slug: 'event-bubbling', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['dom', 'events'], category: 'DOM' },
  { title: 'Event Delegation', slug: 'event-delegation', importance: 8, difficulty: 'medium', estimatedMinutes: 25, tags: ['dom', 'events'], category: 'DOM' },
  { title: 'Forms va FormData', slug: 'forms-formdata', importance: 7, difficulty: 'medium', estimatedMinutes: 30, tags: ['dom', 'forms'], category: 'DOM' },

  // React Asoslari (10)
  { title: 'JSX nima?', slug: 'jsx', importance: 9, difficulty: 'easy', estimatedMinutes: 25, tags: ['react'], category: 'React Basics' },
  { title: 'React Components (functional)', slug: 'react-components', importance: 10, difficulty: 'easy', estimatedMinutes: 30, tags: ['react'], category: 'React Basics' },
  { title: 'Props va Children', slug: 'props-children', importance: 10, difficulty: 'easy', estimatedMinutes: 30, tags: ['react'], category: 'React Basics' },
  { title: 'useState Hook', slug: 'usestate', importance: 10, difficulty: 'medium', estimatedMinutes: 35, tags: ['react', 'hooks'], category: 'React Basics' },
  { title: 'Conditional Rendering', slug: 'conditional-rendering', importance: 8, difficulty: 'easy', estimatedMinutes: 20, tags: ['react'], category: 'React Basics' },
  { title: 'Lists va Keys', slug: 'lists-keys', importance: 9, difficulty: 'medium', estimatedMinutes: 30, tags: ['react'], category: 'React Basics' },
  { title: 'Forms in React (controlled vs uncontrolled)', slug: 'react-forms', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['react', 'forms'], category: 'React Basics' },
  { title: 'useEffect Hook (asoslar)', slug: 'useeffect-basics', importance: 10, difficulty: 'medium', estimatedMinutes: 45, tags: ['react', 'hooks'], category: 'React Basics' },
  { title: 'Lifting State Up', slug: 'lifting-state', importance: 8, difficulty: 'medium', estimatedMinutes: 30, tags: ['react'], category: 'React Basics' },
  { title: 'React DevTools', slug: 'react-devtools', importance: 6, difficulty: 'easy', estimatedMinutes: 20, tags: ['react', 'tooling'], category: 'React Basics' },

  // Tools (5)
  { title: 'npm va package.json', slug: 'npm-package-json', importance: 8, difficulty: 'easy', estimatedMinutes: 25, tags: ['tools', 'npm'], category: 'Tools' },
  { title: 'Git asoslari', slug: 'git-basics', importance: 9, difficulty: 'medium', estimatedMinutes: 40, tags: ['git'], category: 'Tools' },
  { title: 'Browser DevTools', slug: 'browser-devtools', importance: 8, difficulty: 'medium', estimatedMinutes: 35, tags: ['tools', 'debugging'], category: 'Tools' },
  { title: 'ESLint va Prettier', slug: 'eslint-prettier', importance: 7, difficulty: 'easy', estimatedMinutes: 25, tags: ['tools', 'linting'], category: 'Tools' },
  { title: 'Webpack/Vite asoslari', slug: 'bundlers-basics', importance: 7, difficulty: 'medium', estimatedMinutes: 35, tags: ['tools', 'bundler'], category: 'Tools' },
];
