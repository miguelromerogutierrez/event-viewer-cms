'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async unsuscribe(ctx) {
    let entity;
    if (!ctx.is('multipart')) {
      console.log(ctx.params);
      console.log(ctx.request.body);
      let event = await strapi.services.event.findOne(ctx.params);
      console.log(event);
      let users = event.users.filter((user) => user.id !== +ctx.request.body.user);
      console.log(users);
      entity = await strapi.services.event.update(
        ctx.params,
        { users }
      );
      return sanitizeEntity(entity, { model: strapi.models.event });
    }
  }
};
