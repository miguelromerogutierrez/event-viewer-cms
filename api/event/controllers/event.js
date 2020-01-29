'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
let showdown = require('showdown');
let converter = new showdown.Converter();
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
  },

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.event.search(ctx.query);
    } else {
      entities = await strapi.services.event.find(ctx.query);
    }
    if(entities && entities.length > 0) {
      entities = entities.map(entity => {
        if(entity.description) {
          entity.description = converter.makeHtml(entity.description);
        }
        return entity;
      });
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.event })
    );
  },
};
