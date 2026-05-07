'use strict';

/**
 * Seed orchestrator.
 * Strapi bootstrap'da chaqiriladi (src/index.js).
 *
 * Strategiya:
 *  - Idempotent: qayta ishga tushirilsa dublikat yaratmaydi (slug bo'yicha tekshiradi)
 *  - Bog'liqlik tartibida: Track -> Level -> Topic -> Question/PracticalTask -> StudyPlan
 *  - Faqat ma'lumotlar bo'sh bo'lganda ishga tushadi (existing data o'chirilmaydi)
 */

const tracksData = require('./tracks');
const levelsData = require('./levels');
const studyPlansData = require('./study-plans');
const topicsJunior = require('./topics-junior');
const topicsMiddle = require('./topics-middle');
const topicsSenior = require('./topics-senior');
const fullTopicClosures = require('./full-topic-closures');

async function findOrCreate(uid, where, data) {
  const existing = await strapi.db.query(uid).findOne({ where });
  if (existing) return existing;
  return strapi.db.query(uid).create({ data });
}

async function seedTracks() {
  const created = {};
  for (const track of tracksData) {
    const entity = await findOrCreate(
      'api::track.track',
      { slug: track.slug },
      track
    );
    created[track.slug] = entity;
  }
  return created;
}

async function seedLevels() {
  const created = {};
  for (const level of levelsData) {
    const entity = await findOrCreate(
      'api::level.level',
      { slug: level.slug },
      level
    );
    created[level.slug] = entity;
  }
  return created;
}

async function seedTopicSkeleton(topicData, tracks, levels, levelSlug) {
  const data = {
    ...topicData,
    track: tracks.frontend.id,
    level: levels[levelSlug].id,
    publishedAt: new Date(),
  };

  return findOrCreate(
    'api::topic.topic',
    { slug: topicData.slug },
    data
  );
}

async function seedTopicSkeletons(tracks, levels) {
  const allTopics = {};

  for (const t of topicsJunior) {
    const entity = await seedTopicSkeleton(t, tracks, levels, 'junior');
    allTopics[t.slug] = entity;
  }
  for (const t of topicsMiddle) {
    const entity = await seedTopicSkeleton(t, tracks, levels, 'middle');
    allTopics[t.slug] = entity;
  }
  for (const t of topicsSenior) {
    const entity = await seedTopicSkeleton(t, tracks, levels, 'senior');
    allTopics[t.slug] = entity;
  }

  return allTopics;
}

async function seedFullTopicClosures(tracks, levels) {
  const { topic, theory, questions, practicalTask } = fullTopicClosures;

  const existing = await strapi.db.query('api::topic.topic').findOne({
    where: { slug: topic.slug },
  });

  if (existing) {
    if (!existing.theory) {
      await strapi.db.query('api::topic.topic').update({
        where: { id: existing.id },
        data: {
          theory,
          description: 'JavaScript Closures: lexical scope, data privacy, function factory, common pitfalls',
        },
      });
    }

    const existingQuestions = await strapi.db.query('api::question.question').count({
      where: { topic: existing.id },
    });

    if (existingQuestions === 0) {
      for (const q of questions) {
        await strapi.db.query('api::question.question').create({
          data: {
            ...q,
            topic: existing.id,
            publishedAt: new Date(),
          },
        });
      }
    }

    const existingTasks = await strapi.db.query('api::practical-task.practical-task').count({
      where: { topic: existing.id },
    });

    if (existingTasks === 0) {
      await strapi.db.query('api::practical-task.practical-task').create({
        data: {
          ...practicalTask,
          topic: existing.id,
          publishedAt: new Date(),
        },
      });
    }
  }
}

async function seedStudyPlans(tracks) {
  for (const plan of studyPlansData) {
    const { trackSlug, ...rest } = plan;
    await findOrCreate(
      'api::study-plan.study-plan',
      { slug: plan.slug },
      {
        ...rest,
        track: tracks[trackSlug].id,
      }
    );
  }
}

async function setPublicPermissions() {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const apiTypes = [
    'api::track.track',
    'api::level.level',
    'api::topic.topic',
    'api::question.question',
    'api::practical-task.practical-task',
    'api::study-plan.study-plan',
    'api::attempt.attempt',
    'api::review-schedule.review-schedule',
  ];

  const actions = ['find', 'findOne', 'create', 'update'];

  for (const apiType of apiTypes) {
    for (const action of actions) {
      const actionId = `${apiType}.${action}`;

      const existing = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({
          where: { action: actionId, role: publicRole.id },
        });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: actionId,
            role: publicRole.id,
          },
        });
      }
    }
  }
}

module.exports = async () => {
  strapi.log.info('🌱 Seed jarayoni boshlandi...');

  try {
    const tracks = await seedTracks();
    strapi.log.info(`  ✓ ${Object.keys(tracks).length} ta Track`);

    const levels = await seedLevels();
    strapi.log.info(`  ✓ ${Object.keys(levels).length} ta Level`);

    const topics = await seedTopicSkeletons(tracks, levels);
    strapi.log.info(`  ✓ ${Object.keys(topics).length} ta Topic skeleton`);

    await seedFullTopicClosures(tracks, levels);
    strapi.log.info('  ✓ "Closures" mavzusi to\'liq kontent bilan');

    await seedStudyPlans(tracks);
    strapi.log.info(`  ✓ ${studyPlansData.length} ta Study Plan`);

    await setPublicPermissions();
    strapi.log.info('  ✓ Public permissions sozlandi');

    strapi.log.info('✅ Seed muvaffaqiyatli yakunlandi');
  } catch (err) {
    strapi.log.error('❌ Seed xatolik berdi:', err);
    throw err;
  }
};
