import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Books, User } from "@prisma/client";

// type orderreqType = {
//   bookdata: Books | null;
//   buyerdata: User | null;
// }[];

export const salesRouter = createTRPCRouter({
  buyproduct: protectedProcedure
    .input(z.object({ senderid: z.string(), bookid: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const usersessionid = ctx.session?.user.id;
      try {
        const exits = await ctx.prisma.orders.findMany({
          where: {
            orderid: input.senderid,
            bookid: input.bookid,
          },
        });
        if (exits.length > 0) {
          return { error: "Order already Pending" };
        }
        const update = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            orders: {
              create: {
                senderId: usersessionid,
                bookid: input.bookid,
                status: "PENDING",
              },
            },
          },
        });
        return update;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
  productstatus: protectedProcedure
    .input(z.object({ senderid: z.string(), bookid: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.orders.findMany({
        where: {
          bookid: input.bookid,
          orderid: input.senderid,
        },
      });
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    }),

  ProductInbox: protectedProcedure.query(async ({ ctx }) => {
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
        id: i.id,
      };
    });
    const books = await Promise.all(promises);
    return books;
  }),

  OrderacceptQuery: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const status = await ctx.prisma.orders.update({
          where: {
            id: input.id,
          },
          data: {
            status: "SOLD",
          },
        });
        return "success";
      } catch (E) {
        return E;
      }
    }),
});
