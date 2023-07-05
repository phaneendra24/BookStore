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
      console.log(books);
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
        const data = await ctx.prisma.books.findUnique({
          where: {
            id: input.id,
          },
        });
        const seller = await ctx.prisma.user.findUnique({
          where: {
            id: data?.bookid,
          },
        });
        return seller;
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
        console.log(ctx.session.user.id);
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
        console.log(post);

        return post;
      } catch (e) {
        console.log(e);
        return e;
      }
    }),
});

// data: {
//   mybooks: {
//     create: {
//       authorname: input.authorname,
//       bookName: input.bookname,
//       genre: input.genre,
//       pages: input.pages,
//       price: input.price,
//       synopsis: input.synopsis,
//     },
//   },
