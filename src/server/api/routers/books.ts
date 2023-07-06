import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const booksrouter = createTRPCRouter({
  getAllBooks: publicProcedure.query(async ({ ctx }) => {
    try {
      const books = await ctx.prisma.books.findMany();
      return books;
    } catch (e) {
      return null;
    }
  }),

  getEachBookData: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const book = await ctx.prisma.books.findUnique({
          where: {
            id: input,
          },
        });
        return book;
      } catch (e) {
        return null;
      }
    }),

  sellerdata: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        console.log("input", input);
        const bookdata = await ctx.prisma.books.findUnique({
          where: {
            id: input.id,
          },
        });
        const data = await ctx.prisma.user.findUnique({
          where: {
            id: bookdata?.bookid,
          },
        });
        return data;
      } catch (error) {
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
        authorname: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion

        const post = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            mybooks: {
              create: {
                authorname: input.authorname,
                bookName: input.bookname,
                genre: input.genre,
                pages: input.pages,
                price: input.price,
                synopsis: input.synopsis,
              },
            },
          },
        });
        return post;
      } catch (e) {
        return e;
      }
    }),
});
