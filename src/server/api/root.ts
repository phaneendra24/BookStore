import { createTRPCRouter } from "~/server/api/trpc";
import { booksrouter } from "./routers/books";
import { updateRouter } from "./routers/updates";
import { salesRouter } from "./routers/sales";
import { CartRouter } from "./routers/buyer/cart";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  books: booksrouter,
  update: updateRouter,
  sales: salesRouter,
  cart: CartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
