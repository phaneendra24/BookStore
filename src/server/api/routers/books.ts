import { ZodAny, any, string, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type bookdet = {
  bookName: string;
  genre: string;
  id: string;
  pages: number;
  sellername: string;
  synopsis: string;
};

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

  getDetailsofBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await ctx.prisma.books.findUnique({
          where: {
            id: input.id,
          },
        });
        return data;
      } catch (e) {
        return e;
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
        const post = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            mybooks: {
              create: {
                bookName: input.bookname,
                synopsis: input.synopsis,
                pages: input.pages,
                genre: input.genre,
                authorname: input.authorname,
                price: input.price,
              },
            },
          },
        });
        return post;
      } catch (e) {
        console.log(e);
        return e;
      }
    }),
});
