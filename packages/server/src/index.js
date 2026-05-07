'use strict';

const seed = require('./seed');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Bizning holatda — seed data kiritamiz.
   */
  async bootstrap({ strapi }) {
    await seed();
  },
};
