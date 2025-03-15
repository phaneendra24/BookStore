import { createTRPCRouter } from "~/server/api/trpc";
import { booksrouter } from "./routers/books";
import { CartRouter } from "./routers/cart";
import { Miniorouter } from "./routers/minio";
import { ReviewRouter } from "./routers/review";
import { salesRouter } from "./routers/sales";
import { updateRouter } from "./routers/updates";

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
  review: ReviewRouter,
  minio: Miniorouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
