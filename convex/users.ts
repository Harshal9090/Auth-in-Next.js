import { query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
    // ... your query logic ... 
    args: {},
  handler: async (ctx) => { 
    const userId = await auth.getUserId(ctx);

    if (userId===null) {
      return null; 
        }
    return await ctx.db.get(userId);
  },
}); 
