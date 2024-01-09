import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const ReviewRouter = createTRPCRouter({
  postReview: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        review: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const res = await ctx.prisma.books.update({
          data: {
            reviews: {
              create: {
                content: input.review,
              },
            },
          },
          where: {
            id: input.id,
          },
        });

        return res;
      } catch (error) {
        console.log(error);

        return error;
      }
    }),

  getReviews: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log("input is", input.id);

      try {
        const res = await ctx.prisma.reviews.findMany({
          where: {
            reviewId: input.id,
          },
        });

        return res;
      } catch (error) {
        console.log(error);

        return [];
      }
    }),
});
