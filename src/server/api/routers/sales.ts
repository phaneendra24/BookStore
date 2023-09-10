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
      try {
        const update = await ctx.prisma.orders.create({
          data: {
            bookid: input.bookid,
            orderid: input.senderid,
            senderId: ctx.session.user.id,
            status: "PENDING",
          },
        });
        console.log(update);

        return update;
      } catch (error) {
        console.log("failed", error);
        return "errro";
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
        status: "PENDING",
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
        orderdat: i.createdAt,
      };
    });
    const books = await Promise.all(promises);
    return books;
  }),

  OrderacceptQuery: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.id);

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

  OrderrejectQuery: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await ctx.prisma.orders.delete({
          where: {
            id: input.id,
          },
        });

        return "success";
      } catch (E) {
        return E;
      }
    }),
});
