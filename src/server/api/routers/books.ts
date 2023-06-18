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

  postbook: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const books = await ctx.prisma.books.create({
        data: {
          bookName: "laugh tale",
          synopsis: "String",
          genre: "String",
          pages: 100,
          authorname: "String",
        },
      });
      console.log(books);

      return books;
    } catch (e) {
      return null;
    }
  }),
});
