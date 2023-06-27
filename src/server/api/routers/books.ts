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

  sellerdata: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const data = await ctx.prisma.user.findUnique({
          where: {
            id: input.id,
          },
        });
        return data;
      } catch (e) {
        console.log(e);
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
          where: {
            email: ctx.session.user.email!,
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
        console.log(e);
        return e;
      }
    }),
});
