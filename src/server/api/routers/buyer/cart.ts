import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const CartRouter = createTRPCRouter({
  getcartitems: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.orders.findMany({
      where: {
        senderId: ctx.session.user.id,
      },
    });
    const Allbookorders = data.map(async (i) => {
      const bookdata = await ctx.prisma.books.findUnique({
        where: {
          id: i.bookid,
        },
      });
      const sellerDetails = await ctx.prisma.user.findUnique({
        where: { id: i.orderid },
      });
      return {
        bookdata: bookdata,
        sellerdata: sellerDetails,
        status: i.status,
      };
    });
    const orders = await Promise.all(Allbookorders);
    return orders;
  }),

  cancelOrder: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = ctx.prisma.orders.deleteMany({
        where: {
          senderId: ctx.session.user.id,
          bookid: input,
        },
      });
      return data;
    }),
});
