'use strict';

// "Closures" mavzusi uchun to'liq kontent (nazariya + savollar + amaliy topshiriq).
// Bu boshqa mavzular uchun namuna sifatida ishlatiladi.

module.exports = {
  topic: {
    title: 'Closures',
    slug: 'closures',
    levelSlug: 'middle',
    trackSlug: 'frontend',
  },

  theory: `# Closures

## Ta'rif

**Closure** — bu funksiya va u yaratilgan **lexical environment** (atrof-muhit) birgalikda tashkil etgan tuzilma. Oddiy qilib aytganda: ichki funksiya tashqi funksiyaning o'zgaruvchilariga kirish huquqini saqlab qoladi, hatto tashqi funksiya ishini tugatib bo'lgan bo'lsa ham.

\`\`\`javascript
function outer() {
  const message = 'Salom';

  function inner() {
    console.log(message); // 'Salom' — outer().message ga kirish
  }

  return inner;
}

const greet = outer();
greet(); // 'Salom' — outer tugagan, lekin message hali ham mavjud
\`\`\`

## Closure qanday ishlaydi?

JavaScript da har bir funksiya yaratilgan paytda **\\[[Environment]]** deb nomlangan ichki xususiyatga ega bo'ladi. Bu xususiyat funksiya yaratilgan lexical environment ga ishora qiladi.

Funksiya chaqirilganda:
1. Yangi **execution context** yaratiladi
2. Uning **outer environment** \`[[Environment]]\` ga teng qilinadi
3. Funksiya o'z scope ida o'zgaruvchini topa olmasa, **scope chain** orqali yuqoriga ko'tariladi

\`\`\`javascript
function makeCounter() {
  let count = 0;        // Bu o'zgaruvchi closure ichida "qulflanadi"

  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// 'count' tashqaridan ko'rinmaydi, lekin counter har gal o'zgartiradi
\`\`\`

## Amaliy foydalanish

### 1. Data Privacy (private o'zgaruvchilar)

JavaScript da \`private\` so'zi yo'q (yangi class \`#field\` dan tashqari), lekin closure orqali yashirin holat yaratish mumkin:

\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private

  return {
    deposit: (amount) => { balance += amount; },
    withdraw: (amount) => {
      if (amount <= balance) balance -= amount;
    },
    getBalance: () => balance,
  };
}

const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
console.log(account.balance);      // undefined — to'g'ridan-to'g'ri kirish yo'q
\`\`\`

### 2. Function Factory

\`\`\`javascript
function multiplier(factor) {
  return (x) => x * factor;
}

const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15
\`\`\`

### 3. React Hooks asosida

useState ham aslida closure ishlatadi:

\`\`\`javascript
function useState(initialValue) {
  let value = initialValue;
  const setValue = (newValue) => { value = newValue; };
  return [value, setValue]; // closure: setValue 'value' ga kirish saqlaydi
}
\`\`\`

## Klassik xato — loop ichida closure

\`\`\`javascript
// XATO (var bilan)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Natija: 3, 3, 3 (kutilgan: 0, 1, 2)
\`\`\`

**Sabab:** \`var\` function-scoped, barcha callback'lar **bir xil** \`i\` ga ishora qiladi. Loop tugagach \`i = 3\`.

**Yechimlar:**

\`\`\`javascript
// Yechim 1: let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Yechim 2: IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 100))(i);
}
\`\`\`

## Memory leak xavfi

Closure tashqi o'zgaruvchini ushlab turadi, demak garbage collector uni tozalay olmaydi:

\`\`\`javascript
function attachListener() {
  const bigData = new Array(1000000).fill('data');

  document.getElementById('btn').addEventListener('click', () => {
    console.log('clicked'); // bigData kerak emas, lekin closure uni ushlab turadi!
  });
}
\`\`\`

**Tuzatish:** kerakli ma'lumotlarni alohida o'zgaruvchiga olish yoki listener ni \`removeEventListener\` orqali tozalash.

## Asosiy nuqtalar

- Closure = funksiya + uning lexical environment
- Ichki funksiya tashqi o'zgaruvchilarni "eslab qoladi" (tashqi funksiya tugagandan keyin ham)
- Data privacy, factory functions, currying, partial application uchun ishlatiladi
- Loop + var + setTimeout — eng mashhur xato
- Closure memory leak'ga sabab bo'lishi mumkin
`,

  questions: [
    {
      type: 'multiple_choice',
      difficulty: 'medium',
      importance: 10,
      questionText: 'Quyidagi kod nimani chop etadi?',
      codeSnippet: `function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const a = outer();
const b = outer();
console.log(a()); // ?
console.log(a()); // ?
console.log(b()); // ?`,
      options: ['1, 2, 1', '1, 2, 3', '1, 1, 1', '0, 1, 0'],
      correctAnswer: '1, 2, 1',
      explanation: 'Har bir `outer()` chaqiruvi yangi closure yaratadi, ya\'ni alohida `count` o\'zgaruvchisi. `a` va `b` mustaqil counter\'lar. `a()` 1 va 2 qaytaradi, `b()` esa o\'zining yangi `count` dan boshlab 1 qaytaradi.',
    },
    {
      type: 'multiple_choice',
      difficulty: 'hard',
      importance: 9,
      questionText: 'Quyidagi kod nima chop etadi?',
      codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
      options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'Xatolik beradi'],
      correctAnswer: '3, 3, 3',
      explanation: '`var` function-scoped, shuning uchun barcha setTimeout callback\'lari **bir xil** `i` o\'zgaruvchisini ulashadi. Loop sinxron tugaydi, `i = 3` bo\'ladi. Keyin barcha setTimeout\'lar ishga tushganda 3 ni chop etadi. Tuzatish: `let` ishlatish (block-scoped — har iteratsiyada yangi binding).',
    },
    {
      type: 'true_false',
      difficulty: 'easy',
      importance: 8,
      questionText: 'Closure faqat tashqi funksiya tugagandan keyin yaratiladi.',
      correctAnswer: 'false',
      explanation: 'Closure har bir funksiya yaratilganda paydo bo\'ladi (har funksiya `[[Environment]]` ga ega). "Tugagandan keyin" qism noto\'g\'ri — closure har gal ichki funksiya tashqi scope\'ga murojaat qilganda ishlaydi.',
    },
    {
      type: 'short_answer',
      difficulty: 'medium',
      importance: 9,
      questionText: 'Closure yordamida bitta marta chaqiriladigan funksiya yarating: agar ikkinchi marta chaqirilsa, hech narsa qilmasin (`once`).',
      correctAnswer: `function once(fn) {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    return fn(...args);
  };
}

const init = once(() => console.log('boshlandi'));
init(); // 'boshlandi'
init(); // hech narsa`,
      explanation: '`called` o\'zgaruvchisi closure ichida saqlanadi. Birinchi chaqiruvda `true` ga o\'zgaradi, keyingilarida funksiya darhol qaytadi.',
    },
    {
      type: 'code_output',
      difficulty: 'hard',
      importance: 9,
      questionText: 'Quyidagi kod natijasi nima?',
      codeSnippet: `function makeFns() {
  const fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(() => i);
  }
  return fns;
}

const [a, b, c] = makeFns();
console.log(a(), b(), c());`,
      correctAnswer: '0 1 2',
      explanation: '`let` block-scoped, shuning uchun har iteratsiyada yangi `i` binding yaratiladi. Har bir arrow function o\'zining iteratsiyadagi `i` ni eslab qoladi. Agar `var` bo\'lganda — `3 3 3` chiqar edi.',
    },
  ],

  practicalTask: {
    title: 'Memoize funksiyasini yozing',
    slug: 'memoize-function',
    description: `# Memoize funksiyasini yozing

\`memoize(fn)\` deb nomlangan funksiya yozing. Bu funksiya boshqa funksiyani oladi va uni "memoized" versiyasini qaytaradi:

- Agar bir xil argumentlar bilan chaqirilsa — kesh'dan natijani qaytaradi (qayta hisoblamaydi)
- Agar yangi argumentlar bilan chaqirilsa — \`fn\` ni chaqiradi, natijani saqlaydi va qaytaradi

**Talablar:**

1. **Closure** ishlatish (kesh \`memoize\` ichida private bo'lishi kerak)
2. Bir nechta argumentlarni qo'llab-quvvatlasin
3. Argumentlar primitive (string, number, boolean) bo'ladi deb taxmin qiling

**Foydalanish misoli:**

\`\`\`javascript
const slowAdd = (a, b) => {
  console.log('hisoblanmoqda...');
  return a + b;
};

const fastAdd = memoize(slowAdd);

fastAdd(2, 3); // 'hisoblanmoqda...' chiqadi, 5 qaytadi
fastAdd(2, 3); // hech narsa chiqmaydi (kesh'dan), 5 qaytadi
fastAdd(4, 5); // 'hisoblanmoqda...' chiqadi, 9 qaytadi
\`\`\``,

    starterCode: `function memoize(fn) {
  // Sizning kodingiz shu yerda
}

// Test
const slowSquare = (n) => {
  console.log('hisoblanmoqda...', n);
  return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5)); // 'hisoblanmoqda... 5', 25
console.log(fastSquare(5)); // 25 (kesh)
console.log(fastSquare(6)); // 'hisoblanmoqda... 6', 36`,

    solutionCode: `function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Yana yaxshi yechim — primitive argumentlar uchun:
function memoizeBetter(fn) {
  const cache = Object.create(null); // toza obyekt (prototype'siz)

  return function (...args) {
    const key = args.join('|');
    if (key in cache) return cache[key];
    return cache[key] = fn(...args);
  };
}`,

    testCases: [
      {
        description: 'Bir xil argumentlar bilan ikki marta chaqiruv — fn faqat bir marta chaqirilishi kerak',
        input: 'fastAdd(2, 3) ikki marta',
        expected: 'fn 1 marta chaqirildi, ikkala chaqiruv 5 qaytaradi',
      },
      {
        description: 'Turli argumentlar — fn har gal qayta chaqirilishi kerak',
        input: 'fastAdd(2, 3), fastAdd(4, 5)',
        expected: 'fn 2 marta chaqirildi',
      },
    ],

    hints: [
      'Closure ishlatish kerak — kesh tashqarida ko\'rinmasligi shart',
      'Map yoki oddiy object kesh sifatida ishlatish mumkin',
      'Bir nechta argumentlar uchun ularni stringga aylantirish kerak (JSON.stringify yoki join)',
      'Closure shu yerda kerak: kesh `memoize` har chaqirilganda alohida bo\'ladi',
    ],

    difficulty: 'medium',
    estimatedMinutes: 30,
    language: 'javascript',
  },
};
