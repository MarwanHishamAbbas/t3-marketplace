/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import clerkClient from "@clerk/clerk-sdk-node";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const userData = await clerkClient.users.getUser(ctx.auth.userId);
      const listing = await ctx.prisma.listing.create({
        data: {
          ...input,
          price: input.price,
          userId: ctx.auth.userId,
          username: userData.firstName,
          userImage: userData.profileImageUrl,
        },
      });
      console.log(listing);

      return listing;
    }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany();
  }),
  get: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(({ input, ctx }) => {
      const listing = ctx.prisma.listing.findUnique({
        where: { id: input.listingId },
      });
      return listing;
    }),
});
