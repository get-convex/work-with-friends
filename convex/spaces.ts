import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { getViewerId } from "./auth";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listSpaces = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const viewerId = await getViewerId(ctx);
    if (viewerId === null) {
      throw new Error("User is not authenticated");
    }

    const spaces = await ctx.db
      .query("spaces")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count);
    return {
      spaceOwner: (await ctx.db.get(viewerId))!.email ?? "missing email",
      spaces: spaces,
    };
  },
});

// You can write data to the database via a mutation:
export const addSpace = mutation({
  // Validators for arguments.
  args: {
    name: v.string(),
    capacity: v.number(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const viewerId = await getViewerId(ctx);
    if (viewerId === null) {
      throw new Error("User is not authenticated");
    }

    const id = await ctx.db.insert("spaces", {
      name: args.name,
      capacity: args.capacity,
    });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await ctx.fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
