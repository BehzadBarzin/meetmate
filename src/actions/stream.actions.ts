"use server";

import { currentUser } from "@clerk/nextjs/server";
// IMPORTANT: Install and Import StreamClient from the Node SDK because this is a server action
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

/**
 * A Server Action to create a new Stream Token for the authenticated user.
 *
 * this functionality must be on the server because we cannot expose our Stream
 * secret to the client.
 * (Notice that the STREAM_SECRET_KEY doesn't have NEXT_PUBLIC_... before it which means it is not exposed to the client)
 *
 * @returns Stream Token
 */
export const tokenProvider = async () => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user from Clerk (on the server)
  const user = await currentUser();
  // ---------------------------------------------------------------------------
  if (!user) {
    throw new Error("User not authenticated");
  }
  // ---------------------------------------------------------------------------
  if (!apiKey || !apiSecret) {
    throw new Error(
      "Please provide Stream API Key and Secret in environment variables"
    );
  }
  // ---------------------------------------------------------------------------
  // Create a new StreamClient (on the server) from the Node SDK
  const streamClient = new StreamClient(apiKey, apiSecret);
  // ---------------------------------------------------------------------------
  // Token expiration date
  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1 hour
  // ---------------------------------------------------------------------------
  // Token issued date
  const issued = Math.floor(Date.now() / 1000) - 60;
  // ---------------------------------------------------------------------------
  // Create the Token
  const token = streamClient.createToken(user.id, exp, issued);
  // ---------------------------------------------------------------------------
  return token;
};
