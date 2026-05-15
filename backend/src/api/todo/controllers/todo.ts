/**
 * todo controller
 */

"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::todo.todo",
  ({ strapi }) => ({
    // CREATE TODO
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const { title, isCompleted } = ctx.request.body.data;

      const todo = await strapi.documents("api::todo.todo").create({
        data: {
          title,
          isCompleted,
          user: user.id,
        },
        populate: {
          user: {
            fields: ["id", "username", "email"],
          },
        },
      });

      return { data: todo };
    },

    // GET ALL TODOS OF LOGGED-IN USER
    async find(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const todos = await strapi.documents("api::todo.todo").findMany({
        filters: {
          user: {
            id: {
              $eq: user.id,
            },
          },
        },
        populate: {
          subtodos: true,
          user: {
            fields: ["id", "username", "email"],
          },
        },
      });

      return { data: todos };
    },

    // GET SINGLE TODO
    async findOne(ctx) {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const todo = await strapi.documents("api::todo.todo").findOne({
        documentId: id,
        populate: {
          subtodos: true,
          user: {
            fields: ["id", "username", "email"],
          },
        },
      });

      if (!todo) {
        return ctx.notFound("Todo not found");
      }

      // SECURITY CHECK
      if (todo.user.id !== user.id) {
        return ctx.forbidden("Not your todo");
      }

      return { data: todo };
    },

    // UPDATE TODO
    async update(ctx) {
      console.log(ctx);
      const user = ctx.state.user;
      const { id } = ctx.params;
      const { isCompleted, title } = ctx.request.body.data;

      const todo = await strapi.documents("api::todo.todo").findOne({
        documentId: id,
        populate: {
          user: {
            fields: ["id", "username", "email"],
          },
        },
      });

      if (!todo) {
        return ctx.notFound("Todo not found");
      }

      // SECURITY CHECK
      if (todo.user.id !== user.id) {
        return ctx.forbidden("Not your todo");
      }

      const updatedTodo = await strapi.documents("api::todo.todo").update({
        documentId: id,
        data: { isCompleted: isCompleted, title: title },
      });

      if (isCompleted !== undefined) {
        // find subtodos
        const subtodos = await strapi
          .documents("api::subtodo.subtodo")
          .findMany({
            filters: {
              todo: {
                documentId: {
                  $eq: id,
                },
              },
            },
          });

        // update subtodos
        await Promise.all(
          subtodos.map((subtodo) =>
            strapi.documents("api::subtodo.subtodo").update({
              documentId: subtodo.documentId,
              data: { isCompleted: isCompleted },
            }),
          ),
        );
      }

      return updatedTodo;
    },

    // DELETE TODO
    async delete(ctx) {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const todo = await strapi.documents("api::todo.todo").findOne({
        documentId: id,
        populate: {
          user: {
            fields: ["id", "username", "email"],
          },
        },
      });

      if (!todo) {
        return ctx.notFound("Todo not found");
      }

      // SECURITY CHECK
      if (todo.user.id !== user.id) {
        return ctx.forbidden("Not your todo");
      }

      // find subtodos
      const subtodos = await strapi.documents("api::subtodo.subtodo").findMany({
        filters: {
          todo: {
            documentId: {
              $eq: id,
            },
          },
        },
      });

      // Delete subtodos
      await Promise.all(
        subtodos.map((subtodo) =>
          strapi.documents("api::subtodo.subtodo").delete({
            documentId: subtodo.documentId,
          }),
        ),
      );

      // Delete todo
      await strapi.documents("api::todo.todo").delete({
        documentId: id,
      });

      return {
        message: "Todo deleted successfully",
      };
    },
  }),
);
