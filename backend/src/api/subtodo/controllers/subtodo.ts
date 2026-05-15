/**
 * subtodo controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::subtodo.subtodo",
  ({ strapi }) => ({
    async update(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const { id } = ctx.params;
      const { title, isCompleted } = ctx.request.body.data;

      // Find subtodo
      const subtodo = await strapi.documents("api::subtodo.subtodo").findOne({
        documentId: id,
        populate: {
          todo: {
            populate: {
              user: true,
            },
          },
        },
      });

      if (!subtodo) {
        return ctx.notFound("Subtodo not found");
      }

      // Ownership check
      if (subtodo.todo?.user?.id !== user.id) {
        return ctx.forbidden("Unauthorized");
      }

      // Update subtodo
      const updatedSubtodo = await strapi
        .documents("api::subtodo.subtodo")
        .update({
          documentId: id,

          data: {
            ...(title !== undefined && {
              title,
            }),
            ...(isCompleted !== undefined && {
              isCompleted,
            }),
          },
        });

      // Sync parent todo
      if (isCompleted !== undefined) {
        const allSubtodos = await strapi
          .documents("api::subtodo.subtodo")
          .findMany({
            filters: {
              todo: {
                documentId: {
                  $eq: subtodo.todo.documentId,
                },
              },
            },
          });

        const allCompleted = allSubtodos.every((item) => item.isCompleted);

        await strapi.documents("api::todo.todo").update({
          documentId: subtodo.todo.documentId,
          data: {
            isCompleted: allCompleted,
          },
        });
      }

      return {
        data: updatedSubtodo,
      };
    },
  }),
);
