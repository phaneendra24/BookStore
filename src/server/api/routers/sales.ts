import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const salesRouter = createTRPCRouter({
  buyproduct: protectedProcedure.input(z.string()).mutation(async (ctx) => {
    return null;
  }),
});
