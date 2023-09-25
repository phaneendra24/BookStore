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
        orderid: i.id,
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
      console.log(input);

      const data = ctx.prisma.orders.delete({
        where: {
          id: input,
        },
      });
      return data;
    }),
});
