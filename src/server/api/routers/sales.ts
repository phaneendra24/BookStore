import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Books, User } from "@prisma/client";

type orderreqType = {
  bookdata: Books | null;
  buyerdata: User | null;
}[];

export const salesRouter = createTRPCRouter({
  buyproduct: protectedProcedure
    .input(z.object({ senderid: z.string(), bookid: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const usersessionid = ctx.session?.user.id;
      try {
        const update = await ctx.prisma.orders.create({
          data: {
            senderId: usersessionid,
            bookid: input.bookid,
            status: "PENDING",
            orderid: input.senderid,
          },
        });
        return update;
      } catch (error) {
        console.log(error);

        return null;
      }
    }),

  productStatus: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.orders.findMany({
      where: {
        orderid: ctx.session.user.id,
      },
    });

    const promises = data.map(async (i) => {
      const bookdata = await ctx.prisma.books.findUnique({
        where: {
          id: i.bookid,
        },
      });
      const customerDetails = await ctx.prisma.user.findUnique({
        where: { id: i.senderId },
      });
      return {
        bookdata: bookdata,
        buyerdata: customerDetails,
        status: i.status,
      };
    });
    const books = await Promise.all(promises);
    return books;
  }),
});
