import { useSession } from "next-auth/react";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const booksrouter = createTRPCRouter({
  getAllBooks: publicProcedure.query(async ({ ctx }) => {
    try {
      // const boo = await ctx.prisma.books.deleteMany();
      const books = await ctx.prisma.books.findMany();
      return books;
    } catch (e) {
      return null;
    }
  }),

  postbook: protectedProcedure
    .input(
      z.object({
        bookname: z.string().min(4),
        synopsis: z.string(),
        genre: z.string(),
        pages: z.number(),
        sellername: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const post = ctx.prisma.books.create({
          data: {
            bookName: input.bookname,
            synopsis: input.synopsis,
            genre: input.genre,
            pages: input.pages,
            sellername: input.sellername,
          },
        });
        console.log(post);

        return post;
      } catch (e) {
        console.log(e);
        return e;
      }
    }),
});
