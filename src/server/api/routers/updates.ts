import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const updateRouter = createTRPCRouter({
  userLikedstatus: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const likedata = await ctx.prisma.wishlist.findUnique({
          where: {
            bookId_userId: {
              bookId: input.id,
              userId: ctx.session.user.id,
            },
          },
        });
        if (likedata) {
          return true;
        } else {
          return null;
        }
        return likedata;
      } catch (error) {
        return null;
      }
    }),

  wishlistitems: protectedProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.prisma.books.findMany({
        where: {
          wishlist: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  }),

  updatinglike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // current user id
      const usersessionid = ctx.session?.user.id;

      try {
        const wishexist = await ctx.prisma.wishlist.findUnique({
          where: {
            bookId_userId: {
              bookId: input.id,
              userId: ctx.session.user.id,
            },
          },
        });
        // deleting wish if not present
        if (wishexist) {
          const data = await ctx.prisma.wishlist.delete({
            where: {
              bookId_userId: {
                bookId: input.id,
                userId: usersessionid,
              },
            },
          });
          return data;
        }
        // adding to wishlist
        const data = await ctx.prisma.wishlist.create({
          data: {
            bookId: input.id,
            userId: usersessionid,
          },
        });
        return data;
      } catch (error) {
        return error;
      }
    }),
});
