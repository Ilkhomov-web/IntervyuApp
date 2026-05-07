'use strict';

module.exports = [
  {
    name: '10 kunlik intensiv',
    slug: '10-kunlik-intensiv',
    description: 'Faqat eng muhim mavzular (importance 9-10). Tez intervyu uchun.',
    durationDays: 10,
    minImportance: 9,
    includedLevels: ['junior', 'middle'],
    trackSlug: 'frontend',
  },
  {
    name: '1 oylik o\'rtacha',
    slug: '1-oylik-ortacha',
    description: 'Importance 7+ mavzular. Junior va Middle darajalarni qoplaydi.',
    durationDays: 30,
    minImportance: 7,
    includedLevels: ['junior', 'middle'],
    trackSlug: 'frontend',
  },
  {
    name: '2 oylik to\'liq',
    slug: '2-oylik-toliq',
    description: 'Importance 5+ mavzular. Middle darajaga to\'liq tayyorlik.',
    durationDays: 60,
    minImportance: 5,
    includedLevels: ['junior', 'middle'],
    trackSlug: 'frontend',
  },
  {
    name: 'Senior tayyorgarlik',
    slug: 'senior-tayyorgarlik',
    description: 'Senior darajaga: internals, system design, architecture, testing.',
    durationDays: 90,
    minImportance: 5,
    includedLevels: ['middle', 'senior'],
    trackSlug: 'frontend',
  },
];
