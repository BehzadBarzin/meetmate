"use client";

import { FC, useEffect, useState } from "react";

import { tokenProvider } from "@/actions/stream.actions";

import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";

// -----------------------------------------------------------------------------
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// -----------------------------------------------------------------------------
interface IProps {
  children: React.ReactNode;
}

const StreamClientProvider: FC<IProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // Client
  const [client, setClient] = useState<StreamVideoClient>();
  // ---------------------------------------------------------------------------
  // Get currently authenticated user from Clerk
  const { user, isLoaded } = useUser();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Execute when authenticated user changes
  useEffect(() => {
    // -------------------------------------------------------------------------
    // If user is NOT authenticated, do nothing
    if (!user || !user.id || !isLoaded) return;
    // -------------------------------------------------------------------------
    // Check if API key is provided
    if (!apiKey) {
      throw new Error("Please provide Stream API Key in environment variables");
    }
    // -------------------------------------------------------------------------
    // Create new stream client for the authenticated user
    const newClient = new StreamVideoClient({
      apiKey: apiKey,
      user: {
        type: "authenticated",
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      // We get the stream token for the current user from the server-side of our
      // application because we don't want to expose our stream secret.
      tokenProvider: tokenProvider,
    });
    // -------------------------------------------------------------------------
    // Set the client in the state
    setClient(newClient);
    // -------------------------------------------------------------------------
  }, [user, isLoaded]);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // If no client is set, return loader
  if (!client) {
    return <Loader />;
  }
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default StreamClientProvider;
