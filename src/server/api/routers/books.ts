import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const booksrouter = createTRPCRouter({
  getAllBooks: publicProcedure.query(async ({ ctx }) => {
    try {
      const books = await ctx.prisma.books.findMany();
      return books;
    } catch (e) {
      return null;
    }
  }),
});
